import React from 'react';
import { Ticket } from '../api';
 type AppState = {
	tickets?: Ticket[],
      search: string
 }
const ticket = ( props:any ) => {
//       const [flag, setFlag] = React.useState<boolean>(props.title.length > 430);
//       const showMore =()=>{
//             setFlag(true)
//       }

//       const showless=()=>{
//             setFlag(false)
//       }
      console.log(props);
      
    return (
    
      <li key={props.id} className='ticket'>
      {/* <button className="hideMe" onClick={props.hide}>hide me</button> */}
      <h5 className='title'>{props.title}</h5>
      <input type= "text" placeholder="Change the title" onChange={props.change} >
            </input>
            <button className="Rename" onClick=   {props.ChangeNameSave}>Rename</button>

      <footer>
            <div className='meta-data'>By {props.userEmail} | { new Date(props.TimeCreate).toLocaleString()}</div>
           
      </footer> 
</li>
    )

    
};

export default ticket;


// {
		// 	return <TicketCard
			
		// 	click = {()=> this.hide(index)}>
		// 	title = {ticket.title}
		// 	clickRename = {() => this.saveJson( ticket.id)}
		// 	userEmail = {ticket.userEmail}
		// 	TimeCreate = {ticket.creationTime}
		// 	{ticket.labels ? ticket.labels.map((lb, i) => <p key={i}>{lb}</p>) : null}
		// 	</TicketCard>
		// } 