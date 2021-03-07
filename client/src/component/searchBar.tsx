import React, { useState } from 'react';
import { BodySearch, BodySearchCheckList } from '../api';
type Props = {
    onSearch: any;
}

const SearchBar = (props: Props) => {
    const [bodySearch, setBodySearch] = useState<BodySearch>({})
    const [bodySearchCheckList, setBodySearchCheckList] = useState<BodySearchCheckList>({ word: false, startDate: false, endDate: false, page: false })

    return (
        <div>
            <h1>Tickets List</h1>
            
            <div className="searchBar" >
            <div className="searchRow" >

                <input className="inputSearch" type="search" placeholder="Search..." style={{ 'width': '300px' , 'height': '40px'}}
                    onChange={(e: any) => setBodySearch({
                        ...bodySearch, word: e.target.value

                    })} />
      <input type="checkbox" onClick={() => setBodySearchCheckList({
                ...bodySearchCheckList, word: !bodySearchCheckList.word
            })} ></input>
            <button className="sendSearch" onClick={() => props.onSearch(bodySearch, bodySearchCheckList)}>search</button>
            </div>


            <p>filter by after date</p> 
            
            <div className="searchRow" >
            
            <input className="date" type="date" onChange={async (e: any) => {
                setBodySearch({
                    ...bodySearch, startDate: e.target.value
                });
            }} id="start" name="trip-start"
                value={bodySearch.startDate ? bodySearch.startDate : "2018-01-01"}
                min="2010-01-01" max="2020-03-31" />

            <input type="checkbox" onClick={() => setBodySearchCheckList({
                ...bodySearchCheckList, startDate: !bodySearchCheckList.startDate
            })} ></input>
            </div>
            <p>filter by before date</p> 

            <div className="searchRow" >

            <input className="date" type="date" id="end" name="trip-start"
                value={bodySearch.endDate ? bodySearch.endDate : "2020-03-01"}
                onChange={async (e) => {

                    setBodySearch({
                        ...bodySearch, endDate: e.target.value
                    });

                }}
                min="2010-01-01" max="2020-03-31" />

            <input  type="checkbox" onClick={() => setBodySearchCheckList({
                ...bodySearchCheckList, endDate: !bodySearchCheckList.endDate
            })} ></input>
        </div>
        </div>
        </div>

    )


};

export default SearchBar;

// const onChangeWord = async(word:string) =>{

//     // clearTimeout(searchDebounce);
//     //  const searchDebounce = setTimeout(async () => {
//     // }, 300);
// }