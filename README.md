# grafana-chinese

<a name="NPS5Q"></a>
## 简介
自己做的中文版，粗糙且枯燥。<br />邮箱：w958660278@163.com<br />Q群：921235002

![image.png](https://cdn.nlark.com/yuque/0/2019/png/225645/1571331709247-18e8dfac-6398-4ede-a220-c7db9392638e.png#align=left&display=inline&height=411&name=image.png&originHeight=411&originWidth=300&search=&size=110904&status=done&width=300)

<a name="kZYxw"></a>
## 版本进度

当前Grafana版本：v6.4.3 (commit: 3a2bfb7)

<details><br /><summary>当前版本进度概览</summary>

- [ ] app/
- [x] core/
- [ ] features/
- [x] admin/
- [ ] alerting/
- [ ] annotations/
- [ ] api-keys/
- [ ] dashboard/
- [ ] datasources/
- [ ] explore/
- [ ] folders/
- [ ] manage-dashboards/
- [ ] org/
- [ ] panel/
- [ ] playlist/
- [ ] plugins/
- [ ] profile/
- [ ] teams/
- [ ] templating/
- [ ] users/
- [ ] partials/
- [ ] plugins/
- [ ] datasource/
- [ ] cloudwatch/
- [ ] dashboard/
- [ ] elasticsearch/
- [ ] grafana/
- [ ] grafana-azure-monitor-datasource/
- [ ] graphite/
- [ ] influxdb/
- [ ] input/
- [ ] loki/
- [ ] mixed/
- [ ] mssql/
- [ ] mysql/
- [ ] opentsdb/
- [ ] postgres/
- [ ] prometheus/
- [ ] stackdriver/
- [ ] testdata/
- [ ] panel/
- [ ] alertlist/
- [ ] annolist/
- [ ] bargauge/
- [ ] dashlist/
- [ ] gauge/
- [ ] gettingstarted/
- [ ] graph/
- [ ] graph2/
- [ ] heatmap/
- [ ] logs/
- [ ] piechart/
- [ ] pluginlist/
- [ ] singlestat/
- [ ] singlestat2/
- [ ] table/
- [ ] table2/
- [ ] text/
- [ ] text2/
- [ ] types/
- [ ] emails/

</details>

<a name="GgDhn"></a>
## 构建方式

```bash
./tool.sh
# 输入 5 回车进行初始化
# 初始化完成后继续。。。

cd grafana
npm run build
```

<a name="F9gVh"></a>
## 使用方式

<a name="GzPJx"></a>
### 3.1 Docker
本镜像基于官方镜像构建，仅替换前端资源，具体请参考官方文档用法。<br />Demo：
```bash
docker run -d -p 3000:3000 --name=grafana-cn w958660278/grafana-cn:latest
```

<a name="0lnVn"></a>
### 3.2 资源替换
直接将grafana/public文件夹替换线上生产版本。

Linux路径：`/usr/share/grafana/public`<br />Windows路径：`/public`

**注意事项：**

- 备份！备份！备份！
- 注意版本号一致，不可混用。
- 建议整个文件夹替换，不要骚操作。

<a name="0pk76"></a>
## 汉化教程

传送门：[https://wanghualong.cn/archives/44/](https://wanghualong.cn/archives/44/)

<a name="wcU8O"></a>
## 参与汉化
请移步至源码项目提交PR。<br />传送门：[https://github.com/WangHL0927/grafana](https://github.com/WangHL0927/grafana)

<a name="HQzi5"></a>
## 考古

历史版本请前往旧仓库 [https://github.com/WangHL0927/grafana-chinese-old](https://github.com/WangHL0927/grafana-chinese-old)
