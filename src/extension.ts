// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "Microcks" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "Microcks.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      vscode.window.showInformationMessage("Hello World from microcksCli!");
      const panel = vscode.window.createWebviewPanel(
        "pulseapi",
        "PulseAPI",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        },
      );
    
      // Display a message box to the user

      panel.webview.html = `<html>
    <body>
      <h1>Hello Pulse API</h1>
      <p> I have setuped the most important thing here </p> 
    </body>
  </html>`;

    },
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated

export function deactivate() {}
