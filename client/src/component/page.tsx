import React from 'react';

const page = ( props:any ) => {
    return (
           <div className ="paginationWrapper ">
		
        {props.pageNum>1? 
        <button className="pageItem sides " onClick={props.clickBack}>
      previous page
    
        </button>
:
null
}


        <button className="pageItem sides "  onClick={props.clickNext}>{props.children}
    
    
        </button>
      
        </div>
    )

    
};

export default page;