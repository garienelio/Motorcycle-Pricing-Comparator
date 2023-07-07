import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Searchbar from "../components/Searchbar.jsx";
import Item from '../components/Item.jsx';
import { Fab } from '@mui/material';
import { Badge } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ComparisonContext } from "../context/ComparisonContext.jsx";
import { SnackbarProvider } from 'notistack';

export default function Listings(){

    const [keyword, setKeyword] = useState("");
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [moreData, setMoreData] = useState(false);
    const { compareItems } = useContext(ComparisonContext);

    useEffect(() => {
      setProducts([]);
    }, [keyword]);

    useEffect(() => {
      let cancel;
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        params: {page: page, search: keyword},
        cancelToken: new axios.CancelToken((c) => cancel = c)
      }).then(res => {
        setMoreData(res.data.hasMoreData);
        setProducts(prevProduct => [...prevProduct, ...res.data.data]);
      }).catch(e => {
        if(axios.isCancel(e)) return;
      });

      return () => cancel();
    }, [page, keyword]);


    const handleLoadMore = (e) => {
      e.currentTarget.disabled = true;
      setPage(prevPage => prevPage + 1);
      e.currentTarget.disabled = false;
    }

    const theme = createTheme({
      palette: {
        primary: {
          main: '#b4b5b5'
        }
      },
      typography: {
        button: {
          textTransform: 'none',
          fontWeight: 600
        },
        fontFamily: 'Manrope',
      },
    });

    const fabStyle = {
      position: 'fixed',
      bottom: '30px',
      right: '30px'
    }

    return(
        <>
        <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          {compareItems.length > 0 && <Fab sx={fabStyle} variant="extended" size="large">Compare Products ({compareItems.length})</Fab>}
          {/* <Fab sx={fabStyle} variant="extended" size="large">Compare Products</Fab> */}
          <Header name="Motorcycle Listings"/>
          <Searchbar keyword={keyword} setKeyword={setKeyword} setPage={setPage}/>
          {/* <h1>{keyword}</h1> */}
          <div className="itemsContainer">
            <div className="itemContainer"> 
              {products.map(product => {
                return <Item key={product.ID} product={product}/>
              })}
            </div>
            {moreData && <button className="loadMore" onClick={handleLoadMore}>Load More</button>}
          </div>
        </SnackbarProvider>
        </ThemeProvider>
        </>
    );
}