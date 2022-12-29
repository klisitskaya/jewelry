import React from 'react';
import { Link } from 'react-router-dom';
import LogoFooter from '../../assets/img/logo2.png';
import Inst from '../../assets/img/inst.png';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerWrap}>
      <div className={styles.footerContent}>
          <div>
            <Link to='/'>
              <img width={130} height={50} src={LogoFooter} alt='logo'/>
            </Link>
          </div>
          <div>
            <h4>Контакты</h4>
            <p>
            +375 (33) 623-45-67 <br/>
            +375 (29) 623-45-67 <br/>
            Минск, Уманская 54
            </p>
          </div>
          <div>
            <h4>Режим работы</h4>
            <p>
            C 10:00 до 21:00 (Пн-Пт) <br/>
            С 11:00 до 20:00 (Сб-Вс)
            </p>
          </div>
          <div>
            <h4>Мы в Instagram</h4>
            <a href="https://www.instagram.com/"  target="_blank" rel="noopener noreferrer">
              <img width={22} height={22} src={Inst} alt='inst'/>
            </a>        
          </div>
        </div>
    </footer>
  )
}
