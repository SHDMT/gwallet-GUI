const os=require("os")
const fs=require("fs")
const path=require("path")

/*
    判断进入那个页面
 */
let isNewUser = () =>{
    let appDataDirectory = getAppDataDirectory()
    let newUser;
    //如果文件夹存在
    if (fs.existsSync(appDataDirectory)){
        //老用户
        sessionStorage.setItem('isNewUser', 1);
    }else{
        //新用户
        sessionStorage.setItem('isNewUser', 0);
    }
}

/*
    返回所有的文件所在目录
 */
let getAppDataDirectory = () => {
    switch (os.platform()){
        case "win32":
            if (fs.existsSync(path.join(os.homedir(),"LOCALAPPDATA"))){
                return path.join(os.homedir(),"LOCALAPPDATA","gwallet","data");
            }
            return path.join(os.homedir(), "AppData", "Local", "gwallet","data");
        case "darwin":
            return path.join(os.homedir(), "Library","Application Support","gwallet","data");
        case "linux":
            return path.join(os.homedir(),"gwallet","data");
        default:
            return path.join(os.homedir(),".","gwallet","data");
    }
};

module.exports = {
    isNewUser,
}