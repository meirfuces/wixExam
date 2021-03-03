import React from 'react';
import './pageination.scss';

const page = ( props ) => {
    return (
    
        <div className ="paginationWrapper ">
			
        <button className="pageItem sides ">
    <a href = "/?page=1" onClick={props.click}>{props.pageNumber}</a>
        </button>
      
        </div>
    )

    
};

export default page;