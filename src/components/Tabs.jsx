import * as React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
import { changeTabname } from '../reducers/uiReducer'
import { employeeAdd } from '../reducers/employeeReducer';

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
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
   const handleChange = (event, newValue = 0) => {
    const indexToTabname = {
      0: 'employee',
      1: 'stock'
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
          <Tab label="Заказы" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <EmployeesLayout />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <StockLayout />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <OrdersLayout />
        </TabPanel>
      <AddEmployeeForm />
      <AddStockForm />
    </Box>
  );
}
