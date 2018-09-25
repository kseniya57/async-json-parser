import Parser from './parser';
import stream from 'stream';

export const parse = async (stream) => {
  const parser = new Parser();
  return new Promise((resolve) => {
    stream.on('data', (data) => {
      parser.parse(data.toString()).then(_ => null);
    });
    stream.on('end', () => {
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
