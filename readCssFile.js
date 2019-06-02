const fs = require('fs');

exports.loadCSS = function(files_container)
{
    // fs.open()
    console.log(`Inside loadCSS function`);
    for(let f of files_container)
    console.log("f = "+f);

}

exports.correctPaths = function(filePath, fileData)
{

  let findJsSrc = new RegExp("<script(?!>| >)(.*?)(src=\"(?!https?\:\/\/))", 'g');
  // let fileData = fs.readFileSync(theFile, 'utf8');
  let allMatches = fileData.match(findJsSrc);
  console.log(`Modifying ${allMatches.length} Paths`)
  let prev=0;
  while(true)
  {
    let result = findJsSrc.exec(fileData);
    if(result == null) break;
    fileData = fileData.substr(0, findJsSrc.lastIndex) + filePath + fileData.substr(findJsSrc.lastIndex, fileData.length);
  }
  return fileData;
}
