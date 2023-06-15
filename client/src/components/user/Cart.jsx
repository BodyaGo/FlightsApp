import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import "./style/Cart.css";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  const handleDeleteAll = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrderSubmit = (event) => {
    event.preventDefault();
  
    if (!phoneNumber || !city || !address || !paymentMethod) {
      setError("Please fill in all the required fields.");
      return;
    }
  
    const orderAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  
    const productIds = cartItems.map((item) => item.id).join(',');
  
    axios
      .post("http://localhost:3001/order", {
        phoneNumber: phoneNumber,
        city: city,
        address: address,
        paymentMethod: paymentMethod,
        orderAmount: orderAmount,
        productIds: productIds,
      })
      .then(() => {
        setPhoneNumber("");
        setCity("");
        setAddress("");
        setPaymentMethod("");
        setError("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while submitting the order.");
      });
  };
  
  return (
    <div className="container">
      <h1 className="mb-4">My flights Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <Card className="cart-card">
          <Card.Body>
            <Card.Title className="mb-4">Cart Items</Card.Title>
            <ul className="cart-items-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">Price: {item.price}</span>
                  </div>
                  <div className="item-quantity">
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    />
                  </div>
                  <Button
                    variant="link"
                    className="text-danger item-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTimes />
                  </Button>
                </li>
              ))}
            </ul>
            <p className="total-price">Total Price: {totalPrice}</p>
            <div className="buttons-container">
              <Button variant="primary" onClick={handleReload}>
                Reload Page
              </Button>
              <Button variant="danger" onClick={handleDeleteAll}>
                Delete All
              </Button>
            </div>
          </Card.Body>

          <Form onSubmit={handleOrderSubmit} className="cart-form">
              {error && <p className="error-message">{error}</p>}
              <Form.Group controlId="phoneNumber">
                <Form.Label className="cart-form-label">
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="cart-form-control"
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label className="cart-form-label">City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="cart-form-control"
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label className="cart-form-label">Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="cart-form-control"
                />
              </Form.Group>
              <Form.Group controlId="paymentMethod">
                <Form.Label className="cart-form-label">
                  Payment Method
                </Form.Label>
                <Form.Control
                  as="select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="cart-form-control"
                >
                  <option value="">Select a payment method</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bankTransfer">Bank Transfer</option>
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="cart-form-submit"
                onClick={handleOrderSubmit}
              >
                Submit Order
              </Button>
            </Form>
        </Card>
      )}
    </div>
  );
}

export default Cart;
