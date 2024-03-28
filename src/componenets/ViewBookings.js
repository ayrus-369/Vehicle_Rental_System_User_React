import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';

function ViewBookings() {
    const [bookedVehicles, setBookedVehicles] = useState([]);

    useEffect(() => {
        const customerId = sessionStorage.getItem('customerId');
       
        if (customerId) {
          CustomerService.getCustomerById(customerId)
          .then((response) =>{
            let customerEmail = response.data.email;
            console.log(response);
            // Fetch bookings associated with the customer ID
            CustomerService.getBookingsByCustomerEmail(customerEmail)
                .then((response) => {
                    setBookedVehicles(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching bookings:', error);
                });
          })
          
          .catch((error) => {
            console.error('Error fetching customer:', error);
        });
            
        }
    }, []);

    return (
        <div className="">
            <h2>View Bookings</h2>
            <div className='card'>
                {bookedVehicles.length > 0 ? (
                    <ul style={{listStyle:"none"}}>
                        {bookedVehicles.map((booking) => (
                            <li key={booking.bookingId}>
                                <strong>Vehicle Name:</strong> {booking.vehicleName}<br />
                                <strong>Pickup Date:</strong> {booking.pickupDate}<br />
                                <strong>Drop Date:</strong> {booking.dropDate}<br />
                                <strong>Pickup Location:</strong> {booking.pickUpLocation}<br />
                                <strong>Drop Location:</strong> {booking.dropLocation}<br />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings found</p>
                )}
            </div>
        </div>
    );
}

export default ViewBookings;
