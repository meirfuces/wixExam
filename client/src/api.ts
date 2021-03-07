import axios from 'axios';
import {APIRootPath} from '@fed-exam/config';

export type Ticket = {
    id: string,

    title: string;
    content: string;
    showMore: boolean;
    creationTime: number;
    userEmail: string;
    labels?: string[];
}

export type ApiClient = {
    getTickets: (page:number) => Promise<Ticket[]>;
    getTicketsPage: (page:number) => Promise<Ticket[]>;
    getTicketsWithSearch: (search:string) => Promise<Ticket[]>;
    getTicketsWithSearchDateS:(Datestart:string) => Promise<Ticket[]>;
    getTicketsWithSearchDateEnd:(DateEnd:string) => Promise<Ticket[]>;
    postTickets: (ticketes:Ticket[] | undefined, index: string, title:string) => Promise<Ticket[]>;
    
    fewCheck: (search:string | undefined,Date:string|undefined ) => Promise<Ticket[]>;

}

export const createApiClient = (): ApiClient => {
    return {
        getTickets: (page: number) => {
            return axios.get([APIRootPath, '?page=', page].join(''))
            .then((res) => res.data);
        },
        getTicketsPage: async (page: number) => {
            
            try {
                const res = await axios.get([APIRootPath, '?page=', page].join(''));
                return res.data
            } catch (error) {
                console.log(error.message);
                return [];
            }
     
        },
        getTicketsWithSearch: (search: string) => {
            
            return axios.get([APIRootPath, '?search=', search].join('')).then((res) => {
                
                return res.data});
        },
        getTicketsWithSearchDateEnd:(DateEnd:string) =>{
            console.log("DateEnd is " +DateEnd);
            
            return axios.get([APIRootPath, '?DateE=', DateEnd].join('')).then((res) => {
                return res.data});
        },
        getTicketsWithSearchDateS:(Datestart:string) =>{
            console.log("DateStart is " +Datestart);
            
            return axios.get([APIRootPath, '?DateS=', Datestart].join('')).then((res) => {
                return res.data});
        },
        fewCheck:(search=undefined,dateEnd=undefined) =>{
            console.log("DateEnd is " +dateEnd);
            const url = search && dateEnd? 'ddd' : search? '':dateEnd?'':'';
            return axios.get([APIRootPath, '?DateE=', dateEnd].join('')).then((res) => {
                return res.data});
        },
        postTickets: (ticketes: Ticket[]|undefined, index: string, title: string) => {
         
            const url = {index: index,
            title: title};
            return axios.post([APIRootPath+'?index=', url].join(''),url);
        }
}
}
