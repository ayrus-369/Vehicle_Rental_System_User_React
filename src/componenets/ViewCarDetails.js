
// CarCard.js
import React, { useContext, useEffect, useState } from 'react';


import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';



const ViewCarDetails = () => {
const navigate=useNavigate();
const { data, setData } = useContext(DataContext);
const [car,setCar]=useState([]);



useEffect(()=>{
console.log(data);
setCar(data);

},[])
return (
<div className="card center" style={{ width: '300px', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
<img src={car.imageUrl} className="card-img-top" alt={car.brand} />
<div className="card-body">
<h5 className="card-title">{car.brand}</h5>
<p className="card-text">Register Number: {car.registerNumber}</p>
<p className="card-text">Location: {car.location}</p>
<p className='card-text'>Number Of Seats : {car.noOfSeats}</p>
<p className="card-text">Available: {car.available ? 'Yes' : 'No'}</p>
<p className="card-text">Active: {car.active ? 'Yes' : 'No'}</p>
<p className="card-text">Engaged: {car.engaged ? 'Yes' : 'No'}</p>
<p className="card-text">Fuel Type: {car.fuelType}</p>
<p className="card-text">Gear Type: {car.gearType}</p>
<p className="card-text">Rent Per Hour: {car.rentPerHour}</p>
<p className="card-text">Mileage: {car.mileage}</p>
<p className="card-text">Deposit: {car.deposit}</p>
<button className='btn btn-success ' onClick={()=>navigate('/viewCars')}>Go Back</button>
</div>
</div>
);
};


export default ViewCarDetails;

