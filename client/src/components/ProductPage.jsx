import React, { useState, useEffect } from 'react';
import { Row, Col, Card, ListGroup, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaMoneyBillWave, FaPlane } from 'react-icons/fa';
import { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style/ProductPage.css'; // Import your custom CSS file

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };
    fetchProduct();
  }, [id]);

  registerLocale('uk', uk);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isItemInCart = cartItems.some((item) => item.id === product.id);

    if (isItemInCart) {
      alert("This item is already in the cart.");
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        date: selectedDate
      };
      cartItems.push(cartItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="product-page-container">
      <header className="text-center my-5">
        <h1>
          <FaPlane className="me-2" />
          {product && product.name} ready for Flight
        </h1>
      </header>
      <Row>
        <Col md={8} lg={6} xl={4}>
          {product && (
            <Card className="shadow-sm mb-4">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Date: {product.date}</Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <FaMoneyBillWave className="me-2" />
                    Price: {product.price} UAH
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <h3>Product Information</h3>
              {product && (
                <>
                  <p>Name: {product.name}</p>
                  <p>Description: {product.description}</p>
                  <p>Price: {product.price}</p>
                  <div className="my-5">
                    <div className="calendar-container">
                      <Calendar className="calendar" />
                    </div>
                  </div>
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    Add to cart
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
  
};

export default ProductPage;
