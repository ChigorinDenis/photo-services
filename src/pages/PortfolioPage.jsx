import * as React from 'react';
import MainFeaturedPost from '../components/MainFeaturedPost';
import { Container } from '@material-ui/core';
// import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ImageBox from '../components/ImageBox'

import Checkout from '../layouts/Stepper/Checkout';

const mainFeaturedPost = {
  title: 'Фотограф Михаил',
  description:
    "Вдохновляют улыбки и радость людей.",
  image: '/img/photographer1.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const social = [
  { name: 'Instagram', icon: InstagramIcon },
  { name: 'Twitter', icon: TwitterIcon },
  { name: 'Facebook', icon: FacebookIcon },
];

const PortfolioPage = () => {

 

  return (
    <Container>
      
      <Box sx={{display: 'flex', mt: 5, gap: 2}}>
        <div style={{width: '100%', height: '100%'}}>
          <MainFeaturedPost  post={mainFeaturedPost} />
        </div>
      
      {/* <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}
      >
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <StaticDatePicker
          ampmInClock={true}
          openTo="day"
          toolbarTitle="Выберите дату"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button  
          variant="contained"
          color='secondary'
        >
          Записаться
        </Button>
      </Box>
    </LocalizationProvider> */}
    <Box sx={{display: 'flex', flexDirection: 'column', width: '300px', justifyContent:'flex-start', gap: 20}}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
          <Typography variant="h6" gutterBottom>
            Обо мне
          </Typography>
          <Typography>
            Работаю фотографом уже более 5 лет. Профессионально подхожу к делу, ищу компромиссы в цветопередаче. 
            Пусть ваши воспоминания будут запечатлены.
          </Typography>
        </Paper>
        
        <Box>
          {social.map((network) => (
            <Link
              display="block"
              variant="body1"
              href="#"
              key={network.name}
              sx={{ mb: 0.5 }}
            >
              <Stack direction="row" spacing={1} alignItems="center" >
                <network.icon  color='secondary'/>
                <span>{network.name}</span>
              </Stack>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
    <Box sx={{display: 'flex'}}>
      {/* <Box>
        <Typography variant='h5' sx={{ color: 'grey.900', mb: 2 }}>Мои работы</Typography>
        <ImageBox cols={5} />
      </Box> */}
      <Checkout />
      <Box sx={{width: '40%'}}>
        
        
      </Box>
      
    </Box>
    
    </Container>
  )
};

export default PortfolioPage;