import { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import './style.css';
import { findLike, useDebounce } from '../../utils/Utils';
import { api } from '../../utils/Api';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from '../../pages/catalogPage/CatalogePage';
import { ProductPage } from '../../pages/productPage/ProductPage';
import { Page404 } from '../../pages/page404/Page404';


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});

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
      }
    );
  }, []);

  function handleProductLike(product) {
    const isLiked = findLike(product, currentUser);
    api.changeLikeProductStatus(product._id, isLiked).then((newCard) => {
      const newCards = cards.map((e) => e._id === newCard._id ? newCard : e);
      setCards([...newCards]);
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

  const contextUserValue = { currentUser, searchQuery, setSearchQuery, setSortCards };
  const contextCardValue = { cards, onProductLike: handleProductLike };

  return (
    <>
      <UserContext.Provider value={contextUserValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header />
          <main className='content container'>
            <Routes>
              <Route path='/' element={<CatalogPage />}></Route>
              <Route path='product/:productId' element={<ProductPage />}></Route>
              <Route path='*' element={<Page404/>}>
              </Route>
            </Routes>
          </main>
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
