# lyy

> lyy app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
9.16号 10点


实现点击加载更多
1，为按钮绑定点击事件，请求下一页数据
2，点击按钮，让pageIndex++，然后重新调用this.getComments()
3,为了防止新数据覆盖老数据的情况，我们使用this.com = this.com.concat(res.data.msg)拼接

实现发表评论
1，为发表评论框数据绑定(v-model   data里面定义一个msg)
2，为发表评论按钮绑定事件
3，校验评论内容是否为空，给提示
4，校验通过，提交数据$axios，显示在页面(刷新页面),
    如果调用this.getCommonts,从新渲染评论列表，可能只能得到最后一页评论（点击了加载更多）
    换一个思路，我们新添加的数据现由前台追加到评论数组最前面（unshift），追加完成后，再更新到后台


