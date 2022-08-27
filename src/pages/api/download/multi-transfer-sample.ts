import * as fs from 'fs';

const handler = async (req: any, res: any): Promise<any> => {
  const stream = fs.createReadStream(
    'src/assets/files/multi-transfer-sample.csv'
  );
  res.setHeader(
    'Content-disposition',
    'attachment; filename=' + 'multi-transfer-sample.csv'
  );
  res.setHeader('Content-type', 'text/csv');
  stream.pipe(res);
};

export default handler;
