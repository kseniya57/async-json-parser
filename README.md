# Async JSON parser

```js
import fs from 'fs';
import {parse} from 'async-json-parser';

(async () => {
  const stream = fs.createReadStream('test.json');
  const res = await parse(stream);
  console.log(+res['a1'][0].address.geo.lat === -37.3159);
  console.log(res['a457'][2].address.suite === 'Suite 847');
})();
```

```js
import Parser from 'async-json-parser/parser'

(async () => {
  const str = JSON.stringify(someObject);
  const parser = new Parser();
  await parser.parse(str);
  console.log(parser.get());
})()
```

