"use strict";
function lockTble(btn)
{
  btn.innerHTML=univLck?"LOCK":"UNLOCK";
  univLck=univLck?false:true;
}
function makeEditable(theEl)
{
  theEl.parentElement.parentElement.children[1].setAttribute('contenteditable', 'true');
}
function generateTable(attrObj)
{
  for(let i of attrObj)
  {
    let cssProperties = i[0].split(';');
    let table = '<button onclick="lockTble(this)" get-css="false">LOCK</button><table get-css="false" id="cssPropTble"><tr get-css="false"><th get-css="false" >Name</th><th get-css="false" >Value</th></tr>';
    if(cssProperties!='Could Not Get Data')
    {
      for(let u of cssProperties)
      {
        if(u.split(':')[1])
        table+='<tr get-css="false" endIndx=\"'+i[2]+'\" strtIndx=\"'+i[1]+'\" uprTg=\"'+i[3][0]+'\" flNM=\"'+i[4]+'\" is-cntnt="true"><th is-cntnt="true" get-css="false">'+u.split(':')[0]+'</th>'+'<td is-cntnt="true" get-css="false">'+u.split(':')[1]+'</td></tr>';
      }

      return table+'</table><div id="edt_nd_sve" get-css="false"><button get-css="false" get-css="false" onclick="makeEditable(this)" id="editTheProps">EDIT</button><button id="saveTheProps" get-css="false" onclick="getRawCss(this, \'a\')">SAVE</button></div>';
    }
    return 'NO CSS DATA'
  }
}

//check if elem1 is child of elem2
function isChild(elem1, elem2)
{
  let prNd = elem1.parentElement;
  while(prNd!=null)
  {
    if(prNd == elem2)
      return true;
    prNd = prNd.parentElement;
  }
  return false;
}

let cssBox =
{
  content : '',
  domHolder : null,
  pointingTo : null,
  createBox : function(onElement, newContent, obj)
  {
    if(!this.pointingTo)
    {
      this.domHolder = document.createElement('div');
      this.domHolder.id = onElement.id;
      this.domHolder.setAttribute('get-css', 'false');
      cssBox.pointingTo=onElement;
      this.domHolder.className = "editThis";
      // if(isChild(onElement, ))
      onElement.parentElement.appendChild(this.domHolder);
      this.content = newContent;

      // this.domHolder.innerHTML = beautifyContent(newContent);
      // this.domHolder.innerHTML = setEdtAttr(obj);
      this.domHolder.innerHTML = generateTable(obj);


      // alert('created')
    }
    else{
      this.pointingTo = onElement;
      if(this.domHolder)
      onElement.parentElement.appendChild(this.domHolder);
      this.domHolder.innerHTML = generateTable(obj);

      this.domHolder.setAttribute('get-css', 'false');
      this.content = newContent;
    }
    this.domHolder.style.top = this.pointingTo.offsetTop+"px";
    this.domHolder.style.left = this.pointingTo.offsetLeft+this.pointingTo.offsetWidth-this.domHolder.offsetWidth+"px";
},
  save: function()
  {

  },
}
function getChild(chld, par)
{

}
let checker ;
function getRawCss(tblEl, hdTg)

{
  // let hdTg='a';
  let chngr = [];

  let rawData = '';
  let thtbl = document.getElementById('cssPropTble');
  let tblrws = thtbl.firstElementChild.children;
  // console.log(`tblrws : ${tblrws}`)
  let s,e, fn;
  let tme = 1;
  for(let r of tblrws)
  {
    // rawData = '';
    // console.log(`r : ${r.hasAttribute('is-cntnt')}, ${r.tagName}`)
    let prvStrtInd='', prvEndInd='', prvTg='';
    if(r.hasAttribute('is-cntnt'))
    {
      let prvStrtInd1 = r.getAttribute('strtIndx'), prvEndInd1 = r.getAttribute('endIndx');
      let prvTg1 = r.getAttribute('uprTg');
      fn=r.getAttribute('flNM')
      //checking for the first time
      if(tme)
      {
        prvStrtInd = r.getAttribute('strtIndx'), prvEndInd = r.getAttribute('endIndx'), prvTg = r.getAttribute('uprTg');
        rawData+=prvTg;
        rawData+=r.children[0].innerHTML+':'+r.children[1].innerHTML+';';

        // console.log(`${rawData}`);
        tme=0;
      }
      else{
        prvStrtInd = r.getAttribute('strtIndx'), prvEndInd = r.getAttribute('endIndx'), prvTg = r.getAttribute('uprTg');
        s=prvStrtInd, e=prvEndInd;
        if(prvStrtInd==prvStrtInd1)
        rawData+=r.children[0].innerHTML+':'+r.children[1].innerHTML+';';
        else{
          rawData+='\n}\n';
          rawData = prvTg;
        }

      }

    }
  }
  console.log(`rawData : ${rawData} at : ${fn}`);

  ipcRenderer.send('item:changeFile', [rawData+'\n}\n', s, e, fn]);
  checker = chngr;
  // console.log(`${rawData}`)

}
