import React from 'react';
import { DataGrid, ruRU, GridToolbar } from '@mui/x-data-grid';

export default function DataTable(props) {
  const { rows, columns, onRowClick, width } = props;
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
        onRowClick={(params, event) => {
          onRowClick(params)
        }}
        width={width}
   
      />
    </div>
  );
}