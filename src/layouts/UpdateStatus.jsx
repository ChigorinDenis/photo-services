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
import { statusUpdate } from '../reducers/ordersReducer';
import { closeDialog } from '../reducers/uiReducer'
import { host } from '../routes'


function UpdateStatus(props) {
  const dispatch = useDispatch()
  const ui = useSelector((state) => state.ui);
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };


  const handleClose = () => {
    dispatch(closeDialog('status'));
  };

  const handleSubmit = async (event) => {
    const { dialogsData } = ui;
    event.preventDefault();
    const urlUpdate = `${host}/client/update-zakaz-status/${dialogsData.id}/${status}`;
    const urlCancel = `${host}/admin/set-cancel-status-zakaz/${dialogsData.id}`
    const url = status === 'CANCELED' ? urlCancel : urlUpdate;

    try {   
      const response = await axios.get(url);
      const { completeDate, issueDate } = response.data;
      dispatch(statusUpdate({ id: dialogsData.id, status, completeDate, issueDate}));  
    } catch(err) {    
      console.log(err);
    }
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={ui.dialogs['status']}>
      <DialogTitle>Изменить статус</DialogTitle>
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
              <FormControl sx={{width: '200px'}}>
              <InputLabel>Статус</InputLabel>
                <Select
                  value={status}
                  label="Статус"
                  onChange={handleChange}
                >
                  <MenuItem value={'COMPLETE'}>Завершено</MenuItem>
                  <MenuItem value={'ISSUED'}>Выполнено</MenuItem>
                  <MenuItem value={'CANCELED'}>Отменено</MenuItem>
                </Select>
            </FormControl>
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

export default UpdateStatus;