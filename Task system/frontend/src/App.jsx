
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/login';
import CreateTask from './components/CreateTask';


import ForgotPassword from './components/ForgotPassword';
import TaskManager from './components/TaskManager';

import TrashPage from './components/TrashPage';
import UploadExcel from './components/UploadExcel';

import './App.css';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createtask" element={<CreateTask />} />
        
        <Route path="/taskmanager" element={<TaskManager />} /> 

        <Route path="/TrashPage" element={<TrashPage />} />
     
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path='/uploadExcel' element = {<UploadExcel/>}/>
        
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
