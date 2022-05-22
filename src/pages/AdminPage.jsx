import React from "react";
import Tabs from '../components/Tabs';
import Button from '@mui/material/Button';
import Typography  from "@mui/material/Typography";
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog } from "../reducers/uiReducer";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { activeTabname } = useSelector((state) => state.ui);
  const handleOpenDialog = () => {
    const tabnameToDialog = {
      'employee':'addEmployeeForm',
      'stock': 'addStockForm'
    }
    const tabname = tabnameToDialog[activeTabname]
    dispatch(openDialog(tabname));
  }
  return (
    <>
      <Box
        sx={{display: 'flex', justifyContent: 'space-between', padding: 2}}
      >
        <Typography variant="h6">Администратор</Typography>
        <div>
        <Button 
          variant="outlined"
          startIcon={<AddIcon />}
          size="small"
          color="secondary"
          sx={{mr:1}}
          onClick={handleOpenDialog}
        >
          Добавить
        </Button>
        <Button 
          variant="outlined"
          startIcon={<DeleteIcon />}
          size="small"
          color='error'
        >
          Удалить
        </Button>
        </div>
      </Box>  
      <Tabs />
    </>
  )
};

export default AdminPage;
