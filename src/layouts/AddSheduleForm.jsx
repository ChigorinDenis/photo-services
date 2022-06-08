import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Input } from '@mui/material';
import  Typography  from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import routes from '../routes';
import DataTable from '../components/DataTable';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { stockItemAdd } from '../reducers/stockReducer';
import { closeDialog } from '../reducers/uiReducer'
import { ru } from 'date-fns/locale'


function AddSheduleForm(props) {
  const dispatch = useDispatch()
  const ui = useSelector((state) => state.ui);
  const { selectedEmployee } = ui;
  const date = new Date()
  const [startTime, setStartTime] = React.useState(date);
  const [endTime, setEndTime] = React.useState(date);
  const [isNonstop, setIsNonstop] = React.useState(false);
  const [isSevenDays, setIsSevenDays] = React.useState(false);
  const [fullWeek, setFullWeek] = React.useState(false);
  

  const handleClose = () => {
    setFullWeek(false);
    dispatch(closeDialog('shedule'));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = routes('addShedule');
    const someData = new FormData(event.currentTarget);
    const discreteTimes = calcDiscreteTime(startTime, endTime, isNonstop);
    const dates = calcDateTime(startTime, discreteTimes, fullWeek, isSevenDays);
    const data = {
        idSotr: selectedEmployee.id,
        dates
    }
    console.log(data);
    try {
      const response = await axios.post(url, data);
      alert('Записи добавлены');
    } catch (error) {
      console.log(error);
    }
    setFullWeek(false);
    handleClose();
  };

  const calcDiscreteTime = (startTime, endTime, isNonstop) => {
    const startTimeHours = startTime.getHours();
    const endTimeHours = endTime.getHours();
    const minutes = startTime.getMinutes();
    let hours = startTimeHours;
    let count = 0;
    const discreteTimes = [];
    while (hours < endTimeHours) {
        if (isNonstop || count != 4) {
            discreteTimes.push([hours, minutes]);
        }    
        hours += 1;
        count += 1;
    }
    return discreteTimes;
  }

  const calcDateTime = (startDate, discreteTimes, fullWeek, isSevenDays) => {
      const year = startDate.getFullYear();
      const month = startDate.getMonth();
      const date = startDate.getDate();
      const countDays = fullWeek ? 7 : 1;
      let count = 0;
      let dateTime = [];
      while (count < countDays) {
        const oneDayTime = discreteTimes.reduce((acc, time) => {
            const [hours, minutes] = time;
            const newDate = new Date(year, month, date + count, hours, minutes);
            const day = newDate.getDay();
            if (isSevenDays || (day != 0 && day != 6)) {
                return [...acc, dateFormat(newDate)]
            }
            return acc;
        }, []);
        dateTime = [...dateTime, ...oneDayTime]
        count += 1;
      }
     return dateTime;
  }

  const dateFormat = (startDate) => {
      const doubleDigit = (num) => ( num < 10 ? `0${num}`: num);
      const year = startDate.getFullYear();
      const month = doubleDigit(startDate.getMonth());
      const date = doubleDigit(startDate.getDate());
      const hours = doubleDigit(startDate.getHours());
      const minutes = doubleDigit(startDate.getMinutes());
      return { date: `${date}.${month}.${year} ${hours}:${minutes}` };
  }

  return (
    <Dialog onClose={handleClose} open={ui.dialogs['shedule']} fullWidth>
      <DialogTitle>График работы</DialogTitle>
      <Container component="main" >
          <Typography variant='subtitle2' sx={{mb:2}}>
              Сотавления графика для сотрудника c именем <i>{selectedEmployee.fio}</i>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} fullWidth>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                    control={<Switch  value={fullWeek} onChange={() => {setFullWeek(!fullWeek)}}/>}
                    label="на всю неделю"
                    color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                    label="Начало рабочего дня"
                    value={startTime}
                    onChange={(newValue) => {
                     setStartTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth/>}
                />
             </Grid>
             <Grid item xs={6}>
                <TimePicker
                    label="Конец рабочего дня"
                    value={endTime}
                    onChange={(newValue) => {
                        setEndTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox   value={isNonstop} onChange={() => {setIsNonstop(!isNonstop)}} />}
                    label="без перерыва"
                    color='secondary'
                />
                {fullWeek && <FormControlLabel
                    control={<Checkbox  value={isSevenDays} onChange={() => {setIsSevenDays(!isSevenDays)}} />}
                    label="без выходных"
                    color='secondary'
                />}
            </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2, color: '#fff', boxShadow: 'none' }} 
            >
              Подтвердить
            </Button>
            </LocalizationProvider>
          </Box>

      </Container>
    </Dialog>
  );
}

export default AddSheduleForm;