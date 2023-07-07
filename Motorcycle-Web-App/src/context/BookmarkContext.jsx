import React, { createContext, useState } from "react";

export const BookmarkContext = createContext();

export function BookmarkContextProvider({children}){
    const [bookmarkItems, setBookmarkItems] = useState([]);
    
    const addBookmark = (product) => {
        setBookmarkItems(prev => [...prev, product]);
    }

    const removeBookmark = (id) => {
        setBookmarkItems(prev => prev.filter(item => item.ID !== id));
    }

    return(
        <BookmarkContext.Provider value={{bookmarkItems, addBookmark, removeBookmark}}>{children}</BookmarkContext.Provider>
    );
}