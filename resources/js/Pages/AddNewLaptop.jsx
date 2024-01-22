import { Inertia } from '@inertiajs/inertia'
import React, { useEffect, useState } from 'react';
import TopNav from '../component/Navbar/TopNav';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react'

const AddNewLaptop = ({ success, error }) => {

    // Inertia.get(`delete-laptop/${removeId}`)

    const { data, setData, post, progress } = useForm({
        name: null,
        avatar: null,
        price: null,
        quentity: null,
    })


    function submit(e) {
        e.preventDefault()
        post('/save-laptop')

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

            setTimeout(function () {
                location.reload();
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
                                    <input type="file" className="form-control" onChange={e => setData('avatar', e.target.files[0])} />
                                </div>
                                <div className="form-group mt-3">
                                    <label for="price">Price</label>
                                    <input type="price" className="form-control" value={data.price} onChange={e => setData('price', e.target.value)} placeholder='1000' />
                                </div>

                                <div className="form-group mt-3">
                                    <label for="price">Quantity</label>
                                    <input type="price" className="form-control" value={data.quentity} onChange={e => setData('quentity', e.target.value)} placeholder='1000' />
                                </div>

                                <button type="submit" className="btn btn-primary mt-4">Submit</button>
                            </form>

                            {/* {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                )} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNewLaptop;