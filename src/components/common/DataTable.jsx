import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DataTable = ({ columns, data, title, actions }) => {
    const defaultTheme = createTheme();
    const editData = data.map((item) => ({ ...item }));
    return (
        <ThemeProvider theme={defaultTheme}>
            <MaterialTable
                columns={columns}
                data={editData}
                title={title}
                actions={actions}
                options={{
                    rowStyle: {
                        fontSize: 14,
                    },
                }}
            />
        </ThemeProvider>
    );
};

export default DataTable;
