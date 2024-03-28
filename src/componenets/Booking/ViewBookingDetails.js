import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import VehicleService from "../../services/VehicleService";
import PaymentService from "../../services/PaymentService";



export default function ViewBookingDetails() {
    let customerId = sessionStorage.getItem('customerId');
    const location = useLocation();
    const vehicleId = location.state?.vehicleId || 3;
    // let vehicleId = 3;
    const numberOfDays = location.state?.numberOfDays || 0;

        console.log('Number of Days:', (numberOfDays+1));
        console.log('vehicleId'+vehicleId)


        const [vehicleInfo, setVehicleInfo] = useState({
        brand:'',
        registerNumber: '',
        location: '',
        rentPerHour: 0,
        noOfSeats: 0
        });
        useEffect(() => {
        fetchVehicleInformation(vehicleId);
        }, [vehicleId]);
        const fetchVehicleInformation = (vehicleId) => {
        VehicleService.getVehicleById(vehicleId)
        .then((resp) => {
        const { brand,registerNumber, location, rentPerHour, noOfSeats } = resp.data;
        setVehicleInfo({ brand,registerNumber, location, rentPerHour, noOfSeats });
        })
        .catch((err) => {
        console.log(err.response.data);
        });
        };



        const paymentInputDto = {
        amount: (numberOfDays+1)*vehicleInfo.rentPerHour*100,
        vehicleId: vehicleId,
        customerId: customerId,
        customerEmailId: 'string@gmail.com'
        };



        let [message, setMessage] = useState("");
        let [errorMessage, setErrorMessage] = useState("");
        let order_id="";
        const handleSubmit = (e) => {
        e.preventDefault();
        PaymentService.createTransaction(paymentInputDto)
        .then((resp) => {
        console.log(resp.data);
        order_id=resp.data.orderId;
        console.log(order_id);
        setMessage("Processed payment in backend.");
        setErrorMessage("");
        })
        .catch((err) => {
        console.log(err.response.data);
        setMessage("");
        setErrorMessage("Errors occurred in the following fields: " + JSON.stringify(err.response.data));
        });

        var options = {
        // KEY = "rzp_test_TfpzfgmJsWW9Kg";
        // KEY_SECRET = "J0bCsCLLhYzsFWTaQhkukLWs";


        key: "rzp_test_TfpzfgmJsWW9Kg",
        key_secret: "J0bCsCLLhYzsFWTaQhkukLWs",
        amount: paymentInputDto.amount,
        currency: "INR",
        order_receipt: 'order_rcptid_',
        name: "SHAT Car rental Service",
        description: "for testing purpose",
        handler: function (response) {

        // console.log(response)
        const paymentId = response.razorpay_payment_id;
        console.log(paymentId);
        console.log(order_id);
        PaymentService.updatedPaymentStatus(order_id)
        .then((resp) => {
        console.log(resp.data);
        setMessage("Processed payment in backend.");
        setErrorMessage("");
        })
        .catch((err) => {
        console.log(err.response.data);
        setMessage("");
        setErrorMessage("Errors occurred in the following fields: " + JSON.stringify(err.response.data));
        });

        },
        prefill :{
        name:'JOHN DOE',
        email:'John2204@gmail.com',
        Contact:'9876556726'
        },
        notes:{
        address:'Car Rental Service'
        },
        theme:{
        color:'#007bff'
        }
        };


        var pay = new window.Razorpay(options);
        pay.open();


        };


        return (
        <>
        <h4>View your booking details:</h4>
        <p className="alert alert-success">Details:</p>
        <p>vehicleId</p>
        <p>Car Name: {vehicleInfo.brand}</p>
        <p>Registration Number: {vehicleInfo.registerNumber}</p>
        <p>Location: {vehicleInfo.location}</p>
        <p>Rent Per Day: {vehicleInfo.rentPerHour}</p>
        <p>Number of Seats: {vehicleInfo.noOfSeats}</p>
        <form onSubmit={handleSubmit}>
        <button type="submit">Proceed Payment</button>
        </form>
        {message && <h3 className="alert alert-success">{message}</h3>}
        {errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>}
        </>
        );
}