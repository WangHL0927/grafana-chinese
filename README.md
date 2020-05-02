# grafana-chinese

<a name="NPS5Q"></a>
## 简介
自己做的中文版，粗糙且枯燥。<br />邮箱：w958660278@163.com<br />网站：[https://wanghualong.cn](https://wanghualong.cn/)<br />Github：[https://github.com/WangHL0927/grafana-chinese](https://github.com/WangHL0927/grafana-chinese)<br />Q群：921235002<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571331709247-18e8dfac-6398-4ede-a220-c7db9392638e.png#align=left&display=inline&height=411&margin=%5Bobject%20Object%5D&name=image.png&originHeight=411&originWidth=300&size=110904&status=done&style=none&width=300)<br />

<a name="wcU8O"></a>
## 汉化教程
传送门：[https://wanghualong.cn/archives/44/](https://wanghualong.cn/archives/44/)<br />

<a name="OTia3"></a>
## 参与汉化
请移步至源码项目提交PR。<br />传送门：[https://github.com/WangHL0927/grafana](https://github.com/WangHL0927/grafana)<br />

<a name="kZYxw"></a>
## 版本进度

<br />当前Grafana版本：v6.7.3 (a04ef6cefc)

2020-05-02 update ~~当前Grafana版本：v6.4.3 (commit: 3a2bfb7)~~ <br />

<a name="GgDhn"></a>
## 构建方式
```bash
./tool.sh
# 输入 6 回车进行初始化
# 初始化完成后继续。。。

cd grafana
yran run build
```


<a name="F9gVh"></a>
## 使用方式

<br />两种方式任选一个<br />

<a name="GzPJx"></a>
### 3.1 全新部署
使用Dcoker镜像全新部署。<br />本镜像基于官方镜像构建，仅替换前端资源，具体请参考官方文档用法。
```bash
docker run -d -p 3000:3000 --name=grafana-cn w958660278/grafana-cn:latest-dev
```


<a name="0lnVn"></a>
### 3.2 资源替换
直接将汉化版 grafana/public文件夹替换**同版本资源目录**。

Linux路径：`/usr/share/grafana/public`<br />Windows路径：`/public`<br />容器路径：同Linux<br />
<br />**注意事项：**

- 备份！备份！备份！
- 注意版本号一致，不可混用。
- 建议整个文件夹替换，不要骚操作。



<a name="9i9Kr"></a>
## 版本升级


按照官方文档步骤进行升级，保留Grafana数据库即可。<br />

<a name="HQzi5"></a>
## 考古
历史版本请前往旧仓库 [https://github.com/WangHL0927/grafana-chinese-old](https://github.com/WangHL0927/grafana-chinese-old)
