import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';


function EditTraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: ''
    });

    

    const handleClickOpen = () => {
        console.log(props.training);
        setTraining({
            date: props.training.date,
            activity: props.training.activity,
            duration: props.training.duration
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.editTraining(props.link, training);
        setOpen(false);
    };

    const inputChanged = (e) => {
        setTraining({...training, [e.target.name]: e.target.value})
    }

return (
    <div>
        <Button color="primary" onClick={handleClickOpen}>
        <EditIcon />  
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit training activity</DialogTitle>
        <DialogContent>
            <TextField
                margin="dense"
                label="Date"
                name="date"
                value={training.date}
                onChange={inputChanged}
                fullWidth
                />
            <TextField
                margin="dense"
                label="Activity"
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                fullWidth
                />
            <TextField
                margin="dense"
                label="Duration"
                name="duration"
                value={training.duration}
                onChange={inputChanged}
                fullWidth
                />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
        </DialogActions>
        </Dialog>
    </div>
);
}

export default EditTraining;