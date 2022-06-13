import React from 'react'
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { basketItemDecrease, basketItemIncrease, basketItemRemove } from '../reducers/basketReducer';



const BasketServiceItem = ({ item }) => {
  const dispatch = useDispatch();
  const {
    id,
    file,
    title,
    price,
    number,
  } = item;

  const secondary = true;

  const renderControlItem = (id) => { 
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <IconButton 
          onClick={() => {
            if (number <= 1) {
              dispatch(basketItemRemove({ id }));
              return;
            }
            dispatch(basketItemDecrease({ id }))
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant='body2'>{number}</Typography>
        <IconButton
          onClick={() => {
            dispatch(basketItemIncrease({ id }))
          }}
        >
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(basketItemRemove({ id }));
          }}
        >
          <CloseIcon />
        </IconButton>
     </Box>
    )
  }

  return (
    <ListItem
      secondaryAction={
        renderControlItem(id)
      }
    >
    <ListItemAvatar>
      <Avatar src={file}>
        <FolderIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={title}
      secondary={secondary ? `${price * number}р. ${number}шт.` : null}
    />
  </ListItem>
  )
}

export default BasketServiceItem;