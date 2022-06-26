import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { employeesAdd } from '../reducers/employeeReducer';
import routes from '../routes';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ToggleButton from '@mui/material/ToggleButton';
import AddSheduleForm from './AddSheduleForm';
import Datepicker from '../components/Datepicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { openDialog } from '../reducers/uiReducer';
import { selectEmployee } from '../reducers/uiReducer';
import { sheduleAdd } from '../reducers/sheduleReducer';
import groupBy from 'lodash.groupby';
import { format, add} from 'date-fns';
import { TextField } from '@mui/material';





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
  const [shedule, setShedule] = React.useState([]);


  const handleToggle = () => {
    setGraphIsOpen(!graphIsOpen);
  }

  const handleOpenShedule = (id) => () => {
    dispatch(openDialog('shedule'));
  }

  const buildWeekDays = (day) => {
    const weekDays = Array(7).fill(day)
      .map((date, index ) => {
        const newDate = add(date, { days: index});
        return format(newDate, 'yyyy-MM-dd');
      })
    return weekDays;
  }

  const sevenDays = buildWeekDays(value);
  const weekDays = sevenDays.map((day, index) => {
    return { field: `day${index}` ,headerName: format(new Date(day), 'dd.MM.yyyy'), headerAlign: 'center', width: 400, renderCell: (params)=> {
      const  d = params.row.week[day];
      return (
        <Box
          sx={{
            display:'flex',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          { d && d.map((item) => {
            const time = format(new Date(item.data), 'HH:mm')
            return (
              <Chip
                label={time}
                color="primary"
                // variant='outlined'
                size='small'
                disabled={item.type === 'BUSY'}
                />
              )
          })}
         </Box>
      );   
    }}
  })
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
    ...weekDays   
  ]

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

  const handleGetShedules =  async () => {
    const employeesGraph = employees
    .map((employee) => ({
      id: employee.id,
      username: employee.username,
      post: employee.post,
      avatarImagePath: employee.avatarImagePath,
    }));

    const startDate = format(value, 'dd.MM.yyyy');
    const endDate = format(add(value, { days: 7 }), 'dd.MM.yyyy');

    await axios.all(employees.map(({ id }) => axios.get(routes('getRangeShedules')(id, startDate, endDate))))
      .then(axios.spread((...responses) => {
        responses.map(({ data }, index) => {
          const weekGraph = groupBy(data, ({ data }) => (data.slice(0, 10)));
          employeesGraph[index].week = weekGraph
        })
      }))
      .catch(errors => console.log(errors))
      setShedule(employeesGraph);
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
         
      </Box>
      <DataTable
        columns={graphIsOpen ? columnsGraph : columnsInfo}
        rows={graphIsOpen ? shedule : employees }
        rowHeight={80}
        heightTable={'650px'}
      />
      <AddSheduleForm />
    </>
  )
}

export default EmployeesLayout;