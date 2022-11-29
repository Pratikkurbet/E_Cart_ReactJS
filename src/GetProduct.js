import React  from 'react'
import { useEffect, useState } from "react";
import { httpPost, httpPostwithToken } from "./HttpConfig";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartContextValue } from './ContextProvider';

function GetProduct() { 
    const [categoryList, setCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [cartData, dispatch] = CartContextValue();
   useEffect(() => {
    getCategory();
    getCartApi();
  }, []);
  const addCartApi = (productObj) => {
    let obj = {
      productId: productObj.id,
      qty: "1",
      price: productObj.price,
    };
    httpPostwithToken("addtocart/addProduct", obj)
      .then((res) => {
        res.json().then((data) => {
          if (res.ok) {
            dispatch({
              type: "add_cart",
              data: data,
            });
            alert("Successfully added..");
          } else {
            alert(data.message);
          }
        });
      })
      .catch(function (res) {
        console.log("Error ", res);
        //alert(error.message);
      });
  };
   const getCategory = () => {
    httpPostwithToken("product/getAllCategory", {}).then((res) => {
      res.json().then((response) => {
        if (res.ok) {
          setCategoryList(response);
          getProductsByCategory(response[0].id);
        } else {
          alert("Error in category api..");
        }
      });
    });
  };
   const getProductsByCategory = (cat_id) => {
    let obj = {
      cat_id: cat_id,
    };



    httpPostwithToken("product/getProductsByCategory", obj).then(
        (res) => {
          res.json().then((response) => {
            if (res.ok) {
              if (response.length > 0) {
                console.log(response);
                setProductList(response);
              } else {
                alert("No product found..");
              }
            } else {
              setProductList([]);
              alert("No product found..");
            }
          }); 
        },
        (error) => {
          alert(error.message);
        }
    
      );}
      const getCartApi = () => {
        httpPostwithToken("addtocart/getCartsByUserId", {}).then(
          (res) => {
            res.json().then((data) => {
              if (res.ok) {
                dispatch({
                  type: "add_cart",
                  data: data,
                });
                //alert("Successfully added..")
              } else {
                alert(data.message);
              }
            });
          },
          (error) => {
            alert(error.message);
          }
        );
      };
  return (

    <>
    <div className="cat">
      <ul id="myTab" className="nav nav-tabs" role="tablist">
        {categoryList.map((category) => (
          <li
            onClick={(e) => getProductsByCategory(category.id)}
            key={category.id}
            role="presentation"
          >
            <a href="javascript:void(0)">{category.name}</a>
          </li>
        ))}
      </ul>
    </div><div className='container mt-4'>
        {productList.map((product) => (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src='../assets/images/3.jpg' />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                {product.price}
              </Card.Text>
              <Button variant="primary" onClick={() => addCartApi(product)}>Add to Cart</Button>
            </Card.Body>

          </Card>
        ))}
      </div></>
        )
}

export default GetProduct