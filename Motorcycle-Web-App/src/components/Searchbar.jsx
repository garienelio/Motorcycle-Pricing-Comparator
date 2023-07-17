import React from "react";
import searchIcon from '../assets/search-icon.svg'

export default function Searchbar({keyword, setKeyword, setPage, placeholder}){

    const handleChange = (e) => {
      setKeyword(e.target.value);
      if(setPage){
        setPage(1);
      }
    }

    return(
        <div className="searchContainer">
          <div className="searchBar">
            <img src={searchIcon} className="searchImg"/>
            <input type="text" placeholder={placeholder} className="searchInput" value={keyword} onChange={handleChange}/>
          </div>
        </div>
    );
}