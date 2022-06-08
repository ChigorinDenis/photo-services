import React from 'react';
import { DataGrid, ruRU, GridToolbar } from '@mui/x-data-grid';

export default function DataTable(props) {
  const { rows, columns } = props;
  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        expandableRows={true}
        components={{
          Toolbar: GridToolbar,
        }}
   
      />
    </div>
  );
}