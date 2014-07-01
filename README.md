OneAboveAll
===========
  
这是个CHROME插件 :[https://chrome.google.com/webstore/detail/one-above-all/bmclddiflcfmbjpmmnpgnnmadgomkklg?hl=zh-CN](https://chrome.google.com/webstore/detail/one-above-all/bmclddiflcfmbjpmmnpgnnmadgomkklg?hl=zh-CN "charome商店内链接")


设置匹配规则,自动加载指定脚本(样式)到页面中执行.

这样你就可以用自定义脚本来增强页面的一些功能或者屏蔽广告.甚至可以根据自己的特殊癖好来对页面进行调教.




###功能
安装完成后,右键插件图片,点击选项可以打开功能配置页  

![](http://oneaboveall.qiniudn.com/kjeqehahsbf6486drmelxcd079.png)

1. 配置要加载到页面中的脚本或样式.如果打开的网页地址符合配置的规则,则脚本会自动插入到页面中执行.
![](http://oneaboveall.qiniudn.com/eg65jqjc41iz4ys0jybil6tdfg.png)


2. 直接上传脚本或样式文件,一步到位,省去寻找托管服务器的麻烦.

![](http://oneaboveall.qiniudn.com/q8jx5z657ykch0fcku9e4lg88s.png)



###补充说明
1. 插入的自定义脚本执行环境并非页面的context,而是在chrome插件的content脚本环境中执行的,功能和权限比一般的页面脚本强大很多.因此在写自定义脚步的时候,注意以下几点
    
     a. 由于是两个不同的执行环境,这两个环境只有DOM是共用,因此脚本里定义的任何变量并不会与页面中已有的产生冲突.     
     b. 已经默认加入了jquery2.1的支持.  
     c. 可以发起跨域的请求.  
     d. 更多的额外功能支持,请参看chrome插件开发的content脚本文档.  

2. 上传文件每次都会生成一个随机的新名字,并填入到新增的一行配置中,不能覆盖旧的文件,为了防止覆盖他人的文件.

###一些已实现的功能示例

由于自定义脚本的权限极大,存在很大的安全隐患,因此请不要随意加载别人给的脚本地址.这个插件主要还是给使用者对页面
进行DIY用.


1. http://oneaboveall.qiniudn.com/tieba.css 百度贴吧去广告  
2. http://oneaboveall.qiniudn.com/common.js 一些通用的辅助功能合集,加入此脚本,将给打开的页面扩展以下功能:
       
       a.   按s或者shift+s,切换页面中图片的显示隐藏  

       b.   按t或者shift+t,将对选中的文本进行google翻译,并显示在页面右下角

	![](http://oneaboveall.qiniudn.com/qbbdtr2niof7pk8s9x17vwy7gb.png)

3. http://oneaboveall.qiniudn.com/markdown.js 在页面上任意输入框按ctrl+v,则会把剪贴板里的图片上传到服务器,并将图片地址填入输入框.如果是在https://stackedit-beta.herokuapp.com/ 这个markdown编辑器里粘帖,则会自动生成markdown格式的图片引用.
   
![](http://oneaboveall.qiniudn.com/p67krqaxg5ijm9cr4rbxbbxwas.png)
![](http://oneaboveall.qiniudn.com/09rd9hqkbt3ayj69jfhphpu95d.png)

上面3个自定义脚本,在选项卡里的配置如下:
![](http://oneaboveall.qiniudn.com/m1u9y60kg5w2kp54qotmk8mh1t.png)

###自定义脚本开发详解
待续