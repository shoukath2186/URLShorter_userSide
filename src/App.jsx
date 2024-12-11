// import reactLogo from './assets/react.svg'
import { Provider } from 'react-redux';
import store from './configaration/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'

import Home from './pages/Home'
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard.jsx'; 
import Sample from './components/Sample';

import Footer from './components/Footer'
import ProtectedRoute from './middleware/ProtectedRoute';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <>
          <div>
            <ToastContainer />
            <NavBar />
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
              </Route>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/*' element={<Sample />} />


            </Routes>
            <Footer />
          </div>
        </>
      </Router>
    </Provider>
  )
}

export default App
