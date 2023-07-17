import React, { useContext, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { FavoriteContext } from "../context/FavoriteContext";
import { Box } from '@mui/material';
import { Button } from '@mui/material';

export default function FavoriteItem({product}){

    const { removeFavorite } = useContext(FavoriteContext);
    const [openModal, setOpenModal] = useState(false);

    const handleRemove = () => {
        removeFavorite(product.ID);
        setOpenModal(false);
    }

    return(
      <div className="favItemBox">
        <div className="itemData">
          <a href={product.URL} target="_blank" rel="noopener noreferrer">
            <h1>{product.TITLE}</h1>
          </a>
          <h4>Condition: <span>{product.CONDITION}</span></h4>
          <h4>Odometer: <span>{product.ODOMETER === null ? '-' : product.ODOMETER} km</span></h4>
          <h4>Price: <span className="price">${product.PRICE} CAD</span></h4>
        </div>
        <div className="deleteIconBtn">
          <Tooltip title="Remove from Favorite" placement="bottom">
            <IconButton color="inherit" size="large" onClick={() => setOpenModal(true)}>
              <DeleteIcon fontSize="inherit"/>
            </IconButton>
          </Tooltip>
        </div>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box className="modalBox">
            <div className="modalContent">
              <h2>Remove this item from your favorite list?</h2>
              <h3>Are you sure you want to remove {product.TITLE} from your favorite list?</h3>
              <h3>You can readd this item through the listing page.</h3>
              <Stack className="modalBtn" direction="row" spacing={2}>
                <Button variant="contained" onClick={handleRemove}>Remove</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)}>Cancel</Button>
              </Stack>
            </div>
          </Box>
        </Modal>
      </div>
    );
}