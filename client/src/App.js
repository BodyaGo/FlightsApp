import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// app routes
import Header from './components/Header';
import Home from   './components/Home';
import News from   './components/News';
import Footer from './components/Footer';
import Products from './components/Products';
import ProductPage from './components/ProductPage';

// user
import Login        from './components/user/Login';
import Registration from './components/user/Registration';
import User         from './components/user/User';
import Cart from './components/user/Cart';

// bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/user" element={<User />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/products" element={<Products />} />
          <Route path="/ProductPage/:id" element={<ProductPage />} />
          <Route path="/products/ProductsPage/:id" element={<ProductPage />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
