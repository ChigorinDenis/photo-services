import * as React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { format, addHours } from 'date-fns';
import {  ru } from 'date-fns/locale'
import routes from '../../routes';


export default function PaymentForm(props) {
  const [value, setValue] = React.useState(new Date());
  const [times, setTimes] = React.useState([]);
  const { selectedEmployee } = useSelector(state => state.ui);
 
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
    const url = routes('getShedulesBetweenDates')(selectedEmployee.id, format(value, 'dd.MM.yyyy'), format(tommorow, 'dd.MM.yyyy'));
    try {
      const response = await axios.get(url);
      const times =  response.data.map((item) => {
        const startDate = new Date(item.data)
        const endDate =  addHours(startDate, 1);
        const time = `${format(startDate, 'HH:mm')}-${format(endDate, 'HH:mm')}`
        return {
          id: item.id,
          time,
          type: item.type
        }})
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
                gap: 2,
                mt:3
              }}>
                {times.map(({id, time, type}) => {
                  return (
                    <Chip
                      key={id}
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