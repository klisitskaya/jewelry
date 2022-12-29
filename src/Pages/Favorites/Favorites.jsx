import React, { useContext } from 'react';
import Card from '../../components/Card/Card';
import styles from './Favorites.module.css';
import AppContext from '../../context';
import { Link } from 'react-router-dom';

export default function Favorites() {

  const {favorites, onAddToFavorite} = useContext(AppContext)
  
  return (
    <>
      <div className={styles.favoritesWrap}> 
      {
        favorites.length > 0 ? 
        <div  className={styles.favoritesContent}>
          <h3>Избранное</h3> 
        <div className={styles.cartWrap}>
        {favorites.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title= {item.title} 
                price={item.price} 
                description={item.description}
                imageUrl={item.imageUrl}
                favorited={true}
                addToFavorite={onAddToFavorite}
                /> 
            ))}  
        </div>
      </div> : 
        <div  className={styles.favoritesContent}>
          <div className={styles.emptyFav}>
            <h3>Избранное</h3>
            <p>Вернитесь к каталогу, чтобы выбрать понравившейся товар!</p>
            <Link to='/catalog' className={styles.catalogBtn}>
                Каталог
            </Link>
          </div> 
        </div>
      }     
    </div>
    </>  
  )
}



