# bgmi-archive-frontend

[![Build Status](https://travis-ci.org/codysk/BGmi-archive-frontend.svg?branch=master)](https://travis-ci.org/codysk/BGmi-archive-frontend)

使用[vue.js](https://vuejs.org)写的一套 Nginx autoindex 的UI

用于改善追番神器[BGmi](https://github.com/BGmi/BGmi)的Bangumi Files页面的使用体验

集成[DPlayer](http://dplayer.js.org)可播放常见视频文件
集成Phuslu的[一行配置美化Nginx autoindex](https://github.com/phuslu/phuslu.github.io/blob/master/autoindex.html)主题

## 使用效果

从BGmi侧栏的Bangumi File进入:

![alt][imageFileBrowserMain]

![alt][imageFileBrowserBangumi]

![alt][imagePlayer]

从BGmi番剧集数列表旁的链接进入:

![alt][autoindex]

## 安装

1. 下载 [release](https://github.com/codysk/BGmi-archive-frontend/releases) 中的 `BGmi-archive-frontend.tgz`

2. 解压, 并将解压出的`.core`目录放入BGMI的 `$BGMI_SAVE_PATH` 下

3. 修改Nginx 在 `location /bangumi` 项中加入 `add_after_body /bangumi/.core/autoindex.html;` 
	
	以官方配置为例:
```
location /bangumi {
    alias /bgmi/bangumi;
    add_after_body /bangumi/.core/autoindex.html;
}
```
4. Enjoy it.


[imageFileBrowserMain]:http://wx2.sinaimg.cn/mw690/712bbf3ely1g264cnzjpoj21bg0lob29.jpg
[imageFileBrowserBangumi]:http://wx2.sinaimg.cn/mw690/712bbf3ely1g264cic2wuj21b70m0tat.jpg
[imagePlayer]:http://wx3.sinaimg.cn/mw690/712bbf3ely1g264crq0ezj21az0ns7sv.jpg
[autoindex]:http://wx2.sinaimg.cn/mw690/712bbf3ely1g264cwkf2aj20tb0dt74s.jpg