import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Avatar from '@mui/material/Avatar';
import { employeesAdd } from '../reducers/employeeReducer';
import routes from '../routes';

const columns = [
  { field: 'id', headerName: 'id', width: 150 },
  { field: 'username', headerName: 'Имя пользователя', width: 150 },
  { field: 'fio', headerName: 'ФИО', width: 150 },
  { field: 'post', headerName: 'Должность', width: 150 },
  { field: 'phone', headerName: 'Номер телефона', width: 150 },
  { field: 'oklad', headerName: 'Оклад', width: 150 },
  { field: 'premiya', headerName: 'Премия', width: 150 },
  { field: 'avatarImagePath', headerName: 'Ава', width: 150, renderCell: (params)=> {
    return (
        <Avatar alt="Remy Sharp" src={`http://localhost:8080${params.row.avatarImagePath}`} />
      ) }},
];

const EmployeesLayout = () => {
  const dispatch = useDispatch();
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
    <DataTable
      columns={columns}
      rows={employees}
    />
  )
}

export default EmployeesLayout;