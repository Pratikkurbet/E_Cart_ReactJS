import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./App.css";
import Menu from "./Menu";

import { httpPost, httpPostwithToken } from "./HttpConfig";
import { CartContextValue } from "./ContextProvider";
import { Link } from "react-router-dom";
export default function Header() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [respassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [name, setName] = useState("");
  const [sign_in_up_model, setsignin_up_model] = useState("");
  const [cartData, dispatch] = CartContextValue();
  const [cartNum, setCartNum]=useState();

  const signUpApi = () => {
    if (mobile === "") {
      alert("Mobile should not be empty");
      return;
    } else if (name === "") {
      alert("Name should not be empty");
      return;
    } else if (email === "") {
      alert("Email should not be empty");
      return;
    } else if (password === "") {
      alert("password should not be empty");
      return;
    } else if (respassword === "") {
      alert("Repassword should not be empty");
      return;
    } else if (password !== respassword) {
      alert("Password and Repassword should be same");
      return;
    }
    let jsonOBj = {
      name: name,
      mobile: mobile,
      password: password,
      email: email,
    };

    httpPost("signup/user", jsonOBj)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(
        (res) => {
          if (res.hasOwnProperty("id")) {
            alert("Registration success.please sign in");
            setMobile("");
            setPassword("");
            setRePassword("");
            setEmail("");
            setName("");
            setsignin_up_model("sign-in"); //hide the sign up model.
          } else {
            alert(res["message"]);
          }
        },
        (error) => {
          alert(error.message);
        }
      )
      .catch((err) => console.log(err));
  };
  const getTotalAmount = () => {
    return cartData.cartItems.reduce(
      (prevValue, currentValue) => prevValue + currentValue.price,
      0
    );
  };
  const loginApi = () => {
    if (mobile === "") {
      alert("Mobile should not be empty");
      return;
    } else if (password === "") {
      alert("password should not be empty");
      return;
    }
    let jsonOBj = { mobile: mobile, password: password };

    httpPost("login/user", jsonOBj)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res["token"] != null) {
            localStorage.setItem("token", res["token"]); //token
            localStorage.setItem(
              "user_id",
              res["user_profile_details"]["user_id"]
            ); //user_id
            setsignin_up_model(""); //hide the sign up model.
            window.location.reload();
            //getCategory();
          } else {
            alert(res["message"]);
          }

          //console.log(res);
        },
        (error) => {
          alert(error.message);
        }
      );
  };
  
  const clearCartData = (id) => {
    let obj = {
      cartId: id,//cartId should be dynamic
      userId: localStorage.getItem("user_id"),
    };
    httpPostwithToken("addtocart/removeProductFromCart", obj).then((res) =>
      res.json()
    );
    window.location.reload();
  };
  const LogOut = () => {
    {
      localStorage.clear();
      window.location.reload();
    }
  };
  return (
    <>
      <Navbar expand="lg" variant="light" bg="primary">
        <div className="header" id="home1">
          <div className="container">
            <div className="w3l_login">
              <a
                href="javascript:void(0)"
                onClick={() => setsignin_up_model("sign-in")}
                data-toggle="modal"
                data-target="#myModal88"
              >
                <span
                  className="glyphicon glyphicon-user"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
            {/* <h1>E_Cart App</h1> */}
            {/* <div className="w3l_logo">
            <h1>
              <a href="#">
                Electronic Store<span>Your stores. Your place.</span>
              </a>
            </h1>
          </div> */}
          </div>
        </div>
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand>
          <div className="cart cart box_1">
            <button
              onClick={() => setShowCartPopup(true)}
              className="w3view-cart"
              type="submit"
              name="submit"
              value=""
            >
              <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
              <span className="cart_count">{cartData.cartItems.length}</span>
            </button>
          </div>
        </Container>
        <Button variant="light" className="me-3" onClick={() => LogOut()}>
          Logout
        </Button>
      </Navbar>

      <Menu></Menu>
      <div className={showCartPopup ? "active" : ""} id="w3lssbmincart">
        <Link to={"/checkoutcart/"}>Checkout Cart</Link>
        <div
          onClick={() => setShowCartPopup(false)}
          style={{ float: "right", cursor: "pointer" }}
        >
          X
        </div>
        <ul>
          {cartData.cartItems.map((cartObj) => (
            <li
              key={cartObj.id}
              className="sbmincart-item sbmincart-item-changed"
            >
              <div className="sbmincart-details-name">
                <a className="sbmincart-name">{cartObj.productName}</a>
                <ul className="sbmincart-attributes"></ul>
              </div>
              <div className="sbmincart-details-quantity">
                {/* <input data-sbmincart-idx="0" name="quantity_1" type="text" pattern="[0-9]*" value="1" autocomplete="off"/>        */}
                <span className="sbmincart-quantity">{cartObj.qty}</span>
              </div>
              <div className="sbmincart-details-remove">
                <button
                  type="button"
                  className="sbmincart-remove"
                  data-sbmincart-idx="0"
                  onClick={() => clearCartData(cartObj.id)}
                >
                  ??
                </button>
              </div>
              <div className="sbmincart-details-price">
                <span className="sbmincart-price">{cartObj.price}</span>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <span>Total: </span>
          <span>Rs.{getTotalAmount()}</span>
        </div>
      </div>

      <div className={"modal " + sign_in_up_model} id="myModal88">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                {sign_in_up_model === "sign-in" ? "Login" : "Register"}
              </h4>
              <button
                onClick={() => setsignin_up_model("")}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body  modal-body-sub">
              <div className="row">
                <div className="col-md-8 modal_body_left modal_body_left1">
                  <div className="sap_tabs">
                    <div id="horizontalTab">
                      <ul>
                        <li
                          onClick={() => setsignin_up_model("sign-in")}
                          className="resp-tab-item"
                          aria-controls="tab_item-0"
                        >
                          <span>Login</span>
                        </li>
                        <li
                          onClick={() => setsignin_up_model("sign-up")}
                          className="resp-tab-item"
                          aria-controls="tab_item-1"
                        >
                          <span>Register</span>
                        </li>
                      </ul>
                      <div
                        className="tab-1 sign-in resp-tab-content"
                        aria-labelledby="tab_item-0"
                      >
                        <div className="facts">
                          <div className="register">
                            <form action="#" method="post">
                              <input
                                onChange={(e) => setMobile(e.target.value)}
                                name="Mobile"
                                placeholder="Enter Mobile"
                                type="text"
                                required=""
                              />
                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                name="Password"
                                placeholder="Password"
                                type="password"
                                required=""
                              />
                              <div className="sign-up">
                                <input
                                  className="btn"
                                  onClick={() => loginApi()}
                                  type="button"
                                  value="Sign in"
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-2 sign-up resp-tab-content"
                        aria-labelledby="tab_item-1"
                      >
                        <div className="facts">
                          <div className="register">
                            <form action="#" method="post">
                              <input
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Name"
                                name="Name"
                                type="text"
                                required=""
                              />
                              <input
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email Address"
                                name="Email"
                                type="email"
                                required=""
                              />
                              <input
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Enter Mobile"
                                name="mobile"
                                type="text"
                                required=""
                              />
                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                name="Password"
                                type="password"
                                required=""
                              />
                              <input
                                onChange={(e) => setRePassword(e.target.value)}
                                placeholder="Enter Confirm Password"
                                name="Password"
                                type="password"
                                required=""
                              />
                              <div className="sign-up">
                                <input
                                  className="btn"
                                  onClick={() => signUpApi()}
                                  type="button"
                                  value="Sign Up"
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
