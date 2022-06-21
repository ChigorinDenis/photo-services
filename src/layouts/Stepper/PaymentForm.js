import * as React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';
import {  ru } from 'date-fns/locale'
import { Stack } from '@mui/material';

export default function PaymentForm(props) {
  const [value, setValue] = React.useState(new Date());
  const [times, setTimes] = React.useState([]);
 
  const { fotosession, setFotosession } = props;
  const handleAddGrafiks = (id) => {
    const { grafiks } = fotosession;
    if (grafiks.includes(id)) {
      setFotosession({
        ...fotosession,
        grafiks: grafiks.filter((grafik) => grafik != id)
      })
      return;
    }
    setFotosession({
      ...fotosession,
      grafiks: [...grafiks, id]
    })
  }
  
  const handleGetTime = async () => {
    const tommorow = new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1)
    try {
      const response = await axios.get(`http://localhost:8080/admin/sotrudnik/7/get-grafik/from/${format(value, 'dd.MM.yyyy')}/to/${format(tommorow, 'dd.MM.yyyy')}`);
      const times =  response.data.map((item) => ({id: item.id, time: format(new Date(item.data), 'hh:mm'), type: item.type}))
      setTimes(times);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>      
            <StaticDatePicker
              ampmInClock={true}
              openTo="day"
              toolbarTitle="Выберите дату"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                handleGetTime();
              }}
              renderInput={(params) => <TextField {...params} />}
            />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2">Выберите время</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: 10,
              mt:5
            }}
          >
            <Typography variant="body2" fullWidth sx={{mt: 3}}>Доступное для записи время</Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                mt:3
              }}>
                {times.map(({id, time, type}) => {
                  return (
                    <Chip
                      label={time}
                      color={fotosession.grafiks.includes(id) ? "secondary": "primary"}
                      disabled={type === 'BUSY'}
                      onClick={() => {
                        handleAddGrafiks(id);
            
                      }}
                      />
                  )
            })}
            </Box>
            
             
          </Box>
        
        </Grid>
        <Grid item xs={12} md={6}>
    
        </Grid>
        <Grid item xs={12} md={6}>
       
        </Grid>
        <Grid item xs={12}>
       
        </Grid>
      </Grid>
      </LocalizationProvider>
    </React.Fragment>
  );
}