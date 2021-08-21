import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');


    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading,error,user} = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success:successUpdate,error:errorUpdate,loading:loadingUpdate} = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() => {
        if(!user){
            dispatch({type:USER_UPDATE_RESET})
            dispatch(detailsUser(userInfo._id,user));
        }else{
            setName(user.name);
            setEmail(user.email);
            if(user.seller){
                setSellerName(user.seller.name);
                setSellerLogo(user.seller.logo);
                setSellerDescription(user.seller.description);
            }
        }
    },[dispatch,userInfo._id,user])

    const submitHandler= (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords not Matching")
        }
        else{
            dispatch(updateUserProfile({userId:user._id,
            name,email,password,sellerName,sellerLogo,sellerDescription
            }))
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div><h1>User Profile</h1></div>
                {
                   loading? <LoadingBox></LoadingBox> 
                          : error?  <MessageBox variant="danger">{error}</MessageBox>
                                : 

                                <>
                                {loadingUpdate && <LoadingBox></LoadingBox> }
                                {errorUpdate &&  <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                                {successUpdate &&  <MessageBox variant="success">Profile Updated</MessageBox>}
                                <div>

                                    <lable htmlFor="name">Name</lable>
                                    <input id="name" 
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}></input>
                                </div>

                                <div>

                                    <lable htmlFor="email">Email</lable>
                                    <input id="email" 
                                        type="text"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}></input>
                                </div>

                                <div>

                                    <lable htmlFor="password">Password</lable>
                                    <input id="password" 
                                        type="password"
                                        placeholder="Enter password"
                                        onChange={(e) => setPassword(e.target.value)}></input>
                                </div>

                                <div>

                                    <lable htmlFor="confirmPassword">Confirm Pssword</lable>
                                    <input id="confirmPassword" 
                                        type="password"
                                        placeholder="Enter confirm password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    ></input>
                                </div>

                                {
                                    user.isSeller && (
                                        <>
                                        
                                        <h2>Seller</h2>

                                        <div>
                                            <lable htmlFor="SellerName">Seller Name</lable>
                                            <input id="sellerName" 
                                                type="text"
                                                placeholder="Enter name"
                                                value={sellerName}
                                                onChange={(e) => setSellerName(e.target.value)}></input>
                                        </div>

                                        <div>
                                            <lable htmlFor="SellerLogo">Seller Name</lable>
                                            <input id="sellerLame" 
                                                type="text"
                                                placeholder="SellerLogo"
                                                value={sellerLogo}
                                                onChange={(e) => setSellerLogo(e.target.value)}></input>
                                        </div>

                                        <div>
                                            <lable htmlFor="SellerDescription">Seller Description</lable>
                                            <textarea id="sellerDescription" 
                                                type="text"
                                                placeholder="Enter Description"
                                                value={sellerDescription}
                                                onChange={(e) => setSellerDescription(e.target.value)}></textarea>
                                        </div>
                                        </>
                                    )
                                }

                                <div>
                                    <label/>
                                    <button className="primary" type="submit">Update</button>
                                </div>

                                </>

                                
                        }
            </form>
        </div>
    )
}
