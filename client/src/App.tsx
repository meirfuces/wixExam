import React from 'react';
import './App.scss';
import './pageination.scss';
import {createApiClient, Ticket} from './api';
import Page from './component/page';
import SerchBar from './component/searchBar';
import TicketCard from './component/ticketCard';
import Axios from 'axios';
import ticket from './component/ticketCard';

export type AppState = {
	tickets?: Ticket[],
	search: string,
	DataStart: string,
	DataEnd: string
	showMore: boolean;
	titleRename: string;
	page:number;
	counterHide:number;
	hasNext:boolean;
	
}

const api = createApiClient();


export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',
		showMore: false,
		titleRename: '',
		page:1,
		DataStart:'',
		DataEnd:'',
		counterHide:0,
		hasNext:true
	}
	
	searchDebounce: any = null;

	async componentDidMount() {
		const page = this.state.page;
		
		this.setState({
			page:this.state.page,
			tickets:await api.getTickets(page+1,),
			
			
		});
	}

	hide = (index: number)=>{
		
		const stateT:any =JSON.parse(JSON.stringify(this.state.tickets)) ;

		if (stateT!= null){
			let tickets ;
		 stateT.splice(index,1);
		this.setState({
			tickets:stateT,
			counterHide: this.state.counterHide+1
		
		});
		}

	}
	RenameFunc = async(index:string)=>{
		const stateT:any = {...this.state.tickets};
		// console.log(event.target.value);
	try {
		if (stateT!=null){
			const tickectIndex= this.state.tickets? this.state.tickets.findIndex((p:Ticket) => {
				return p.id === index;
			    }): -1;
			    let ticketChange:any = JSON.parse(JSON.stringify(stateT[tickectIndex])) ;
			    ticketChange.title = this.state.titleRename; 
			    const tickets = JSON.parse(JSON.stringify(this.state.tickets)) ;
			    tickets[tickectIndex] = ticketChange;
		
			api.postTickets(tickets, index,this.state.titleRename);
			this.setState( {tickets: tickets,
				titleRename:''} );
			}
	} catch (error) {
		console.log(error);
		
	}
	}
	
	// canecl = async()=>{
	// 	this.setState({tickets: await api.getTicketsPage(this.state.page)});
	// }
	renderTickets =  (tickets: Ticket[]) => {
		const search = this.state.search;
		const DateE = this.state.DataEnd;
		const DateS = this.state.DataStart;
		tickets.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(search.toLowerCase()));
		tickets.filter(comp => (new Date(comp.creationTime)<new Date(DateE)))
		tickets.filter(comp => (new Date(comp.creationTime)>new Date(DateS)))

		
		return (<ul className='tickets'>
		{tickets.map((ticket,index) => (
			<div key= {index}>
		
		{/* 
		here i try to divide it to component but finally have not time to fix restore function
		<TicketCard 
		title={ticket.title}
			
		hideMe = {true}
		hide = {()=>this.hide}
		id ={ticket.id}
		// changeTitle = {() => this.nameChangedTitle}
		TimeCreate = {ticket.creationTime}
		userEmail= {ticket.userEmail}
		ChangeNameSave={() => this.saveJson( ticket.id)}
		></TicketCard> */}
		<li key={ticket.id} className='ticket'>
			<button className="hideMe" onClick={()=>this.hide(index)}>hide me</button>
			<h5 className='title'>{ticket.title}</h5>
			<input type= "text" 
			placeholder="Change the title" 
			onChange={(event) => this.nameChangedTitle(event, ticket.id)}>

				</input>
				
			<button className="Rename" onClick=   {() => this.RenameFunc( ticket.id)}>Rename</button>
			<p className='content'  >{ticket.content}
				{!this.state.showMore? ticket.content.substring(0,430) + "  .......": ticket.content}
		</p>
		{ticket.content.length>430 &&
		<div className ="">
		<button className="" onClick={()=>{
			this.setState({
				showMore: !this.state.showMore
			})
		} }>{!this.state.showMore? "show more" : "show less"}
		 </button> 
		
		 </div>
		
		
	}
			
			<footer>
				<div className='meta-data'>By {ticket.userEmail} | { new Date(ticket.creationTime).toLocaleString()}</div>
				{/* {ticket.labels ?ticket.labels.map((lb, i) => <div className="label-ticket" key={i}><p>{lb}</p></div>) : null} */}
				{ticket.labels ?<div className="label-ticket">{ticket.labels.map((lb, i) => <p key={i}>{lb}</p >)}</div>: null}
			</footer>
		</li>
		</div>
		))}
	</ul>);
	}
	nameChangedTitle= (event:any, index:string) =>{
		this.setState( {titleRename: event.target.value} );
	}

	showMore = ()=>{
		console.log("showMore");
		
		this.setState({
			showMore: !this.state.showMore
		})
	}

	onSearch = async (val: string, newPage?: number, DataStart?: string) => {
		
		// clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
		

			this.setState({
				tickets:await api.getTicketsWithSearch(val),
				page:1
			});

		}, 300);
	}
	backPage = async()=>{

		
	

		const tickets: Ticket[]= await api.getTicketsPage(this.state.page-1)
		this.setState({
			...this.state,
			page:this.state.page-1
		})
		this.setState({
			tickets: tickets
		})
	}
	restore = async()=>{
		this.setState({
			tickets: await api.getTicketsPage(this.state.page),
			counterHide:0,
			page:this.state.page
		})
	}
	nextPage = async()=>{
	
		
		
		
		const tickets: Ticket[]= await api.getTicketsPage(this.state.page+1)
		this.setState({
			...this.state,
			page:this.state.page+1
		})

		this.setState({
			tickets: tickets
		})
	}

	render() {	
		const {tickets} = this.state;

		return (<main>
			
			<SerchBar
			chenged={(e:any) => this.onSearch(e.target.value)}
			dataStart = {(e: any) => {
			}}
			></SerchBar>
			<input type="date" onChange={async(e)=>{
	this.setState({DataStart: e.target.value,
		tickets: await api.getTicketsWithSearchDateS(e.target.value)
	});
      }} id="start" name="trip-start"
      value={this.state.DataStart? this.state.DataStart : "2018-01-01" }
       min="2010-01-01" max="2020-03-31"/>
	{this.state.DataStart? <p>after {this.state.DataStart}</p>:null}
	 <input type="date" id="end" name="trip-start"
	 value={this.state.DataEnd? this.state.DataEnd : "2020-03-01" }
	 onChange={async(e)=>{
		
		this.setState({
			DataEnd: e.target.value,
			tickets: await api.getTicketsWithSearchDateEnd(e.target.value)
			
		});
	
		
	}}
	min="2010-01-01" max="2020-03-31"/>
{this.state.DataEnd? <p>before {this.state.DataEnd}</p>:null}
	


		  <Page
		 
		pageNum= {this.state.page}
		hasNext = {tickets? tickets.length :0}
		  clickBack ={()=>{this.backPage()}}
			clickNext ={()=>{this.nextPage()}}>{"page number: "  +(this.state.page+1)+ " ->"}
			</Page>

		{tickets ? <div className='results'>Showing {tickets.length} results 
		{this.state.counterHide>0?
		<div> 
			<p className="restore" 
			onClick={()=>this.restore()}
			>restore</p>
			{"("+ this.state.counterHide +" Hidden ticket)"} </div>: ""
		}</div> 
		: null }	
			{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
			
			
		</main>
		
		)
	}
}

export default App;