import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Avatar from '@mui/material/Avatar';
import { employeesAdd } from '../reducers/employeeReducer';
import routes from '../routes';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';

const dayRender = (text ='Выходной') => {
  const color = text != 'Выходной' ? '#039be5' : '#ef5350';
  return (
    <Box
      sx={{
        width : '1',
        height: '95%',
        bgcolor: color,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white'
      }}
    >
      <strong>{text}</strong>
      {text != 'Выходной' && <i>перерыв на обед 1ч</i>}
    </Box>
  );
}

const columns = [
  { field: 'id', headerName: 'id', width: 50 },
  { field: 'numberOrder', headerName: 'Номер Заказа', width: 150 },
  { field: 'dateTime', headerName: 'Дата и Время', width: 150 },
  { field: 'serviceName', headerName: 'Название услуги', width: 150 },
  { field: 'number', headerName: 'Количество', width: 150 },
  { field: 'sumPrice', headerName: 'Сумма', width: 150 },
  { field: 'status', headerName: 'Статус', width: 150 },
  { field: 'fio', headerName: 'Заказчик', width: 150 },
  { field: 'phone', headerName: 'Телефон', width: 150 },
  { field: 'sotrudnik', headerName: 'Сотрудник', width: 150 },
];
const orders = [
  {id: 1, numberOrder: 12, dateTime: '12.05.2022 08:57', serviceName: 'Печать кружек', number: 2, sumPrice: 600, status: 'Не готов', fio: 'Семен Слепаков', phone: '+7778053311', sotrudnik: 'Дэвид Крокфорд'},
  {id: 2, numberOrder: 12, dateTime: '12.05.2022 08:57', serviceName: 'Печать кружек', number: 2, sumPrice: 600, status: 'Не готов', fio: 'Семен Слепаков', phone: '+7778053311', sotrudnik: 'Дэвид Крокфорд'},
  {id: 3, numberOrder: 12, dateTime: '12.05.2022 08:57', serviceName: 'Печать кружек', number: 2, sumPrice: 600, status: 'Не готов', fio: 'Семен Слепаков', phone: '+7778053311', sotrudnik: 'Дэвид Крокфорд'},
  {id: 4, numberOrder: 12, dateTime: '12.05.2022 08:57', serviceName: 'Печать кружек', number: 2, sumPrice: 600, status: 'Не готов', fio: 'Семен Слепаков', phone: '+7778053311', sotrudnik: 'Дэвид Крокфорд'},
]

const EmployeesLayout = () => {
  const dispatch = useDispatch();
  const [graphIsOpen, setGraphIsOpen] = React.useState(false);
  const handleToggle = () => {
    setGraphIsOpen(!graphIsOpen);
  }
  const employees = useSelector((state) => state.employee);

  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(routes('getEmployees'));    
        dispatch(employeesAdd(response.data))
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  return (
    <>
      <Box
        sx={{mb: 2}}
      >
        <ToggleButton
          size='small'
          color="secondary"
          selected={graphIsOpen}
          onClick={handleToggle}
        >
          <CalendarMonthIcon  fontSize='small' sx={{mr:1}}/>
          График
        </ToggleButton>      
      </Box>
      <DataTable
        columns={columns}
        rows={orders}
      />
    </>
  )
}

export default EmployeesLayout;