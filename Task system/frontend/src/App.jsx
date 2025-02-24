
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/login';
import CreateTask from './components/CreateTask';


import ForgotPassword from './components/ForgotPassword';
import TaskManager from './components/TaskManager';

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
     
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
