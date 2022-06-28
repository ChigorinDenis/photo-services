import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, CardActions } from '@mui/material';

export default function AddressForm(props) {
  const [ type, setType ] = React.useState('');
  const { fotosession, setFotosession } = props
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Выберите фотосессию
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="/img/instudio.png"
                alt="Фотосессия в студии"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  В салоне
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Фотосессия в профессиональной студии. Получите максимально 
                  правильно выстроенные по свету и цвету фотографии.
                </Typography>
              </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Button size="small" color="primary" onClick={() => {
                setType('s1');
                setFotosession({
                  ...fotosession, 
                  id_usl: 9  
                });
              }
                
                }>
                Выбрать
              </Button>
              {type==='s1' && <CheckCircleOutlineIcon  color='primary' />}
            </CardActions>
          </Card>
          
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ maxWidth: 345 }} variant="outlined">
              <CardMedia
                component="img"
                height="140"
                image="/img/viezd.jpg"
                alt="Выездная фотосессия"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Выездная
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Запечатлите важные торжественные события вашей жизнь. Пусть счастливые моменты
                  останутся навсегда с вами.
                </Typography>
              </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Button size="small" color="primary"  onClick={() => {
                setType('s2')
                setFotosession({
                  ...fotosession, 
                  id_usl: 10  
                });
                }}>
                Выбрать
              </Button>
              {type==='s2' && <CheckCircleOutlineIcon  color='primary' />}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
    
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

