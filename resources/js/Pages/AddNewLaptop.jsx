import { Inertia } from '@inertiajs/inertia'
import React from 'react';
import TopNav from '../component/Navbar/TopNav';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddNewLaptop = ({ msg }) => {
    const addlaptop = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;
        const price = e.target.price.value;



        axios.post("/save-laptop", { name, image, price }).then((res) => {
            if (res.data.status == 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        })
    };

    return (
        <>
            <TopNav />

            <div className="container">
                <div className="row mt-4">
                    <div className="card p-4">
                        <div className="col-lg-12">
                            <form onSubmit={addlaptop} method="POST" enctype="multipart/form-data">
                                <div className="form-group">
                                    <label for="name">Laptop Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Laptop " />
                                </div>
                                <div className="form-group mt-3">
                                    <label for="image">Image</label>
                                    <input type="file" className="form-control" name="image" />
                                </div>
                                <div className="form-group mt-3">
                                    <label for="price">Price</label>
                                    <input type="price" className="form-control" name="price" placeholder='1000' />
                                </div>
                                <button type="submit" className="btn btn-primary mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNewLaptop;