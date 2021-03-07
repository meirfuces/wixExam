import React from 'react';
import './App.scss';
import './pageination.scss';
import {createApiClient, Ticket,  BodySearch, BodySearchCheckList} from './api';
import Page from './component/page';
import SearchBar from './component/searchBar';
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
	



	onSearch = async (bodySearch:BodySearch, bodySearchCheckList:BodySearchCheckList) => {
		
		const bodySearchToSearch: BodySearch = Object.assign({},...Object.keys(bodySearch).map((key) => (bodySearchCheckList[key]? {[key]:bodySearch[key]}: undefined)))
		console.log(bodySearch, bodySearchCheckList);
		
		this.setState({
			tickets:await api.getTicketsWithSearch(bodySearchToSearch),
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

	render() {	
		
		const {tickets} = this.state;
		
		return (
		<main>
		
			<SearchBar

			onSearch={this.onSearch}
			></SearchBar>
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
			{tickets ?  <Ticketes tickets={tickets} hideTicket={this.hideTicket}></Ticketes> : <h2>Loading..</h2>}
			
			
		</main>
		
		)
	}
}

export default App;