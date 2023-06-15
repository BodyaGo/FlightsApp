import { Row, Col, Card, ListGroup, Button, Container, Form } from "react-bootstrap";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaHome, FaStore } from "react-icons/fa";

import axios from "axios";

import "./style/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  //   const [visibleProducts, setVisibleProducts] = useState(6);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:3001/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  //   const showMoreProducts = () => {
  //     setVisibleProducts(visibleProducts + 6);
  //   };

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3001/productsFilter", {
      params: {
        price: priceRange.max,  // Use the 'max' value for the price filter
        search: searchQuery,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      },
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, priceRange]);

  return (
    <div className="container">
      <Container className="my-5">
        <h1 className="text-center mb-5">
          <FaStore className="me-2" />
          Available Flights 
        </h1>
        <div className="filter-container">
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="priceRange">
                  <Form.Label>Price Range:</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, min: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, max: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="searchQuery">
                  <Form.Label>Search:</Form.Label>
                  <Form.Control
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="primary" onClick={fetchProducts}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Row xs={1} md={2} className="g-4">
          {products.map((products) => (
            <Col key={products.id}>
              <Card className="shadow-sm">
              <Link to={`./ProductsPage/${products.id}`}>
                  <Card.Img
                    variant="top"
                    src={products.image}
                    alt={products.name}
                  />
                  <Card.Body>
                    <Card.Title>{products.name}</Card.Title>
                    <Card.Text>{products.description}</Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Ціна: {products.price}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary">  Buy this </Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Products;
