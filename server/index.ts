import express from 'express';

const fs = require('fs');
import bodyParser = require('body-parser');
import { tempData } from './temp-data';
import { serverAPIPort, APIPath } from '../configuration';

console.log('starting server', { serverAPIPort, APIPath });
const cors = require("cors");

const app = express();

const PAGE_SIZE = 20;
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
// fuser -k 3232/tcp
// fuser -k 3000/tcp
app.put(APIPath + '/search', (req, res) => {
  console.log(req.body);
  
  const page: number = req.body.page || 1;
  const word: string | null = req.body.word as string || null;
  const endDate: string | null = req.body.endDate as string || null;
  const startDate: string | null = req.body.startDate as string || null;
  let paginatedData = tempData.sort((a, b) => b.creationTime - a.creationTime);

  if(word)
  paginatedData = paginatedData.filter(comp => [comp.content, comp.title].join().includes(word)).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (endDate != null) {
    paginatedData = paginatedData.filter(comp => (new Date(comp.creationTime) < new Date(endDate)))
      .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  }
  if (startDate != null) {
    paginatedData = paginatedData.filter(comp => (new Date(comp.creationTime) > new Date(startDate)))
      .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  }

  res.status(200).send(paginatedData);
});



app.get(APIPath, (req, res) => {

  // @ts-ignore

  const page: number = req.query.page || 1;
  // const superSearch: string| undefined =  req.query.superSearch as string || undefined;

  const dataPage = tempData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  res.status(200).send(dataPage);
});

app.post(APIPath, (req, res) => {

  const index: string | undefined = req.body.index;
  const title: string = req.body.title;
  
  const tickectIndex: number = tempData ? tempData.findIndex((p: any) => {
    return p.id === index;

  }) : -1;

  if (tickectIndex === -1) return res.status(400).json({ msg: 'key not found' });

  tempData[tickectIndex].title = title;

  fs.writeFileSync('data.json', JSON.stringify(tempData));

  return res.status(200);
});

app.listen(serverAPIPort);
console.log('server running, Meir Exam', serverAPIPort)

