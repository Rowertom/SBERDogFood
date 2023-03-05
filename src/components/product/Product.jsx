import s from './index.module.scss';
import cn from 'classnames';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import { ReactComponent as Like } from './img/like.svg';
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/Api";
import { UserContext } from '../../context/userContext';
import { findLike } from '../../utils/Utils';
import { CardContext } from '../../context/cardContext';

export const Product = ({ id }) => {


    const [product, setProduct] = useState({});

    useEffect(() => {
        api.getProduct(id).then((data) => setProduct(data));
    }, [id]);

    const navigate = useNavigate();

    const { currentUser } = useContext(UserContext);
    const {onProductLike} = useContext(CardContext);
    const isLiked = product?.likes?.some((e) => e === currentUser._id);
    console.log({isLiked});
    function handleLikeClick() {
        onProductLike(product);
    }

    return (
        <>
            <div className='back'>
                <button className={`${s.back__button}`} onClick={() => navigate('/')}>
                    &lt;&nbsp;Назад
                </button>
            </div>
            <div className={s.product}>
                <div className={s.imgWrapper}>
                    <img className={s.img} src={product.pictures} alt={`Изображение`} />
                    {product.tags?.map((e) => (
                        <span className={`tag tag_type_${e}`}>{e}</span>
                    ))}
                </div>
                <div className={s.desc}>
                    <span className={s.price}>{product.price}&nbsp;₽</span>
                    {!!product.discount && (
                        <span className={`${s.price} card__price_type_discount`}>
                            {product.discount}&nbsp;%
                        </span>
                    )}
                    <div className={s.btnWrap}>
                        <div className={s.left}>
                            <button className={s.minus}>-</button>
                            <span className={s.num}>0</span>
                            <button className={s.plus}>+</button>
                        </div>
                        <button className={`${s.cart}`}>
                            <a href='/#' className={` ${s.cart__a}`}>
                                В корзину
                            </a>
                        </button>
                    </div>
                    <button className={
                    `${isLiked ? s.favoriteActive : s.favorite}`}
                    onClick={handleLikeClick}>
                        <Like />
                        <span>{isLiked ? "В избранном" : "В избранное"}</span>
                    </button>
                    <div className={s.delivery}>
                        <img src={truck} alt='truck' />
                        <div className={s.right}>
                            <h3 className={s.name}>Доставка по всему Миру!</h3>
                            <p className={s.text}>
                                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
                            </p>
                        </div>
                    </div>
                    <div className={s.delivery}>
                        <img src={quality} alt='quality' />
                        <div className={s.right}>
                            <h3 className={s.name}>Доставка по всему Миру!</h3>
                            <p className={s.text}>
                                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.box}>
                <h2 className={s.title}>Описание</h2>
                <div>{product.description}</div>
                <h2 className={s.title}>Характеристики</h2>
                <div className={s.grid}>
                    <div className={s.naming}>Вес</div>
                    <div className={s.description}>1 шт 120-200 грамм</div>
                    <div className={s.naming}>Цена</div>
                    <div className={s.description}>490 ₽ за 100 грамм</div>
                    <div className={s.naming}>Польза</div>
                    <div className={s.description}>
                        <p>
                            Большое содержание аминокислот и микроэлементов оказывает
                            положительное воздействие на общий обмен веществ собаки.
                        </p>
                        <p>Способствуют укреплению десен и жевательных мышц.</p>
                        <p>
                            Развивают зубочелюстной аппарат, отвлекают собаку во время смены
                            зубов.
                        </p>
                        <p>
                            Имеет цельную волокнистую структуру, при разжевывание получается
                            эффект зубной щетки, лучше всего очищает клыки собак.
                        </p>
                        <p>Следует учесть высокую калорийность продукта.</p>
                    </div>
                </div>
            </div>
        </>
    );
};