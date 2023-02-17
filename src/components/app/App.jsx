import { useEffect, useState } from 'react';
import { CardList } from '../cardList/CardList';
import { Header } from '../header/Header';
import './style.css';
import { cast, useDebounce } from '../../utils/Utils';
import { api } from '../../utils/Api';


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState({});


  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards([...data]));
  };

  const debounceValueInApp = useDebounce(searchQuery, 500);

  useEffect(() => {
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
    const isLiked = product.likes.some(id => id === currentUser._id);
    api.changeLikeProductStatus(product._id, isLiked).then((newCard) => {
      const newCards = cards.map((e) => e._id === newCard._id ? newCard : e);
      setCards([...newCards]);
    });
  }

  return (
    <>
      <Header setSearchQuery={setSearchQuery} currentUser={currentUser} />
      <main className='content container'>
        {searchQuery && (
          <p>
            По запросу {searchQuery} найдено {cast(cards.length)}
          </p>
        )}
        <CardList cards={cards} onProductLike={handleProductLike} currentUser={currentUser} />
      </main>
    </>
  );
}

export default App;
