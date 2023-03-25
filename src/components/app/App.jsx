import { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import './style.scss';
import { findLike, useDebounce } from '../../utils/Utils';
import { api } from '../../utils/Api';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalogPage/CatalogePage';
import { ProductPage } from '../../pages/productPage/ProductPage';
import { Page404 } from '../../pages/page404/Page404';
import { FaqPage } from '../../pages/faqPage/FAQPage';
import { Footer } from '../footer/Footer';
import { FavouritePage } from '../../pages/favouritesPage/FavouritePage';
import { Modal } from '../modal/Modal';
import { Login } from "../auth/login/Login";
import { Register } from "../auth/register/Register";
import { ResetPass } from "../auth/resetPassword/ResetPassword";
import { parseJwt } from "../../utils/ParseJWT";


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false);

  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards([...data]));
  };

  const debounceValueInApp = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData);
        setCards(productData.products);
        const fav = productData.products.filter((e) => findLike(e, userData));
        console.log(fav);
        setFavourites(fav);
      }
    );
  }, [isAuthentificated]);

  function handleProductLike(product) {
    const isLiked = findLike(product, currentUser);
    api.changeLikeProductStatus(product._id, isLiked).then((newCard) => {
      const newCards = cards.map((e) => e._id === newCard._id ? newCard : e);
      setCards([...newCards]);
      setFavourites((favour) => !isLiked ? [...favour, newCard] : favour.filter((f) => f._id !== newCard._id) );
    });
  }

  const setSortCards = (sort) => {
    if (sort === 'Сначала дешевые') {
      const newCards = cards.sort((a, b) => a.price - b.price);
      setCards([...newCards])
    }
    if (sort === 'Сначала дорогие') {
      const newCards = cards.sort((a, b) => b.price - a.price);
      setCards([...newCards])
    }
    if (sort === 'Популярные') {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards])
    }
    if (sort === 'Новинки') {
      const newCards = cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setCards([...newCards])
    }
    if (sort === 'По скидке') {
      const newCards = cards.sort((a, b) => b.discount - a.discount);
      setCards([...newCards])
    }
  }

  const contextUserValue = { currentUser, searchQuery, setSearchQuery, setSortCards, isAuthentificated, };
  const contextCardValue = { cards, onProductLike: handleProductLike, favourites, setFavourites };

  const navigate = useNavigate();

  useEffect(() => {
    // const authPath = ['/reset-password', '/register']
    const token = localStorage.getItem('token')
    const uncodedToken = parseJwt(token);
    if (uncodedToken?._id) {
      setIsAuthentificated(true)
    }
    // else if (!authPath.includes(location.pathname)) {
    //   navigate('/login');
    // }
  }, [navigate]);

  const authRoutes = <> <Route
    path="login"
    element={
      <Modal activeModal={activeModal} setShowModal={setShowModal}>
        <Login setShowModal={setShowModal} />
      </Modal>
    }
  ></Route>
    <Route
      path="register"
      element={
        <Modal activeModal={activeModal} setShowModal={setShowModal}>
          <Register setShowModal={setShowModal} />
        </Modal>
      }
    ></Route>
    <Route
      path="reset-password"
      element={
        <Modal activeModal={activeModal} setShowModal={setShowModal}>
          <ResetPass setShowModal={setShowModal} />
        </Modal>
      }
    ></Route></>

  return (
    <>
      <UserContext.Provider value={contextUserValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header setShowModal={setShowModal} />
          {isAuthentificated ?
          <main className='content container'>
            <Routes>
              <Route path='/' element={<CatalogPage />}></Route>
              <Route path='product/:productId' element={<ProductPage />}></Route>
              <Route path='faq' element={<FaqPage/>}></Route>
              <Route path="favourites" element={<FavouritePage />}></Route>
              {authRoutes}
              <Route path='*' element={<Page404/>}></Route>
            </Routes>
          </main>
          :
            <div className="not__auth">Пожалуйста, авторизуйтесь
              <Routes>
                {authRoutes}
              </Routes>

            </div>
          }
          <Footer/>
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
