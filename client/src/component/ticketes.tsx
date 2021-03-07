import React, { useState } from 'react';
import { Ticket, createApiClient } from '../api';
import TicketCard from './ticketCard';
type ticketProps = {
      tickets: Ticket[];
      hideTicket: any;
}
const api = createApiClient();

const Ticketes = (props: ticketProps) => {
      const [ticketsState, setTicketsState] = useState<Ticket[]>(props.tickets);
      console.log(props.tickets);
      
      React.useEffect(() => {
            setTicketsState(props.tickets)
            
        }, [props.tickets]);
      const RenameFunc = async(index:number, title:string)=>{
                      const id =  ticketsState[index].id;
			await api.postTickets(id, title);


	}
      const nameChangedTitle= (event:any, index:number) =>{
            const tickets = [...ticketsState]
            tickets[index].title =  event.target.value
            setTicketsState(tickets)
	}
      const hide = (index: number)=>{
            const tickets = [...ticketsState]
            tickets.splice(index,1);
            setTicketsState(tickets)
            props.hideTicket()

	}
      
      return (<React.Fragment><ul className='tickets'>
      {ticketsState.map((ticket,index) => (
            <div key= {index}>
      
      
      <TicketCard 
      ticket={ticket}
      hideMe = {true}
      hide = {()=>hide(index)}
      // changeTitle = {() => this.nameChangedTitle}
      // nameChangedTitle={(event:any)=> nameChangedTitle(event, index)}
      RenameFunc={(title:string) => RenameFunc( index, title)}
      ></TicketCard>
      
      </div>
      ))}
</ul></React.Fragment>);
};

export default Ticketes;
