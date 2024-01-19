import React from 'react';
import TopNav from '../component/Navbar/TopNav';
import { Table } from 'react-bootstrap';


const Home = ({ title }) => {
    return (
        <>
            <TopNav />

            <div className="container">
                <div className="row mt-2">
                    <div className="col-lg-12">
                        <h2 className='text-center py-4'>Our Laptop</h2>
                    </div>
                    <div className="col-lg-12">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Namve</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                              
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>


        </>
    );
}


export default Home;