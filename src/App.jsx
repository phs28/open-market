import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkLists, setCheckLists] = useState([]);

  const converPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  return (
    <BrowserRouter>
      <TopNavigationBar cart={cart} />
      <Routes>
        <Route path="/" element={<Home products={products} setProducts={setProducts} converPrice={converPrice}/>} />
        <Route path="/product/:id" element={<Product converPrice={converPrice} cart={cart} setCart={setCart}/>} />
        <Route path="/cart" element={<Basket converPrice={converPrice} cart={cart} setCart={setCart} checkLists={checkLists} setCheckLists={setCheckLists}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
