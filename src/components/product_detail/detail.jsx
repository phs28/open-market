/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import styles from "./detail.module.css";
import { useEffect, useState } from 'react';
import axios from "axios";

export const Detail = ({converPrice, cart, setCart}) => {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);

  useEffect(() => {
    axios.get("/data/products.json").then(data => {
      setProduct(data.data.products.find((product) => product.id === parseInt(id)))
    })
  }, [id]);

  // 장바구니 물건 중복된 물건
  const setQuantity = (id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      provider: product.provider,
      quantity: quantity,
    };

    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)])
  }

  // 장바구니에 등록
  const handleCart = () => {
    const cartItem = {
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      provider: product.provider,
      quantity: count
    }
    const found = cart.find((el) => el.id === cartItem.id);

    if(found) {
      setQuantity(cartItem.id, found.quantity + count);
    } else {
      setCart([...cart, cartItem]);
    }
  }

  const handleQuantity = (type) => {
    if(type === 'plus') {
      setCount(count+1);
    } else {
      if(count === 1) {
        return; 
      } else {
        setCount(count-1);
      }
    }
  }  

console.log(cart);

  return (
    product && (
    <>
      <main className={styles.main}>
        <section className={styles.product}>
          <div className={styles.product_img}>
            <img src={product.image} alt="product" />
          </div>
        </section>
        <section className={styles.product}>
          <div className={styles.product_info}>
            <p className={styles.seller_store}>{product.provider}</p>
            <p className={styles.product_name}>{product.name}</p>
            <span className={styles.price}>
            {converPrice(product.price + "")}
            <span className={styles.unit}>원</span>
            </span>
          </div>

          <div className={styles.delivery}>
            <p>택배배송 / 무료배송</p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.amount}>
            <img
              className={styles.minus}
              onClick={() => handleQuantity('minus')}
              src="/images/icon-minus-line.svg"
              alt="minus"
            />

            <div className={styles.count}>
              <span>{count}</span>
            </div>

            <img
              className={styles.plus}
              onClick={() => handleQuantity('plus')}
              src="/images/icon-plus-line.svg"
              alt="plus"
            />
          </div>

          <div className={styles.line}></div>

          <div className={styles.sum}>
            <div>
              <span className={styles.sum_price}>총 상품 금액</span>
            </div>

            <div className={styles.total_info}>
              <span className={styles.total}>
                총 수량 <span className={styles.total_count}>{count}개</span>
              </span>
              <span className={styles.total_price}>
              {converPrice(count * product.price + "")}
                <span className={styles.total_unit}>원</span>
              </span>
            </div>
          </div>

          <div className={styles.btn}>
            <button className={styles.btn_buy}>바로 구매</button>
            <button className={styles.btn_cart} onClick={() => handleCart()}>
              장바구니
            </button>
          </div>
        </section>
      </main>
    </>
    )
  );
};
