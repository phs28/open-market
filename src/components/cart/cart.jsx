import { useState } from "react";
import styles from "./cart.module.css";
import CartHeader from "./cartHeader";
import CartList from "./cartList";
import TotalCart from './totalCart';


export const Cart = ({cart, setCart, converPrice, checkLists, setCheckLists}) => {
  const [total, setTotal] = useState(0);

  const handleQuatity = (type, id, quantity) => {
    //필터는 배열을 반환
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: found.id,
      image: found.image,
      name: found.price,
      price: found.price,
      quantity: quantity,
      provider: found.provider
    };

    if(type === "plus") {
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    } else {
      if(quantity === 0) {
        return;
      }
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    }
  }
  
  const handleRemove = (id) => {
    setCart(cart.filter((el) => el.id !== id));
  }

  const handleCheckList = (checked, id) => {
    if(checked) {
      setCheckLists([...checkLists, id]);
    } else {
      setCheckLists(checkLists.filter((check) => check !== id));
    }
  }

  const handleAllCheck = (checked) => {
    if(checked) {
      const cartItems = [];
      cart.map((cart) => cartItems.push(cart.id))
      setCheckLists(cartItems);
    } else {
      setCheckLists([]);
    }
  }

  const isAllChecked = cart.length === checkLists.length && checkLists !== 0;

  const found = checkLists.map((checkList) => 
    cart.filter((el) => el.id === checkList)
  );
  return (
    <>
      <header className={styles.header} >
        <h1>장바구니</h1>
      </header>

      <CartHeader handleAllCheck={handleAllCheck} isAllChecked={isAllChecked}/>
      {cart.length === 0 ? (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      ) : cart.map((cart) => {
        return <CartList key={cart.id} cart={cart} setCart={setCart} converPrice={converPrice} handleQuatity={handleQuatity} handleRemove={handleRemove} checkLists={checkLists} handleCheckList={handleCheckList}/>
      })}
      
      {cart.length === 0 ? "" : <TotalCart cart={cart} total={total} setTotal={setTotal} found={found}/>}
    </>
  );
};
