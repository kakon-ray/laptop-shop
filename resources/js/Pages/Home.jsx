import React, { useEffect, useState } from 'react';
import TopNav from '../component/Navbar/TopNav';
import { Table } from 'react-bootstrap';
import '../css/home.css'
import { Inertia } from '@inertiajs/inertia'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct,updateProduct } from "../redux/action/ProductAction";
import { postCartList, update_cartqunatity } from "../redux/action/CartListAction";
import { Link } from '@inertiajs/react'
import Swal from 'sweetalert2';

const Home = ({success, error, allLaptop }) => {

  const dispatch = useDispatch();

  const allProduct = useSelector(
    (state) => state.product.product
  );


  useEffect(() => {
    dispatch(getProduct(allLaptop))
    }, []);


const deleteHandeler = (removeId) => {
        axios.get(`/delete-laptop/${removeId}`).then((response) => {
            if (response.data.status == 200) {
                dispatch(deleteProduct(removeId))
            }
        });

    }

    


    const addtoCartList = (item) => {

        dispatch(postCartList(item))
    }

    useEffect(() => {
        if (success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: success,
                showConfirmButton: false,
                timer: 1500
            });

            // dispatch(updateProduct(data))

            // setTimeout(function() {
            //     navigation.navigate('/')
            //     window.location('/')
            // }, 1500);

        } else if (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: error,
                showConfirmButton: false,
                timer: 1500
            });
    
        }
      
    }, [success, error]);

    return (
        <>
            <TopNav />

            <div className="container">
                <div className="row mt-2">
                    <div className="col-lg-12">
                        <h2 className='text-center py-4'>Our Laptop</h2>
                    </div>
                    <div className="col-lg-12">
                        <Table striped bordered hover className='text-center'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProduct?.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <img src={item.image} className='home-image' alt="" />
                                            </td>
                                            <td>{item.price}</td>
                                          
                                            <td className='d-flex gap-3 justify-content-center'>
                                                <button className='btn btn-danger' onClick={() => deleteHandeler(item.id)}>Delete</button>
                                                <button className='btn btn-danger' onClick={() => addtoCartList(item)}>Add Cart</button>
                                                <Link  href={`/update-laptop/${item.id}`} className='btn btn-primary'>Update</Link>
                                            </td>
                                        </tr>
                                    );
                                })}


                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>


        </>
    );
}


export default Home;