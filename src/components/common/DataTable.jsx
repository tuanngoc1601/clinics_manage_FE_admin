import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

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
            />
        </ThemeProvider>
    );
};

export default DataTable;
