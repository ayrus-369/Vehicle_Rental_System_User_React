import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewCars from './componenets/ViewCars';
import Booking from './componenets/Booking/Booking';
import Layout from './componenets/Layout';
import Home from './componenets/Home';
import NoPage from './componenets/NoPage';
import Login from './componenets/Login';
import Register from './componenets/Register';
import { DataProvider } from './context/DataContext';
import ViewCarDetails from './componenets/ViewCarDetails';
import UpdateProfile from './componenets/UpdateProfile';
import ViewBookings from './componenets/ViewBookings';
import ViewBookingDetails from './componenets/Booking/ViewBookingDetails';
import ViewPayment from './componenets/ViewPayments';


function App() {
  return (
    <div className="App">
     
      <DataProvider>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/viewCars' element={<ViewCars />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/viewCarDetails' element={<ViewCarDetails />} />
        <Route path='*' element={<NoPage />} />
        <Route path='/updateProfile' element={<UpdateProfile/>} />
        <Route path='/viewBookings' element={<ViewBookings/>} />
        <Route path='/booking' element={<Booking/>}/>
        <Route path='viewBookingDetails' element={<ViewBookingDetails/>}/>
        <Route path='viewpayments' element={<ViewPayment/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
</DataProvider>

    </div>
  );
}

export default App;
