const { remote, ipcRenderer } = require('electron');
// const remote = require('electron').remote;
// const ipcRe
const { handleForm } = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const submitFormButton = document.querySelector("#getPath");
const responseParagraph = document.getElementById('itsWorking')
console.log("WORKING!!");
submitFormButton.addEventListener("submit", function(event){
        event.preventDefault();   // stop the form from submitting
        let str = aa.files[0].path;
        handleForm(currentWindow, str);
  
});
