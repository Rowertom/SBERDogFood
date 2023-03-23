import { useNavigate } from 'react-router-dom';
import Face from './img/Combined_Shape.png'
import './style.scss';

export const Component404 = () => {
    const navigate = useNavigate();

    return <>
        <div className="not__found">
            <img className='not__found__img'src={Face} alt="img" />
            404 not found
            <button className='not__found__btn' onClick={() => navigate('/')}>На главную</button>
        </div>
    </>
    
}