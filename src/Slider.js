import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './App.css';


function Slider() {
  return (
    <Carousel className='slider11'>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid"
          src="../assets/images/slide1.png"
          alt="First slide"
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid"
          src="../assets/images/slide2.png"
          alt="Second slide"
        />

        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid"
          src="../assets/images/slide3.png "
          alt="Third slide"
        />

        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;