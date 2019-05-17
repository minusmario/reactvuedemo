vue开发流程 & 单点登录处理
===
## 本地开发流程
- 首次开发
    1. 安装指定版本的nodeJs
    2. 克隆代码
    3. 运行shell跳转至含有```package.json```的前台源码根目录下
    4. 根据项目所用的包管理器运行依赖安装命令```npm install```或者```yarn install```(住：yarn需要额外安装)
    5. 运行```npm start```或者```yarn start/serve```命令启动本地开发环境
    6. 进行开发
    7. 提交代码

- 日常开发
    1. 拉取最新代码，解决冲突
    2. 假如发现```package.json```文件有更新,则运行首次开发第4步的命令同步依赖
    3. 进行首次开发的5-7步

## 单点登录（跨域SSO）
- ### CAS - 此种方案实现跨域SSO需要设立单独的登录服务器
    1. 用户访问```www.a.com```
    2. 由于用户没有携带在a服务器上的cookie，所以a将用户重定向至SSO服务器的地址，例：```www.sso.abc.com/login?from=https%3A%2F%2Fa.com```
    3. SSO服务器判断用户没有登录，返回统一登录页面，用户登录。
    4. 登陆成功后，SSO存储当前用户票据，并且将用户重新重定向至```www.a.com```，例：```www.a.com?token=aaa```
    5. 重定向的http response中包含SSO的cookie。
    6. a向SSO服务器发送请求验证token的有效性，如有效则保存session同时回写cookie，a处登陆流程结束。
    7. 用户访问```www.b.com```
    8. 由于用户没有携带在b服务器上的cookie，所以b将用户重定向到SSO。注意，第5步中已经向浏览器写入了SSO的cookie，所以SSO可以判断用户已经在登录过了。
    9. 和第4步一样，SSO将用户重定向至```www.b.com?token=bbb```
    10. b根据token向SSO服务器发送请求，验证通过后生成b的session，向浏览器写入b的cookie。整个流程完成
    - #### 此处假设a，b均为vue应用，那么啊a，b需要配合的地方有：
        1. ```www.a.com```与```www.b.com```不应直接为vue应用入口，而应为单独的登录接口用以实现逻辑（或者在vue实例初始化之前判断用户有无登录，并控制跳转）。
        2. 在前台路由变化时检测cookie的有效时间，假如失效及时将用户重定向至登录页面。

- ### JWT（Json Web Token）
    1. 与CAS不同的地方为服务器无状态，不需要保存session
    2. 大致原理即每次请求将JWT信息封装于http header中，后台进行验证
    3. 如需实现跨域则需与CAS一样单独设置登录服务器（假如不设置的话则需要iframe之类的trick）
