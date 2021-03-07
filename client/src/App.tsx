import React from 'react';
import './App.scss';
import './pageination.scss';
import {createApiClient, Ticket,  BodySearch, BodySearchCheckList} from './api';
import Page from './component/page';
import SerchBar from './component/searchBar';
import TicketCard from './component/ticketCard';
import Axios from 'axios';
import ticket from './component/ticketCard';
import Ticketes from './component/ticketes';

export type AppState = {
	tickets?: Ticket[],
	showMore: boolean;
	titleRename: string;
	page:number;
	counterHide:number;
	hasNext:boolean;
	bodySearch:BodySearch,
	bodySearchCheckList:BodySearchCheckList,
	
}

const api = createApiClient();


export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		showMore: false,
		titleRename: '',
		page:1,
		bodySearch:{},
		counterHide:0,
		hasNext:true,
	bodySearchCheckList: {word: false, startDate: false, endDate:false, page: false},

	}
	
	searchDebounce: any = null;

	async componentDidMount() {
		const page = this.state.page;
		
		this.setState({
			page:this.state.page,
			tickets:await api.getTickets(page+1,),
			
			
		});
	}


	hideTicket = ()=>{
		this.setState({
			counterHide: this.state.counterHide+1
		
		});
	}
	

	renderTickets =  (tickets: Ticket[]) => {
		return <Ticketes tickets={tickets} hideTicket={this.hideTicket}></Ticketes>

		
	
	}


	onSearch = async () => {
		
		const bodySearch: BodySearch = Object.assign({},...Object.keys(this.state.bodySearch).map((key) => (this.state.bodySearchCheckList[key]? {[key]:this.state.bodySearch[key]}: undefined)))
		
		this.setState({
			tickets:await api.getTicketsWithSearch(bodySearch),
			// page:1
		});
		
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
			// tickets: await api.getTicketsPage(this.state.page),
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
	onChangeWord = async(word:string) =>{
		clearTimeout(this.searchDebounce);
		this.searchDebounce = setTimeout(async () => {
		
			this.setState({
				bodySearch:{...this.state.bodySearch, word},
				
			})
		

		}, 300);
	}
	render() {	
		
		const {tickets} = this.state;

		return (<main>
				<button className="sendSearch" onClick={this.onSearch}>send</button>
			<SerchBar
			chenged={(e:any) =>{
				this.onChangeWord(e.target.value)
			}}
		
			></SerchBar>
				<input type="checkbox" onClick={()=>this.setState({
	 	bodySearchCheckList:{...this.state.bodySearchCheckList, word: !this.state.bodySearchCheckList.word},
 })} ></input>
			<input type="date" onChange={async(e:any)=>{
	  this.setState({bodySearch:{...this.state.bodySearch, startDate: e.target.value},
		// tickets: await api.getTicketsWithSearchDateS(e.target.value)
	});
      }} id="start" name="trip-start"
      value={this.state.bodySearch.startDate? this.state.bodySearch.startDate : "2018-01-01" }
       min="2010-01-01" max="2020-03-31"/>
	{this.state.bodySearch.startDate? <p>after {this.state.bodySearch.startDate}</p>:null}
	<input type="checkbox" onClick={()=>this.setState({
	 	bodySearchCheckList:{...this.state.bodySearchCheckList, startDate: !this.state.bodySearchCheckList.startDate},
 })} ></input>
	 <input type="date" id="end" name="trip-start"
	 value={this.state.bodySearch.endDate? this.state.bodySearch.endDate : "2020-03-01" }
	 onChange={async(e)=>{
		
		this.setState({
			bodySearch:{...this.state.bodySearch, endDate: e.target.value},
			
		});
	
	}}
	min="2010-01-01" max="2020-03-31"/>
{this.state.bodySearch.endDate? <p>before {this.state.bodySearch.endDate}</p>:null}
	
 <input type="checkbox" onClick={()=>this.setState({
	 	bodySearchCheckList:{...this.state.bodySearchCheckList, endDate: !this.state.bodySearchCheckList.endDate},
 })} ></input>

		  <Page
		 
		pageNum= {this.state.page}
		hasNext = {tickets? tickets.length :0}
		  clickBack ={()=>{this.backPage()}}
			clickNext ={()=>{this.nextPage()}}>{"page number: "  +(this.state.page+1)+ " ->"}
			</Page>

		{tickets ? <div className='results'>Showing {tickets.length - this.state.counterHide} results 
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