/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Laptop1 from '../../image/laptop1.jpg'
import './ProductSection.css'
const HomePage = () => {
  return (
    <div className="col-lg-3">
      <Card className="product">
      <Card.Img variant="top" src={Laptop1} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
  );
};

export default HomePage;