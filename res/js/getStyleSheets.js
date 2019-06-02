"use strict";
const { remote, ipcRenderer } = require('electron');
const { handleForm } = remote.require('./main');
const { lc } = remote.require('./readCssFile');
let flsOb = {"Nm":[]};
let flDta;


// console.log("YOSEMITE!!");
let cssFlNms = document.getElementsByTagName('link');
for(let c of cssFlNms)
{
  c = c.getAttribute('href');
}

//changing to original paths;
let pathSpan = document.getElementById("orig-path-span");
let origPath = pathSpan.getAttribute('orig-path');

//getting all css;
let allCssFiles = document.getElementsByTagName('link');
for(let f of allCssFiles)
{
  let currSrc = f.getAttribute('href');
  if(currSrc.search(/http/) == -1&&!f.hasAttribute('to-change'))
  {
    f.setAttribute('href', origPath+currSrc);
  }
}
let allImgFiles = document.getElementsByTagName('img');
for(let f of allImgFiles)
{
  if(f.hasAttribute('src'))
  {
    let currSrc = f.getAttribute('src');
    if(currSrc.search(/http/) == -1)f.setAttribute('src', origPath+currSrc);
  }
}

//getting all file names
for(let f of allCssFiles)
{
  let currSrc = f.getAttribute('href');
  if(!~currSrc.search(/http/)&!f.hasAttribute('to-change'))
  {
    flsOb.Nm.push(f.href.toString());
  }
}

ipcRenderer.send('item:openFile', flsOb);
//saving all files data
ipcRenderer.on('item:fileBuffer', (event, args)=>{
  flDta=args["flDta"];
});
