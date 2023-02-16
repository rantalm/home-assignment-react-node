import './App.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' 
import Home from './components/Home'
import Archive from './components/Archive'

function App() {
   
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/archive' element={ <Archive /> }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
