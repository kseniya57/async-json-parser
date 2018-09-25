import fs from 'fs';
import json from './test.json'
import {parse, stringify} from './index';

(async () => {
  const res = await parse(JSON.stringify(json));
  console.log(+res['a1'][0].address.geo.lat === -37.3159);
  console.log(res['a457'][2].address.suite === 'Suite 847');
  const data = await stringify(res);
  fs.writeFileSync('data.json', data)
})();
