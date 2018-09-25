import Parser from './parser';
import stream from 'stream';

export const parse = async (str) => {
  let readable;
  if (typeof str === 'string') {
    readable = new stream.Readable();
    while (str.length) {
      const len = Math.min(300000, str.length)
      readable.push(str.substring(0, len));
      str = str.substring(len)
    }
    readable.push(null);
  } else {
    readable = str; // stream
  }
  const parser = new Parser();
  return new Promise((resolve) => {
    readable.on('data', (data) => {
      parser.parse(data.toString()).then(_ => null);
    });
    readable.on('end', () => {
      resolve(parser.get());
    });
  });
};

export const stringify = (obj) => {
  return new Promise((resolve) => {
    const readable = new stream.Readable({objectMode: true});
    readable.push(obj);
    readable.push(null);
    let str = '';
    readable.on('data', (data) => {
      str += JSON.stringify(data)
    });
    readable.on('end', () => {
      resolve(str);
    })
  })
};
