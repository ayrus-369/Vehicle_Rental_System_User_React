import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from "react-bootstrap";
import CustomerService from "../services/CustomerService";
import AdminService from "../services/AdminService";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate(); 
    
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        CustomerService.login(loginData)
            .then((resp) => {
                setMessage("Login successful!");
                alert("Login successful");
                sessionStorage.setItem('customerId', resp.data.id);
                navigate('/'); 
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage("Errors occurred in the following fields: " + JSON.stringify(err.response.data));
                alert(JSON.stringify(err.response.data));
            });
    }

    // const adminLogin = (loginData) => {
    //     AdminService.adminLogin(loginData)
    //         .then((res) => {
    //             setMessage("Admin Login successful!");
    //             alert("Admin Login successful");
    //             sessionStorage.setItem("admin", true);
    //             navigate('/admin'); // Assuming you have an admin route
    //         })
    //         .catch((err) => {
    //             console.log(err.response.data);
    //             setErrorMessage("Errors occurred in the following fields: " + JSON.stringify(err.response.data));
    //             alert(JSON.stringify(err.response.data));
    //         });
    // };
    
    // const handleAdminLogin = (e) => {
    //     e.preventDefault(); // Prevent default form submission
    //     adminLogin(loginData);
    // };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Form style={{ width: '40vw'}} onSubmit={handleSubmit}>
                    <h3>Login Form</h3>
                    
                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control type="email" placeholder="Email" name="email" value={loginData.email} onChange={handleLoginChange}/>
                    </FloatingLabel>
                    
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" name="password" value={loginData.password} onChange={handleLoginChange} />
                    </FloatingLabel>
                    
                    <br />
                    
                    <Button variant="primary" type="submit" style={{ width: '40%' }} >Login</Button>
                    {/* <Button variant="primary" type="button" style={{ width: '40%', marginLeft: '20px' }} onClick={()=>handleAdminLogin}>Admin Login</Button> */}
                </Form>
            </div>
            
            {/* {<p>{JSON.stringify(loginData)}</p>} */}
            {
                message && <h3 className="alert alert-success text-center">{message}</h3>
            }
            {
                errorMessage && <h3 className="alert alert-danger text-center">{errorMessage}</h3>
           
            }

            {/* Error message display */}
            {
                errorMessage && <h3 className="alert alert-danger text-center">{errorMessage}</h3>
            }
        </>
    );
}

export default Login;
