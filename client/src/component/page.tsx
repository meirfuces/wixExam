import React from 'react';

const page = ( props:any ) => {
    return (
           <div className ="paginationWrapper ">
		
        {props.pageNum>1? 
        <button className="pageItem sides ">
    <a href = "#page" onClick={props.clickBack}>previous page</a>
    
        </button>
:
null
}


        <button className="pageItem sides ">
    <a href = "#page" onClick={props.clickNext}>{props.children}</a>
    
        </button>
      
        </div>
    )

    
};

export default page;