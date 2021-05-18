import React, { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
 
    const snackOpen = () => {
        setOpen(true);
    }

    const snackClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        fetchCustomers();
    }, []);


    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers/')
        .then(response => response.json())
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))
    };

    const deleteCustomer = (url) => {
        if(window.confirm('Are you sure? The selected item will be lost forever!')) {
            fetch(url,
            { method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchCustomers();
                    setMsg('Customer removed');
                    snackOpen();
                } else {
                    alert('Something went wrong');
                }
            })
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: {'Content-Type' : 'application/json'}
        })
        .then(_=> fetchCustomers())
        .catch(err => console.error(err))
    }

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: {'Content-Type' : 'application/json'}
        })
        .then(_=> fetchCustomers())
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            field:'links.href',
            width: 100,
            cellRendererFramework: params =>
            <EditCustomer link={params.value} customer={params.data} updateCustomer={updateCustomer} />
        },
        {
            headerName: '',
            field:`links.href`,
            width: 100,
            cellRendererFramework: params => 
            <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon/>
            </IconButton>
        }
    ]

    return(
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto'}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}
                    floatingFilter={true}
                    suppressCellSelection={true}
                    />
            </div>
            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={snackClose}
                />

        </div>
    )

}

export default Customerlist;