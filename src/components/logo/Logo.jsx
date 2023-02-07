import lsvg from './logo.svg';
import './style.css';


export const Logo = () => {
    return (
        <a href='/'>
            <img src={lsvg} alt='logo__error' className='logo__pic'/>
        </a>
    );
};