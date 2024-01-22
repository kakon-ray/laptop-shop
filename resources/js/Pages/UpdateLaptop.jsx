import React, { useEffect, useState } from 'react';
import TopNav from '../component/Navbar/TopNav';
import { useForm } from '@inertiajs/react'
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia'
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../redux/action/ProductAction";


const UpdateLaptop = ({success, error,laptop}) => {
    const dispatch = useDispatch();


    const { data, setData, post, progress } = useForm({
        name: null,
        avatar: null,
        price: null,
        oldimage:laptop.image,
    })

    useEffect(() => {
        setData(laptop);
    }, [laptop]);
    

    function submit(e) {
        e.preventDefault()
        post('/update-laptop-submited')

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

            dispatch(updateProduct(data))

            setTimeout(function() {
                navigation.navigate('/')
            }, 1500);

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
                <div className="row mt-4">
                    <div className="card p-4">
                        <div className="col-lg-12">
                            <form onSubmit={submit}>
                                <div className="form-group">
                                    <label for="name">Laptop Name</label>
                                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="form-control" name="name" placeholder="Laptop " />
                                </div>
                                <div className="form-group mt-3">
                                    <label for="image">Image</label>
                                    <input type="file" className="form-control"  onChange={e => setData('avatar', e.target.files[0])} />
                                </div>
                                <div className="form-group mt-3">
                                    <label for="price">Price</label>
                                    <input type="price" className="form-control" value={data.price} onChange={e => setData('price', e.target.value)} placeholder='1000' />
                                </div>

                                <button type="submit" className="btn btn-primary mt-4">Update</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateLaptop;