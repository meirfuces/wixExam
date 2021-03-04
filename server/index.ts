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


  console.log("page num"+ page);
  
  const search: string | null = req.query.search as string || null;
  const DateE :string|null = req.query.DateE as string||null;
  const DateSDate:any = DateE? new Date(DateE): "";
  console.log(search);
  
  let paginatedData =search ? 
  tempData.filter(comp => [comp.content, comp.title].join().includes(search)).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  :tempData.sort((a,b)=>
     b.creationTime-a.creationTime
  ).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  
  if (DateE!=null){
  // tempData.forEach(i=>{
  //   console.log(new Date(i.creationTime));
  // })
  console.log(DateE);
  
  
  paginatedData= tempData.filter(comp => (new Date(comp.creationTime)<new Date(DateSDate)))
  
  }
  res.status(200).send(paginatedData);
});

app.post(APIPath, (req, res) => {

  
  // const tickectIndex=tempData? tempData.findIndex((p:any) => {
  //   return p.id === req;
  //     }): -1;
  //     let ticketChange:any = JSON.parse(JSON.stringify(stateT[tickectIndex])) ;
  //     ticketChange.title = this.state.titleRename; 
  //     const tickets = JSON.parse(JSON.stringify(this.state.tickets)) ;
  //     tickets[tickectIndex] = ticketChange;
  // tempData.findIndex()
  // @ts-ignore
  const tickets =  JSON.stringify(req.body);
  console.log(tickets);
  // fs.writeFileSync('student.json', tickets);

  res.status(200);
});

app.listen(serverAPIPort);
console.log('server running, Meir Exam', serverAPIPort)

