import axios from "axios";
import { 
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_SUCCESS} from "../constants/productConstants"

export const listProducts = ({seller=''}) => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try{
        const {data}  = await axios.get(`/api/products?seller=${seller}`);
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    }
    catch(err){
        dispatch({type:PRODUCT_LIST_FAIL,payload:err.message})
    }
}


export const detailsProduct = (productId) => async (dispatch) =>{
    dispatch({
        type:PRODUCT_DETAILS_REQUEST,
        payload:productId
    });

    try{
        const {data} = await axios.get(`/api/products/${productId}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
    }
    catch(err){
        dispatch({type:PRODUCT_DETAILS_FAIL,
            payload:
            err.response && err.response.data.message 
            ? err.response.data.message
            : err.message, 
        });
    }
}

export const createProduct = () => async (dispatch,getState) =>{
    dispatch({
        type:PRODUCT_CREATE_REQUEST,
    });

    const {userSignin:{userInfo}} = getState();

    try{
        const {data} = await axios.post(`/api/products`,{},{
            headers:{
                authorization:`Bearer ${userInfo.token}`,
            },
        })
        dispatch({type:PRODUCT_CREATE_SUCCESS,payload:data.product})
    }
    catch(err){
        dispatch({type:PRODUCT_CREATE_FAIL,
            payload:
            err.response && err.response.data.message 
            ? err.response.data.message
            : err.message, 
        });
    }
}


export const updateProduct = (product) => async (dispatch,getState) =>{
    dispatch({
        type:PRODUCT_UPDATE_REQUEST,payload:product
    });

    const {userSignin:{userInfo}} = getState();

    try{
        const {data} = await axios.put(`/api/products/${product._id}`,product,{
            headers:{
                authorization:`Bearer ${userInfo.token}`,
            },
        })
        dispatch({type:PRODUCT_UPDATE_SUCCESS,payload:data})
    }
    catch(err){
        dispatch({type:PRODUCT_UPDATE_FAIL,
            payload:
            err.response && err.response.data.message 
            ? err.response.data.message
            : err.message, 
        });
    }
}

export const deleteProduct = (productId) => async (dispatch,getState) =>{
    dispatch({
        type:PRODUCT_DELETE_REQUEST,payload:productId
    });

    const {userSignin:{userInfo}} = getState();

    try{
        const {data} = await axios.delete(`/api/products/${productId}`,{
            headers:{
                authorization:`Bearer ${userInfo.token}`,
            },
        })
        dispatch({type:PRODUCT_DELETE_SUCCESS})
    }
    catch(err){
        dispatch({type:PRODUCT_DELETE_FAIL,
            payload:
            err.response && err.response.data.message 
            ? err.response.data.message
            : err.message, 
        });
    }
}