import React, { useState, useEffect } from 'react';
import PaymentService from '../services/PaymentService';

function ViewPayment(){
    const [payments, setPayments] = useState([]);
    const customerId = sessionStorage.getItem('customerId');

    useEffect(() => {
        if (customerId) {
            PaymentService.getPaymentsByCustomerId(customerId)
                .then((response) => {
                    // PaymentService.getPaymentStatus
                    setPayments(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching payment history:', error);
                });
        }
    }, [customerId]);

    return (
        <div >
            <h2>Your Payments History</h2>
            {payments.length > 0 ? (
                
                <ul style={{listStyle:"none"}}> 
                    {payments.map((payment) => (
                        <li key={payment.paymentId}>
                            <div className='card'>
                            <p>Payment ID: {payment.orderId}</p>
                            <p>Amount: {payment.amount}</p>
                            <p>Date: {payment.dateTime}</p>
                            {payment.paymentStatus}
                            <p>Vehice Details:</p>
                            <p>Register number: {payment.vehicle.registerNumber}</p>
                            <p>Vehicle Brand: {payment.vehicle.brand}</p>
                            </div>
                        </li>
                    ))}
                </ul>
              
            ) : (
                <p>No payment history found</p>
            )}
        </div>
    );
};


export default ViewPayment;