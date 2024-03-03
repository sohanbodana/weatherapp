import React, { useState, useEffect } from "react";
import dsg from './Designer.png';
import './home.css';
import axios from 'axios';

const Home = () => {
    const [currData, setCurrData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currCity, setCurrCity] = useState('Pune');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=f28745ec3d55484da5f143330240203&q=${currCity}&aqi=no`);
                setCurrData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        if (currCity) {
            fetchData();
        }
        if(error){
            console.error(error);

        }
    }, [currCity]);

    const handleInputChange = (event) => {
        setCurrCity(event.target.value);
    };

    const handleSearch = () => {
        setCurrCity(document.getElementById('city').value);
    };

    if (loading) {
        return <div>Loading...</div>;
    } 

    return (
        <>
                <section className="vh-100">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-10 col-lg-8 col-xl-6">
                                <div className="card bg-dark text-white" style={{ borderRadius: "40px", padding: '0px', margin: '0px' }}>
                                    <div className="bg-image" style={{ borderRadius: "35px" }}>
                                        <img src={dsg} className="card-img" alt="weather" />
                                        <div className="mask" style={{ backgroundColor: 'rgba(190, 216, 232, .5)' }}></div>
                                    </div>
                                    <div className="card-img-overlay text-dark p-5">
                                        <h3 className="mb-0">{currData.location.name},{currData.location.region},{currData.location.country}</h3>
                                        <p className="display-2 my-3">{currData.current.temp_c}℃ {currData.current.temp_f}℉</p>
                                        <h3 className="mb-2">Feellike {currData.current.feelslike_c}c|| {currData.current.feelslike_f}f</h3>
                                        <h3>Humidity : {currData.current.humidity}</h3>
                                        <h3><span>LastUpdate_Time :</span> {currData.current.last_updated}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <div className="Search" style={{ color: 'black', fontSize: "20px", textShadow: '4px 2px 3px rgb(344,33,55)', fontWeight: '800', textAlign: 'center',paddingBottom:'1rem'}}>
                <label htmlFor="city" style={{ display: 'block' }}>WEATHER APP</label>
                <input 
                    type="text"
                    id="city"
                    placeholder="Enter City Name"
                    value={currCity}
                    onChange={handleInputChange}
                />
                <button type="button" onClick={handleSearch}>Search Auto</button>
            </div>
        </>
    );
};

export default Home;
