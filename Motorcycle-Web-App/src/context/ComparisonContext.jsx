import React, { createContext, useEffect, useState } from "react";

export const ComparisonContext = createContext();

export function ComparisonContextProvider({children}){
    const [compareItems, setCompareItems] = useState(() => {
        const cmpItems = localStorage.getItem('CMP_ITEMS');
        if(cmpItems !== null){
            return JSON.parse(cmpItems);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('CMP_ITEMS', JSON.stringify(compareItems));
    }, [compareItems]);

    const addToCompare = (product) => {
        setCompareItems(prevComp => [...prevComp, product]);
    }

    const removeFromCompare = (id) => {
        setCompareItems(prevComp => prevComp.filter((product) => product.ID !== id));
    }

    return(
        <ComparisonContext.Provider value={{compareItems, addToCompare, removeFromCompare}}>{children}</ComparisonContext.Provider>
    );
}