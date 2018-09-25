import Parser from './parser';
import stream from 'stream';

export const parse = async (str) => {
  const s = new stream.Readable();
  s.push(str);
  s.push(null);
  const parser = new Parser();
  return new Promise((resolve) => {
    s.on('data', (data) => {
      parser.parse(data.toString()).then(_ => null);
    });
    s.on('end', () => {
      resolve(parser.get());
    });
  });
};

export const stringify = (obj) => {
  return new Promise((resolve) => {
    const s = new stream.Readable({objectMode: true});
    s.push(obj);
    s.push(null);
    let str = '';
    s.on('data', (data) => {
      str += JSON.stringify(data)
    });
    s.on('end', () => {
      resolve(str);
    })
  })
};
