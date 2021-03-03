import React from 'react';

const page = ( props:any ) => {
    return (
           <div className ="paginationWrapper ">
		
        {props.pageNum? <button className="pageItem sides ">
    <a href = "#page" onClick={props.clickBack}>back</a>
    
        </button>:null
}

        <button className="pageItem sides ">
    <a href = "#page" onClick={props.clickNext}>next</a>
    
        </button>
      
        </div>
    )

    
};

export default page;