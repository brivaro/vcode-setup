<div align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="80" alt="vscode logo" />

<h1>✨ brivaro-extension-sync-highlight</h1>
<p><strong>VS Code extension to mirror word highlights across visible editors</strong></p>
</div>

---

**brivaro-extension-sync-highlight** is a minimal Visual Studio Code extension that automatically highlights the selected word (or the word under the cursor) across all other visible editors.

It’s designed to improve code scanning and cross-file reading by visually syncing occurrences without modifying your files.

---

## 🚀 Overview

The extension works in real time inside VS Code:

* 🖱️ When you select text, the extension captures the word.
* 🎯 If nothing is selected, it detects the word under the cursor.
* 🔍 The same word is highlighted in every other visible editor.
* 🧹 Previous highlights are cleared automatically on each selection change.
* ⚡ Runs fully in-memory using VS Code decorations (no file changes).

Important behavior:

* Highlights **do NOT appear in the active editor**, only in the other visible editors.
* Multi-line selections are ignored.
* Matching is simple text matching (not regex, not case-insensitive).

---

## 🔧 How It Works

### Event Listener

The extension listens to:

* `vscode.window.onDidChangeTextEditorSelection`

Every time the cursor or selection changes:

1. Extracts the selected text.
2. Falls back to the word under the cursor if empty.
3. Clears previous decorations.
4. Searches the same word in other visible editors.
5. Applies highlight decorations to matches.

---

## 🧩 Key Components

* **Decoration Type**
  Creates a yellow translucent highlight with border using:

  * `backgroundColor: rgba(255, 200, 0, 0.3)`
  * `border: rgba(255, 200, 0, 0.6)`

* **Selection Handler**
  Detects the current word from selection or cursor position.

* **Cross-Editor Scanner**
  Performs a plain `indexOf` search through each visible editor’s text.

* **Decoration Reset**
  Clears highlights globally before applying new ones to avoid stale matches.

---

## 🛠️ Technologies Used

* **TypeScript / JavaScript** – Extension logic
* **VS Code Extension API** – Editor integration
* **TextEditorDecorationType** – Non-invasive highlighting
* **Manifest (package.json)** – Extension configuration

---

## ✨ Current Features

* ✅ Auto-detect word under cursor
* ✅ Real-time cross-editor highlighting
* ✅ Zero file mutations
* ✅ Lightweight and fast
* ✅ Works with multiple split editors

---

## ⚠️ Known Limitations (Technical Reality)

Being precise:

* ❌ Case-insensitive search is not implemented
* ❌ Whole-word boundary detection is not enforced
* ❌ Large files may incur repeated full-text scans
* ❌ Only works on **visible editors**, not all open tabs
* ❌ No configuration UI yet

(These are good candidates for future improvements.)

---

## 📦 Installation (Development)

1. **Clone the repository**

   ```bash
   git clone https://github.com/brivaro/brivaro-extension-sync-highlight.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the extension**

   * Open the project in VS Code
   * Press `F5` to launch Extension Development Host

---

## 🧪 Suggested Improvements (Roadmap)

High-impact upgrades you could implement:

* [ ] Case-insensitive matching option
* [ ] Whole-word regex matching
* [ ] Configurable highlight color
* [ ] Throttling/debouncing for performance
* [ ] Sidebar panel listing matches
* [ ] Support for hidden editors

---

## 🤝 Contributing

PRs and issues are welcome. If you plan structural changes (performance, regex engine, etc.), open an issue first to discuss.

---

## 📄 License

MIT

---

Si quieres subir el nivel, puedo proponerte:

* optimización O(n) → O(indexed search)
* versión con regex + word boundaries
* o features “premium” para posicionarla en el Marketplace de VS Code.
