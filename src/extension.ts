import * as vscode from "vscode";

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {

  console.log(
    'Congratulations, your extension "Microcks" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "Microcks.helloWorld",
    () => {

      vscode.window.showInformationMessage(
        "Hello World from microcksCli!"
      );

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

/* LAYOUT */

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

/* MAIN CONTENT */

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

/* DASHBOARD */

.hero{
  background:#252526;
  padding:40px;
  border-radius:15px;
  text-align:center;
}

.hero img{
  width:140px;
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

/* BUTTON GROUP */

.row{
  display:flex;
  gap:5px;
  margin-top:10px;
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

.admin-content{
  margin-top:20px;
}

/* OPERATIONS */

.api-operation{
  margin-top:15px;
  border:1px solid #333;
  border-radius:8px;
  overflow:hidden;
}

.operation-header{
  padding:15px;
  background:#252526;
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

.get{background:green;}
.post{background:orange;}
.put{background:dodgerblue;}
.delete{background:red;}
.patch{background:purple;}

</style>

</head>

<body>

<div class="app">

  <!-- SIDEBAR -->

  <div class="sidebar">

    <div class="logo">
      MicrocksTest
    </div>

    <div class="nav-item active-nav"
      onclick="switchPage('dashboard', this)">
      Dashboard
    </div>

    <div class="nav-item"
      onclick="switchPage('apis', this)">
      APIs | Services
    </div>

    <div class="nav-item"
      onclick="switchPage('importers', this)">
      Importers
    </div>

    <div class="nav-item"
      onclick="switchPage('traces', this)">
      Live Traces
    </div>

    <div class="nav-item"
      onclick="switchPage('hub', this)">
      Microcks Hub
    </div>

    <div class="nav-item"
      onclick="switchPage('admin', this)">
      Administration
    </div>

  </div>

  <!-- MAIN -->

  <div class="main">

    <!-- DASHBOARD -->

    <div id="dashboard-page"
      class="page active-page">

      <div class="hero">

        <img src="https://microcks.io/images/microcks-logo-blue-name_hu_f6e00a426810af7d.webp"/>

        <h1>Welcome To MicrocksTest</h1>

        <p style="margin-top:20px;">
          A VSCode Extension For mock Testing, API Creation and more! 
        </p>

      </div>

    </div>

    <!-- APIs PAGE -->


<div id="apis-page"
  class="page">

  <h1>API Creation Wizard</h1>

  <!-- SUCCESS POPUP -->

  <div
    id="api-popup"
    class="hidden"
    style="
      background:#28a745;
      padding:15px;
      border-radius:8px;
      margin-top:20px;
    "
  >
    API Created Successfully 🚀
  </div>

  <!-- STEPPER -->

  <div class="stepper">

    <div class="step active-step"
      id="wizard-step-1-indicator">
      1. API Details
    </div>

    <div class="step"
      id="wizard-step-2-indicator">
      2. Payload
    </div>

    <div class="step"
      id="wizard-step-3-indicator">
      3. Review
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

  <!-- NAVIGATION -->

  <div
    style="
      display:flex;
      gap:10px;
      margin-top:20px;
    "
  >

    <button
      onclick="previousWizardStep()"
      id="prev-btn"
    >
      Previous
    </button>

    <button
      onclick="nextWizardStep()"
      id="next-btn"
    >
      Next
    </button>

  </div>

  <!-- CREATED APIs -->

  <div
    id="created-apis"
    style="margin-top:40px;"
  >

    <h2>Created APIs</h2>

    <div id="apis-list"></div>

  </div>

</div>


      <div id="result-content"></div>

    </div>

    <!-- IMPORTERS -->

    <div id="importers-page"
      class="page">

      <h1>Importers</h1>

      <div class="card">

        <button onclick="importArtifact()">
          Import Local Artifact
        </button>

        <input id="artifact-url"
          placeholder="Paste Artifact URL"/>

        <button onclick="downloadArtifact()">
          Download Artifact
        </button>

      </div>

    </div>

    <!-- TRACES -->

    <div id="traces-page"
      class="page">

      <h1>Live Traces</h1>

      <div class="card">

        <input id="service-name"
          placeholder="Services"/>

        <input id="operation-name"
          placeholder="Operations"/>

        <input id="client-ip"
          placeholder="Client IP"/>

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

      <div class="trace-box"
        id="trace-box">

        Waiting for trace connection...

      </div>

    </div>

    <!-- HUB -->

    <div id="hub-page"
      class="page">

      <h1>Microcks Hub</h1>

      <div class="hub-grid">

        <div class="product-card">
        <img src="https://avatars.githubusercontent.com/u/33217836?s=200&v=4" style="width:50px; border-radius:25px;"/>
          <h2>Bump.sh</h2>
          
          <p>Bump.sh helps you build a branded single source of truth, documenting and cataloging all your APIs.</p>
          <
        </div>

      

     <div class="product-card">
        <img src="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABQAFADASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAABgADBAUHAgEI/8QAORAAAQQBAgQCCAQFBAMAAAAAAQIDBAURAAYSITFBUYEHExQiYXGR8BUyQqEWI1Kx0SZyssE1dIL/xAAYAQEBAQEBAAAAAAAAAAAAAAADBAUAAf/EAC0RAAEDAwMCBAYDAQAAAAAAAAECESEAAzESQVEEcRMiYYEUIzKx0eFikcHx/9oADAMBAAIRAxEAPwD6p0tLQfuncNkLtmh22yy5Yrb9a669+RlP+dLZsqvK0p/QFFevJsp1K/7RhpaBqu+vKncEOp3UiO4idkR5bAwCofpI++o1xIY3pfSHWlPMUcBKiniaPE6sA9Qe2qPgiD5lADLvB7bn+qD4wEeVJJwzSO+w/um9y+17n3gvbbUpUSujMB6SUgFTpOMJGe3MfvqNEiSNi7oqoUaWuTUWay0WXAOJtfLBB8x++p25aUi8rX6q7RE3II/qh64A+1ISOZUnx5feNcU9O+vd0WTuu4jy7ZlpS4sNocIQOhVjv9+Gr03Ei0A40aS6WkmZxzLvGKgVbUbpLHXqDKeAIjPEM05o+0tAb8HeVE+49XTm7uIpRUWJQ4XE58D/ANDA09e7iuHrePRbfjsiyLAfkuunKGAccvif8jWeOjKiNCgRy+O7yKvPWBIOtJB4bPZoNG2loHp7+6rdwR6bdSI6zLBMaWwMBRH6SO2jjQ3rCrJAMvIIwaazfTeBIhsg5FLQNuWvtandSdx0sP8AEEOMhmVGCuFZA6KT9nRzoDjPu33pNfUy6tMCma9UoJUQFunqD8uY8tP0TgqVsAXfcce5ah6xiEp3JDNsefYPUGTIsLu3hXN9CNJRVBL5MhWVuL5Y5Yz1A7fXPLRYshmXHbfjOJdZcSFIWk5Cge+lKjsyo7jEltLrLiSlaFDIUD21mhL2xJLiEOOS9pSlltSm1cS4azyPMdvvrpQB1g0I8pTgbEfn70RJ6M6leYKydwfx9qstqD+Id829+v3okM+wwz1HL8yh/cf7tT95QobN1T3j9nHrnYKzxlwZLzR6pAzknt8MnUBcG8Uhuv2eK2uoFIC25jauNSwRkkDx+OplX6Pq1l/2q3cet5pOS5KVlOf9vTTLXbSvxFLYMwSJLM07B98zQoRcUjwwhy7kmA7vG59MRUVzfMu2cLO0KZ+fzx7U/wDy2R8j3+oPw1zcQ7qm3KjcVdAE9MmMlmbEbXhSVDHvJPcch2PQ+PK12JeO2jVhDnMMxp0CQplbTIwkJzyI+Hby1XVT7t96Sp0pp1Yr6hn2ZISr3XHVdcjvj3h/8jXAC0taUoASkF3JLgs0xmGZq4vdQhRWSpRDMwYh3icS7vTMKNcbp3RX2dnWrq62uJW006rLji/H4fTWgaA96Pu0O7qW7Lq/YHCYklJUeFIV0Vj756PNSdYSpNtYYJIgDaZHff3qrpAEqWgyoGSd4g9vxQB+Pbg3PYSm9qLiRa6KQkyn08RdVjOAMHl5ac2/e2YVd1smtiDccVIdw1hCJWR7qifH75agwY13sWZLj19U5bVEhQcaLKvfbVjBBGDp+gU5Av37/drjFdLsymNFilWSlI8T9OvnjV60W9KghIKWGlvqJjLTy/G1QoXc1JK1EKc6n+kCcPHDc704Nu7m3D725bcwYiusKv8Ad5eClf8AR4tKibr4u4JW1aauZNY21xz3XVlzjJGOHBOM+P8AbRjd2DVTUy5z5HAw2V4Jxk9h5nA89DXovr3WaNy0m5M20cMlxSuvCfy/tqcX1rsLWqE4AEB+Yyw53anNhKLyEJlWSTJbicOeKq1KlUM9O1NlpCpCuKU89LWVpjpUeQA+nbv3JJ1NrLy9qNwxKjdPsz7c3IjS2Bw5UP0qH07d9Q57klO5XNz7SS1cMKQYk2O257wUkgZHkBjGc9eh07DjXW6tzV1ja1yqytrlFxppxX8xxzsSO3MDtqhSUqS9wBmLk/Vq++dsNQJUoKa2S7hgPp0/bHu9T34kKJua1tYdrCZlSIwYLK3gkB1JIyoZ+XnnXeyGq3b1GmK/bQHpbjinpDqX04Wsnr18Mfvqqsava8re7lYuhZkynEKly5JUQEE8+Y8TnPnp7be2dm39b7bEpY4R6xbZSSrIKVEc+fcYPno16PB+YVMdOw4Lb96RGrxXthLjVueQ+3arLe981ErYTcKLHs5k55KIja8LbKuoUflqnlW27dslibfqgzq1xxKHgwnhUxnuOQyPnnU/du2HhX1Lu2WmkSahwOR45OErT3TknVVav7j3i0zVLo3KuGpxKpb76+qQeaU8hnXvTptFCWYpnU7OO08cb151CroWp3Co0tg94552rSdZ3aMpf3VK2zeZfrbJKpUJxRytlz9SUnsM5wO2tE0E7qt5725I9Lt2PENmG/WuSpCchhB8PifP5aj6Eq1kJ4zhm3f0/VV9cE6AVc4y77N6/uqFxLjCP4N3i+77E8pPsVglWAsAjCFH9uf+MXG6nbO3s07WpW3IkVLaTLllOAGz+lPjnVfYiycnRtu74TFmRLHIizY6eFTbgHfkOfMdu/fniZQXc3bFk3t/dLhWwr3YVgr8q09krPj9/HWkoFhcSAVAEsMH+QHIaRzNZySJtqJCSQHOR/EniYPtRIa2PQ7TlRatJYQzGcUlSThRVwn3ifHPfULYtioej2vsbOQ46UxlOvPOqKlEAkkknryGrrcH/gbL/wBZz/idZiXpD/ov2vSQsh+2Ulgq/pQFEqP9s/DOo+nt/EWzqMlYc+jEmrL9z4e4NIgJLD1cAUSei+K7KYsNxTE4k2jylJB/S0CQB8s5x8Maa27/AKe9IVnTHlDs0+2xfAL58Y/5fQaOIMVqDCYixk8LLKEtoT4ADA0H7ltrKVuhql20xEFg0z616bITn1CD2HxPLx6j5jkXj1F24APKodgAMH2ivF2h09q2SfMk+5JyPeaZ3287bbkpNuRXFoC3BKkqQrhIQnmBnx7+WjzQFV2tvU7pi1u6W4UhctJTGnsI4Tn+g8v8eej3Q9WChKLewGRu5k/57U3SELUu5uTg7MIH++9LQPuastq3c6Nx0MdMwrZ9TKilWCoDoU/to40tBYvGypwHeCDuKe/ZF5LEs0g8Gs/iRbvdO5K2wt681lbXKLjbKzlxxw46jt0H00xeSp0gPVu9qhP4U6o+rsIx4gxz91Sv6fnrR9LVI67zA6Awwzht3B57vU56Lykay5y7F9pHHZqz42jm1qdiisFOX9g+FJYYYT7xY6DiPyz9jXe1rStft6+sl079NYQkLMOO5yQUqB4uH44z++mruQds+kNVzPjuuVsyKGQ+2ji9QoY5HwHLPnpmRYt7x3rRrpWXVRK5annpikFKT090HvnGPP4au8MLRqIhQJKgWALGGx6Nmah8QoXpBlJACSHJDiXz6viKmv7vuLZ9yNtWkeWEKKFSpY9W2kjry8fgdeXVfd1O4m9xVMRE1b8ZLM2KlWDkY95Pj0H0+Oj3S1njq0oPy0ADByX7n8NV56RSx8xZJyMBuw/L0AV8K63NuaDa3MH8NgV+VMsKVla1+J8NH+lpaG/fN4iGAgAU1iwLQMuTJJr/2Q==" style="width:50px; border-radius:25px;"/>
          <h2>Camara Api</h2>
          
          <p>Camara Project standard APIs enable seamless access to Telco network capabilities</p>
          <
        </div>

          <div class="product-card">
        <img src="data:image/jpeg;base64,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" style="width:50px; border-radius:25px;"/>
          <h2>Fiware</h2>
          
          <p>FIWARE is a curated framework of Open Source platform components to accelerate the development of Smart Solutions.</p>
          <
        </div>


          <div class="product-card">
        <img src="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABQAFADASIAAhEBAxEB/8QAHAAAAwEAAwEBAAAAAAAAAAAAAAcIBgEEBQIJ/8QANhAAAgEDAgQDBgUDBQEAAAAAAQIDBAURAAYHEiExCEFREzJhcZGxFSIjUoEUM5I3YnKhorP/xAAWAQEBAQAAAAAAAAAAAAAAAAACAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREh/9oADAMBAAIRAxEAPwCqdGjUseIDjPNX1VVtjZ9UYqCMmKtr4Ww07Do0cbDsg7Fh73YdM5pEYvEzjxYNqTTW+zp+N3eMlXSGTlghb0eTrkj9qgnyONT1ufjPvrcEj896kttOxOILaPYAD05+rn/LS4BRMLlV9BkDX1p4Ou1W3CurnL11dV1TnqWqJ3kJ/lidcUdwrqFw9DXVdK46hoJ3jI/lSNdbRqRi7Y4z762/InJepLlTqRmC5D24I9Ofo4/y1QvDPjzYN1zQ2+8J+CXeQhUSZ+aCZvRJOmCf2sAfIZ1GuvklHyuVb1GQdWLX6XaNSv4f+M81BVUu2N31RloJCIqGvmbLQMeixyMe6HsGPu9j0xiqNCwid8S+/JNqbQS12yYx3e8c0Sup/NDAP7jj0JyFHxYny1GqqAAoGB2A0xPEDf33BxXvTc5ant7i3QjOQBH7+Pm5f6aXZOBnBPwHc6cGrC8O+0bLWcHbbJc7XQ1rV8k9RJ/UU6yZ/UZQOo8goGvM334cLRc6hKnaNZ+CuWHtaaRWmg5fMoM8yn4Zx8u+mFwS2zX7S4b2q13eUPWKHmeMDAg9oxf2fx5c4J9c63ejrU7UPhftqIPxDc9wmfzNPTRxD6Nz/fRW+F+2Oh/oNz3GF/I1FPHKPovJ99UTo1a3CA2N4brTbqqSo3dXG88r/pU0StDCV9X6lmPwyB89e34gNo2Oi4NXlrbaqGiahEVREaenSPBWRQeoHmCQfnpyaxfGPbVfu3hzebPaZhHWTxqyKw6SlGD+zJ8ublxnyzq1iB3UEFSMjsRqyvDRvyTde0HtdzmMl3s/LEzsfzTQH+259SMFT8VB89RqeYEh1ZWBIZWGCD5g/HTF8P1/fb/Feytzlae4ObdMM4BEnuZ+ThPrpVkYO6VTV10rqyQ5epqJJ2J8y7lj99aDhZRxXDiZtWlqFDQvcoSynseU8+Pqo1n7pStQ3Suo5Bh6aokgYHyKOVP2139mXVLFvCxXaU4ioq6GeQ/7A45//JbUn6KDRrhGV1DIQykZBByCNc6BDRo0akNB7HRoPbUkCcYqOKg4q7rggAWMXB5AB5F1WQ/9udZe11TUN0oayMkPTVEU6keRRww+2vW4gXeO/b73DdYG5oKuvlkib1jDcqH+VUH+deVa6Vq660NHGMvU1EUCgeZdwo++mLdeIGwPt/ivel5CtPcHFxhOMAiT38fJw/10vvYyNTvN7KQwKeVpOQ8gPoW7DVjeJjYcm69oJdbZCZLvZ+aVUUfmmgP9xB6kYDD4gjz0gODPFGq2TXpQV7iq2pWSYq6Z1DCIP0Mqfdl7EZ89ZLxGrwB40W9bRSbZ3hVpSVNMoho66ZsRzRjoqO3ZWA6AnoQB596LR1kRXRgyMAQwOQR651H/AB64SzWC5Nftp0L1O26se0kjpVMgpHPU9Bn9Ju4I6DqOgxrI8HX3Rct12yy7avN6oaKaoValqKVzHBH3divVAcAgEjuRqxq8NGvmJeSJF5mblAGWOSfifjrlxzIwyRkYyO+i0M6opZiAoGST0AGp649cabfDaKvbmz6tKuvqVMNVWwNzR06Hoyq3ZnI6dOi5756aS3GKr3FR70vW371uC63KlpKjES1NSxVo2AdCUGFzhgCcdwdYIAAYAwNKRmgAAAAYA7DTF8P1gfcHFeyryFqe3sbhMcZAEfuZ+blPppcsQoJJwB3OrL8NGw5NqbQe6XOEx3e8csrIw/NDAB+mh9Cclj8WA8tbWQ4tSv4gODE1DU1e59oUhloJSZa63xLloGPVpI1HdD3ZR27jpnFUaNCUkl8KvEDJtuxUtm3Lb57jR0qCOnq6R19qsY6KrKxAbA6AgjoB0PfTa2dx027u3dVvsVrt94SprC4WSojjRF5ULHOHJ8vIa6/EzgPYN1zTXCzv+CXeQlneGPmgmb1ePpgn9ykHzOdYDhNwb3ftTita7hc6eia2UftWergqAyvmNlACnDZyfMa3jFQjtoPY6B2Gg9tY1D3iQ/1nv/8Axp//AIrpaMQoJJAA7k6o3i/we3du3itcbjaqejFsrFh5aueoCqnLGFIZRls5HkNbzhnwGsG1JobheX/G7vHhkaaPlghb1SPrkj9zEnzAGlo4XXh/4MzV9VS7n3fSmKgjIloaCZcNO3dZJFPZB3Cn3u56YzVGjRo2k//Z" style="width:50px; border-radius:25px;"/>
          <h2>Github Api </h2>
          
          <p>GitHub is a cloud-based platform where you can store, share, and work together with others to write code.</p>
          <
        </div>

  <div class="product-card">
        <img src="https://avatars.githubusercontent.com/u/33217836?s=200&v=4" style="width:50px; border-radius:25px;"/>
          <h2>Bump.sh</h2>
          
          <p>Bump.sh helps you build a branded single source of truth, documenting and cataloging all your APIs.</p>
          <
        </div>

      

     <div class="product-card">
        <img src="data:image/jpeg;base64,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" style="width:50px; border-radius:25px;"/>
          <h2>Camara Api</h2>
          
          <p>Camara Project standard APIs enable seamless access to Telco network capabilities</p>
          <
        </div>

          <div class="product-card">
        <img src="data:image/jpeg;base64,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" style="width:50px; border-radius:25px;"/>
          <h2>Fiware</h2>
          
          <p>FIWARE is a curated framework of Open Source platform components to accelerate the development of Smart Solutions.</p>
          <
        </div>


          <div class="product-card">
        <img src="data:image/jpeg;base64,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" style="width:50px; border-radius:25px;"/>
          <h2>Github Api </h2>
          
          <p>GitHub is a cloud-based platform where you can store, share, and work together with others to write code.</p>
          <
        </div>



        
        
        








      </div>

    </div>

    <!-- ADMIN -->

    <div id="admin-page"
      class="page">

      <h1>Administration</h1>

      <div class="admin-tabs">

        <div class="admin-tab active-admin"
          onclick="switchAdmin('users', this)">
          Users
        </div>

        <div class="admin-tab"
          onclick="switchAdmin('snapshots', this)">
          Snapshots
        </div>

        <div class="admin-tab"
          onclick="switchAdmin('secrets', this)">
          Secrets
        </div>

      </div>

      <div class="admin-content">

        <div id="users-admin">
          <div class="card">
            Manage Users
          </div>
        </div>

        <div id="snapshots-admin"
          class="hidden">
          <div class="card">
            Environment Snapshots
          </div>
        </div>

        <div id="secrets-admin"
          class="hidden">
          <div class="card">
            Secret Vault Management
          </div>
        </div>

      </div>

    </div>

  </div>

</div>

<script>

const vscode = acquireVsCodeApi();

/* PAGE SWITCH */

function switchPage(page, el){

  document
    .querySelectorAll('.page')
    .forEach(p=>{
      p.classList.remove('active-page');
    });

  document
    .getElementById(page + '-page')
    .classList.add('active-page');

  document
    .querySelectorAll('.nav-item')
    .forEach(n=>{
      n.classList.remove('active-nav');
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

/* API RESULT */

/* =========================
   API WIZARD STATE
========================= */

let currentWizardStep = 1;

const createdApis = [];

/* =========================
   SHOW STEP
========================= */

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

/* =========================
   NEXT
========================= */

function nextWizardStep(){

  if(currentWizardStep < 3){

    showWizardStep(
      currentWizardStep + 1
    );

  } else {

    createApi();

  }

}

/* =========================
   PREVIOUS
========================= */

function previousWizardStep(){

  if(currentWizardStep > 1){

    showWizardStep(
      currentWizardStep - 1
    );

  }

}

/* =========================
   REVIEW
========================= */

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

    <p>
      <b>API Name:</b>
      \${apiName}
    </p>

    <p>
      <b>Version:</b>
      \${version}
    </p>

    <p>
      <b>Resource:</b>
      /\${resource}
    </p>

    <h3>Payload</h3>

    <pre>
\${payload}
    </pre>

  \`;

}

/* =========================
   CREATE API
========================= */

function createApi(){

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

  const api = {

    apiName,
    version,
    resource,
    payload

  };

  createdApis.push(api);

  renderApis();

  /* POPUP */

  const popup =
    document.getElementById(
      'api-popup'
    );

  popup.classList.remove('hidden');

  setTimeout(()=>{

    popup.classList.add('hidden');

  },3000);

  /* RESET FORM */

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

/* =========================
   RENDER APIS
========================= */

function renderApis(){

  const container =
    document.getElementById(
      'apis-list'
    );

  container.innerHTML = "";

  createdApis.forEach(api=>{

    container.innerHTML += \`

      <div class="card">

        <h2>
          \${api.apiName}
        </h2>

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



function toggleOperation(el){

  const content =
    el.nextElementSibling;

  content.classList.toggle('hidden');
}

/* IMPORT */

function importArtifact(){

  vscode.postMessage({
    type:"importArtifact"
  });
}

/* DOWNLOAD */

function downloadArtifact(){

  const url =
    document.getElementById(
      'artifact-url'
    ).value;

  vscode.postMessage({
    type:"downloadArtifact",
    url:url
  });
}

/* TRACES */

function connectTrace(){

  document.getElementById(
    'trace-box'
  ).innerHTML = \`

    🔌 Connected Successfully

    <br><br>

    Service Trace Flow:

    <br><br>

    Client → Gateway → Service → Database

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
  ).value = "payment-service";

  document.getElementById(
    'operation-name'
  ).value = "create-payment";

  document.getElementById(
    'client-ip'
  ).value = "127.0.0.1";
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

      /* HANDLE EVENTS */

      panel.webview.onDidReceiveMessage(

        async (message) => {

          /* IMPORT ARTIFACT */

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
              Buffer.from(fileData)
                .toString("utf8");

            const artifact =
              JSON.parse(jsonString);

            panel.webview.postMessage({

              type: "artifactImported",

              data: artifact

            });

          }

          /* DOWNLOAD FROM URL */

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

                data: artifact

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