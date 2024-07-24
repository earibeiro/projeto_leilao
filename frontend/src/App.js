import './App.css';
//import {PrimeReactProvider} from 'primereact/api';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App(){
    return(
        <>
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home}/>
                <Route path="/login" Component={Login}/>
            </Routes>
        </BrowserRouter>
        <Footer/>
        </>
    );
}

export default App;
