import React, { createContext, useEffect, useState } from "react";

export const ComparisonContext = createContext();

export function ComparisonContextProvider({children}){
    const [compareItems, setCompareItems] = useState([]);

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