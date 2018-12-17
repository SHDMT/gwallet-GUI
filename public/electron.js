const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let loginWindow;
let isLogin = false;
let processServer;
let dataProviderServer;
app.showExitPrompt = true;

require("update-electron-app")({
  repo: "kitze/react-electron-example",
  updateInterval: "1 hour"
});

function createWindow() {
  dataProviderServer = require("../src/core/provider/dataprovideserver").DataProviderServer;
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 680,
    webPreferences: {
      blinkFeatures: "OverlayScrollbars",
      webSecurity: false
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.on("close", e => closingMainWindow(e));

  //createMenu();
}

function closingMainWindow(e) {
  if (app.showExitPrompt) {
    e.preventDefault(); // Prevents the window from closing
    dialog.showMessageBox(
      {
        type: "question",
        buttons: ["Yes", "No"],
        title: "退出钱包",
        message: "是否确定退出钱包?"
      },
      function (response) {
        if (response === 0) {
          // Runs the following if 'Yes' is clicked
          app.showExitPrompt = false;
          mainWindow.close();
        }
      }
    );
  }
}

function createLoginWindow() {
  processServer = require("../src/core/provider/processserver").ProcessServer;

  loginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      blinkFeatures: "OverlayScrollbars"
    }
  });

  //loginWindow.setMenu(null);
  loginWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  loginWindow.on("close", (e) => (loginWindow = null));
}
app.on("ready", () => {
  subscribeEvents();
  createLoginWindow();
});

app.on("window-all-closed", () => {
  if (dataProviderServer != null) {
    dataProviderServer.rpcClient.disconnect();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('quit', function (event) {
  event.preventDefault()
  processServer.processManager.stopProvider();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function subscribeEvents() {
  electron.ipcMain.on("closeloginwindow", () => {
    loginWindow.close();
  });
  electron.ipcMain.on("closemainwindow", () => {
    mainWindow.close();
  });

  electron.ipcMain.on("loginmainwindow", () => {
    loginMainWindow();
  });
  electron.ipcMain.on("getappview", (event, args) => {
    getappview(event.sender);
  });
}

function getappview(res) {
  res.send("[res]getappview", {
    view: isLogin ? "main" : "login"
  });
}

function loginMainWindow() {
  isLogin = true;
  loginWindow.close();
  createWindow();
}

function createMenu() {
  let template = [
    {
      label: "File",
      submenu: [
        {
          label: "Import Wallet",
          click() {
            require("electron").shell.openExternal("https://electronjs.org");
          }
        },
        {
          label: "Export Wallet",
          click() {
            require("electron").shell.openExternal("https://electronjs.org");
          }
        },
        { role: "quit" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { role: "togglefullscreen" },
        { role: "toggledevtools" }
      ]
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }]
    },
    {
      role: "help",
      submenu: [{ role: "about" }, { role: "help" }]
    }
  ];

  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
