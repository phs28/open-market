import { Main } from "../components/main/main";

const Home = ({ products, setProducts, converPrice}) => {
  return <Main products={products} setProducts={setProducts} converPrice={converPrice}/>;
};

export default Home;
