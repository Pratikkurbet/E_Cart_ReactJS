import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Menu from './Menu';
import {httpPost,httpPostwithToken} from './HttpConfig';

export default function Product() {
    return (
        <div className="single">
		<div className="container">
			<div className="col-md-4 single-left">
				<div className="flexslider">
					<ul className="slides">
						<li data-thumb="images/a.jpg">
							<div className="thumb-image"> <img src="../assets/images/a.jpg" data-imagezoom="true" className="img-responsive" alt=""/> </div>
						</li>
						
					</ul>
                    </div>
                    </div>
               

        <div className="col-md-8 single-right">
				<h3>The Best 3GB RAM Mobile Phone</h3>
				<div className="rating1">
					<span className="starRating">
						<input id="rating5" type="radio" name="rating" value="5"/>
						<label for="rating5">5</label>
						<input id="rating4" type="radio" name="rating" value="4"/>
						<label for="rating4">4</label>
						<input id="rating3" type="radio" name="rating" value="3" checked/>
						<label for="rating3">3</label>
						<input id="rating2" type="radio" name="rating" value="2"/>
						<label for="rating2">2</label>
						<input id="rating1" type="radio" name="rating" value="1"/>
						<label for="rating1">1</label>
					</span>
				</div>
				<div className="description">
					<h5><i>Description</i></h5>
					<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
						eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
						Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut 
						odit aut fugit, sed quia consequuntur magni dolores eos qui 
						ratione voluptatem sequi nesciunt.</p>
				</div>
			
				
				<div className="simpleCart_shelfItem">
					<p><i className="item_price">$450</i></p>
					
						  
						<button type="submit" className="w3ls-cart">Add to cart</button>
				
				</div> 
			</div>
           
                </div>
                </div>
    )
}