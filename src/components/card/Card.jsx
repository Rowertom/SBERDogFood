
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { ReactComponent as Like } from './like.svg';
import './style.css';

export const Card = ({ pictures, name, discount, price, wight, product }) => {

    const {currentUser} = useContext(UserContext);
    const {onProductLike} = useContext(CardContext);
    
    const isLiked = product.likes.some((e) => e === currentUser._id);
    function handleLikeClick() {
        onProductLike(product);
    };
    return (
        <div className='card'>
            <div className='card__header card__header__left'>
                {!discount ? '' : <span className='card__discount'>{discount}%</span>}
            </div>
            <div className='card__header card__header__right'>
                <button className={`card__favourite ${isLiked ? 'card__liked' : ''}`}
                onClick={handleLikeClick}>
                    <Like className='card__liked' />
                </button>
                <div className='count__likes'>
                {product.likes.length}
                </div>
            </div>
            <Link to={`/product/${product._id}`} className='card__link'>
                <img src={pictures} alt='image__error' className='card__image' />
                <div className='card__data'>
                    <span className='card__price'>{price}p</span>
                    <span className='card__wight'>{wight}</span>
                    <p className='card__descriprion'> {name}</p>
                </div>
            </Link>
            <a href='/' className='card__btn btn__type__primary'>В корзину</a>
        </div>
    );
};