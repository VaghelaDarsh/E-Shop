import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listusers } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DELETE_RESET, USER_DETAILS_RESET } from '../constants/userConstants'

export default function UserListScreen(props) {

    const userList = useSelector(state => state.userList);
    const {loading,error,users} = userList;

    const userDelete = useSelector(state => state.userDelete);
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = userDelete;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listusers());
        dispatch({type:USER_DETAILS_RESET})
    },[dispatch,successDelete]);

    const deleteUserHandler = (user) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(user._id));
        }
    }

    return (
        <div>
            <hq>User</hq>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Deleted</MessageBox>}


            {
                loading? (<LoadingBox></LoadingBox>)
                :error? (<MessageBox variant="danger">{error}</MessageBox>)
                :(
                    <table className="table">
                        <thead>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>IS SELLER</th>
                            <th>IS ADMIN</th>
                            <th>ACTION</th>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isSeller? 'Yes' : 'No'}</td>
                                        <td>{user.isAdmin? 'Yes' : 'No'}</td>
                                        <td>

                                        <button 
                                            type="button" 
                                            className="small"
                                            onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                            >Edit
                                        </button>

                                        <button 
                                            type="button" 
                                            className="small"
                                            onClick={() => deleteUserHandler(user)}>Delete
                                        </button>

                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
                
                
            }
        </div>
    )
}
