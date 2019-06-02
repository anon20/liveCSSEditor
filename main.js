const { app, BrowserWindow, Menu,  ipcMain } = require('electron');
const path = require ('path');
const fs = require('fs');
const os = require('os');
const getFile = require('./readCssFile');
let window;
function createWindow(){
    window = new BrowserWindow({
        width: 1400,
        height: 700,
        show: false,
        allowRunningInsecureContent:true,
        preload: 'res/getStyleSheets.js',
        nodeIntegration:false
    });

    window.loadURL(`file://${__dirname}/res/html/mainWindow.html`);
    window.once('ready-to-show', function (){
        window.show();
    });

    let contents = window.webContents;
    // contents.openDevTools();
    window.on('closed', function() {
        window = null;
    });
}



//uploading the html files with custom scripts
  let fileBuffer='';
exports.handleForm = function(targetWindow, pathName) {


    fileBuffer = fs.readFileSync(pathName, 'utf8');
    let appendScript1 = '<link href="'+__dirname+'/res/css/editorStyle1.css" rel="stylesheet" to-change="no" type="text/css"';
    let regex1 = new RegExp("</head>");
    let index1 = fileBuffer.search(regex1);
    fileBuffer = fileBuffer.substring(0, index1) + appendScript1 + fileBuffer.substring(index1, (fileBuffer.length-1));



    let regex = new RegExp("[a-zA-Z_\.]*\.html$");

    let index = pathName.search(regex);
    let pathStr = pathName.substring(0, index);
    let fileName = pathName.substring(index, pathName.length);
    // console.log(`pathName = ${pathName}`);
    // console.log(`fileName = ${fileName}`);
    // console.log(`pathStr = ${pathStr}`);
    // console.log(`index1 = ${index}`)
    fileBuffer = getFile.correctPaths(pathStr, fileBuffer);
    regex = new RegExp("</body>");

    index = fileBuffer.search(regex);
    // console.log(`index2 = ${index}`)

    let appendScript = '<span id="orig-path-span" orig-path='+pathStr+'></span><script src="'+__dirname+'/res/js/getStyleSheets.js" ></script><script src="'+__dirname+'/res/js/build_edit_box.js" type="text/javascript"></script><script   src="'+__dirname+'/res/js/getTarget.js"></script><script src="'+__dirname+'/res/js/gtElCss.js"></script>';


    fileBuffer = fileBuffer.substring(0, index) + appendScript + fileBuffer.substring(index, (fileBuffer.length-1));


    let newFilePath = '/tmp/'+fileName;
    fs.writeFileSync(newFilePath, fileBuffer);

		window.loadURL(`file://${newFilePath}`);


};

//getting css data for the files
ipcMain.on('item:openFile', (event, item)=>{
  // console.log(`event : ${event}, item : ${item}`);
  // console.log(`item Recieved : ${item}`);
  let toOpn = item["Nm"];
  let rplyOb = {"flDta":[]};

  for(let i of toOpn)
  {
    // console.log(`i : ${i}`);
    rplyOb["flDta"].push(i);
    rplyOb["flDta"].push(fs.readFileSync(i.substring(6, i.length), "utf8"));
  }
  window.webContents.send('item:fileBuffer', rplyOb);

});
ipcMain.on('item:changeFile', (event, item)=>{
  // console.log(`startIndex : ${item[1]}`);
  // console.log(`endIndex : ${item[2]}`);
  console.log(`data : ${item[0]}`);
  // console.log(`at : ${item[3]}`);
  let filBuffer = fs.readFileSync(item[3].substring(7, item[3].length), 'utf8')
  // console.log(filBuffer)
  let p1 = filBuffer.substring(0, item[1])
  let p2 = filBuffer.substring(item[2], filBuffer.length);
  fs.writeFileSync(item[3].substring(7, item[3].length), p1+item[0]+p2)
  // console.log(`p1`)
  // console.log(p1)
  // console.log(`p2`)
  // console.log(p2)
  // fs.writeFileSync(p1+item[0]+p2)
});
app.on('ready', function(){
    createWindow();
});
