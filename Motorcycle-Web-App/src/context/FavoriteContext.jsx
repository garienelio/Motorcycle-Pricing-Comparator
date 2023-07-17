import React, { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext();

export function FavoriteContextProvider({children}){
    const [favoriteItems, setFavoriteItems] = useState(() => {
        const favItems = localStorage.getItem("FAV_ITEMS")
        if (favItems !== null){
            return JSON.parse(favItems);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('FAV_ITEMS', JSON.stringify(favoriteItems));
    }, [favoriteItems]);
    
    const addFavorite = (product) => {
        setFavoriteItems(prev => [...prev, product]);
    }

    const removeFavorite = (id) => {
        setFavoriteItems(prev => prev.filter(item => item.ID !== id));
    }

    return(
        <FavoriteContext.Provider value={{favoriteItems, addFavorite, removeFavorite}}>{children}</FavoriteContext.Provider>
    );
}