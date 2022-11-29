import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Menu from "./Menu";
import { httpPost, httpPostwithToken } from "./HttpConfig";
import { CartContextValue } from "./ContextProvider";
import { Link } from "react-router-dom";
import Slider from "../src/Slider.js";
import GetProduct from "./GetProduct";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Img1 from "./Img1";
import { Nav } from "react-bootstrap";


function Home() {
  return (
    <div>
      
      <Slider />

      {/* <GetProduct /> */}
      {/* <Img1/> */}

      {/* <div className="banner">
        <div className="container">
          <h3>
            Electronic Store, <span>Special Offers</span>
          </h3>
        </div>
      </div> */}

     
      {/* <div className="newsletter">
        <div className="container">
          <div className="col-md-6 w3agile_newsletter_left">
            <h3>Newsletter</h3>
            <p>Excepteur sint occaecat cupidatat non proident, sunt.</p>
          </div>
          <div className="col-md-6 w3agile_newsletter_right">
            <form action="#" method="post">
              <input
                type="email"
                name="Email"
                placeholder="Email"
                required=""
              />
              <input type="submit" value="" />
            </form>
          </div>
          <div className="clearfix"> </div>
        </div>
      </div> */}
    </div>
  );
}

export default Home;