import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {Link}  from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        :'/';

    const userRegister = useSelector((state) => state.userRegister);
    const {userInfo,loading,error} = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        if(password !== confirmPassword){
            alert('Password not Matching')
        }
        else{
            e.preventDefault();
            dispatch(register(name,email,password));
        }
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history,redirect,userInfo])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>

                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                
                <div>
                    <lable htmlFor="name">Email address</lable>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter name" 
                        required
                        onChange={(e) => setName(e.target.value)}></input>
                </div>
                
                
                <div>
                    <lable htmlFor="email">Email address</lable>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter email" 
                        required
                        onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div>
                    <lable htmlFor="password">Password</lable>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter password" 
                        required
                        onChange={(e) => setPassword(e.target.value)}></input>
                </div>

                <div>
                    <lable htmlFor="Confirmpassword">Confirm Password</lable>
                    <input 
                        type="password" 
                        id="Confirmpassword" 
                        placeholder="Confirm password" 
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>

                <div>
                    <lable/>
                    <button className="primary" type="submit">Register</button>
                </div>

                <div>
                    <lable/>
                    <div>
                        Already Registerd? <Link to={`/signin?redirect=${redirect}`}>SignIn</Link>
                    </div>
                </div>
                
            </form>
        </div>
    )
}
