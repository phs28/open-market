import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const converPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  return (
    <BrowserRouter>
      <TopNavigationBar />
      <Routes>
        <Route path="/" element={<Home products={products} setProducts={setProducts} converPrice={converPrice}/>} />
        <Route path="/product/:id" converPrice={converPrice} element={<Product />} />
        <Route path="/cart" element={<Basket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
