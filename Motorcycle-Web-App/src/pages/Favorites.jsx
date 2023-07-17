import React, { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import Header from '../components/Header.jsx';
import Searchbar from "../components/Searchbar";
import FavoriteItem from '../components/FavoriteItem';

export default function Favorites(){
    const { favoriteItems } = useContext(FavoriteContext);
    const [keyword, setKeyword] = useState("");

    return(
      <>
        <Header name="Your Favorites"/>
        <Searchbar keyword={keyword} setKeyword={setKeyword} placeholder="Search your Favorites"/>
        <div className="favItemContainer">
        {favoriteItems.filter(item => (item.TITLE).toLowerCase().includes(keyword.toLowerCase())).map(item => <FavoriteItem key={item.ID} product={item}/>)}
        </div>

      </>
    );
}