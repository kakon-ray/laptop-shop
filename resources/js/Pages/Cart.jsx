import React, { useEffect, useState } from 'react';
import TopNav from '../component/Navbar/TopNav';
import { Table } from 'react-bootstrap';
import '../css/home.css'
import { Inertia } from '@inertiajs/inertia'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { deleteCartList, postCartList, update_cartqunatity } from "../redux/action/CartListAction";

const Home = ({ allLaptop }) => {

    const dispatch = useDispatch();

    const allcart = useSelector(
        (state) => state.product.cart
      );

      const removeCartList = (item) => {
        dispatch(deleteCartList(item))
    }

    const handleCartQuantity = (id,quantity) =>{
     
        dispatch(update_cartqunatity({id,quantity}))
    }


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
                                {allcart?.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <img src={item.image} className='home-image' alt="" />
                                            </td>
                                            <td>{item.price}</td>
                                            <td>
                                                <input type="number"  defaultValue={item.quantity} onChange={e => handleCartQuantity(item.id,e.target.value)}/>
                                            </td>
                                            <td className='d-flex gap-3 justify-content-center'>
                                                <button className='btn btn-danger' onClick={() => removeCartList(item.id)}>Delete Cart</button>
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