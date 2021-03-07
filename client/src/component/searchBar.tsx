import React from 'react';


const serchBar = ( props:any ) => {
    return ( 
          <div>
      <h1>Tickets List</h1>
			
      <header style={{'width':'300px'}}>
			
                  <input type="search" placeholder="Search..." 
                  onChange={props.chenged}/>
            
            </header>


       </div>
    )

    
};

export default serchBar;

