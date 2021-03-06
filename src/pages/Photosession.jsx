import React, { useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import routes from '../routes';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { format, addHours } from 'date-fns';
import {  ru } from 'date-fns/locale'
import Grid from '@mui/material/Grid';
import Container from "@material-ui/core/Container";
import FeaturedPost from "../components/FeaturedPost";
import Card from '../components/Card'
import { Stack, Typography } from "@mui/material";
import { selectEmployee } from "../reducers/uiReducer";


const featuredPosts = 
  {
    date: 'Вдохновляют улыбки людей',
    description:
      'Если вас заитересовало мое творчество, то смелее записывайтесь ко мне на фотоссесии.',
    image: '/img/photographer1.jpg',
    imageLabel: 'Image Text',
  };

const Photosession = () => {
  const employee = useSelector(state => state.employee);
  const photographers = employee
    .map((item) => ({...item, ...featuredPosts, title: `Фотограф ${item.fio}`}));
  const { selectedService, selectedEmployee } = useSelector(state => state.ui)
  const { isAuth, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(new Date());
  const [times, setTimes] = React.useState([]);
  const [grafiks, setGrafiks] = React.useState([]);
 
  const handleAddGrafiks = (id) => () => {
    if (grafiks.includes(id)) {
      setGrafiks(grafiks.filter((grafik) => grafik != id))
      return;
    }
    setGrafiks([...grafiks, id])
  }

  const handleGetTime = async () => {
    const tommorow = new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1);
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

  const handleAddOrder = async () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    const order = {
      id_sotr: selectedEmployee.id,
      id_client: user.id,
      id_usl: selectedService.id,
      grafiks: grafiks.map((id) => ({id}))
    }
    const url = routes('addOrderToPhotograph');
    try {
      const response = await axios.post(url, order);
      setTimes([]);
      setGrafiks([]);
      alert('заказ размещен');
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container >
      
      <Typography component="h1" variant="h6" color="inherit" gutterBottom sx={{ mt: 5, mb: 5}}>1. Запись на услугу</Typography>
      <Card card={selectedService}  isAction={false} />
      <Typography component="h1" variant="h6" color="inherit" gutterBottom sx={{ mt: 5, mb: 2}}>2. Выберите фотографа</Typography>
      {!selectedEmployee?.id && <Grid container spacing={4}>
          {photographers.map((post) => (
            <FeaturedPost key={post.id} post={post}/>
          ))}
      </Grid>}
      {selectedEmployee?.id && <>
        <FeaturedPost post={selectedEmployee}  portfolio={false} />
        <Button variant='text' onClick={() => { dispatch(selectEmployee({}))}} color="error">Отмена</Button>
      </>}
      <Typography component="h1" variant="h6" color="inherit" gutterBottom sx={{ mt: 5, mb: 2}}>3. Выберите дату и время</Typography>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt:5,
        mb:5
      }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>      
        <DesktopDatePicker
          label="Дата записи"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            handleGetTime();
          }}
          renderInput={(params) => <TextField {...params} />}
        />
          
      </LocalizationProvider>
        
        {/* <Typography variant="body2" fullWidth sx={{mt: 3}}>Доступное для записи время</Typography> */}
      <Stack direction="row" spacing={2}>
        {times.map(({id, time, type}) => {
          return (
            <Chip
              key={`$chip{id}`}
              label={time}
              color={grafiks.includes(id) ? "secondary": "primary"}
              disabled={type === 'BUSY'}
              onClick={
                handleAddGrafiks(id)
              }
            />
          )
        })}
      </Stack> 
      </Box> 
      <Button onClick={handleAddOrder} color="secondary" variant="contained" sx={{mb:10}}>Записаться</Button>
         
    </Container>
  )
}

export default Photosession;