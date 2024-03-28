// import { Link, Outlet } from "react-router-dom";
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import ViewCars from "./ViewCars";
// import { useState,useEffect } from "react";
// import homeImage from "../images/img1.jpg";
// export default function Home(){
   
//     return (
//         <>
//         <h4> Home component.</h4>
//         {/* <p className="alert alert-success">Hello</p> */}
//         <Container>
//             <Row className="py-5">
//                 <Col md={6}>
//                     <h1>Welcome to Vehicle Rental System</h1>
//                     <p>Explore our fleet of vehicles for your next adventure</p>
//                     <Link to="/viewCars" className="btn btn-primary btn-lg">View Vehicles</Link>
//                 </Col>
//                 <Col md={6}>
//                     <img src={homeImage} alt="Home Image" className="img-fluid" />
//                 </Col>
//             </Row>
//             <Row className="py-5">
//                 <Col className="text-center">
//                     <h2>Featured Vehicles</h2>
//                     {/* Display featured vehicles here */}
//                 </Col>
//             </Row>
//             <Row className="py-5">
//                 <Col className="text-center">
//                     <h3>Rent Your Dream Vehicle Today</h3>
//                     <Button as={Link} to="/booking" variant="primary" size="lg">Book Now</Button>
//                 </Col>
//             </Row>
//         </Container>
//         </>
//     )
// }
// {/* <div className="container-fluid">
//             {/* Hero Section */}
//         //     <div className="hero-section text-center py-5">
//         //         <h1>Welcome to Vehicle Rental System</h1>
//         //         <p>Explore our fleet of vehicles for your next adventure</p>
//         //         <Link to="/iewCars" className="btn btn-primary btn-lg mt-3">View Vehicles</Link>
//         //     </div>

//         //     {/* Featured Vehicles Section */}
//         //     <div className="featured-vehicles-section text-center py-5">
//         //         <h2>Featured Vehicles</h2>
//         //         {/* Display featured vehicles here */}
//         //     </div>

//         //     {/* Call-to-Action Section */}
//         //     <div className="cta-section text-center py-5">
//         //         <h3>Rent Your Dream Vehicle Today</h3>
//         //         <Link to="/booking" className="btn btn-primary btn-lg mt-3">Book Now</Link>
//         //     </div>
//         // </div> */}

import { Carousel, Button } from 'react-bootstrap';
import homeImage from "../images/img1.jpg";
import './Home.css'
const HomeCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img src={homeImage} className="d-block w-100" alt="Slide 1" />
                <Carousel.Caption>
                    <h5>ABOUT US</h5>
                    <p>About Us: At SHAT, we are passionate about providing you with the ultimate car rental experience. With a commitment to excellence and customer satisfaction, we strive to make your journey a memorable and hassle-free one. Our team of dedicated professionals is here to cater to all your car rental needs and ensure that you have a seamless and enjoyable ride every time you choose us.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={homeImage} className="d-block w-100" alt="Slide 2" />
                <Carousel.Caption>
                    <h5>BENEFITS OF CAR RENTAL SERVICE</h5>
                    <ul>
                        <li><strong>Convenience:</strong> Enjoy the convenience of having a car ready for you whenever and wherever you need it. Say goodbye to waiting for public transportation or costly taxi rides.</li>
                        <li><strong>Freedom to Explore:</strong> With a rental car at your disposal, you have the freedom to explore at your own pace. Discover hidden gems, scenic routes, and off-the-beaten-path destinations on your terms.</li>
                    </ul>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={homeImage} className="d-block w-100" alt="Slide 3" />
                <Carousel.Caption>
                    <h5>Explore the World</h5>
                    <p>Embark on an exciting journey with SHAT and explore the world like never before. Whether you're planning a weekend getaway, a business trip, or a family vacation, our car rental service is your gateway to unforgettable experiences and destinations. Discover new horizons, create lasting memories, and make the most of every mile with us by your side.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-content">
            <div className="contact-info">
                <a href="#">Contact Us</a>
                <p>Address: SHAT Rental Service, Near Global Bus Stop, Perumbakkam, Chennai</p>
                <p>Phone Number: 12345 23456</p>
            </div>
            <div className="copyright">
                <p>&copy; 2024 SHAT Private Limited. All rights reserved.</p>
            </div>
        </div>
    </footer>
    );
};

const Home = () => {
    return (
        <div>
            <HomeCarousel />
            <Footer />
        </div>
    );
};

export default Home;
