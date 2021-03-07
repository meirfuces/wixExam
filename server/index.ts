import express from 'express';

const fs = require('fs');
import bodyParser = require('body-parser');
import { tempData } from './temp-data';
import { serverAPIPort, APIPath } from '@fed-exam/config';

console.log('starting server', { serverAPIPort, APIPath });

const app = express();

const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
// fuser -k 3232/tcp
// fuser -k 3000/tcp


app.get(APIPath, (req, res) => {

  // @ts-ignore

  const page: number = req.query.page || 1;


  
  const search: string | null = req.query.search as string || null;
  const DateE :string|null = req.query.DateE as string||null;
  const DateS :string|null = req.query.DateS as string||null;
  const DateSDate:any = DateE? new Date(DateE): "";
  
  let paginatedData =search ? 
  tempData.filter(comp => [comp.content, comp.title].join().includes(search)).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  :tempData.sort((a,b)=>
     b.creationTime-a.creationTime
  ).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  
  if (DateE!=null){
  paginatedData= tempData.filter(comp => (new Date(comp.creationTime)<new Date(DateE)))
  .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  }
  if (DateS!=null){
    paginatedData= tempData.filter(comp => (new Date(comp.creationTime)>new Date(DateS)))
    .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  }
 
  res.status(200).send(paginatedData);
});

app.post(APIPath, (req, res) => {

const index:any|undefined = req.body.index;

// const urlArr = url;
const title = req.body.title;
console.log(title);



	const tickectIndex= tempData?  tempData.findIndex((p:any) => {
    return p.id === index;

      }): -1;
    
      console.log('rename request');
      
      let ticketChange:any = JSON.parse(JSON.stringify(tempData[tickectIndex])) ;
      ticketChange.title = title; 
      const tickets = JSON.parse(JSON.stringify(tempData));
      console.log(title);
      
      tickets[tickectIndex] = ticketChange;
      console.log(tickets[tickectIndex].title);
      
      const toSave = JSON.stringify(tickets);
      // tickets[tickectIndex] = ticketChange;
      
  

  // @ts-ignore
  fs.writeFileSync('data2.json', toSave);

  res.status(200);
});

app.listen(serverAPIPort);
console.log('server running, Meir Exam', serverAPIPort)

