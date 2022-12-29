import React from 'react';
import Card from '../../components/Card/Card';
import styles from './Catalog.module.css';

export default function Catalog({items, onAddToCart, onAddToFavorite}) {
  return (
    <>
      <div className={styles.catalogWrap}>
        <div  className={styles.catalogContent}>
            <h3>Каталог</h3>   
          <div className={styles.cardWrap}>
              {items.map((item) => (
                <Card
                key={item.id}
                id={item.id}
                parentId = {item.parentId}
                title= {item.title} 
                price={item.price}BYN 
                description={item.description}
                imageUrl={item.imageUrl}
                addToCart={(obj) => onAddToCart(obj)}
                addToFavorite={(obj) => onAddToFavorite(obj)}
                  /> 
              ))}           
            </div>
        </div>   
      </div>
    </>
  )
}
