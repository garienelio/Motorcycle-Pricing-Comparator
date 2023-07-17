import React, { useContext } from "react";
import { ComparisonContext } from "../context/ComparisonContext";
import { FavoriteContext } from "../context/FavoriteContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';


export default function Item({product}){
    const { compareItems , addToCompare, removeFromCompare } = useContext(ComparisonContext);
    const { favoriteItems, addFavorite, removeFavorite } = useContext(FavoriteContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleAddFavorite = (item) => {
        addFavorite(item);
        enqueueSnackbar('Added to Favorite', {variant: 'success', autoHideDuration: 1800});
    }

    const handleRemoveFavorite = (id) => {
        removeFavorite(id)
        enqueueSnackbar('Removed from Favorite', {variant: 'success', autoHideDuration: 1800});
    }

    return(
        <div className="itemBox">
          <a href={product.URL} target="_blank" rel="noopener noreferrer">
            <div className="itemData">
              <h3><span>{product.TITLE}</span></h3>
              <h4>Condition: <span>{product.CONDITION}</span></h4>
              <h4>Odometer: <span>{product.ODOMETER === null ? '-' : product.ODOMETER} km</span></h4>
              <h4>Location: <span>{product.LOCATION}</span></h4>
              <h4>Price: <span className="price">${product.PRICE} CAD</span></h4>
            </div>
          </a>
          <div className="itemButtons">
              <Stack direction="row" spacing={5}>
                {compareItems.some((item) => item.ID === product.ID) ? 
                <Button color="success" size="small" variant="contained" startIcon={<CheckIcon/>} onClick={() => removeFromCompare(product.ID)}>Compare</Button> : 
                <Button size="small" variant="outlined" startIcon={<AddIcon/>} onClick={() => addToCompare(product)}>Compare</Button>}
                <Tooltip title="Add to Favorite" placement="bottom">
                    {favoriteItems.some((item) => item.ID === product.ID) ?
                    <IconButton color="inherit" onClick={() => handleRemoveFavorite(product.ID)}>
                      <FavoriteIcon style={{fontSize: '30px'}}/>
                    </IconButton> : 
                    <IconButton color="inherit" onClick={() => handleAddFavorite(product)}>
                      <FavoriteBorderIcon style={{fontSize: '30px'}}/>
                    </IconButton>}
                </Tooltip>
              </Stack>
          </div>
        </div>
    );
}