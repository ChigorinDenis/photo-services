import  React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EmployeesLayout from '../layouts/EmployeesLayout';
import StockLayout from '../layouts/StockLayout';
import AddEmployeeForm from '../layouts/AddEmployeeForm';
import AddStockForm from '../layouts/AddStockForm';
import OrdersLayout from '../layouts/OrdersLayout';
import ServiceLayout from '../layouts/ServiceLayout';
import StatisticLayout from '../layouts/StatisticLayout';
import DiscountLayout from '../layouts/DiscountLayout';
import ClientLayout from '../layouts/ClientsLayout';
import { changeTabname } from '../reducers/uiReducer'
import { employeeAdd } from '../reducers/employeeReducer';
import { stockAllAdd } from '../reducers/stockReducer';
import routes from '../routes';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(routes('getStock'));    
        dispatch(stockAllAdd(response.data))
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);

  const theme = useTheme();
  
  const [value, setValue] = React.useState(0);
   const handleChange = (event, newValue = 0) => {
    const indexToTabname = {
      0: 'employee',
      1: 'stock',
      2: 'service',
      3: 'order',
      4: 'discount',
      5: 'client',
      6: 'statistic',
      
    }
    setValue(newValue);
    const tabname = indexToTabname[newValue];
    dispatch(changeTabname(tabname));
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          sx={{bgcolor: 'white', color: '#212121'}}
        >
          <Tab label="Сотрудники" {...a11yProps('employee')} />
          <Tab label="Склад" {...a11yProps('stock')} />
          <Tab label="Услуги" {...a11yProps('service')} />
          <Tab label="Заказы" {...a11yProps('order')} />
          <Tab label="Скидки" {...a11yProps('discount')} />
          <Tab label="Клиенты" {...a11yProps('client')} />
          <Tab label="Отчеты" {...a11yProps('order')} />
        </Tabs>
        
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <EmployeesLayout />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <StockLayout />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ServiceLayout />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <OrdersLayout />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <DiscountLayout />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <ClientLayout />
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          <StatisticLayout />
        </TabPanel>
        
      <AddEmployeeForm />
      <AddStockForm />
    </Box>
  );
}
