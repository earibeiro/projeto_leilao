import './App.css';
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
import Dashboard from './pages/dashboard/Dashboard';
import SignupValidation from './pages/signupValidation/SignupValidation';
import ValidationSuccess from './pages/validationSuccess/ValidationSuccess';
import Unauthorized from './pages/unauthorized/Unauthorized';
import NotFound from './pages/notfound/NotFound';
import Category from './pages/category/Category';
import Auction from './pages/auction/Auction';

function App(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRouter/>}>
                    <Route path="/" element={<DefaultLayout><Home/></DefaultLayout>}/>
                    <Route path="/dashboard" element={<DefaultLayout><Dashboard/></DefaultLayout>}/>
                    <Route path="/profile" element={<DefaultLayout><Profile/></DefaultLayout>}/>
                    <Route path="/category" element={<DefaultLayout><Category/></DefaultLayout>}/>
                    <Route path="/auction" element={<DefaultLayout><Auction/></DefaultLayout>}/>
                </Route>
                <Route path="/login" element={<SimpleLayout><Login/></SimpleLayout>}/>
                <Route path="/signup" element={<SimpleLayout><Signup/></SimpleLayout>}/>
                <Route path="/recoverpass" element={<SimpleLayout><RecoverPass/></SimpleLayout>}/>
                <Route path="/changepass" element={<SimpleLayout><ChangePass/></SimpleLayout>}/>
                <Route path="/signupvalidation" element={<SimpleLayout><SignupValidation/></SimpleLayout>}/>
                <Route path="/validationsuccess" element={<SimpleLayout><ValidationSuccess/></SimpleLayout>}/>
                <Route path="/unauthorized" element={<Unauthorized/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
