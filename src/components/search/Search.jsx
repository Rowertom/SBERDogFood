import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import './style.css';

export const Search = () => {

  const {setSearchQuery}  = useContext(UserContext);
  
  return (<input
      placeholder='Поиск'
      onChange={(e) => setSearchQuery(e.target.value) }
      className="search__input"
    />
  );
};