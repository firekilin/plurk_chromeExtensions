# Plurk Chrome Extenions  

### [抖內](https://p.ecpay.com.tw/8E29ABF)

Setting app consumerKey and consumerSecret

# 1. src/oauth_worker.js
```
    consumerKey: "", // modify for your own APP
    consumerSecret: "" // modify for your own APP
```

# 2. To build the extension, use the command:
```sh
yarn
yarn build
```

# 3. To use the extension
```
chrome extension load /dist
```