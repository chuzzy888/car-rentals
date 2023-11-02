
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import '../styles/CarList.css'; 
import { Link } from 'react-router-dom';
import img1 from '../images/lmb.png'
import img2 from '../images/bmw.png'
import img3 from '../images/toy.png'
import { MdEventSeat } from "react-icons/md";
import { Ri24HoursFill} from "react-icons/ri";



function CarList() {
  const [cars, setCars] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
   
    const fetchCars = async () => {
      const { data, error } = await supabase.from('cars').select('*');
      if (error) {
        console.error('Error fetching car data:', error);
      } else {
        setCars(data);
      }
    };

    fetchCars();
  }, []);

  const visibleCars = showAll ? cars : cars.slice(0, 6);

  const filteredCars = visibleCars.filter((car) => {
    const nameMatch = car.name.toLowerCase().includes(searchText.toLowerCase());
    const locationMatch = car.location.toLowerCase().includes(searchText.toLowerCase());
    return nameMatch || locationMatch;
  });

  return (
    <div className="car-list-container">
      <div className="category-search">
        
     <div className="inp">
      <p style={{fontWeight:"900",color:"orange"}} className='text'>Explore <span style={{color:"orangered"}}>Our</span>  Services</p>
     <input
        type="text"
        name="text"
        placeholder="Search name / location"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="input"
        autocomplete="off"
      />
      <div className="pro">
         <img src={img1} alt=".." />
         <img src={img2} alt=".." />
         <img src={img3} alt=".." />
    
         </div>
     
     </div>
      </div>
      <ul className="car-list">
        {filteredCars.map((car) => (
          <li className="car-item" key={car.id}>
            <div className="car-info">
            <Link to={`/car/${car.id}`} className='custom-link'>
             <div className="box">
            
                <img src={car.image} alt="Car" className="car-image" />
             
             </div>
            
            
              <h5 style={{ fontFamily:"Georgia, 'Times New Roman', Times, serif", fontWeight:"900", marginTop:"20px"}}>{car.name}</h5>
                  
              <div className="seat-amount">
                <h6 > <MdEventSeat style={{ color: "blue", marginRight: "10px" }} />{car.seat} </h6>
                <h6> <Ri24HoursFill style={{color:"green"}}/><span style={{ marginLeft: "10px" }}>${car.amount}</span> </h6>
              </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {!showAll && cars.length > 6 && (
        <button className='but' onClick={() => setShowAll(true)}>View All</button>
      )}
    </div>
  );
}

export default CarList;
