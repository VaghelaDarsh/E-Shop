import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listusers } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function UserListScreen() {

    const userList = useSelector(state => state.userList);
    const {loading,error,users} = userList;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listusers());
    },[dispatch])

    return (
        <div>
            <hq>User</hq>
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
                                            >Details
                                        </button>

                                        <button 
                                            type="button" 
                                            className="small"
                                            >Delete
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
