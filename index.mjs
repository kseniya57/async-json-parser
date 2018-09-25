import Parser from './parser';

export const parse = async (stream) => {
  const parser = new Parser();
  return new Promise((resolve) => {
    stream.on('data', (data) => {
      parser.parse(data.toString()).then(_ => console.log('ready'));
    });
    stream.on('end', () => {
      resolve(parser.get());
    });
  });
};
