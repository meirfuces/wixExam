import React, {useState} from 'react';
import { Ticket } from '../api';
 type ticketProps = {
      hideMe:boolean;
   
      hide:any;
    
      id:string;
      title:string;
      ChangeNameSave:any;
      userEmail:any;
      TimeCreate:any;
}

const TicketCard = ( props:ticketProps ) => {
      const [title1, setTitle] = useState(props.title);
      const [title2, setTitleRename] = useState('');

      const [hideMeState, setHide] = useState(props.hideMe);
      const [counterHide, setCounter] = useState(0);
      const changeTitle =(event:any,id:any) =>{
            console.log("page: " + event.target.value);
            setTitleRename(event.target.value);
      }
      const ChangeNameSave =()=>{
            setTitle(title2);
      }
      const hide =()=>{
         setCounter(counterHide+1)
         
            setHide(false);
      }
      const showMe =()=>{
            setHide(true);
      }
    return (
    


    
      
      <li key={props.id} className='ticket'>
    
    {counterHide? <p>{counterHide}</p>:null}
      {hideMeState? <div>
            <button className="hideMe" onClick={hide}
            >hide me</button>
      <h5 className='title'>{title1}</h5>
      <input type= "text" placeholder="Change the title" onChange={(event)=>changeTitle(event,props.id)} >
            </input>
            <button className="Rename" onClick=   {ChangeNameSave}>Rename</button>

      <footer>
            <div className='meta-data'>By {props.userEmail} | { new Date(props.TimeCreate).toLocaleString()}</div>
           
      </footer> 
      </div>:
       <button className="showMe" onClick={showMe}
       >show Me</button>}
      
</li>

    )

    
};

export default TicketCard;


