# Grafana汉化笔记

<a name="df368884"></a>
## 前言
本文主要记录Grafana汉化思路及实施过程。<br />若发现文章中描述错误，欢迎在Github中指正。<br />Grafana中文版本，基于官方源码进行汉化。汉化内容主要为前端UI界面文本，不涉及后端内容。<br />
<br />相关建议欢迎留言：<br />Github: [https://github.com/WangHL0927/grafana-chinese](https://github.com/WangHL0927/grafana-chinese)<br />Email: w958660278@163.com<br />钉钉群: 32637212<br />网站：[https://wanghualong.cn](https://wanghualong.cn)<br />![IMG_0675.jpeg](https://cdn.nlark.com/yuque/0/2020/jpeg/225645/1596177489771-c9bc1635-3cf3-487b-84c3-9f272a4ef4c9.jpeg#align=left&display=inline&height=387&margin=%5Bobject%20Object%5D&name=IMG_0675.jpeg&originHeight=387&originWidth=300&size=44417&status=done&style=none&width=300)<br />
<br />**前排警告**<br />Grafana官方release版本均为前端build后的压缩代码，直接对压缩后的文件编辑汉化虽然能用，但是不利于版本升级维护，且工作量巨大。<br />建议按照标准的前端开发流程，直接汉化官方的前端源码，重新发布，同时可以使用Git跟随官方版本进行更新升级。
<a name="JwkbV"></a>
## 一、 开发环境


<a name="m25rn"></a>
### 1.1 跟随grafana-chinese
此部分为跟随 grafana-chinese 项目流程开发，如有流程优化建议，欢迎在GitHub或邮箱留言。<br />
<br />此部分<br />

<a name="SIfDa"></a>
#### 1.1.1 获取git仓库

<br />拉取仓库
```bash
git clone https://github.com/WangHL0927/grafana-chinese
cd grafana-chinese
```

<br />

<a name="tqCZx"></a>
### 1.2 从官方源码创建

<br />**此部分为 grafana-chinese项目构建流程，若选择跟随 grafana-chinese 项目可略过这部分内容。**<br />
<br />不太建议直接Fork Grafana官方仓库，因为官方仓库分支很多且杂乱，建议只获取自己需要的分支即可。<br />以下内容介绍完整实施流程，也欢迎直接fork仓库 [https://github.com/WangHL0927/grafana.git](https://github.com/WangHL0927/grafana.git) 参与源码贡献。<br />

<a name="W4iT0"></a>
#### 1.2.1 创建自己的grafana仓库
以Github为例，建立空仓库。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570702761550-8404fe64-0ebf-41b2-8597-474ba7a2907e.png#align=left&display=inline&height=777&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1554&originWidth=2044&size=314066&status=done&style=none&width=1022)<br />

<a name="RWP96"></a>
#### 1.2.2 拉取仓库到本地
使用SourceTree（或其它Git工具）clone仓库到本地。<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570703074611-203205f7-61fd-4ab0-a4cb-aedea735ac5a.png#align=left&display=inline&height=330&margin=%5Bobject%20Object%5D&name=image.png&originHeight=660&originWidth=968&size=339411&status=done&style=none&width=484)<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704010583-3c74757c-3057-43ed-9af6-a75872ef93c4.png#align=left&display=inline&height=220&margin=%5Bobject%20Object%5D&name=image.png&originHeight=440&originWidth=1034&size=426221&status=done&style=none&width=517)<br />

<a name="g2NnE"></a>
#### 1.2.3 设置官方仓库源


命名为upstream<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704092924-c827c702-4912-4f00-9568-b94e949156d5.png#align=left&display=inline&height=410&margin=%5Bobject%20Object%5D&name=image.png&originHeight=820&originWidth=2432&size=1152151&status=done&style=none&width=1216)<br />
<br />

<a name="WTQs7"></a>
#### 1.2.4 Fetch官方仓库内容
点击拉取（fetch），勾选获取并储存所有标签。 使用标签可快速找到已发行分支。<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704624353-41d9de9e-3671-422e-90ca-472f52272755.png#align=left&display=inline&height=546&name=image.png&originHeight=1092&originWidth=1992&size=1201109&status=done&width=996)
<a name="rnNMe"></a>
#### 1.2.5 检出官方分支
展开标签栏，向下找到已发行版本标签v6.4.2

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704842643-789a6db7-8166-42e7-a50b-908e2da7e36c.png#align=left&display=inline&height=450&name=image.png&originHeight=900&originWidth=874&size=478238&status=done&width=437)<br />
<br />点击v6.4.2标签可快速定位到标签位置<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570704959116-9c5785e2-d02a-462e-9402-b002d523d87e.png#align=left&display=inline&height=794&name=image.png&originHeight=1588&originWidth=2450&size=1653437&status=done&width=1225)

在标签提交位置检出新分支，命名为v6.4.2<br />同时创建汉化工作分支，命名为v6.4.2-cn<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705063452-88c8c260-5f6c-45c4-a0d2-6136864e47b6.png#align=left&display=inline&height=451&name=image.png&originHeight=902&originWidth=1256&size=886567&status=done&width=628)<br />
<br />
<br />推送原版分支、汉化分支到私有Grafana仓库（orgin)<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705193232-d520a5d4-2bf8-48c6-9d74-8ca4bfaf4703.png#align=left&display=inline&height=635&name=image.png&originHeight=1270&originWidth=2160&size=1484118&status=done&width=1080)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705296763-2bb37b7e-9d40-4a5e-80a8-00b82e6833fe.png#align=left&display=inline&height=449&name=image.png&originHeight=898&originWidth=1994&size=1056234&status=done&width=997)

**源码准备完成**<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705598186-29a816bc-34c1-4ff2-a261-1f57c0946481.png#align=left&display=inline&height=756&name=image.png&originHeight=1512&originWidth=2154&size=440766&status=done&width=1077)<br />

<a name="0UncV"></a>
#### 1.2.6 安装环境依赖
使用webstorm打开本地项目，确认为cn分支。<br />打开终端，运行`yarn install` 安装依赖包。<br />请使用yarn安装，**不要使用npm！不要使用npm！不要使用npm！**<br />使用npm install会出问题，亲测！<br />若未安装 yarn 可使用brew快速安装`brew install yarn`

**整个安装过程时间较长，需耐心等待。**

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570705902805-80d7de8b-8f1a-425e-bd14-bc1b4724c71c.png#align=left&display=inline&height=727&name=image.png&originHeight=1454&originWidth=2520&size=286807&status=done&width=1260)<br />
<br />安装中。。。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570706081361-ca87b895-7034-415d-9162-2f359884eb62.png#align=left&display=inline&height=797&name=image.png&originHeight=1594&originWidth=2520&size=333636&status=done&width=1260)<br />
<br />安装完成！<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570708521811-4bd4b966-b32d-4a62-aeb2-abe67fe60873.png#align=left&display=inline&height=292&name=image.png&originHeight=584&originWidth=1458&size=139937&status=done&width=729)<br />
<br />测试一下，运行`yarn start`<br />编译无误！<br />**![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1570708728275-863136d9-a43a-43e7-83e3-11e0ad50e41c.png#align=left&display=inline&height=451&name=image.png&originHeight=902&originWidth=1762&size=289710&status=done&width=881)**<br />**
<a name="yCV6E"></a>
### 
<a name="fc7xu"></a>
### 1.3 安装环境依赖
<br />
<a name="CK770"></a>
#### 1.3.1 运行安装脚本


**需提前预装 Git、yarn。**<br />

```bash
cd grafana-chinese
./tool.sh

# 输入 5 回车运行
```

<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571323285767-5b7022fb-ea6b-40e8-ab13-efa2d477d3cd.png#align=left&display=inline&height=317&name=image.png&originHeight=634&originWidth=1184&size=76445&status=done&width=592)<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571159147143-133cf893-92b4-400f-a2a4-cdc602d075c8.png#align=left&display=inline&height=277&name=image.png&originHeight=554&originWidth=1300&size=94553&status=done&width=650)

<a name="lIzVy"></a>
#### 1.3.1 测试grafana仓库


使用webstorm打开当前目录的grafana文件夹，使用终端运行`yarn start`<br />
<br />编译无误！<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571159476925-ea11cee6-83c2-435c-9324-814a6fc91e8b.png#align=left&display=inline&height=358&name=image.png&originHeight=716&originWidth=1306&size=193782&status=done&width=653)

<a name="fRZ92"></a>
### 
<a name="xHWZO"></a>
### 1.4 搭建Grafana-dev-server

<br />回到grafana-chinese项目，运行工具脚本`tool.sh`<br />

```bash
cd grafana-chinese
./tool.sh
# 输入 5 回车运行

```

<br />输出：
```bash
------------------------------
Tool Script
------------------------------
1. Start dev-server.
2. Stop/Remove dev-server.
3. Release to DockerHub with dev tag.
4. Release to DockerHub with latest tag.
5. Init dev project.
------------------------------
Input number and press ENTER:

```

<br />

- 输入1 回车，创建并启动dev-server容器（需安装Docker）
- 输入2 回车，停止并移除dev-server容器（需安装Docker）


<br />启动无误后访问测试： http://localhost:3000<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571160989109-a4373563-45e4-42c3-aba9-bdf6c4f79606.png#align=left&display=inline&height=533&name=image.png&originHeight=1676&originWidth=2244&size=234018&status=done&width=713)<br />

<a name="2EYXB"></a>
## 二、汉化Grafana


<a name="0LfP4"></a>
### 2.1 前排预警


<a name="R1fls"></a>
#### 2.1.1 前端内存溢出

<br />参考文章：[https://wanghualong.cn/archives/77/](https://wanghualong.cn/archives/77/)<br />
<br />仅对webpack-dev-server 进行扩充即可，**建议6000+。**<br />

<a name="MIv6y"></a>
#### 2.1.2 webpack-dev-server 热更新缓慢

<br />测试机型：MBP-2018 i7 16G<br />启动命令：`yarn start:hot`  `start:ignoreTheme`

- 基本处于瘫痪状态，每次commad+s 与重新编译无异，原因未知。

临时解决方案:  放弃热更新，使用`yarn start`启动，仅监控编译错误，手动刷新浏览器查看效果。<br />

<a name="IpJ1j"></a>
#### 2.1.3 Server-error

<br />原因未知。按照字面建议，使用脚本重新创建dev-server即可解决。<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571325656951-fbdb69a8-9acd-47cd-be2b-ab4b58fec63a.png#align=left&display=inline&height=582&name=image.png&originHeight=1164&originWidth=1714&size=185945&status=done&width=857)<br />
<br />

<a name="E69RK"></a>
### 2.2 汉化界面

<br />运行tool.sh 工具启动测试服务器。<br />

```bash
------------------------------
Tool Script
------------------------------
1. Start dev-server.
2. Stop/Remove dev-server.
3. Release to DockerHub with dev tag.
4. Release to DockerHub with latest tag.
5. Init dev project.
------------------------------
Input number and press ENTER:
1
------------------------------
Start grafana-dev-server...
run container grafana-dev-server
5a8bc85c2e8e225da180b2ea4d2a08a73a5a8ebea821c9135fc02508a2fdcb63
grafana-dev-server runing at http://localhost:3000
```

<br />webstorm打开grafana项目，终端运行`yarn start`<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571325782509-73d74bef-c6e4-464f-b15d-dfbcb5095439.png#align=left&display=inline&height=510&name=image.png&originHeight=1020&originWidth=1544&size=253288&status=done&width=772)<br />
<br />
<br />以登陆页面为例，编辑`public/app/core/components/Login/LoginForm.tsx` 文件，保存触发重新编译。<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571325821538-89b87e80-61b6-4bd2-b1d9-ab5abce15c60.png#align=left&display=inline&height=604&name=image.png&originHeight=1208&originWidth=2024&size=417903&status=done&width=1012)<br />
<br />浏览器刷新查看效果（[http://localhost:3000/login](http://localhost:3000/login)）<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571325877949-dc864a38-949e-487a-984d-cd8cf72b12bc.png#align=left&display=inline&height=582&name=image.png&originHeight=1164&originWidth=1714&size=214212&status=done&width=857)<br />
<br />

<a name="kZEfj"></a>
## 三、发行汉化


<a name="eFeg9"></a>
### 3.1 Build

- 停止dev-server及`yarn start`
- grafana项目下运行`yarn build`

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571326393769-1b3596f6-a042-4e51-b831-92d93377170d.png#align=left&display=inline&height=364&name=image.png&originHeight=728&originWidth=1800&size=138787&status=done&width=900)<br />
<br />

<a name="w49gE"></a>
### 3.2 发布至Docker Hub


```bash
cd grafana-chinese
./tool.sh
# 输入 3 回车运行
# 需提前登陆docker账户
```

<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571329284848-0fd7ead9-c721-484a-b59a-59c603b40929.png#align=left&display=inline&height=443&name=image.png&originHeight=886&originWidth=1204&size=117968&status=done&width=602)<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571329459153-086a0ef8-75dd-462d-bc50-30905f4fc1f7.png#align=left&display=inline&height=426&name=image.png&originHeight=852&originWidth=1676&size=201097&status=done&width=838)<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571329527937-7ea37006-956a-4670-ab20-2aa7e3b5430f.png#align=left&display=inline&height=431&name=image.png&originHeight=862&originWidth=2374&size=157350&status=done&width=1187)<br />
<br />

<a name="ecWRM"></a>
### 3.3 资源替换

<br />直接将grafana/public文件夹替换线上生产版本。<br />Linux路径：`/usr/share/grafana/public`<br />Windows路径：`/public`

**注意事项：**

- 备份！备份！备份！
- 注意版本号一致，不可混用
- 建议整个文件夹替换，不要骚操作。



