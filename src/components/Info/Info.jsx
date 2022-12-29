import React, { useContext } from 'react';
import AppContext from '../../context';
import styles from './Info.module.css';

function Info( {title, description} ) {
  const {setCartOpened} = useContext(AppContext)
  return (
    <div>
      <div className={styles.cartEmpty}>
        <h3>{title}</h3>
        <p>{description}</p>
          <button onClick={() => setCartOpened(false)} className={styles.orderBtn}>Вернуться назад</button>   
      </div>
    </div>
  )
}

export default Info
