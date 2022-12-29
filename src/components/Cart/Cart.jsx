import React, { useState, useContext } from 'react';
import axios from 'axios';
import styles from './Cart.module.css';
import CancelCart from '../../assets/img/cancel.png';
import RemoveItemBtn from '../../assets/img/remove.png';
import Info from '../Info/Info';
import AppContext from '../../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Cart( { onClose, items = [], onRemove} ) {

  const {cartItems, setCartItems} = useContext(AppContext);
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + Number(sum), 0);

  const onClickOrder = async () => {
    try {
      const {data} = await axios.post('https://63a23334ba35b96522f2129d.mockapi.io/orders', {items: cartItems});
      
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for(let i=0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete('https://63a23334ba35b96522f2129d.mockapi.io/cart/' + item.id);
        await delay(1000);
      }      
    } catch(error) {
      alert('Ошибка при создании заказа')
    }
  }

  return (
    <>
     <div className={styles.aboutCart}>
      <div className={styles.cartWrap}>
        <div className={styles.cart}>
          <div className={styles.cancelCart}>
            <h3>Корзина</h3>
            <img onClick={onClose} src={CancelCart} className={styles.cancelCartBtn} width={15} height={15} alt='close'/>
          </div>
          {items.length > 0 ? 
            <>
              <div className={styles.cartItem}>
                {items.map((obj) => (
                <div className={styles.cartItemContent} key={obj.id}>
                  <img src={obj.imageUrl} className={styles.cartItemImg} alt='cartitemimg'/>
                  <div className={styles.descriptionItem}>
                    <h5>{obj.title}</h5>
                    <b>{obj.price}BYN</b>
                  </div>
                  <img src={RemoveItemBtn} width={15} height={15} className={styles.removeItemBtn} alt='remove' onClick={() => onRemove(obj.id)}/>
                </div>
                ))}
              </div>
              <div className={styles.cartTotalBlock}>
                <div className={styles.totalPrice}>
                  <p>Итого:</p>
                  <b>{totalPrice}BYN</b>
                </div>
                <form method='post' className={styles.form}>
                  <div className='dataForm'> 
                    Ваше имя<br/>
                    <input required type="text" name="firstname"/>
                  </div>
                  <div className='dataForm'> 
                    Ваш Email<br/>
                    <input type="email" name="email" />
                  </div>
                  <div className='dataForm'> 
                    Ваш телефон<br/>
                      <input required type="tel" name="phone"/>
                  </div>
                </form>
                <button onClick={onClickOrder} className={styles.orderBtn}>Оформить заказ</button>  
              </div>
            </> :
            (<Info 
              title={isOrderComplete ? 'Заказ оформлен!': 'В корзине пусто!'} 
              description={isOrderComplete ? `Ваш заказ №${orderId} принят в обработку, в ближайшее время с вами свяжется наш специалист!` : 'Добавьте товары в корзину для оформления заказа!'}/>)}
        </div>
      </div>
    </div>
    </>
  )
}
