import { Link } from "react-router-dom";
import { Logo } from "../logo/Logo";
import "./style.css";


export const Footer = () => {

    return (
        <div className="footer">
        <div className="container">
          <div className="footer__wrapper">
            <div className="footer__col">
              <Logo className="footer__logo" />
              <p className="footer__copyright">
                © «Интернет-магазин DogFood.ru»
              </p>
            </div>
            <div className="footer__col">
              <nav className="menu-bottom">
                <Link to='/' className="menu-bottom__item">
                  Каталог
                </Link>
                <a href="/" className="menu-bottom__item">
                  Акции
                </a>
                <a href="/" className="menu-bottom__item">
                  Новости
                </a>
                <a href="/" className="menu-bottom__item">
                  Отзывы
                </a>
              </nav>
            </div>
            <div className="footer__col">
              <nav className="menu-bottom">
                <a href="/" className="menu-bottom__item">
                  Оплата и доставка
                </a>
                <Link to={"/faq"} className="menu-bottom__item">
                  Часто спрашивают
                </Link>
                <a href="/" className="menu-bottom__item">
                  Обратная связь
                </a>
                <a href="/" className="menu-bottom__item">
                  Контакты
                </a>
              </nav>
            </div>
            <div className="footer__col">
              <nav className="menu-bottom">
                <a href="/" className="menu-bottom__item">
                  Мы на связи
                </a>
                <a href="/" className="menu-bottom__item">
                 8 (999) 00-00-00
                </a>
                <a href="/" className="menu-bottom__item">
                  dogfood.ru@gmail.com
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
};