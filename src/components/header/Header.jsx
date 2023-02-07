import { Logo } from '../logo/Logo';
import { Search } from '../search/Search';
import './style.css';

export const Header = ({setSearchQuery}) => {

    return (
        <div className='header' id='head'>
            <div className='container'>
                <div className='header__wrapper'>
                    <div className='header__left'>
                        <Logo />
                        <Search setSearchQuery={setSearchQuery}/>
                    </div>
                    <div>Войти</div>
                </div>
            </div>
        </div>
    );
};