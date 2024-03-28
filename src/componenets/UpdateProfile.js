import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import CustomerService from '../services/CustomerService';
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const navigate = useNavigate(); 

    const [customerData, setCustomerData] = useState({
        name:'',
        phoneNo:'',
        email:'',
        address:''
    });

    useEffect(() => {
        const customerId = sessionStorage.getItem('customerId');

        if (customerId) {
            // Fetch customer details based on the stored customer ID
            CustomerService.getCustomerById(customerId).then((response) => {
                console.log(response);
                const { id, name, phoneNo, email, address } = response.data;
                setCustomerData({
                    id: id,
                    name:name,
                    phoneNo:phoneNo,
                    email:email,
                    address:address
                });
            }).catch((error) => {
                console.error('Error fetching customer data:', error);
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        CustomerService.update(customerData)
        .then(() => {
            alert('Profile updated successfully');
            navigate('/');
            
        }).catch((error) => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        });
    };

    return (
        <div>
            <h3>Update Profile</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="firstName" value={customerData.name} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhoneNo">
                    <Form.Label>Phone No</Form.Label>
                    <Form.Control type="text" name="phoneNo" value={customerData.phoneNo} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={customerData.email} onChange={handleInputChange} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={customerData.address} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
            <p>{JSON.stringify(customerData)}</p>
        </div>
    );
};

export default UpdateProfile;
