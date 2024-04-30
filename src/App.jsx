
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Pokedex from './pages/Pokedex';
import ProtectedRoutes from './pages/ProtectedRoutes';
import PokeInfo from './pages/PokeInfo';

function App() {

  return (
    <>
    <div className='poke__page'>
      <div className='back_page'> </div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route element={<ProtectedRoutes/>}>
          <Route path='/pokedex' element={<Pokedex/>} />
          <Route path='/pokedex/:id' element={<PokeInfo/>} />
        </Route>
      </Routes>
    </div>
    </>
  )
}

export default App;
