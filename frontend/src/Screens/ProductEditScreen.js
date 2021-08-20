import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {

    const productId = props.match.params.id;

    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [countInStock,setcountInStock] = useState('');
    const [brand,setBrand] = useState('');
    const [description,setDescription] = useState('');

    const [ loadingFileUpload, setLoadingFileUpload] = useState(false);
    const [ errorFileUpload, setErrorFileUpload] = useState('');

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product} = productDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productUpdate = useSelector(state => state.productUpdate);
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate;
    
    const dispatch = useDispatch();
    
    useEffect(()=> {
        if(successUpdate){
            props.history.push('/productlist')
        }
        if(!product || product._id !== productId || successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setImage(product.image);
            setPrice(product.price);
            setCategory(product.category);
            setcountInStock(product.countInStock)
            setBrand(product.brand);
            setDescription(product.description);
        }
    },[product,dispatch,productId,successUpdate,props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id:productId,name,price,image,category,brand,countInStock,description}))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const body = new FormData();
        body.append('image',file);

        setLoadingFileUpload(true);

        try{
            const {data} = await axios.post('/api/uploads',body,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                  },
            });
            setImage(data);
            setLoadingFileUpload(false);
        }
        catch(err){
            setErrorFileUpload(err.message);
            setLoadingFileUpload(false);
        }

    }


    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>

             {loadingUpdate && <LoadingBox></LoadingBox> }
                      {errorUpdate &&  <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                      {successUpdate &&  <MessageBox variant="success">Profile Updated</MessageBox>} 

            {
                loading? <LoadingBox></LoadingBox> 
                : error?  <MessageBox variant="danger">{error}</MessageBox>
                      : 

                      <>
            
                      <div>

                          <lable htmlFor="name">Name</lable>
                          <input id="name" 
                              type="text"
                              placeholder="Enter name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}></input>
                      </div>

                      <div>

                          <lable htmlFor="image">Image</lable>
                          <input id="image" 
                              type="text"
                              placeholder="Enter image"
                              value={image}
                              onChange={(e) => setImage(e.target.value)}></input>
                      </div>

                      <div>
                          <label htmlFor="iamgeFile">Image File</label>
                          <input
                            type="file"
                            id="imageFile"
                            label="ChooseImage"
                            onChange={uploadFileHandler}></input>
                      </div>

                      {loadingFileUpload && <LoadingBox></LoadingBox>}
                      {errorFileUpload && <MessageBox variant="danger">{errorFileUpload}</MessageBox>}

                      <div>

                          <lable htmlFor="price">Price</lable>
                          <input id="price" 
                              type="number"
                              placeholder="Enter price"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}></input>
                      </div>

                      <div>

                          <lable htmlFor="category">Category</lable>
                          <input id="category" 
                              type="text"
                              placeholder="Enter category"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                          ></input>
                      </div>

                      <div>

                          <lable htmlFor="countInStock">CountInStock</lable>
                          <input id="countInStock" 
                              type="text"
                              placeholder="Enter countInStock"
                              value={countInStock}
                              onChange={(e) => setcountInStock(e.target.value)}
                          ></input>
                      </div>

                      <div>

                          <lable htmlFor="brand">brand</lable>
                          <input id="brand" 
                              type="text"
                              placeholder="Enter brand"
                              value={brand}
                              onChange={(e) => setBrand(e.target.value)}
                          ></input>
                      </div>

                      <div>

                          <lable htmlFor="description">Description</lable>
                          <textarea id="description" 
                              type="text"
                              placeholder="Enter description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
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
