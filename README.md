基于和风天气的 api 实现了天气预报查询服务。

主要用到了 pinyin 这个包来完成中文转拼音，然后用 pinyin 去请求和风天气的 api 查询城市 id。

接下来用城市 id 请求天气数据。

和风天气的 api 免费版一天可以调用 1000 次，足够用了。

Nest 里发送 http 请求，我们用的是 @nestjs/axios 包的 HttpModule 来做的。

它可以统一配置，然后注入 HttpService 到用到的地方，并且 httpService 方法的返回值封装成了 rxjs 的 Observerable，可以直接用 rxjs 的操作符。

比如用 fistValueFrom 来把 rxjs 的 Observable 转为 Promise。