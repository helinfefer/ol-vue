# ol-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/)

---

在点击数据时进行数据展示界面的跳转
    给需要点击的地方绑定一个事件，然后在该事件的处理函数中使用axios 或fetch 向服务器发送请求

    然后，在你的组件中添加一个方法来处理请求，这个方法应该在checkbox被选中时调用