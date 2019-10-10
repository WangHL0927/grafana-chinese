# Grafana汉化笔记

<a name="df368884"></a>
## 前言
本文主要记录Grafana汉化思路及实施过程，以备后续查阅。<br />若发现文章中描述错误，欢迎在Github中指正。<br />Grafana中文版本，基于官方源码进行汉化。汉化内容主要为前端UI界面文本，不涉及后端内容。

**前排警告**<br />Grafana官方release版本均为前端build后的压缩代码，直接对压缩后的文件编辑汉化虽然能用，但是不利于版本升级维护，且汉化工作量巨大。<br />建议按照标准的前端开发流程，直接汉化官方的前端源码，重新发布，同时可以使用Git跟随官方版本进行更新升级。

---

<a name="JwkbV"></a>
## 一、 开发环境

<a name="m25rn"></a>
### 1.1 Clone官方源码

不太建议直接Fork Grafana官方仓库，因为官方仓库分支很多且杂乱，建议只获取自己需要的分支即可。

<a name="W4iT0"></a>
#### 1.1.1 创建自己的grafana仓库
以Github为例，建立空仓库。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570702761550-8404fe64-0ebf-41b2-8597-474ba7a2907e.png#align=left&display=inline&height=777&name=image.png&originHeight=1554&originWidth=2044&search=&size=314066&status=done&width=1022)

<a name="RWP96"></a>
#### 1.1.2 拉取仓库到本地
使用SourceTree（或其它Git工具）clone仓库到本地。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570703074611-203205f7-61fd-4ab0-a4cb-aedea735ac5a.png#align=left&display=inline&height=330&name=image.png&originHeight=660&originWidth=968&search=&size=339411&status=done&width=484)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704010583-3c74757c-3057-43ed-9af6-a75872ef93c4.png#align=left&display=inline&height=220&name=image.png&originHeight=440&originWidth=1034&search=&size=426221&status=done&width=517)

<a name="g2NnE"></a>
#### 1.1.3 设置官方仓库源

命名为upstream

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704092924-c827c702-4912-4f00-9568-b94e949156d5.png#align=left&display=inline&height=410&name=image.png&originHeight=820&originWidth=2432&search=&size=1152151&status=done&width=1216)


<a name="WTQs7"></a>
#### 1.1.4 Fetch官方仓库内容
点击拉取（fetch），勾选获取并储存所有标签。 使用标签可快速找到已发行分支。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704624353-41d9de9e-3671-422e-90ca-472f52272755.png#align=left&display=inline&height=546&name=image.png&originHeight=1092&originWidth=1992&search=&size=1201109&status=done&width=996)
<a name="rnNMe"></a>
#### 1.1.5 检出官方分支
展开标签栏，向下找到已发行版本标签v6.4.2

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704842643-789a6db7-8166-42e7-a50b-908e2da7e36c.png#align=left&display=inline&height=450&name=image.png&originHeight=900&originWidth=874&search=&size=478238&status=done&width=437)

点击v6.4.2标签可快速定位到标签位置<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704959116-9c5785e2-d02a-462e-9402-b002d523d87e.png#align=left&display=inline&height=794&name=image.png&originHeight=1588&originWidth=2450&search=&size=1653437&status=done&width=1225)

在标签提交位置检出新分支，命名为v6.4.2<br />同时创建汉化工作分支，命名为v6.4.2-cn

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705063452-88c8c260-5f6c-45c4-a0d2-6136864e47b6.png#align=left&display=inline&height=451&name=image.png&originHeight=902&originWidth=1256&search=&size=886567&status=done&width=628)


推送原版分支、汉化分支到私有Grafana仓库（orgin)<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705193232-d520a5d4-2bf8-48c6-9d74-8ca4bfaf4703.png#align=left&display=inline&height=635&name=image.png&originHeight=1270&originWidth=2160&search=&size=1484118&status=done&width=1080)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705296763-2bb37b7e-9d40-4a5e-80a8-00b82e6833fe.png#align=left&display=inline&height=449&name=image.png&originHeight=898&originWidth=1994&search=&size=1056234&status=done&width=997)

**源码准备完成**<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705598186-29a816bc-34c1-4ff2-a261-1f57c0946481.png#align=left&display=inline&height=756&name=image.png&originHeight=1512&originWidth=2154&search=&size=440766&status=done&width=1077)

<a name="ifuYD"></a>
### 1.2 安装环境依赖
使用webstorm打开本地项目，确认为cn分支。<br />打开终端，运行`yarn install` 安装依赖包。<br />请使用yarn安装，**不要使用npm！不要使用npm！不要使用npm！**<br />使用npm install会出问题，亲测！<br />若未安装 yarn 可使用brew快速安装`brew install yarn`<br />**整个安装过程时间较长，需耐心等待。**

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705902805-80d7de8b-8f1a-425e-bd14-bc1b4724c71c.png#align=left&display=inline&height=727&name=image.png&originHeight=1454&originWidth=2520&search=&size=286807&status=done&width=1260)

安装中。。。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570706081361-ca87b895-7034-415d-9162-2f359884eb62.png#align=left&display=inline&height=797&name=image.png&originHeight=1594&originWidth=2520&search=&size=333636&status=done&width=1260)

安装完成！<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570708521811-4bd4b966-b32d-4a62-aeb2-abe67fe60873.png#align=left&display=inline&height=292&name=image.png&originHeight=584&originWidth=1458&search=&size=139937&status=done&width=729)

测试一下`yarn start`<br />编译无误！<br />**![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570708728275-863136d9-a43a-43e7-83e3-11e0ad50e41c.png#align=left&display=inline&height=451&name=image.png&originHeight=902&originWidth=1762&search=&size=289710&status=done&width=881)**<br />**<br />**1.3 搭建Grafana-dev-server**<br />**<br />**。。。。。**
