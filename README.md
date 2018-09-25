# Async JSON parser

## parse, stringify

```js
import fs from 'fs';
import { parse, stringify } from 'async-json-parser';
import request from 'request';

const URL = 'http://auction-api-eu.worldofwarcraft.com/auction-data/258993a3c6b974ef3e6f22ea6f822720/auctions.json';

const get = (url) => {
  return new Promise(resolve => {
    request(url, (res, err, body) => {
      resolve(body)
    })
  })
};

(async () => {
  const data = await get(URL);
  const res = await parse(data);
  const str = await stringify(json);
  fs.writeFileSync('data.json', str);
})();
```

## Parser

```js
import Parser from 'async-json-parser/parser'

(async () => {
  const str = JSON.stringify(someObject);
  const parser = new Parser();
  await parser.parse(str);
  console.log(parser.get());
})()
```

