import React from 'react';
import { supabase } from '../supabase';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CarList from './CarList';
import CarDetails from './CarDetails';
import img1 from '../images/logo.png';
import { FaAlignLeft } from "react-icons/fa6";
import '../App.css'

function OffcanvasExample() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cars, setCars] = useState([]); // Initialize cars state

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  useEffect(() => {
    // Fetch car data from the 'cars' table
    const fetchCars = async () => {
      const { data, error } = await supabase.from('cars').select('*');
      if (error) {
        console.error('Error fetching car data:', error);
      } else {
        setCars(data);
      }
    };

    fetchCars();
  }, []); // Empty dependency array to fetch data only once

  return (
    <Router>
      <div>
        {['md'].map((expand) => (
          <Navbar key={expand} expand={expand} className="mb-3 bg-dark" id='bar'>
            <Container fluid>
              <Navbar.Brand href="#"><img src={img1} alt=".." style={{ width: "200px" }} /></Navbar.Brand>
              <h1 className='navs'><FaAlignLeft style={{color:"white"}} aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleToggleOffcanvas} /> </h1>
              <Navbar.Offcanvas
                show={showOffcanvas}
                onHide={handleCloseOffcanvas}
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                style={{ width: '150px', height: "400px" }}
                className="bg-dark"
                
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} >
                    <img src={img1} alt=".." style={{ width: "100px" }} />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link as={Link} to="/" onClick={handleCloseOffcanvas} style={{ fontWeight: "500",fontFamily:"georgia",  fontSize:"20px",color:"white"}} >Rent</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
        <Routes>
          <Route path='/' element={<CarList cars={cars} />} /> 
          <Route path="/car/:id" element={<CarDetails cars={cars} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default OffcanvasExample;



