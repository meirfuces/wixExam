import React, { useState } from 'react';
import { Ticket } from '../api';
type ticketProps = {
      hideMe: boolean;
      hide: any;
      ticket:Ticket;
      RenameFunc: any;
      // nameChangedTitle: any;
}

const TicketCard = (props: ticketProps) => {
      const [showMore, setShowMore] = useState<boolean>(false);
      const [changeTitle, setChangeTitle] = useState<boolean>(false);
      const [tempTitle, setTempTitle] = useState<string>('');
      const [title, setTitle] = useState<string>(props.ticket.title);
      // const changeTitleFunctio
      return (



            <li key={props.ticket.id} className='ticket'>
                  <button className="hideMe" onClick={props.hide}>hide me</button>
                  <h5 className='title'>{title}</h5>
              {  changeTitle?  

                  <React.Fragment>
                        <input type="text"
                        placeholder="Change the title"
                        onChange={(event:any)=>{setTempTitle(event.target.value)}}>
                  </input>
                        <button className="Rename" onClick={()=>{props.RenameFunc(tempTitle)
                              setTitle(tempTitle)
                        }}>update</button>
                  <button className="Rename" onClick={()=>{setChangeTitle(false)}}>cancel</button></React.Fragment>:
                  <button className="Rename" onClick={()=>{setChangeTitle(true)}}>Rename</button>
                  
                  }
                  <p className='content'  >{props.ticket.content}
                        {!showMore ? props.ticket.content.substring(0, 430) + "  ......." : props.ticket.content}
                  </p>
                  {props.ticket.content.length > 430 &&
                        <div className="">
                              <button className="" onClick={() => {
                                   setShowMore(!showMore);
                              }}>{!showMore ? "show more" : "show less"}
                              </button>

                        </div>


                  }

                  <footer>
                        <div className='meta-data'>By {props.ticket.userEmail} | {new Date(props.ticket.creationTime).toLocaleString()}</div>
                        {props.ticket.labels ? <div className="label-ticket">{props.ticket.labels.map((lb, i) => <p key={i}>{lb}</p >)}</div> : null}
                  </footer>
            </li>



      )


};

export default TicketCard;
