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
import ToggleButton from '@mui/material/ToggleButton';
import AddSheduleForm from './AddSheduleForm';
import Datepicker from '../components/Datepicker';
import { openDialog } from '../reducers/uiReducer';
import { selectEmployee } from '../reducers/uiReducer';
import { sheduleAdd } from '../reducers/sheduleReducer';

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
const columnsGraph = [
  { field: 'username', headerName: 'Пользователь', width: 200, renderCell: (params)=> {
    return (
      <>
        <Avatar
          alt={params.row.username}
          src={`http://localhost:8080${params.row.avatarImagePath}`}
          sx={{mr:2}}
        />
        <span>{params.row.username}</span>
      </>
    ) }},
  { field: 'post', headerName: 'Должность', width: 150 },
  { field: 'day1', headerName: 'Пн 23', headerAlign: 'center', width: 200, renderCell: (params)=> {
    return dayRender(params.row.day1);
  }},
  { field: 'day2', headerName: 'Вт 24', headerAlign: 'center', width: 200, renderCell: (params)=> {
    return dayRender(params.row.day2);
  }},
  { field: 'day3', headerName: 'Ср 25', headerAlign: 'center', width: 200, renderCell: (params)=> {
    return dayRender(params.row.day3);
  }},
  { field: 'day4', headerName: 'Чт 26', headerAlign: 'center', width: 200, renderCell: (params)=> {
    return dayRender(params.row.day4);
  }},
  { field: 'day5', headerName: 'Пт 27', headerAlign: 'center', width: 200, renderCell: (params)=> {
    return dayRender(params.row.day5);
  }},
  { field: 'day6', headerName: 'Вт 28', headerAlign: 'center', width: 200, renderCell: (params)=> {
    return dayRender(params.row.day6);
  }},
  { field: 'day7', headerName: 'Ср 29', headerAlign: 'center', width: 200, renderCell: (params)=> {
    return dayRender();
  }},
]
const columnsInfo = [
  { field: 'id', headerName: 'id', width: 50 },
  { field: 'username', headerName: 'Пользователь', width: 200, renderCell: (params)=> {
    return (
      <>
        <Avatar
          alt={params.row.username}
          src={`http://localhost:8080${params.row.avatarImagePath}`}
          sx={{mr:2}}
        />
        <span>{params.row.username}</span>
      </>
    ) }},
  { field: 'fio', headerName: 'ФИО', width: 300 },
  { field: 'post', headerName: 'Должность', width: 150 },
  { field: 'phone', headerName: 'Номер телефона', width: 150 },
  { field: 'oklad', headerName: 'Оклад', width: 150 },
  { field: 'premiya', headerName: 'Премия', width: 150 },
  { field: 'control', headerName: '', width: 150, renderCell: (params) => {
    const dispatch = useDispatch();
    return (
      <IconButton color='secondary'>
        <CalendarMonthIcon onClick={() => {
          dispatch(selectEmployee({ id: params.row.id, fio: params.row.fio }));
          dispatch(openDialog('shedule'));
        }}/>
      </IconButton>
    )
  } },
  
];

const EmployeesLayout = () => {
  const dispatch = useDispatch();
  const [graphIsOpen, setGraphIsOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date());

  const handleToggle = () => {
    setGraphIsOpen(!graphIsOpen);
  }
  const handleOpenShedule = (id) => () => {
    dispatch(openDialog('shedule'));
  }
  const employees = useSelector((state) => state.employee);
  const employeesGraph = employees
    .map((employee) => ({
      id: employee.id,
      username: employee.username,
      post: employee.post,
      avatarImagePath: employee.avatarImagePath,
      day1: '09:00 - 18:00',
      day2: '09:00 - 18:00',
      day3: '09:00 - 18:00',
      day4: '09:00 - 18:00',
      day5: '09:00 - 18:00',
      day6: '09:00 - 18:00',
      day7: '09:00 - 18:00',
    }));

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

  const handleGetShedules =  () => {
      axios.all(employees.map(({ id }) => axios.get(routes('getShedules')(id, '13.05.2022'))))
        .then(axios.spread((...responses) => {
          responses.map(( data) => console.log(data))
        }))
        .catch(errors => console.log(errors))
      
    }
        
   
  return (
    <>
      <Box
        sx={{mb: 2 ,display: 'flex', justifyContent: 'space-between'}}
      >
        <ToggleButton
          size='small'
          color="secondary"
          selected={graphIsOpen}
          onClick={() => {
            handleToggle();
            handleGetShedules();
          }}
        >
          <CalendarMonthIcon  fontSize='small' sx={{mr:1}}/>
          График
        </ToggleButton>
        {graphIsOpen && <Datepicker value={value} /> }   
      </Box>
      <DataTable
        columns={graphIsOpen ? columnsGraph : columnsInfo}
        rows={graphIsOpen ? employeesGraph : employees }
      />
      <AddSheduleForm />
    </>
  )
}

export default EmployeesLayout;