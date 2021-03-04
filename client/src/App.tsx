import React from 'react';
import './App.scss';
import './pageination.scss';
import {createApiClient, Ticket} from './api';
import Page from './component/page';
import SerchBar from './component/searchBar';
import TicketCard from './component/ticketCard';
import Axios from 'axios';

export type AppState = {
	tickets?: Ticket[],
	search: string,
	DataStart: string,
	DataEnd: string
	showMore: boolean;
	titleRename: string;
	page:number;
	counterHide:number;
	
	
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
		counterHide:0
	}
	
	searchDebounce: any = null;

	async componentDidMount() {
		const page = this.state.page;
		this.setState({
			page:this.state.page,
			tickets:await api.getTickets(page+1)
			
		});
	}
	// pageFunction = async(page: number) =>{
	// 	console.log("page function");
		
	// 	api.getTicketsPage(page);
	// }
	hide = (index: number)=>{
		console.log(index);
		
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
	saveJson = async(index:string)=>{
		const stateT:any = {...this.state.tickets};
		// console.log(event.target.value);
	
		if (stateT!=null){
		const tickectIndex= this.state.tickets? this.state.tickets.findIndex((p:Ticket) => {
			return p.id === index;
		    }): -1;
		    let ticketChange:any = JSON.parse(JSON.stringify(stateT[tickectIndex])) ;
		    ticketChange.title = this.state.titleRename; 
		    const tickets = JSON.parse(JSON.stringify(this.state.tickets)) ;
		    tickets[tickectIndex] = ticketChange;
		   
		    
		   
		//     this.setState( {tickets: tickets} );
		
		
		
	     
		this.setState( {tickets: tickets} );
		}
		// let tickets2 = await api.getTickets(this.);
		// await api.postTickets(tickets2)
	}
	
	renderTickets =  (tickets: Ticket[]) => {
		const search = this.state.search;
 
		tickets.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(search.toLowerCase()));
		
	
		
		return (<ul className='tickets'>
		{tickets.map((ticket,index) => (
			<div>

		{/* <TicketCard title={ticket.title}

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
		
			<button className="Rename" onClick=   {() => this.saveJson( ticket.id)}>Rename</button>
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
				{ticket.labels ? ticket.labels.map((lb, i) => <p key={i}>{lb}</p>) : null}
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
		console.log(this.state.showMore);
	}
	ChangeTitle = (val: any) =>{
		console.log("change title");
		
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

		console.log(this.state.page);
		
		this.setState({
			...this.state,
			page:this.state.page-1
		})
		console.log(this.state.page);

		console.log("page now is : " + this.state.page);
		const tickets: Ticket[]= await api.getTicketsPage(this.state.page)
		// api.getTicketsPage(this.state.page);
		this.setState({
			tickets: tickets
		})
	}

	nextPage = async()=>{

		console.log(this.state.page);
		
		this.setState({
			...this.state,
			page:this.state.page+1
		})
		console.log(this.state.page);

		console.log("page now is : " + this.state.page);
		const tickets: Ticket[]= await api.getTicketsPage(this.state.page)
		// api.getTicketsPage(this.state.page);
		this.setState({
			tickets: tickets
		})
	}

	render() {	
		const {tickets} = this.state;

		return (<main>
			
			<SerchBar
			chenged={(e:any) => this.onSearch(e.target.value)}
			dataStart = {(e: any) => {console.log("change");
			}}
			></SerchBar>
			<input type="date" onChange={(e)=>{
	this.setState({DataStart: e.target.value});
	console.log(this.state);
      }} id="start" name="trip-start"
      value={this.state.DataStart? this.state.DataStart : "2020-07-22" }
       min="2010-01-01" max="2018-12-31"/>

	 <input type="date" id="end" name="trip-start"
	 value={this.state.DataEnd? this.state.DataEnd : "2020-07-22" }
	 onChange={(e)=>{
		this.setState({DataEnd: e.target.value});
		api.getTicketsWithSearchAdvance(this.state.DataEnd);
		console.log(this.state);
		
	}}
       min="2018-01-01" max="2021-03-03"/>

	 <button className ="advance serch">
		  advance search</button>


		  <Page
		 
		pageNum= {this.state.page}
		  clickBack ={()=>{this.backPage()}}
			clickNext ={()=>{this.nextPage()}}>{"page number: "  +(this.state.page+1)+ " ->"}</Page>

		{tickets ? <div className='results'>Showing {tickets.length} results {this.state.counterHide>0?<div> 
			<p className="restore" onClick={async()=>{
				this.setState({
					tickets: await api.getTicketsPage(this.state.page),
					counterHide:0,
					page:this.state.page
				})
			}
			}>restore</p>
			{"("+ this.state.counterHide +" Hidden ticket)"} </div>: ""
		}</div> : null }	
			{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
			{/* <div className ="paginationWrapper "> */}
			
			
		</main>
		
		)
	}
}

export default App;