import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useParams } from 'react-router-dom';
import { MdEventSeat } from "react-icons/md";
import { Ri24HoursFill } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import '../styles/car-details.css';

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    // Fetch car data for the specified id
    const fetchCar = async () => {
      const { data, error } = await supabase.from('cars').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching car data:', error);
      } else {
        setCar(data);
      }
      // Clear the loading timeout
      clearTimeout(loadingTimeout);
    };

    fetchCar();
  }, [id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className='baz'>
      <h1 className='dts'>Car Details</h1>
      {isLoading ? (
        <div class="loader"></div>
      ) : car ? (
        <div>
          <img src={car.image} alt="Car" className='bazz' />
          <h3>  {car.name}</h3>
          <p style={{fontFamily:"initial",fontStyle:"italic"}}>{car.color}</p>
          <p style={{ color: "goldenrod", fontWeight: "900" }}>
            Description:{" "}
            {showFullDescription ? car.description : `${car.description.slice(0, 100)}...`}
            <span
              className="read-more"
              onClick={toggleDescription}
              style={{ cursor: 'pointer', color: showFullDescription ? 'red' : 'green' }}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </span>
          </p>
          <div className="seat-amount">
            <h6 > <MdEventSeat style={{ color: "blue", marginRight: "10px" }} />{car.seat} </h6>
            <h6> <Ri24HoursFill style={{ color: "green" }} /><span style={{ marginLeft: "10px" }}>${car.amount}</span> </h6>
            <p> <HiOutlineLocationMarker style={{ color: "green" }} /> <span style={{ color: "GrayText" }}>{car.location}</span> </p>
          </div>
        </div>
      ) : (
        <p>Car not found</p>
      )}
    </div>
  );
}

export default CarDetails;




