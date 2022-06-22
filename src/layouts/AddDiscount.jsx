import React, {useEffect} from 'react';
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
import { discountOneAdd } from '../reducers/discountReducer';
import { closeDialog } from '../reducers/uiReducer'
import { clientsAdd } from '../reducers/clientsReducer'


function AddDiscount(props) {
  const dispatch = useDispatch()
  const ui = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const services = useSelector((state) => state.service);
  const [status, setStatus] = React.useState('');
  const [client, setClient] = React.useState({});
  const clients = useSelector((state) => state.client);

  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get('http://localhost:8080/admin/get-all-clients');    
        dispatch(clientsAdd(response.data))
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };

  const handleClose = () => {
    dispatch(closeDialog('discount'));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const discount = {
      basis: data.get('basis'),
      size: data.get('size'),
      id_clienta: client,
      id_sotr: user.id,
      id_uslugi: status
    };
    try {   
      const response = await axios.post(`http://localhost:8080/sotrudnik/skidka/add`, discount);
      dispatch(discountOneAdd(response.data));
      alert('скидка добавлена');

    } catch(err) {    
      console.log(err);
    }
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={ui.dialogs['discount']}>
      <DialogTitle>Добавить скидку</DialogTitle>
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
                <FormControl fullWidth>
                <InputLabel >Услуга</InputLabel>
                  <Select
                    value={status}
                    label="Услуга"
                    onChange={handleChange}
                    fullWidth
                  > 
                  {services.map(({ id, name}) => {
                    return <MenuItem value={id}>{name}</MenuItem>
                  })} 
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel >Клиент</InputLabel>
                  <Select
                    value={client}
                    label="Клиент"
                    onChange={handleChangeClient}
                    fullWidth
                  > 
                  {clients.map(({ id, fio }) => {
                    return <MenuItem value={id}>{fio}</MenuItem>
                  })} 
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Основание"
                  name="basis"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Размер в %"
                  name="size"
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
              ОК
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
}

export default AddDiscount;