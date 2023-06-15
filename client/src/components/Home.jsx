import {
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import axios from "axios";
import "./style/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [userData, setUserData] = useState({});
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

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

  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

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
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="shadow-sm">
                <Link to={`./ProductPage/${product.id}`}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Price: {product.price} UAH
                      </ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary" onClick={() => addToCart(product)}>
                      Add to cart
                    </Button>
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

export default Home;
