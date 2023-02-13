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

  function cast(numb) {
    const tempNumb = numb % 100;
    if(tempNumb > 10 && tempNumb < 20){
        return numb + " товаров";
    }
    switch (numb % 10){
        case 1: return numb + " товар";
        case 2: 
        case 3:
        case 4: return numb + " товара";
        default: return numb + " товаров";
    }
}
  return (
    <>
    <Header setSearchQuery={setSearchQuery}/>
      <main className='content container'>
        {searchQuery && (
          <p>
            По запросу {searchQuery} найдено {cast(cards.length)}
          </p>
        )}
        <CardList cards={cards}/>
      </main>
    </>
  );
}

export default App;
