import { useEffect, useState } from 'react';
import { CardList } from '../cardList/CardList';
import { Header } from '../header/Header';
import data from '../../data/data.json'
import './style.css';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const newState = data.filter((e) =>
      e.name.toLowerCase().includes(searchQuery)
    );
    setCards(() => [...newState]);
  }, [searchQuery]);

  return (
    <>
    <Header setSearchQuery={setSearchQuery}/>
      <main className='content container'>
        {searchQuery && (
          <p>
            По запросу {searchQuery} найдено {cards.length} товаров
          </p>
        )}
        <CardList cards={cards}/>
      </main>
    </>
  );
}

export default App;
