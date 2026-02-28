"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
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
        if (!word || word.includes('\n'))
            return;
        // Resaltar en todos los editores visibles (excepto el activo)
        vscode.window.visibleTextEditors.forEach(editor => {
            if (editor === activeEditor)
                return;
            const text = editor.document.getText();
            const ranges = [];
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
function deactivate() { }
//# sourceMappingURL=extension.js.map