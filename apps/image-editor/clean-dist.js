var fs = require('fs');
var path = require('path');
// 删除目录
function handleDelDir(delList) {
  delList.forEach((item) => {
    var itemStat = fs.statSync(item);
    if (itemStat.isFile()) {
      fs.unlinkSync(item);
    } else if (itemStat.isDirectory()) {
      var files = fs.readdirSync(item);
      if (files.length) {
        var list = files.map((i) => `${item}/${i}`);
        handleDelDir(list);
      }
      fs.rmdirSync(item);
    }
  });
}
handleDelDir(fs.readdirSync(path.join(__dirname, 'dist')));
