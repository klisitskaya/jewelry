import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import Logo from '../../assets/img/logo2.png';
import styles from './Header.module.css';

export default function Header({onClickCard}) {

  const [navigation, setNavigation] = useState(false);
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>
          <Link to='/'>
            <img width={170} height={60} src={Logo} alt='logo'/>
          </Link> 
        </div>
        
        <nav className={navigation ? [styles.headerNav, styles.active].join(' ') : [styles.headerNav]}>
          <Link to='/main'>
            Главная
          </Link>
          <Link to='/catalog'>
            Каталог
          </Link>
          <Link to='/favorites'>
            Избранное
          </Link>
          <Link onClick={onClickCard}>
            Корзина
          </Link>   
        </nav> 
        <div onClick={() => setNavigation(!navigation)} className={styles.burgerBtn}>
          {navigation ? <AiOutlineClose size={25}/> : <AiOutlineMenu size={25}/>}
        </div>  
      </div>
    </header>
  )
}


