React & Vue 比较示例
===
## 介绍
本项目试图通过不同角度的具体例子来比较React和Vue在实际开发中的异同。  
- 项目结构：  
后台为Maven构建的Java项目，用以提供模拟的后台接口；  
```/src/main/js/react```为react部分代码  
```/src/main/js/vue```为vue部分的代码
- 两者分别通过各自的构建工具将生成的html以及js文件放入```/src/main/resources/static/```文件夹下，供容器调用
### 1. 项目搭建  
####  React
##### Creat React App  
- 适合创建单页面应用
- 社区维护（虽然最近似乎转为官方维护）
- 简单的接口
- 如若需要更多的功能则需要熟悉复杂的Webpack配置
- 使用步骤：  
  1. 安装NodeJs（建议将Npm源地址换成淘宝镜像以避免出现网络问题）  
  2. 
         