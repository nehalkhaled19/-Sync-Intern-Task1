import React, { useEffect, useState } from 'react'
import moment, { months } from 'moment';
import Nav from '../Nav/Nav';


export default function Main() {
    let [weatherData, setWeatherData] = useState(null)
    const [weather, setweather] = useState('');


    // to fetch data
    async function getData(city = 'cairo') {
        const myReq = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82434d8ba23b7825d039ab149324b912&units=metric`)
        let data = await myReq.json()
        console.log(data);
        if (data.cod == 200) {
            setWeatherData(data);
        }

    }

    useEffect(() => {
        getData()
    }, [])

    // searching by city name
    function search() {
        getData(weather)
    }
    return <section className='home'>
        <Nav></Nav>
        <div className='container pb-4'>
            <div className='w-100  main-margin pt-2' >
                <div className="position-relative w-100 ">
                    <input id="searchByName" value={weather} required onChange={(e) => setweather(e.target.value)} type="text" className=" form-control new-input px-md-3 py-3 border-0 rounded-5" placeholder="Find your location..." />
                    <button className="btn new-button  rounded-5 " onClick={() => search()} >Search</button>
                </div>
                {weatherData != null ? <div className='row mt-4 justify-content-center '>
                    {/* first section */}
                    <div className='col-lg-5 mt-4 '>
                        <div className=' main-bg py-4 rounded-3  text-center '>
                            <h3 className='pb-3' style={{ borderBottom: '2px solid #f1f1f1' }}>
                                {weatherData?.name}, {weatherData.sys?.country}
                            </h3>
                            <div className='px-4 '>
                                <img src={weatherData ? `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png` : ""} className='w-25' alt="weather-logo" />
                                <h3 >{weatherData?.weather[0].main}</h3>

                                <h4>{weatherData?.weather[0].description}</h4>
                                <h5>Temp : {weatherData?.main.temp}°C</h5>
                                <div className='d-flex mt-3'>
                                    <div>
                                        <h4 className='text-font'>
                                            <i className="fa-solid fa-temperature-arrow-up fa-lg me-2" style={{ color: '#1a5fa4' }}></i>
                                            Max T</h4>
                                        <h6>{weatherData?.main.temp_max}°C</h6>
                                    </div>
                                    <div className='ms-auto'>
                                        <h4 className='text-font'>
                                            <i className="fa-solid fa-temperature-arrow-down fa-lg me-2" style={{ color: '#1a5fa4' }}></i>
                                            Min T</h4>
                                        <h6>{weatherData?.main.temp_min}°C</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* second section */}
                    <div className='col-lg-5 mt-4 d-flex align-items-center'>
                        <div className='w-100 '>
                            <div className=' main-bg mb-2 p-4 rounded-3'>
                                <div className='d-flex '>
                                    <div className=' w-50'>
                                        <h4 className='text-font '>
                                            <i className="fa-regular fa-sun fa-lg me-2" style={{ color: '#1a5fa4' }} ></i>
                                            SUN RISE</h4>
                                        <h6>{moment.utc(weatherData?.sys.sunrise, 'X').add(weatherData?.timezone, 'seconds').format('HH:mm a')}</h6>
                                    </div>
                                    <div className='ms-auto w-50 text-end'>
                                        <h4 className='text-font '>
                                            <i className="fa-regular fa-moon fa-lg me-2" style={{ color: '#1a5fa4' }} ></i>
                                            SUN SET</h4>
                                        <h6>{moment.utc(weatherData?.sys.sunset, 'X').add(weatherData?.timezone, 'seconds').format('HH:mm a')}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex '>
                                <div className=' main-bg my-2 min-width text-center  px-3 py-2 rounded-3'>
                                    <h4 className='text-font text-start'>
                                        <i className="fa-solid fa-temperature-quarter fa-lg me-2" style={{ color: '#1a5fa4' }} ></i>
                                        Real Feel</h4>
                                    <h6>{weatherData?.main.feels_like}°C</h6>
                                </div>
                                <div className='main-bg my-2 min-width text-center  px-3 py-2 rounded-3 ms-auto'>
                                    <h4 className='text-font text-start'>
                                        <i className="fa-solid fa-temperature-high fa-lg me-2" style={{ color: '#1a5fa4' }} ></i>
                                        Humidity</h4>
                                    <h6>{weatherData?.main.humidity}%</h6>
                                </div>
                            </div>
                            <div className='d-flex  '>
                                <div className=' main-bg mt-2 min-width text-center px-3 py-2 rounded-3'>
                                    <h4 className='text-font text-start'>
                                        <i className="fa-solid fa-wind fa-lg me-2" style={{ color: '#1a5fa4' }} ></i>

                                        Wind Speed</h4>
                                    <h6 style={{ fontWeight: '700px' }} >{weatherData?.wind.speed}m/s</h6>
                                </div>
                                <div className='main-bg mt-2 min-width text-center  px-3 py-2 rounded-3 ms-auto'>
                                    <h4 className='text-font text-start'>
                                        <i className="fa-solid fa-compass fa-lg me-2" style={{ color: '#1a5fa4' }}></i>
                                        Wind deg</h4>
                                    <h6>{weatherData?.wind.deg}°</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> : ''}


            </div>
        </div>
    </section>
}
