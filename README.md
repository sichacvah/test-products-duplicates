Как запустить?

1. `yarn install` или `npm install`
2. Скопировать config.js в рут пакета (спросить у @sergey.kurochkin) или сделать на базе примера
3. `npm run-script run:script` или `yarn run:stript`

Пример config.js файл:  
```js
export default {
  headers: {
    'Accept-Encoding': 'gzip',
    'anonymousid': '',
    'screenname': 'unknown',
    'User-Agent': 'okhttp/4.9.1',
    'api-version': '2.2',
    'backenduseruuid': '',
    'cache-control': 'no-cache',
    'Client-Id': 'SbermarketAndroid',
    'Client-Token': '',
    'Client-Ver': '6.11.0',
    'Connection': 'Keep-Alive',
    'Host': 'api.sbermarket.ru',
  },
  host: 'api.sbermarket.ru',
  path: '/v2/products',
  per_page: 24,
  sid: 12,
  tid: 43500,
  q: 'молоко'
}
```
