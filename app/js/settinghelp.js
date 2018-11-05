const spawn = require('child_process');

$(".settinghelp-link-officalweb").on("click", ()=>{
    spawn.execSync('start http://www.dzmy-tech.com/')
});
$(".settinghelp-link-sourceweb").on("click", ()=>{
    spawn.execSync('start https://www.github.com')
});