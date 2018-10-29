
const format = require('./util/format')
format.mkdir(format.dataPath())
const { app,
    ipcMain,
    globalShortcut,
    dialog,
    Menu,
    BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');
const os = require("os")
const exec = require('child_process').exec;
const spawn = require('child_process');
const config = require('electron-json-config');
const settings = require('electron-settings');
const walletDB = require(__dirname + '/db/gwallet-db.js');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// 界面大小
const width = 800;
const height = 600;
let widthmax = 1200;
let heightmax;

if (process.platform == 'win32') {
    heightmax = 728
} else {
    heightmax = 722
}
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        title: "Gravity wallet",
        width: width,
        height: height,
        minWidth: width,
        minHeight: height,
        maxWidth: widthmax * 1.5,
        maxHeight: heightmax * 1.5,
        fullscreenable: false,
        show: false,
        frame: true,
    })
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './app/views/login.html'),
        //    pathname: path.join(__dirname, './app/views/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    Menu.setApplicationMenu(null);
    //mainWindow.webContents.openDevTools({ detach: true });
    //注册打开控制台的快捷键
    globalShortcut.register('ctrl+t', function () {
        let win = BrowserWindow.getFocusedWindow();
        if (win) {
            win.webContents.openDevTools({ detach: true });
        }
    });
    Menu.setApplicationMenu(null);
    // Emitted when the window is closed.
    // TODO:暂时不用
    mainWindow.on('close', (e) => {
        var result = 1
        result = dialog.showMessageBox(mainWindow, {
            type: 'warning',
            title: 'Gwallet',
            detail: '你确定关闭退出Gwallet吗？',
            buttons: ['Cancel', 'OK'],
        });

        if (result == 0) {
            e.preventDefault();
            e.returnValue = 'false';
            return false;
        }

    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.setResizable(false);
    });
    // 加载自定义的ipc通信
    require('./renderer')

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    app.quit()
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
ipcMain.on('window-size', (event, arg) => {
    // todo
    mainWindow.setSize(widthmax, heightmax);
    mainWindow.setMinimumSize(widthmax, heightmax)
    mainWindow.setResizable(false);
    mainWindow.center()

});
// 监听渲染进程的“quit”事件
ipcMain.on('quit', (evt, arg) => {
    console.log('==116== quit');
    app.quit()
});

// 应用关闭前，结束所有进程
app.on('before-quit', function () {
    //关闭数据库
    walletDB.db.close();
    //钱包tab初始化
    settings.delete('activeSectionButtonId');
    settings.delete('activeSectionId');
    let pids = Array.of(config.get('startWalletPid'), config.get('startGravityPid'));

    if (os.platform() == "win32") {
        let exe_parm = "Taskkill /IM gravity.exe /F"
        exec(exe_parm)
        exe_parm = "Taskkill /IM gwallet.exe /F"
        exec(exe_parm)
    } else {
        pids.forEach(function (pid) {
            let exe_parm = 'kill ' + pid
            exec(exe_parm)
        });
        let exe_key = 'killall gwallet gravity'
        exec(exe_key)
    }

});
