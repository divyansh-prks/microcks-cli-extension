import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {

  console.log(
    'Congratulations, your extension "Microcks" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "Microcks.helloWorld",
    () => {

      const panel = vscode.window.createWebviewPanel(
        "MicrocksTest",
        "MicrocksTest",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      panel.webview.html = `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8" />

<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  background:#1e1e1e;
  color:white;
  font-family:Arial;
  height:100vh;
  overflow:hidden;
}

.app{
  display:flex;
  height:100vh;
}

/* SIDEBAR */

.sidebar{
  width:260px;
  background:#181818;
  border-right:1px solid #333;
  padding:20px;
}

.logo{
  font-size:24px;
  font-weight:bold;
  margin-bottom:30px;
  color:#4ea1ff;
}

.nav-item{
  padding:14px;
  border-radius:8px;
  margin-bottom:10px;
  cursor:pointer;
  background:#252526;
  transition:0.2s;
}

.nav-item:hover{
  background:#0078d4;
}

.active-nav{
  background:#0078d4;
}

/* MAIN */

.main{
  flex:1;
  padding:25px;
  overflow:auto;
}

/* PAGES */

.page{
  display:none;
}

.active-page{
  display:block;
}

/* CARD */

.card{
  background:#252526;
  padding:20px;
  border-radius:12px;
  margin-top:20px;
}

/* INPUTS */

input,
textarea,
button{
  width:100%;
  padding:12px;
  border:none;
  border-radius:8px;
  margin-top:10px;
}

input,
textarea{
  background:#333;
  color:white;
}

textarea{
  min-height:180px;
}

button{
  background:#0078d4;
  color:white;
  cursor:pointer;
}

button:hover{
  background:#0090ff;
}

/* HERO */

.hero{
  background:#252526;
  padding:40px;
  border-radius:15px;
  text-align:center;
}

.hero img{
  width:150px;
  margin-bottom:20px;
}

/* STEPPER */

.stepper{
  display:flex;
  gap:10px;
  margin-top:20px;
  margin-bottom:20px;
}

.step{
  padding:10px 16px;
  border-radius:20px;
  background:#333;
}

.active-step{
  background:#0078d4;
}

/* BUTTON ROW */

.row{
  display:flex;
  gap:10px;
  margin-top:15px;
}

.row button{
  flex:1;
}

/* TRACE */

.trace-box{
  margin-top:20px;
  background:#111;
  padding:20px;
  border-radius:10px;
  min-height:200px;
  border:1px solid #333;
}

/* HUB */

.hub-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:20px;
  margin-top:20px;
}

.product-card{
  background:#252526;
  padding:20px;
  border-radius:12px;
}

/* ADMIN */

.admin-tabs{
  display:flex;
  gap:10px;
  margin-top:20px;
}

.admin-tab{
  padding:10px 16px;
  background:#333;
  border-radius:8px;
  cursor:pointer;
}

.active-admin{
  background:#0078d4;
}

/* OPERATION */

.api-operation{
  margin-top:15px;
  border:1px solid #333;
  border-radius:8px;
  overflow:hidden;
}

.operation-header{
  padding:15px;
  background:#2d2d2d;
  cursor:pointer;
  display:flex;
  align-items:center;
  gap:10px;
}

.operation-content{
  padding:15px;
  background:#1e1e1e;
}

.hidden{
  display:none;
}

.method-badge{
  padding:4px 10px;
  border-radius:4px;
  font-size:12px;
  font-weight:bold;
}

.get{
  background:green;
}

.post{
  background:orange;
}

.put{
  background:dodgerblue;
}

.delete{
  background:red;
}

.patch{
  background:purple;
}

/* POPUP */

.popup{
  position:fixed;
  top:20px;
  right:20px;
  background:#28a745;
  padding:15px 20px;
  border-radius:10px;
  z-index:999;
}

</style>

</head>

<body>

<div class="app">

  <!-- SIDEBAR -->

  <div class="sidebar">

    <div class="logo">
      MicrocksTest
    </div>

    <div
      class="nav-item active-nav"
      onclick="switchPage('dashboard', this)"
    >
      Dashboard
    </div>

    <div
      class="nav-item"
      onclick="switchPage('apis', this)"
    >
      APIs | Services
    </div>

    <div
      class="nav-item"
      onclick="switchPage('importers', this)"
    >
      Importers
    </div>

    <div
      class="nav-item"
      onclick="switchPage('traces', this)"
    >
      Live Traces
    </div>

    <div
      class="nav-item"
      onclick="switchPage('hub', this)"
    >
      Microcks Hub
    </div>

    <div
      class="nav-item"
      onclick="switchPage('admin', this)"
    >
      Administration
    </div>

  </div>

  <!-- MAIN -->

  <div class="main">

    <!-- DASHBOARD -->

    <div
      id="dashboard-page"
      class="page active-page"
    >

      <div class="hero">

        <img src="https://microcks.io/images/microcks-logo-blue-name_hu_f6e00a426810af7d.webp"/>

        <h1>Welcome To MicrocksTest</h1>

        <p style="margin-top:20px;">
          VS Code Extension For API Mocking,
          Testing, Importing Artifacts and
          Live Traces 🚀
        </p>

      </div>

    </div>

    <!-- APIS -->

    <div
      id="apis-page"
      class="page"
    >

      <h1>API Creation Wizard</h1>

      <div
        id="api-popup"
        class="popup hidden"
      >
        API Created Successfully 🚀
      </div>

      <div class="stepper">

        <div
          class="step active-step"
          id="wizard-step-1-indicator"
        >
          API Details
        </div>

        <div
          class="step"
          id="wizard-step-2-indicator"
        >
          Payload
        </div>

        <div
          class="step"
          id="wizard-step-3-indicator"
        >
          Review
        </div>

      </div>

      <!-- STEP 1 -->

      <div
        id="wizard-step-1"
        class="card"
      >

        <h2>API Details</h2>

        <input
          id="api-name"
          placeholder="API Name"
        />

        <input
          id="version"
          placeholder="Version"
          value="1.0"
        />

        <input
          id="resource"
          placeholder="Resource"
        />

      </div>

      <!-- STEP 2 -->

      <div
        id="wizard-step-2"
        class="card hidden"
      >

        <h2>Payload</h2>

        <textarea
          id="payload"
placeholder='{
  "name":"divyansh"
}'
        ></textarea>

      </div>

      <!-- STEP 3 -->

      <div
        id="wizard-step-3"
        class="card hidden"
      >

        <h2>Review API</h2>

        <div id="review-box"></div>

      </div>

      <div class="row">

        <button onclick="previousWizardStep()">
          Previous
        </button>

        <button onclick="nextWizardStep()">
          Next
        </button>

      </div>

      <!-- RESULT -->

      <div style="margin-top:40px;">

        <h2>Created APIs</h2>

        <div id="apis-list"></div>

      </div>

    </div>

    <!-- IMPORTERS -->

    <div
      id="importers-page"
      class="page"
    >

      <h1>Importers</h1>

      <div class="card">

        <button onclick="importArtifact()">
          Import Local Artifact
        </button>

        <button onclick="askDownloadUrl()">
          Download Artifact From URL
        </button>

      </div>

    </div>

    <!-- TRACES -->

    <div
      id="traces-page"
      class="page"
    >

      <h1>Live Traces</h1>

      <div class="card">

        <input
          id="service-name"
          placeholder="Services"
        />

        <input
          id="operation-name"
          placeholder="Operations"
        />

        <input
          id="client-ip"
          placeholder="Client IP"
        />

        <div class="row">

          <button onclick="connectTrace()">
            Connect
          </button>

          <button onclick="disconnectTrace()">
            Disconnect
          </button>

          <button onclick="prefillTrace()">
            Prefill
          </button>

          <button onclick="clearTrace()">
            Clear
          </button>

        </div>

      </div>

      <div
        class="trace-box"
        id="trace-box"
      >
        Waiting for trace connection...
      </div>

    </div>

    <!-- HUB -->

    <div
      id="hub-page"
      class="page"
    >

      <h1>Microcks Hub</h1>

      <div class="hub-grid">


 <div class="product-card">
    <img src="https://avatars.githubusercontent.com/u/33217836?s=200&v=4" alt="Bump.sh logo" style="width:50px; border-radius:25px;" />
    <h2>Bump.sh APIs</h2>
    <p>provided by Bump.sh</p>
    <p>Bump.sh helps you build a branded single source of truth, documenting and cataloging your APIs.</p>
  </div>

  <div class="product-card">
    <img src="https://avatars.githubusercontent.com/u/91603532?s=200&v=4" alt="Camara logo" style="width:50px; border-radius:25px;" />
    <h2>Camara APIs</h2>
    <p>provided by CamaraProject.org</p>
    <p>Camara Project standard APIs enable seamless access to Telco network capabilities.</p>
  </div>

  <div class="product-card">
    <img src="https://avatars.githubusercontent.com/u/5936803?s=200&v=4" alt="Fiware logo" style="width:50px; border-radius:25px;" />
    <h2>Fiware.org APIs</h2>
    <p>provided by Fiware.org</p>
    <p>FIWARE is a curated framework of Open Source platform components to accelerate the development of Smart Solutions.</p>
  </div>

  <div class="product-card">
    <img src="https://pixabay.com/images/download/x-6980894_1920.png" alt="GitHub logo" style="width:50px; border-radius:25px;" />
    <h2>GitHub APIs</h2>
    <p>provided by GitHub</p>
    <p>GitHub is a cloud-based platform where you can store, share, and work together with others to write code.</p>
  </div>

<div class="product-card">
    <img src="OPENBANKING_IMAGE_URL" alt="OpenBanking logo" style="width:50px; border-radius:25px;" />
    <h2>OpenBanking.org.uk APIs</h2>
    <p>provided by OpenBanking.org.uk</p>
    <p>The OpenBanking.org.uk standard is designed to assist with secure and standardized financial data access.</p>
  </div>

  <div class="product-card">
    <img src="https://avatars.githubusercontent.com/u/23359225?s=200&v=4" alt="OpenID logo" style="width:50px; border-radius:25px;" />
    <h2>OpenID APIs</h2>
    <p>provided by OpenID</p>
    <p>OpenID Foundation is a global open standards body committed to helping people control secure identity access.</p>
  </div>

  <div class="product-card">
    <img src="https://microcks.io/images/microcks-logo-blue-name_hu_f6e00a426810af7d.webp" alt="Microcks logo" style="width:50px; border-radius:25px;" />
    <h2>MicrocksIO Samples APIs</h2>
    <p>provided by MicrocksIO</p>
    <p>Samples for learning how to use Microcks with various API/Services specifications.</p>
  </div>

  <div class="product-card">
    <img src="https://avatars.githubusercontent.com/u/14352071?s=200&v=4" alt="Stet logo" style="width:50px; border-radius:25px;" />
    <h2>Stet.eu APIs</h2>
    <p>provided by STET</p>
    <p>STET is proud to release its API created according to the new Payment Services directives.</p>
  </div>


 <div class="product-card">
    <img src="https://images.chainguard.dev/logos/terraform.svg" alt="Terraform logo" style="width:50px; border-radius:25px;" />
    <h2>Terraform APIs</h2>
    <p>provided by HashiCorp</p>
    <p>Infrastructure as code for provisioning, compliance, and management of any cloud.</p>
  </div>































      </div>

    </div>

    <!-- ADMIN -->

    <div
      id="admin-page"
      class="page"
    >

      <h1>Administration</h1>

      <div class="admin-tabs">

        <div
          class="admin-tab active-admin"
          onclick="switchAdmin('users', this)"
        >
          Users
        </div>

        <div
          class="admin-tab"
          onclick="switchAdmin('snapshots', this)"
        >
          Snapshots
        </div>

        <div
          class="admin-tab"
          onclick="switchAdmin('secrets', this)"
        >
          Secrets
        </div>

      </div>

      <div id="users-admin" class="card">
        Manage Users
      </div>

      <div
        id="snapshots-admin"
        class="card hidden"
      >
        Environment Snapshots
      </div>

      <div
        id="secrets-admin"
        class="card hidden"
      >
        Secret Vault Management
      </div>

    </div>

  </div>

</div>

<script>

const vscode = acquireVsCodeApi();

let currentWizardStep = 1;

const createdApis = [];

/* PAGE SWITCH */

function switchPage(page, el){

  document
    .querySelectorAll('.page')
    .forEach(pageEl=>{
      pageEl.classList.remove('active-page');
    });

  document
    .getElementById(page + '-page')
    .classList.add('active-page');

  document
    .querySelectorAll('.nav-item')
    .forEach(nav=>{
      nav.classList.remove('active-nav');
    });

  el.classList.add('active-nav');
}

/* ADMIN SWITCH */

function switchAdmin(tab, el){

  document
    .querySelectorAll('.admin-tab')
    .forEach(t=>{
      t.classList.remove('active-admin');
    });

  el.classList.add('active-admin');

  document
    .getElementById('users-admin')
    .classList.add('hidden');

  document
    .getElementById('snapshots-admin')
    .classList.add('hidden');

  document
    .getElementById('secrets-admin')
    .classList.add('hidden');

  document
    .getElementById(tab + '-admin')
    .classList.remove('hidden');
}

/* API WIZARD */

function showWizardStep(step){

  currentWizardStep = step;

  for(let i=1;i<=3;i++){

    document
      .getElementById(
        'wizard-step-' + i
      )
      .classList.add('hidden');

    document
      .getElementById(
        'wizard-step-' + i + '-indicator'
      )
      .classList.remove('active-step');

  }

  document
    .getElementById(
      'wizard-step-' + step
    )
    .classList.remove('hidden');

  document
    .getElementById(
      'wizard-step-' + step + '-indicator'
    )
    .classList.add('active-step');

  if(step === 3){
    renderReview();
  }
}

function nextWizardStep(){

  if(currentWizardStep < 3){

    showWizardStep(
      currentWizardStep + 1
    );

  } else {

    createApi();

  }
}

function previousWizardStep(){

  if(currentWizardStep > 1){

    showWizardStep(
      currentWizardStep - 1
    );

  }
}

function renderReview(){

  const apiName =
    document.getElementById(
      'api-name'
    ).value;

  const version =
    document.getElementById(
      'version'
    ).value;

  const resource =
    document.getElementById(
      'resource'
    ).value;

  const payload =
    document.getElementById(
      'payload'
    ).value;

  document.getElementById(
    'review-box'
  ).innerHTML = \`

    <p><b>API:</b> \${apiName}</p>

    <p><b>Version:</b> \${version}</p>

    <p><b>Resource:</b> /\${resource}</p>

    <h3>Payload</h3>

    <pre>\${payload}</pre>

  \`;
}

function createApi(){

  const api = {

    apiName:
      document.getElementById(
        'api-name'
      ).value,

    version:
      document.getElementById(
        'version'
      ).value,

    resource:
      document.getElementById(
        'resource'
      ).value,

    payload:
      document.getElementById(
        'payload'
      ).value

  };

  createdApis.push(api);

  renderApis();

  const popup =
    document.getElementById(
      'api-popup'
    );

  popup.classList.remove('hidden');

  setTimeout(()=>{
    popup.classList.add('hidden');
  },3000);

  document.getElementById(
    'api-name'
  ).value = "";

  document.getElementById(
    'version'
  ).value = "1.0";

  document.getElementById(
    'resource'
  ).value = "";

  document.getElementById(
    'payload'
  ).value = "";

  showWizardStep(1);
}

function renderApis(){

  const container =
    document.getElementById(
      'apis-list'
    );

  container.innerHTML = "";

  createdApis.forEach(api=>{

    container.innerHTML += \`

      <div class="card">

        <h2>\${api.apiName}</h2>

        <p>
          Version:
          \${api.version}
        </p>

        <p>
          Resource:
          /\${api.resource}
        </p>

        \${createOperation(
          "GET",
          api.resource,
          api.payload
        )}

        \${createOperation(
          "POST",
          api.resource,
          api.payload
        )}

        \${createOperation(
          "PUT",
          api.resource,
          api.payload
        )}

        \${createOperation(
          "DELETE",
          api.resource,
          api.payload
        )}

      </div>

    \`;

  });
}

function createOperation(
  method,
  resource,
  payload
){

  return \`

    <div class="api-operation">

      <div
        class="operation-header"
        onclick="toggleOperation(this)"
      >

        <span
          class="method-badge \${method.toLowerCase()}"
        >
          \${method}
        </span>

        <span>
          /\${resource}
        </span>

      </div>

      <div
        class="operation-content hidden"
      >

        <p>
          Mock URL:
        </p>

        <input
          value="http://localhost:8585/\${resource}"
          readonly
        />

        <h4>Payload</h4>

        <pre>\${payload}</pre>

      </div>

    </div>

  \`;
}

function toggleOperation(el){

  const content =
    el.nextElementSibling;

  content.classList.toggle('hidden');
}

/* IMPORTERS */

function importArtifact(){

  vscode.postMessage({
    type:"importArtifact"
  });
}

function askDownloadUrl(){

  vscode.postMessage({
    type:"askDownloadUrl"
  });
}

/* RECEIVE IMPORTED DATA */

window.addEventListener(
  "message",
  event=>{

    const message =
      event.data;

    if(
      message.type ===
      "artifactImported"
    ){

      const data =
        message.data;

      document.getElementById(
        'api-name'
      ).value =
        data.apiName || "";

      document.getElementById(
        'version'
      ).value =
        data.version || "1.0";

      document.getElementById(
        'resource'
      ).value =
        data.resource || "";

      document.getElementById(
        'payload'
      ).value =
        JSON.stringify(
          data.payload,
          null,
          2
        );

      switchPage(
        'apis',
        document.querySelectorAll(
          '.nav-item'
        )[1]
      );

      alert(
        "Artifact Imported Successfully 🚀"
      );
    }

  }
);

/* TRACES */

function connectTrace(){

  document.getElementById(
    'trace-box'
  ).innerHTML = \`

    🔌 Connected Successfully

    <br><br>

    Client → Gateway →
    Service → Database

  \`;
}

function disconnectTrace(){

  document.getElementById(
    'trace-box'
  ).innerHTML =
    "Disconnected";
}

function prefillTrace(){

  document.getElementById(
    'service-name'
  ).value =
    "payment-service";

  document.getElementById(
    'operation-name'
  ).value =
    "create-payment";

  document.getElementById(
    'client-ip'
  ).value =
    "127.0.0.1";
}

function clearTrace(){

  document.getElementById(
    'service-name'
  ).value = "";

  document.getElementById(
    'operation-name'
  ).value = "";

  document.getElementById(
    'client-ip'
  ).value = "";

  document.getElementById(
    'trace-box'
  ).innerHTML =
    "Waiting for trace connection...";
}

</script>

</body>
</html>
`;

      /* EVENTS */

      panel.webview.onDidReceiveMessage(

        async (message) => {

          /* IMPORT LOCAL */

          if (
            message.type ===
            "importArtifact"
          ) {

            const fileUri =
              await vscode.window.showOpenDialog({

                canSelectMany: false,

                filters: {
                  JSON: ["json"]
                }

              });

            if (!fileUri) {
              return;
            }

            const fileData =
              await vscode.workspace.fs.readFile(
                fileUri[0]
              );

            const jsonString =
              Buffer
                .from(fileData)
                .toString("utf8");

            const artifact =
              JSON.parse(jsonString);

            panel.webview.postMessage({

              type:
                "artifactImported",

              data:
                artifact

            });

            vscode.window.showInformationMessage(
              "Artifact Imported Successfully 🚀"
            );
          }

          /* DOWNLOAD URL */

          if (
            message.type ===
            "askDownloadUrl"
          ) {

            const url =
              await vscode.window.showInputBox({

                prompt:
                  "Enter Artifact JSON URL",

                placeHolder:
                  "https://example.com/api.json"

              });

            if (!url) {
              return;
            }

            try {

              const response =
                await fetch(url);

              const artifact =
                await response.json();

              panel.webview.postMessage({

                type:
                  "artifactImported",

                data:
                  artifact

              });

              vscode.window.showInformationMessage(
                "Artifact Downloaded Successfully 🚀"
              );

            } catch (error) {

              vscode.window.showErrorMessage(
                "Failed To Download Artifact"
              );

            }

          }

        }

      );

    }
  );

  context.subscriptions.push(disposable);

}

export function deactivate() {}