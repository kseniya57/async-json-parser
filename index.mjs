import fs from 'fs'
import Parser from './parser'

const asyncParse = async (stream) => {
  const parser = new Parser()
  return new Promise((resolve) => {
    stream.on('data', (data) => {
      parser.parse(data.toString()).then(_ => console.log('ready'))
    })
    stream.on('end', () => {
      resolve(parser.get())
    })
  })
};

import json from './test.json';

const t = JSON.stringify(json);

(async () => {
  const stream = fs.createReadStream('test.json');
  const res = await asyncParse(stream);
})()
