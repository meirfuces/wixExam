import React , {useState}from 'react';
type pageProps ={
      pageNum:number,
      clickBack:any,
      clickNext: any,
      children:any,
      hasNext:number

}
const Page = ( props:pageProps ) => {
      const [page, setPage] = useState('');
    return (
           <div className ="paginationWrapper ">
		
        {props.pageNum>1? 
        <button className="pageItem sides " onClick={props.clickBack}>
      previous page ({props.pageNum-1})
    
        </button>
:
null
}

{props.hasNext>0?  <button className="pageItem sides "  onClick={props.clickNext}>{props.children}
    
    
    </button>: null}
       
      
        </div>
    )

    
};

export default Page;