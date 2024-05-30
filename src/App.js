import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/noteState';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister'
import UserState from './context/user/userState';

function App() {
  return (
    <>
      <Router>
        <UserState>
          <NoteState>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/userRegister' element={<UserRegister />}></Route>
              <Route exact path='/userLogin' element={<UserLogin />}></Route>
            </Routes>
          </NoteState>
        </UserState>
      </Router>
    </>
  );
}

export default App;
