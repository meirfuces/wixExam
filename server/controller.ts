const fs = require('fs');
import { tempData } from './temp-data';
const PAGE_SIZE = 20;

exports.search =  (req:any, res:any) => {
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
  };
  
  
  
  exports.getTickets =  (req:any, res:any) => {
  
    // @ts-ignore
  
    const page: number = req.query.page || 1;
    // const superSearch: string| undefined =  req.query.superSearch as string || undefined;
  
    const dataPage = tempData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    res.status(200).send(dataPage);
  };
  
exports.postTitle =  (req:any, res:any) => {

  
    const index: string | undefined = req.body.index;
    const title: string = req.body.title;
    
    const tickectIndex: number = tempData ? tempData.findIndex((p: any) => {
      return p.id === index;
  
    }) : -1;
  
    if (tickectIndex === -1) return res.status(400).json({ msg: 'key not found' });
  
    tempData[tickectIndex].title = title;
  
    fs.writeFileSync('data.json', JSON.stringify(tempData));
  
    return res.status(200);
  };