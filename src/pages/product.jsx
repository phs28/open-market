import { Detail } from "../components/product_detail/detail";

const Product = ({converPrice, cart, setCart}) => {
  return <Detail converPrice={converPrice} cart={cart} setCart={setCart}/>;
};

export default Product;
