import './style.css'
import { Card } from '../card/Card';


export const CardList = ({cards, onProductLike, currentUser}) => {
    return (
        <div className='cards'>
            {cards.map((item) => {
                return     <Card 
                {...item} 
                key={item._id} 
                product={item} 
                onProductLike={onProductLike}
                currentUser={currentUser}
                    />;
            })}
        </div>
    );
};