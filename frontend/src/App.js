import './App.css';
//import {PrimeReactProvider} from 'primereact/api';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import ChangePass from './pages/changepass/ChangePass';
import DefaultLayout from './components/DefaultLayout';
import SimpleLayout from './components/SimpleLayout';
import RecoverPass from './pages/recoverpass/RecoverPass';

function App(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultLayout><Home/></DefaultLayout>}/>
                <Route path="/login" element={<SimpleLayout><Login/></SimpleLayout>}/>
                <Route path="/signup" element={<SimpleLayout><Signup/></SimpleLayout>}/>
                <Route path="/recoverpass" element={<SimpleLayout><RecoverPass/></SimpleLayout>}/>
                <Route path="changepass" element={<SimpleLayout><ChangePass/></SimpleLayout>}/>
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
