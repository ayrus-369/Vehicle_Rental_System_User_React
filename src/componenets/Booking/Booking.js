import BookingService from "../../services/BookingService";
import React,{useState} from "react";
import CustomerService from "../../services/CustomerService";
import VehicleService from "../../services/VehicleService";
import { useNavigate , useLocation, useParams} from 'react-router-dom';
import { useEffect } from "react";

export default function Booking()
{
    let customerId=sessionStorage.getItem('customerId');
   // const { vehicleId } = useParams();
        const navigate = useNavigate();
        const location = useLocation();
        const vehicleId = location.state?.vehicleId || 0;
        console.log('Vehicle ID:', vehicleId);

        let [bookVehicle,setBookVehicle]=useState({
        customerId:customerId,
        customerEmailId:'',
         vehicleId:vehicleId,
        // vehicleId:'',
        pickUpDate:'',
        dropDate:'',
        dropLocation:''
        });

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
        // const [numberOfDays, setNumberOfDays] = useState(0);
        const [numberOfDays, setNumberOfDays] = useState(0);
       
        const getCustomer = (customerId) => {
        CustomerService.getCustomerById(customerId)
        .then((resp) => {
        console.log(resp.data);
        console.log("customer emailId: " + resp.data.email);


        // Update the state with the fetched email
        setBookVehicle(prevState => ({
        ...prevState,
        customerEmailId: resp.data.email
        }));
        })
        .catch((err) => {
        console.log(err.response.data);
        });
        }

        useEffect(() => {
        getCustomer(customerId); // Call getCustomer when the component mounts or customerId changes
        }, [customerId]);




        const handleBookVehicleChange = (e) => {
        setBookVehicle({ ...bookVehicle, [e.target.name]: e.target.value });


        }


        let [message, setMessage] = useState("");
        let [errorMessage, setErrorMessage] = useState("");
        const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const pickUpDate = new Date(bookVehicle.pickUpDate);
        const dropDate = new Date(bookVehicle.dropDate);


        const timeDifference = dropDate.getTime() - pickUpDate.getTime();


        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        console.log(currentDate);
        console.log(bookVehicle);
        console.log("number of days:"+numberOfDays);
        let days=numberOfDays;
        const formattedBookVehicle = {
        ...bookVehicle,
        pickUpDate: bookVehicle.pickUpDate ? new Date(bookVehicle.pickUpDate).toISOString().split('T')[0] : '',
        dropDate: bookVehicle.dropDate ? new Date(bookVehicle.dropDate).toISOString().split('T')[0] : ''
        };


        console.log(formattedBookVehicle);
        BookingService.createNewBooking(bookVehicle)
        .then(
        (resp) => {
        console.log(resp.data);
        setMessage("Booking successfull!");
        // navigate('/viewBookingDetails', { state: { numberOfDays: days} });
        navigate('/viewBookingDetails', { state: { numberOfDays: days, vehicleId: bookVehicle.vehicleId } });
        setErrorMessage("");
        }
        )
        .catch(
        (err) => {
        console.log(err.response.data);
        setMessage("");
        setErrorMessage("Errors accured in fallowing fields:" + JSON.stringify(err.response.data));
        }
        )

        }

        return (
            <div className="card">
            <h3>Booking Form:</h3>
            <form onSubmit={handleSubmit}>

            <p>
            pickUp Date:<input type="date" name="pickUpDate" value={bookVehicle.pickUpDate} onChange={handleBookVehicleChange}></input>
            </p>
            <p>
            Drop Date: <input type="date" name="dropDate" value={bookVehicle.dropDate} onChange={handleBookVehicleChange}></input>
            </p>
            <p>
            Drop Location:<input type="text" name="dropLocation" value={bookVehicle.dropLocation} onChange={handleBookVehicleChange}></input>
            </p>

            <button type="submit">Book Now</button>

            </form>
            {/* {<p>{JSON.stringify(bookVehicle)}</p>} */}
            {
            message && <h3 className="alert alert-success">{message}</h3>
            }


            {
            errorMessage && <h3 className="alert alert-danger">{errorMessage}</h3>
            }
            </div>
        );
}
