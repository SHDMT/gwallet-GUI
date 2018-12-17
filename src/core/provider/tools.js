const os = require('os');
const fs = require('fs');
const path = require("path");

function getUserLoadDirectory(){
    switch (os.platform()) {
        case "win32":
            if (fs.existsSync(path.join(os.homedir(), "LOCALAPPDATA"))) {
                return path.join(os.homedir(), "LOCALAPPDATA");
            }
            return path.join(os.homedir(), "AppData", "Local");
        case "darwin":
            return path.join(os.homedir(), "Library", "Application Support");
        case "linux":
            return path.join(os.homedir());
        default:
            return path.join(os.homedir(), ".");
    }
}

function getAppDataDirectory() {
    switch (os.platform()) {
        case "win32":
            if (fs.existsSync(path.join(os.homedir(), "LOCALAPPDATA"))) {
                return path.join(os.homedir(), "LOCALAPPDATA", "gwallet");
            }
            return path.join(os.homedir(), "AppData", "Local", "gwallet");
        case "darwin":
            return path.join(os.homedir(), "Library", "Application Support", "gwallet");
        case "linux":
            return path.join(os.homedir(), "gwallet");
        default:
            return path.join(os.homedir(), ".", "gwallet");
    }
}
function copyFile(sourceFile, targetFile){
    fs.readFile(sourceFile, function (err, data) {
        if (err) {
            console.log("readerr:", err)
            return err;
        } else {
            fs.writeFile(targetFile, data, function (error) {
                if (error) {
                    console.log("writeerr:", error)
                    return error;
                } else {
                    return null;
                }
            });
        }
    });
}

let tools = {
    getUserLoadDirectory,
    getAppDataDirectory,
    copyFile
};

exports.Tools = tools;