"use strict";
let body = document.querySelector('body');
let univLck=false;
let tmeout;
let trgtEl;
function objToDta(obj)
{
  // let allCssData = searchAllFiles(trgtEl);
  if(typeof obj == 'object')
    {
    let theData = '';
    for(let i of obj)
    {
      theData+=i[0];
    }
    // cssBox.createBox(trgtEl, theData);
    return theData;
  }
  else{
    return obj;
  }
}
document.body.addEventListener('mouseover',(event)=>{
    if(!univLck)
    {
      if(!event.target.hasAttribute('get-css'))
      {
        if(event.target.className!='editThis'&&event.target.id)
        {
          trgtEl = event.target;
          let ob = searchAllFiles(trgtEl);
          cssBox.createBox(trgtEl, objToDta(ob), ob);
        }
        else
        {
          trgtEl = event.target;
          let ob = searchAllFiles(trgtEl);
          cssBox.createBox(trgtEl, objToDta(ob), ob);
          
          // cssBox.createBox(trgtEl, objToDta(searchAllFiles(trgtEl)));
        }
      }
    }
  // });
  // trgtEl.onmouseout = ()=>{clearTimeout(tmeout)}

});
