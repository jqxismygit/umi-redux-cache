# umi-redux-cache
支持umi的一个redux缓存工具

## Features

- 📦 **支持umi**
- 🎉 **api非常少，使用非常简单**

## 使用场景

列表页和详情页频繁切换的情况下可以提升性能

## Getting Started

```bash
# Install deps
$ yarn bootstrap

# Start
$ yarn start
```

## 在自己的umi项目里面的配置

```js
// umi的src目录下创建app.(js|ts)


import { middleware, effect } from 'umi-redux-cache'

export const dva = {
    config: {
        onAction: middleware,
        onEffect: effect
    },
};

```

## 使用

```js
import { createCachedAction } from 'umi-redux-cache'
//使用非常简单，调用createCachedAction来创建action就能缓存
//具体参考例子里面的使用方法
createCachedAction(proxyAction, {
    type: 'update',
    payload: []
})

```