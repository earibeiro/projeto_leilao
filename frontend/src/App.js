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
import PrivateRouter from './components/PrivateRouter';
import Profile from './pages/profile/Profile';
import Admin from './pages/admin/Admin';

function App(){
    return(
        <>
        {/* <Header/> */}
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRouter/>}>
                <Route path="/" element={<DefaultLayout><Home/></DefaultLayout>}/>
                </Route>
                <Route path="/login" element={<SimpleLayout><Login/></SimpleLayout>}/>
                <Route path="/signup" element={<SimpleLayout><Signup/></SimpleLayout>}/>
                <Route path="/recoverpass" element={<SimpleLayout><RecoverPass/></SimpleLayout>}/>
                <Route path="/changepass" element={<SimpleLayout><ChangePass/></SimpleLayout>}/>
                <Route path="/profile" element={<DefaultLayout><Profile/></DefaultLayout>}/>
                <Route path="/admin" element={<DefaultLayout><Admin/></DefaultLayout>}/> 
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
