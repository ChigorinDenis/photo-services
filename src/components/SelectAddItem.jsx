import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function SelectAddItem({values, value, numbers, handleChangeNumbers, handleChangeValue, handleAddItemList }) {

  return (
    <Box sx={{ display: 'flex', gap: '20px', minWidth: '400px' }}>
      <FormControl fullWidth>
        <InputLabel>Материалы</InputLabel>
        <Select
          value={value}
          label="Материалы"
          onChange={handleChangeValue}
        >
            {values.map((value) => (
                <MenuItem value={value.id}>{value.name}{value.type}</MenuItem>           
            ))}
        </Select>
      </FormControl>
      <TextField
        required
        fullWidth
        label="Количество"
        name="name"
        value={numbers}
        onChange={handleChangeNumbers}
       />
        <Button 
            variant="contained"
            color="info"
            onClick={handleAddItemList}
        >
          <AddIcon />
        </Button>
          
    </Box>
  );
}