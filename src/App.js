import React, { useState } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';

function App() {

  const [value, setValue] = useState('CustomerList');

  const handleChange = (e, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <ToolBar>
          <Typography variant="h6">
            Personal training
          </Typography>
          <Tabs value={value} onChange={handleChange} className="links">
            <Tab value="CustomerList" label="Customers" />
            <Tab value="TrainingList" label="Trainings" />
          </Tabs>
        </ToolBar>
      </AppBar>
      <div className="page-content">
        {value === "CustomerList" && <CustomerList />}
        {value === "TrainingList" && <TrainingList />}
      </div>
      
    </div>
  );
}

export default App;
