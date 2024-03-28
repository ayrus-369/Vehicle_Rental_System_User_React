import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from "react-bootstrap";
import CustomerService from "../services/CustomerService";
import { useNavigate } from "react-router-dom";
function Register(){
    // like class:
    // public id?: number,
    // public name?: string,
    // public phoneNo?: number,
    // public email?: string,
    // public password?: string,
    // public address?: string,
    // public loggedIn?: boolean
    const navigate = useNavigate(); 
    let [customer, setCustomer] = useState({
     
        name:'',
        phoneNo:'',
        email:'',
        password:'',
        address:''

    });
    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");
    const handleCustomerChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(customer);
        CustomerService.register(customer)
            .then(
                (resp) => {
                    console.log(resp.data);
                    setMessage("Registered successfull!");
                    alert("You have registered successfully!\t Please login to continue!")
                    // alert("Please login to continue!")
                    setErrorMessage("");
                    navigate('/login');
                }
            )
            .catch(
                (err) => {
                    console.log(err.response.data);
                    setMessage("");
                    setErrorMessage("Errors accured in fallowing fields:" + JSON.stringify(err.response.data));
                    alert(JSON.stringify(err.response.data));
                }
            )


    }
    return (
        <>
        {/* <p className="alert alert-success">Hello</p> */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form onSubmit={handleSubmit} style={{ width: '40vw' }}>
                <h3>Registration form</h3>
                <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="Enter your name" name="name" value={customer.name} onChange={handleCustomerChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPhoneNo" label="Phone No" className="mb-3">
                    <Form.Control type="text" placeholder="Enter your phone number" name="phoneNo" value={customer.phoneNo} onChange={handleCustomerChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                    <Form.Control type="email" placeholder="Enter your email" name="email" value={customer.email} onChange={handleCustomerChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Enter your password" name="password" value={customer.password} onChange={handleCustomerChange} />
                </FloatingLabel>
                
                <FloatingLabel controlId="floatingAddress" label="Address">
                    <Form.Control type="text" placeholder="Enter your address" name="address" value={customer.address} onChange={handleCustomerChange} />
                </FloatingLabel>
                <br />
                <Button variant="primary" type="submit" style={{ width: '50%' }}>Register</Button>
            </Form>
        </div>
        {/* {<p>{JSON.stringify(customer)}</p>} */}
            {
                message && <h3 className="alert alert-success text-center">{message}</h3>
            }

            {
                errorMessage && <h3 className="alert alert-danger text-center">{errorMessage}</h3>
            }
        </>
    )
}
export default Register;

//  <h3>Registration form:</h3>
{/* <form onSubmit={handleSubmit}>
<p>
   Name: <input type="text" name="name" value={customer.name} onChange={handleCustomerChange}></input>
</p>
<p>
   Phone No: <input type="number" name="phoneNo" value={customer.phoneNo} onChange={handleCustomerChange}></input>
</p>
<p>
   Email: <input type="text" name="email" value={customer.email} onChange={handleCustomerChange}></input>
</p>
<p>
   Password: <input type="password" name="password" value={customer.password} onChange={handleCustomerChange} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"></input>
</p>
<p>
   Address: <input type="text" name="address" value={customer.address} onChange={handleCustomerChange}></input>
</p>
<button type="submit" >Submit</button>
</form>
{<p>{JSON.stringify(customer)}</p>}
{
message && <h3 className="alert alert-success">{message}</h3>
}

{
errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
} */}