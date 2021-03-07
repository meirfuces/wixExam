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
export type BodySearch = {word?: string, startDate?:string , endDate?:string, page?: number, [key: string]: number | string | undefined}
export type BodySearchCheckList = {word: boolean, startDate: boolean, endDate:boolean, page: boolean,     [key: string]: number |  boolean | undefined}
export type ApiClient = {
    getTickets: (page:number) => Promise<Ticket[]>;
    getTicketsPage: (page:number) => Promise<Ticket[]>;
    getTicketsWithSearch: (bodySearch: BodySearch) => Promise<Ticket[]>;

    postTickets: (index: string, title:string) => Promise<Ticket[]>;
    

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
        getTicketsWithSearch: (bodySearch: BodySearch) => {
            
            return axios.put([APIRootPath, 'search'].join('/'), bodySearch).then((res) => {
                
                return res.data});
        },


        postTickets: (index: string, title: string) => {
            
            const url = {index: index,
            title: title};
            return  axios.post(APIRootPath, url);
        }
}
}
