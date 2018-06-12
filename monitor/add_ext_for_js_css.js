/**
 * 该文件是用来给html中的js和css加version来控制浏览器缓存刷新的
 * 命令：node add_ext_for_js_css.js
 * 结果：会将<script src="./js/jquery.min.js" charset="utf-8"></script>
 *      改为<script src="./js/jquery.min.js?version=1527655294538" charset="utf-8"></script>
 */
var fs = require('fs')
var path = require('path')

// 获取需要解析的html
var entries = findHtmlList(__dirname)

// 修改html中的js和css
entries.forEach(function(file){
  changeJsAndCssInHmtl(file)
})

/**
 * 获取html路径
 * @param  {[Array]} path filepath array
 * @return {[Array]}
 */
function findHtmlList (path) {
  var entries = [],
  fileArray = fs.readdirSync(path)
  fileArray.forEach(function(file){
    if(file.indexOf('.html') >= 0){
      entries.push(path + '/' + file)
    }
  })
  return entries
}

/**
 * 修改html中的js和css
 * @param  {[String]} file html文件路径
 * @return {[Null]}
 */
function changeJsAndCssInHmtl (filePath) {
  var scriptReg = /\.js\?*(\w)*=*(\w)*/ig,
  linkReg = /\.css\?*(\w)*=*(\w)*/ig,
  now = new Date().getTime()
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      console.log('read file 【' + path + '】error')
    } else {
      const content = data.replace(scriptReg, '.js?version=' + now).replace(linkReg, '.css?version=' + now)
      fs.writeFile(filePath, content, function(err) {
        if (err) {
          console.log('write file 【' + path + '】 error')
        }
        console.log('【'+path+'】add version (' + now + ') success')
      })
    }
  })
}
