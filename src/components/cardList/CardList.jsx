import './style.css'
import { Card } from '../card/Card';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';


export const CardList = () => {

    const {cards} = useContext(CardContext);

    return (
        <div className='cards'>
            {cards.map((item) => {
                return     <Card 
                {...item} 
                key={item._id} 
                product={item} 
                    />;
            })}
        </div>
    );
};