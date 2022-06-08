import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import routes from '../routes';
import { serviceItemAdd } from '../reducers/serviceReducer';
import { closeDialog } from '../reducers/uiReducer'


function AddService(props) {
  const dispatch = useDispatch()
  const ui = useSelector((state) => state.ui);
  const [post, setPost] = React.useState('');
  

  const handleChange = (event) => {
    setPost(event.target.value);
  };

  const handleClose = () => {
    dispatch(closeDialog('service'));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const service = {
      name: data.get('name'),
      price: data.get('price'),
      duration: data.get('duration'),
      numbers: 1
    };
   

    const url = routes('addService')(1);
    console.log(url)
    try {
       const response = await axios.post(url, service);
       dispatch(serviceItemAdd(response.data));    
    } catch (error) {
      console.log(error)
    }
    handleClose();
  };
  return (
    <Dialog onClose={handleClose} open={ui.dialogs['service']}>
      <DialogTitle>Добавить услугу</DialogTitle>
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
                <TextField
                  required
                  fullWidth
                  label="Название"
                  name="name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Цена"
                  name="price"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Длительность"
                  name="duration"
                  type='number'
                />
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

export default AddService;


