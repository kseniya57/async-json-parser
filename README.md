# Async JSON parser

## parse

```js
import { parse } from 'async-json-parser';
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
  
  /* pass data as string */
  
  const data = await get(URL);
  const result = await parse(data);
  
  /* ------------------ */
  
  /* pass data as stream */
  
  await parse(request(URL));
  
  /* ------------------ */
  
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

## parse stream

```js
import fs from 'fs';
import {parse} from 'async-json-parser';
import json from './test.json';

(async () => {
  const stream = fs.createReadStream('test.json');
  const res = await parse(stream);
  console.log(+res['a1'][0].address.geo.lat === -37.3159);
  console.log(res['a457'][2].address.suite === 'Suite 847');
})();
```

## stringify

```js
import fs from 'fs';
import {stringify} from 'async-json-parser';
import json from './test.json';

(async () => {
  const data = await stringify(json);
  fs.writeFileSync('data.json', data);
})();
```

