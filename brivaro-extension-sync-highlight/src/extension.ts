import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 200, 0, 0.3)',
    border: '1px solid rgba(255, 200, 0, 0.6)'
  });

  vscode.window.onDidChangeTextEditorSelection(event => {
    const activeEditor = event.textEditor;
    const selection = activeEditor.selection;
    let word = activeEditor.document.getText(selection).trim();

    // Si no hay selección, tomar la palabra bajo el cursor
    if (!word) {
      const wordRange = activeEditor.document.getWordRangeAtPosition(selection.active);
      if (wordRange) {
        word = activeEditor.document.getText(wordRange);
      }
    }

    // Limpiar decoraciones en todos los editores
    vscode.window.visibleTextEditors.forEach(editor => {
      editor.setDecorations(decorationType, []);
    });

    if (!word || word.includes('\n')) return;

    // Resaltar en todos los editores visibles (excepto el activo)
    vscode.window.visibleTextEditors.forEach(editor => {
      if (editor === activeEditor) return;

      const text = editor.document.getText();
      const ranges: vscode.Range[] = [];
      let index = text.indexOf(word);

      while (index !== -1) {
        const start = editor.document.positionAt(index);
        const end = editor.document.positionAt(index + word.length);
        ranges.push(new vscode.Range(start, end));
        index = text.indexOf(word, index + 1);
      }

      editor.setDecorations(decorationType, ranges);
    });
  }, null, context.subscriptions);
}

export function deactivate() {}