React & Vue 比较示例
===
## 介绍
本项目试图通过不同角度的具体例子来比较React和Vue在实际开发中的异同。  
- 项目结构：  
后台为Maven构建的Java项目，用以提供模拟的后台接口；  
```/src/main/js/react```为react部分代码  
```/src/main/js/vue```为vue部分的代码
- 两者分别通过各自的构建工具将生成的html以及js文件放入```/src/main/resources/static/```文件夹下，供容器调用
###  React 
####  1. 项目搭建
##### creat-react-app  
- 适合创建单页面应用（如需创建服务端渲染的项目请使用Next.js）
- 社区维护（虽然最近似乎转为官方维护）
- 简单的接口
- 如若需要更多的功能则需要熟悉复杂的Webpack配置
- 使用步骤（首次运行）：  
  1. 安装NodeJs LTS版本（建议将Npm源地址换成淘宝镜像以避免出现网络问题）  
  2. 安装
  3. 在工作目录运行```npx create-react-app 项目文件夹名（本例为reactdemo）```
  4. 转至项目，运行```yarn start```，在浏览器打开[localhost:3000](localhost:3000)
- 使用步骤（新环境部署）：
  1. 在项目目录运行```yarn install```
  2. 转至项目，运行```yarn start```，在浏览器打开[localhost:3000](localhost:3000)

##### 可用功能
- yarn start  
  将脚本装入内存并利用node在本地启动开发环境，配有websocket长连接用以监控源文件的变化并在浏览器提供实时刷新
- yarn run build  
  将源码打包为可供html直接引用的js脚本并输出到指定路径
- yarn run eject  
  将底层webpack的配置暴露出来，使得用户可以全面控制整个项目。（单向操作，无法回退）
  
##### 总结
  用简单的api封装了复杂的流程，在之前的版本中，如若需要http代理，代码优化等功能，需要将项目eject并更改相应的webpack配置，且webpack相关的中文文档质量普遍不高，故较为费时。新版本中，将一些常用配置暴露在了package.json中，简化了项目配置难度。

#### 2. 开发示例
- JSX  
  JSX是一个JS的语法扩展，用类似html的标记语法对DOM进行抽象，转译完成之后本质上是一个JS对象，但是更易阅读。打开```./src/App.js```, ```render```方法中返回的内容即为一段JSX