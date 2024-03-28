import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
//import { MatDialog } from '@material-ui/core';
import VehicleService from '../services/VehicleService';
import ViewCarDetails from "./ViewCarDetails";
import DataContext, { DataProvider } from "../context/DataContext";

export default function ViewCars() {

    const navigate = useNavigate(); 
        const [searchTerm, setSearchTerm] = useState('');
        const [cars,setCars]=useState([]);
     const {data,setData}=useContext(DataContext);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };

      useEffect(()=>{
  
        VehicleService.getAllVehicles()
        .then(
          (resp)=>{
              console.log(resp.data);
              //accounts = resp.data;
              setCars(resp.data);
          }
        )
        .catch(
          (err)=>{
              console.log(err);
          }
        )
        .finally(
          ()=>{
              console.log("Loaded all data from Server");
          }
        )
        },[])
        const viewCarDetails=(car)=>{
          setData(car);
          navigate('/viewCarDetails');

        }

        const buttonSpacing={
 
            marginRight: '8px'/* Adjust the spacing as needed */
        }
        const handleBookNow = (vehicleId) => {
          if(sessionStorage.getItem('customerId'))
            navigate('/booking',{ state: { vehicleId: vehicleId } }); 
          else
          navigate('/login')
          // Replace '/booking' with the path to the component you want to navigate to
            // navigate('/booking/${car.vehicleId}');
          };
        
      
        const filteredCars = cars.filter((car) =>
            JSON.stringify(car).toLowerCase().includes(searchTerm.toLowerCase())
            );
            return (
                <>
                <h4> Available Cars</h4>
               
                <div className="container mt-4">
                     <div className="row mb-3"></div>
                <div className="col">
                  <input type="text" value={searchTerm} onChange={handleSearch} className="form-control" placeholder="Search Cars" />
                </div>
                </div>
              
                <div className="row">
                    
                {filteredCars.map((car) => (
                    <div key={car.id} className="col-md-4 mb-10" style={{ padding: '10px' }}>
                      <div className="card">
                        <img src={car.imageUrl} className="card-img-top" alt="CarImage" />
                        <div className="card-body">
                          <h5 className="card-title">{car.brand}</h5>
                          <p className="card-text">Register Number: {car.registerNumber}</p>
                          <p className="card-text">Available status: {car.available ? "Available" : "UnAvailable"}</p>
                          <p className="card-text">Location: {car.location}</p>
                          <button className="btn btn-primary btn-sm "style={buttonSpacing}  onClick={()=>viewCarDetails(car)}>View Details</button>
                          <button className="btn btn-success btn-sm"style={buttonSpacing} onClick={()=>handleBookNow(car.id)}>Book Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
           
                </>
            )
        
    }
   