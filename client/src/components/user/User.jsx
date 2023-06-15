import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaUser, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./style/User.css";

function User() {
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [priceError, setPriceError] = useState("");
  const history = useNavigate();

  const [productList, setProductList] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await Axios.get("http://localhost:3001/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    history("/login");
    window.location.reload();
  };

  const createProduct = () => {
    let valid = true;

    if (price === "") {
      setPriceError("Price is required");
      valid = false;
    } else {
      setPriceError("");
    }

    if (!valid) {
      return;
    }

    Axios.post("http://localhost:3001/createProduct", {
      name: name,
      description: description,
      price: price,
      image: image,
      date: date,
    }).then(() => {
      setProductList([
        ...productList,
        {
          name: name,
          description: description,
          price: price,
          image: image,
          date: date,
        },
      ]);
    });
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/deleteProduct/${id}`).then(
      (response) => {
        setProductList(productList.filter((val) => val.id !== id));
      }
    );
  };

  const [showAllProducts, setShowAllProducts] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const handleShowAllProducts = () => {
    Axios.get("http://localhost:3001/products")
      .then((response) => {
        setAllProducts(response.data);
        setShowAllProducts(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  const isAdmin = userData.admin;

  return (
    <div className="container">
      <div className="header">
        <div className="logo">Air Transportation</div>
        <Button variant="primary" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>

      <div className="profile">
        <Card className="profile-card">
          <Card.Body>
            <h2 className="profile-title">Profile {userData.username}</h2>
            <div className="row">
              <div className="col-md-6">
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-label">
                      <FaEnvelope className="form-icon" /> Email:{" "}
                      {userData.email}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label className="form-label">
                      <FaUser className="form-icon" /> Username:{" "}
                      {userData.username}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group controlId="formBasicPhoneNumber">
                    <Form.Label className="form-label">
                      <FaPhone className="form-icon" /> Phone Number:{" "}
                      {userData.phoneNumber}
                    </Form.Label>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <div className="card p-4">
            <Card.Body>
              <Link to="/cart" className="btn btn-primary">
                Go to Flights
              </Link>
            </Card.Body>
          </div>
        </div>
      </div>

      {isAdmin && (
        <>
         <div className="container py-5">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="card p-4">
                  <h2 className="mb-4">Add Flight Form</h2>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description:</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price:</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        onChange={(event) => {
                          setPrice(event.target.value);
                        }}
                      />
                      {priceError && (
                        <p className="text-danger">{priceError}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                          setImage(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                          setDate(event.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={createProduct}
                    >
                      Add Product
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-5">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="card p-4">
                  {showAllProducts ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Image</th>
                          <th>Date</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allProducts.map((product, key) => {
                          return (
                            <tr key={key}>
                              <td>{product.name}</td>
                              <td>{product.description}</td>
                              <td>{product.price}</td>
                              <td>
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  height="50"
                                  width="50"
                                />
                              </td>
                              <td>{product.date}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteProduct(product.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={handleShowAllProducts}
                    >
                      Show All Flights
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default User;
