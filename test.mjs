import fs from 'fs';
import {parse} from './index';
import json from './test.json';

(async () => {
  const stream = fs.createReadStream('test.json');
  const res = await parse(stream);
  console.log(+res['a1'][0].address.geo.lat === -37.3159);
  console.log(res['a457'][2].address.suite === 'Suite 847');
})();
