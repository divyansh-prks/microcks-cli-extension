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
      <br>
      <div class="main" data-vscode-context='{"webviewSection": "main", "mouseCount": 4}'>
      <h1>Cat Coding</h1>
      
      <h2>Pulse API</h2>
      
      <input
      type="text"
      id="url"
      placeholder="Enter URL"
      style="width: 400px;"
      />
      
      <button onclick="sendRequest()">
      Send
      </button>
      
      <pre id="result"></pre>
      <textarea data-vscode-context='{"webviewSection": "editor", "preventDefaultContextMenuItems": true}'></textarea>
      <form action="/action_page.php">
      <label for="fname">Request Url:</label><br>
      <input type="text" id="fname" name="fname" value="John"><br>
      <label for="lname">Payload:</label><br>
      <input type="text" id="lname" name="lname" value="Doe"><br><br>
      <input type="submit" value="Submit">
      </form> 
      
      
      
      
      
      <script>
      const vscode = acquireVsCodeApi()
      
      
      function sendRequest() {
        
      const url =
      document.getElementById('url').value;
      
      alert(url);
      const name = "divyansh"
      
      
      vscode.postMessage({
        type : 'sendRequest' ,
        url : url , 
        divname : name
        
        })
        }
        
        </script>
        </body>
        </html>`;
        panel.webview.onDidReceiveMessage(
        async (message) => {
        
        console.log(message);
        }
        
        )
        
},
);


context.subscriptions.push(disposable);
}


export function deactivate() {}