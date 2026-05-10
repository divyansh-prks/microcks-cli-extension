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
      
      // panel.webview.html = `<html>
      // <body>
      // <h1>Hello Pulse API</h1>
      // <p> I have setuped the most important thing here </p> 
      // <br>
      // <div class="main" data-vscode-context='{"webviewSection": "main", "mouseCount": 4}'>
      // <h1>Cat Coding</h1>
      
      // <h2>Pulse API</h2>
      
      // <input
      // type="text"
      // id="url"
      // placeholder="Enter URL"
      // style="width: 400px;"
      // />
      
      // <button onclick="sendRequest()">
      // Send
      // </button>
      
      // <pre id="result"></pre>
      // <textarea data-vscode-context='{"webviewSection": "editor", "preventDefaultContextMenuItems": true}'></textarea>
      // <form action="/action_page.php">
      // <label for="fname">Request Url:</label><br>
      // <input type="text" id="fname" name="fname" value="John"><br>
      // <label for="lname">Payload:</label><br>
      // <input type="text" id="lname" name="lname" value="Doe"><br><br>
      // <input type="submit" value="Submit">
      // </form> 
      
      
      
      
      
      // <script>
      // const vscode = acquireVsCodeApi()
      
      
      // function sendRequest() {
        
      // const url =
      // document.getElementById('url').value;
      
      // alert(url);
      // const name = "divyansh"
      
      
      // vscode.postMessage({
      //   type : 'sendRequest' ,
      //   url : url , 
      //   divname : name
        
      //   })
      //   }
        
      //   </script>
      //   </body>
      //   </html>`;





panel.webview.html = `
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">

  <style>

    body {
      background-color: #1e1e1e;
      color: white;
      font-family: Arial, sans-serif;
      padding: 10px;
    }

    .top-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    select,
    input,
    button,
    textarea {
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
    }

    select {
      background: #333;
      color: white;
    }

    input {
      flex: 1;
      background: #2d2d2d;
      color: white;
    }

    button {
      background: #0078d4;
      color: white;
      cursor: pointer;
    }

    button:hover {
      background: #0090ff;
    }

    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    .tab {
      padding: 8px 14px;
      background: #2d2d2d;
      border-radius: 5px;
      cursor: pointer;
    }

    .editor {
      margin-bottom: 15px;
    }

    textarea {
      width: 100%;
      height: 180px;
      background: #252526;
      color: white;
      resize: vertical;
    }

    .response {
      background: #252526;
      padding: 10px;
      border-radius: 5px;
      min-height: 200px;
      overflow: auto;
      white-space: pre-wrap;
    }

    .response-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .status {
      color: lightgreen;
    }

    .hidden {
  display: none;
}

.active-tab {
  background: #0078d4;
}

  </style>

</head>

<body>

  <h2>Microcks CLI</h2>

  <div class="top-bar">

    <select id="method">
      <option>GET</option>
      <option>POST</option>
      <option>PUT</option>
      <option>PATCH</option>
      <option>DELETE</option>
    </select>

    <input
      type="text"
      id="url"
      placeholder="Enter API URL"
    />

    <button onclick="sendRequest()">
      Send
    </button>

  </div>



  
<div class="tabs">

  <div
    class="tab active-tab"
    onclick="switchTab('params')"
  >
    Params
  </div>

  <div
    class="tab"
    onclick="switchTab('headers')"
  >
    Headers
  </div>

  <div
    class="tab"
    onclick="switchTab('body')"
  >
    Body
  </div>

  <div
    class="tab"
    onclick="switchTab('auth')"
  >
    Auth
  </div>









  
</div>
<div id="params-section" class="section">

  <h3>Query Params</h3>

  <input
    type="text"
    placeholder="key=value"
  />

</div>

<div
  id="headers-section"
  class="section hidden"
>

  <h3>Headers</h3>

  <textarea placeholder='{
  "Authorization": "Bearer token"
}'></textarea>

</div>

<div
  id="body-section"
  class="section hidden"
>

  <h3>Request Body</h3>

  <textarea
    id="body"
    placeholder='{
  "name": "Divyansh"
}'
  ></textarea>

</div>

<div
  id="auth-section"
  class="section hidden"
>

  <h3>Authentication</h3>

  <input
    type="text"
    placeholder="Bearer Token"
  />

</div>





<script> 

function switchTab(tabName) {

  const sections = [
    'params',
    'headers',
    'body',
    'auth'
  ];

  sections.forEach(name => {

    const section =
      document.getElementById(name + '-section');

    section.classList.add('hidden');

  });

  document
    .getElementById(tabName + '-section')
    .classList.remove('hidden');

  document
    .querySelectorAll('.tab')
    .forEach(tab => {
      tab.classList.remove('active-tab');
    });

  event.target.classList.add('active-tab');

}

</script>
 

</body>

</html>
`;
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