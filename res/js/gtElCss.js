function searchAllFiles(theEl)
{
  //finding by id of the element
  let cssProps = [];
  if(theEl.id)
  {
    // console.log(`Id Recieved : ${theEl.id}`)
    for(let i in flDta)
    {
      // console.log(`i : ${i}`)
      if(i%2){
        // console.log(`flDta : ${flDta[i]}`)
        cssProps = [...cssProps, ...directID(theEl, flDta[i], theEl.id, flDta[i-1])];}
    }
  }
  else{
    for(let i in flDta)
    {
      if(i%2)
      cssProps = [...cssProps, ...indirectTag(theEl, flDta[i], theEl.tagName.toLowerCase()), flDta[i-1]];
    }
  }
  cssProps = cssProps.length?cssProps:'Could Not Get Data';
  //returning all the css properties from all the files
  return cssProps;
}
function directID(elem, flBfr, elId, flNM)
{
  let fnlRslt = [];
  let allCss = '';
  let srchByID = new RegExp("(\n*|^ |^|\})\#"+elId+"[^-:]*( *|\n*|)\{((.*\n)*?)\}(\n|)", "g");
  while(true)
  {
    let found = srchByID.exec(flBfr);
    if(!found) break;
    // allCss+=found[3];

    let strtInd = flBfr.search(srchByID);
    let endInd = found[0].length+strtInd;
    let regex2 = new RegExp(".*(\n*|)(\{|,)", "g");
    let upperTag = regex2.exec(found[0]);
    fnlRslt.push([found[3], strtInd, endInd, upperTag, flNM]);
  }

  return fnlRslt;

}

function indirectTag(elem, flBfr, tgNm)
{
  //asuming we uploaded css file contents to buffer
  let result = [];
  let srchByTg = new RegExp("(\n*|^ |^|\}).*[^-#,a-zA-z]"+tgNm+"(.*|\n*)\{((.*\n)*?)\}", "g");
  while(true)
  {
    let found = srchByTg.exec(flBfr);
    if(!found)break;
    let qrySlctr = getCssSelector(found[0], tgNm);
    // console.log(`qrySlctr : ${qrySlctr}`)
    if(!qrySlctr)continue;
    if(document.querySelector(qrySlctr) == elem)
    {
      // console.log(`FOUND!!!!!`)
      //getting starting and ending index for the matched pattern
      let strtInd = flBfr.search(srchByTg);
      let endInd = found[0].length+strtInd;

      let regex2 = new RegExp(".*(\n*|)(\{|,)", "g");
      let upperTag = regex2.exec(found[0]);
      // console.log(`upperTag : ${upperTag[0]}`)

      // console.log(`strtInd : ${strtInd}, endInd : ${endInd}`)
      // result+=found[3];
      result.push([found[3], strtInd, endInd, upperTag, flNM]);

    }
    // console.log(`result : ${result}`)
  }
  return result;
  // console.log(`found[0] : ${found[0]}`);
  // console.log(`typeof found : ${typeof found}, found.length : ${found.length}`);
  // for(let i = 1; i< 6; i++)
  //   console.log(`found[${i}] : ${found[i]}`);

}
function getCssSelector(cssStle, tgNme)
{
  // console.log(`getCssSelector`)
  // console.log(cssStle);
  let regex = new RegExp(".*(\n*|)(\{|,)", "g");
  let res = regex.exec(cssStle);
  // console.log(`${res[0]}`);

  // console.log(`querySelector is : `)
  //geting parents of the element
  let fndPar = new RegExp("(,|[^-,:;}]*?)"+tgNme+"( *|\n*)(,|\n*{)", "g");
  let reslt = fndPar.exec(cssStle);
  if (!reslt) return '';
  return reslt[0].split(',')[0].split('{')[0].trim(/ *\n/);
  // for(let x in reslt)
  //   console.log(`reslt[${x}] : ${reslt[x]}`)
  // return res[0].split(':')[0];
}

function getParents(slctrStr)
{
  let regex = new RegExp(".*?( |<)(?!\{)", "g");
  //getting all the parents step by step
  while(true)
  {
    let r = regex.exec(slctrStr);
    // console.log(`parent : ${r}`);
    if(!r) break;
  }
}
// function findViaClass(elem, flBfr, clsNm)
// {
//   let srchByCls = new RegExp(".*[^-#]([.]title(\n| )*\{((.*\n)*?)\})");
//   let found = srchByCls.exec(flBfr);
//
//   console.log(`found[0] : ${found[0]}`);
//   console.log(`typeof found : ${typeof found}, found.length : ${found.length}`);
//   for(let i = 1; i< 6; i++)
//     console.log(`found[${i}] : ${found[i]}`);
// }
// exports.test = function(...args)
// {
  // directId(...args);
  // indirectTag(...args);
  // findViaClass(...args);
// }
