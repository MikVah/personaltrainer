import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Moment from 'react-moment';

import EditTraining from './EditTraining';
import AddTraining from './AddTraining';


function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, []);

    const openSnack = () => {
        setOpen(true);
    }

    const closeSnack = () => {
        setOpen(false);
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(responseData => setTrainings(responseData))
        .catch(err => console.error(err))
    };

    const deleteTraining = (url) => {
        if(window.confirm('Are you sure? Items will be deleted.')) {
            fetch('https://customerrest.herokuapp.com/api/trainings', 
                {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchTrainings();
                    setMsg('Training activity deleted');
                    openSnack();
                }
                else {
                    alert('Something went wrong');
                }
            })
            .catch(err => console.error(err))
        }
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(_ => fetchTrainings())
        .catch(err => console.error(err))
    }

    const editTraining = (editedTraining) => {
        fetch('http://customerrest.herokuapp.com/api/trainings', 
        {
            method: 'PUT',
            body: JSON.stringify(editedTraining),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(_ => fetchTrainings())
        .catch(err => console.error(err))
    }

    const columns = [
        { field: 'date', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: true },
        { field: 'customer.firstname', sortable: true, filter: true },
        { field: 'customer.lastname', sortable: true, filter: true },
        {
                headerName: '',
                field:'links.href',
                width: 100,
                cellRendererFramework: params =>
                <EditTraining link={params.value} training={params.data} editTraining={editTraining} />
            },
            {
                headerName: '',
                field:'links.href',
                width: 100,
                cellRendererFramework: params => 
                <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon/>
                </IconButton>
            }
        ]

    return(
        <div>
        <AddTraining addTraining={addTraining} />
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={trainings}
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
            onClose={closeSnack}
    />
    </div>
    )
}

export default Traininglist;