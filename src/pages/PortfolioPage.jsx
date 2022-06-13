import * as React from 'react';
import MainFeaturedPost from '../components/MainFeaturedPost';
import { Container } from '@material-ui/core';
// import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ImageBox from '../components/ImageBox'
import { ru } from 'date-fns/locale'

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

  const [value, setValue] = React.useState(new Date());

  return (
    <Container>
      
      <Box sx={{display: 'flex', mt: 5}}>
        <div style={{width: '100%', height: '100%'}}>
          <MainFeaturedPost  post={mainFeaturedPost} />
        </div>
      
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}
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
    </LocalizationProvider>
    </Box>
    <Box sx={{display: 'flex', mt: 5,mb: 15, gap: 5}}>
      <Box>
        <Typography variant='h5' sx={{ color: 'grey.900', mb: 2 }}>Мои работы</Typography>
        <ImageBox cols={5} />
      </Box>
      
      <Box sx={{width: '40%'}}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
          <Typography variant="h6" gutterBottom>
            Обо мне
          </Typography>
          <Typography>
            Мне 27 лет. Работаю фотографом уже более 5 лет. Профессионально подхожу к делу, ищу компромиссы в цветопередаче. 
            Пусть ваши воспоминания будут запечатлены.
          </Typography>
        </Paper>
        <Box sx={{mt: 5}}>
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
    
    </Container>
  )
};

export default PortfolioPage;