import { ReactComponent as Like } from './like.svg';
import './style.css';

export const Card = ({ picture, name, discount, price }) => {
    return (
        <div className='card'>
            <div className='card__header card__header__left'>
                <span className='card__discount'>{discount}%</span>
            </div>
            <div className='card__header card__header__right'>
                <button className='card__favourite'>
                    <Like className='card__liked' />
                </button>
            </div>
            <a href='/' className='card__link'>
                <img src={picture} alt='image__error' className='card__image' />
                <div className='card__data'>
                    <span className='card__price'>{price}p</span>
                    <span className='card__weight'>1ft</span>
                    <p className='card__descriprion'> {name}</p>
                </div>
            </a>
            <a href='/' className='card__btn btn__type__primary'>В корзину</a>
        </div>
    );
};