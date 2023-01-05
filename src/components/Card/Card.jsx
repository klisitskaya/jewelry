import React, { useState, useContext } from 'react';
import styles from './Card.module.css';
import AppContext from '../../context';
import CartChecked from '../../assets/img/cart-checked.png';
import Cart from '../../assets/img/cart.png';
import ColorHeart from '../../assets/img/heart2.png';
import Heart from '../../assets/img/heart1.png';

export default function Card({id, imageUrl, title, description, price, addToCart, addToFavorite, favorited=false}) {

    const { isItemAdded } = useContext(AppContext);
    
    const [isFavorite, setIsFavorite] = useState(favorited);
    const itemObj = {id, parentId: id, imageUrl, description, title, price};

    const onClickAdd = () => {
        addToCart(itemObj)    
    }

    const onClickFavorite = () => {
        addToFavorite(itemObj)
        
        setIsFavorite(!isFavorite)
    }
  
  return (
    <div className={styles.card}>    
        <img src={imageUrl} className={styles.itemImg} alt='item'/>   
        <h5>{title}</h5>
        <p>{description}</p>
        <div className={styles.flex}>
            <b>{price}BYN</b>
            <div>
                <button className={styles.btnCart} onClick={onClickAdd}>
                    <img src={isItemAdded(id) ? CartChecked : Cart} className={styles.cartImg} alt='cart'/>
                </button>
                <button className={styles.btnHeart} onClick={onClickFavorite}>
                    <img src={isFavorite ? ColorHeart : Heart} className={styles.heartImg} alt='favorite'/>
                </button>
            </div>           
        </div>           
    </div>
  )
}




