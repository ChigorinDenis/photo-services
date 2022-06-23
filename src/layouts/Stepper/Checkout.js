import * as React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';


const steps = ['Вид услуги', 'Время записи'];


const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [fotosession, setFotosession ] = React.useState({grafiks: []})
  const { selectedEmployee } = useSelector(state => state.ui)
  const { user } = useSelector(state => state.auth);
  const clients = useSelector((state) => state.client);
  const client = clients.find((f) => f.username === user?.username)

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleAddOrder = async () => {
    const order = {
      id_sotr: selectedEmployee.id,
      id_client: client.id,
      id_usl: fotosession.id_usl,
      grafiks: fotosession.grafiks.map((id) => ({id}))
    }
    try {
      const response = await axios.post(`http://localhost:8080/client/add-to-photograph`, order);
      alert('заказ размещен')
    } catch (error) {
      console.log(error)
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm  fotosession={fotosession} setFotosession={setFotosession}/>;
      case 1:
        return <PaymentForm  fotosession={fotosession} setFotosession={setFotosession}/>;
      case 2:
        return <Review  fotosession={fotosession} setFotosession={setFotosession}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
   
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{  p: { xs: 2,  } }}>
          <Typography component="h1" variant="h6" align="center">
            Запись на фотосессию
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Спасибо за запись на фотосессию
                </Typography>
                <Typography variant="subtitle1">
                  Ваша заявка принята.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Назад
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={() => {
                      handleNext();
                      if (activeStep === steps.length - 1) {
                        handleAddOrder();
                      }
                      
                    }
                    }
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Разместить заказ' : 'Далее'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
  );
}