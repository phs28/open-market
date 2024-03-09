import { Cart } from "../components/cart/cart";

const Basket = ({converPrice, cart, setCart, checkLists, setCheckLists}) => {
  return <Cart converPrice={converPrice} cart={cart} setCart={setCart} checkLists={checkLists} setCheckLists={setCheckLists}/>;
};

export default Basket;
