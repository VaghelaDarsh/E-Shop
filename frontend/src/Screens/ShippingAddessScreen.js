import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddessScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    if(!userInfo){
        props.history.push('/signin')
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler =(e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName,address,city,postalCode,country}))
        props.history.push('/payment')
    }

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>

                <div>
                    <lable htmlFor="fullName">Full Name</lable>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Enter full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required  
                    ></input>
                </div>

                <div>
                    <lable htmlFor="address">Full address</lable>
                    <input
                      type="text"
                      id="address"
                      placeholder="Enter full address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required  
                    ></input>
                </div>

                <div>
                    <lable htmlFor="city">city</lable>
                    <input
                      type="text"
                      id="city"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required  
                    ></input>
                </div>

                <div>
                    <lable htmlFor="postalCode">postalCode</lable>
                    <input
                      type="text"
                      id="postalCode"
                      placeholder="Enter postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required  
                    ></input>
                </div>

                <div>
                    <lable htmlFor="country">country</lable>
                    <input
                      type="text"
                      id="country"
                      placeholder="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required  
                    ></input>
                </div>


                <div>
                    <lable/>
                    <button className="primary" type="submit">Countinue</button>
                </div>

            </form>
        
        </div>
    )
}
