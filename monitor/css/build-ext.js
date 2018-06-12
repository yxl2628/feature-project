const fs = require('fs')
const path = require('path')
const utils = require('./utils')

const packageConfig = require('../package.json')

// 定义需要读取解析的html
const entries = utils.getEntry(['./dist/'+packageConfig.name+'/views/*.html', './dist/'+packageConfig.name+'/html/*.html'])

// 获取要加载的文件
const preloadFiles = getPreloadFiles(entries)
// 将文件写入dis目录
createPreloadFilesJson(preloadFiles)

function createPreloadFilesJson(files) {
  const json = {
    "version": packageConfig.version,
    "files": files
  }
  const fileJson = JSON.stringify(json)
  fs.writeFile(path.resolve(__dirname, '../dist/' + packageConfig.name + '/files.json'),fileJson,function (err) {
    if(err){
      return console.log(err)
    }
    console.log('写入预下载文件列表成功')
  });
}
/**
 * 获取需要预加载的文件列表
 * @param  {[Array]} files
 * @return {[Null]}
 */
function getPreloadFiles(files){
  const preloadFiles = []
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
  const hrefReg = /href=[\'\"]?([^\'\"]*)[\'\"]?/i
  for (file in files) {
    const filePath = path.resolve(__dirname, '../' + files[file])
    const buffer = new Buffer(225)
    // 取出文件内容
    const fileContent = fs.readFileSync(filePath).toString()
    // 取出html中所有的匹配的<link>标签
    const preloadCss = fileContent.match(/\<link\s(.*?)\s*(([^&]>)|(\/\>)|(\<\/link\>))/gi)
    if (preloadCss) {
      for (let i = 0, leni = preloadCss.length; i < leni; i++) {
        const matchCss = preloadCss[i].match(hrefReg)
        // 去掉base.css（需要及时更新）
        if (matchCss[1].indexOf('base.css') >= 0) {
          continue
        }
        preloadFiles.push(matchCss[1].replace('..',''))
      }
    }
    // 取出html中所有匹配的<script>标签
    const preloadJs = fileContent.match(/<script[^>]*>[\s\S]*?<\/[^>]*script>/gi)
    if (preloadJs) {
      for (let j = 0, lenj = preloadJs.length; j < lenj; j++) {
        const matchJs = preloadJs[j].match(srcReg)
        // 去掉config.js（需要及时更新）
        if (matchJs[1].indexOf('config.js') >= 0) {
          continue
        }
        preloadFiles.push(matchJs[1].replace('..',''))
      }
    }
    // 返回preloadFiles
    return preloadFiles
  }
}
