import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import routes from '../routes';
import SelectAddItem from '../components/SelectAddItem';
import { serviceItemAdd } from '../reducers/serviceReducer';
import { closeDialog } from '../reducers/uiReducer'


function AddMaterial(props) {
  const dispatch = useDispatch()
  const ui = useSelector((state) => state.ui);
  const stock = useSelector((state => state.stock));
  const StockSelect = stock.map((item) => ({ id: item.id, name: `${item.name} ${item.type}`}));
  const [value, setValue] = React.useState('');
  const [list, setList] = React.useState([]);
  const [numbers, setNumbers] = React.useState(0);
  
  const handleChangeNumbers = (event) => {
    setNumbers(event.target.value);
  }
  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const handleAddItemList = () => {
    const stockItem = stock.find((item) => item.id === value);
    setList([
      ...list,
      {
        ...stockItem,
        numbers,
      }
      
    ]);
  }
  const handleRemoveItemList = (id) => () => {
    setList(list.filter((item) => item.id != id));
  }

  const handleClose = () => {
    dispatch(closeDialog('material'));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = routes('addMaterial')
    const materials = list.map(({id, numbers}) => ({ id_sklad: id,  id_uslugi: ui.dialogsData.id_uslugi, numbers}));
    try {
      await axios.all(materials.map((material) => axios.post(url, material)));
      alert('Расходники добавлены')
    } catch (error) {
      alert('Error!!')
      console.log(error)
    }
    handleClose();
  };
  return (
    <Dialog onClose={handleClose} open={ui.dialogs['material']}>
      <DialogTitle>Материалы</DialogTitle>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SelectAddItem 
                  values={StockSelect}
                  value={value}
                  numbers={numbers}
                  handleChangeNumbers={handleChangeNumbers}
                  handleChangeValue={handleChangeValue}
                  handleAddItemList={handleAddItemList}
                  handleRemoveItemList={handleRemoveItemList}
                />
              </Grid>
              <Grid item xs={12}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {list.map((value) => (
                  <ListItem
                    key={value}
        
                    secondaryAction={
                      <IconButton aria-label="comment"  onClick={handleRemoveItemList(value.id)}>
                        <CloseIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${value.name} ${value.type} ${value.numbers} ${value.units}`} />
                  </ListItem>
                ))}
              </List>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2, color: '#fff', boxShadow: 'none' }} 
            >
              Добавить
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
}

export default AddMaterial;