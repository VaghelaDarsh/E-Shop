import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserByAdmin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_BYADMIN_RESET } from '../constants/userConstants';

export default function UserEditSceen(props) {

    const userId = props.match.params.id;


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);
    const [isSeller,setIsSeller] = useState(false);


    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdateByAdmin);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_BYADMIN_RESET });
            props.history.push('/userlist');
        }
        if (!user) {
            dispatch(detailsUser(userId));
        }    
        else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update user
        dispatch(updateUserByAdmin({ _id: userId, name, email, isSeller, isAdmin }));
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div><h1>Edit User {name}</h1></div>
                {
                   loading? <LoadingBox></LoadingBox> 
                          : error?  <MessageBox variant="danger">{error}</MessageBox>
                                : 

                                <>
                                {loadingUpdate && <LoadingBox></LoadingBox> }
                                {errorUpdate &&  <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                                {successUpdate &&  <MessageBox variant="success">User Updated</MessageBox>}
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
                                    <lable htmlFor="isSeller">Is Seller</lable>
                                    <input id="isSeller" 
                                        type="checkbox"
                                        checked={isSeller}
                                        onChange={(e) => setIsSeller(e.target.checked)}></input>
                                </div>

                                <div>
                                    <lable htmlFor="isAdmin">Is Admin</lable>
                                    <input id="isAdmin" 
                                        type="checkbox"
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}></input>
                                </div>

                                

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
