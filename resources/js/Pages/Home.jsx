import React from 'react';
import TopNav from '../component/Navbar/TopNav';
import { Table } from 'react-bootstrap';
import '../css/home.css'

const Home = ({ allLaptop }) => {
    console.log(allLaptop)
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
                                {allLaptop?.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <img src={item.image} className='home-image' alt="" />
                                            </td>
                                            <td>{item.price}</td>
                                            <td className='d-flex gap-3 justify-content-center'>
                                                <button className='btn btn-danger'>Delete</button>
                                                <button className='btn btn-primary'>Update</button>
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