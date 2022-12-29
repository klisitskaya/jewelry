import React  from 'react';
import { Link } from 'react-router-dom';
import Handmade from '../../assets/img/handmade.png';
import styles from './Main.module.css';

export default function Main() {
  
  return (
    <>
      <main className='main'>
      <section className={styles.mainWrap}>
          <div className={styles.mainContent}>
            <h1>
              Авторские украшения <br/> ручной работы
            </h1>
            <h3>
              Будь особенной. Выделяйся.
            </h3>
            <Link to='/catalog' className={styles.catalogBtn}>
              Каталог
            </Link>
          </div>
          <img width={150} height={150} src={Handmade} alt='handmade'/>
        </section>
        <section className={styles.aboutUsWrap}>
          <div className={styles.aboutUsContent}>
            <h2>
              О бренде Amur
            </h2>
            <p>AMUR — не массовое производство, каждое изделие мы изготавливаем вручную, и это наш большой плюс. Концептуально, наши украшения — это не только доступные, качественные украшения на каждый день, но и изделия, выполненные по индивидуальному заказу для особенных событий. Используем натуральные камни, качественную фурнитуру и все создаем с особенной любовью.</p>
            <div>Баланс внешней и внутренней красоты, гармония, любовь к себе — то что мы закладываем в наше дело. Нет ничего красивее, чем собственная индивидуальность, подчеркнутая правильными деталями.</div>
          </div>         
        </section>
      </main>
    </>
  )
}
