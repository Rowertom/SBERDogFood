import { Logo } from '../logo/Logo';
import { Search } from '../search/Search';
import { UserInfo } from '../userInfo/UserInfo';
import './style.css';

export const Header = () => {

    return (
        <div className='header' id='head'>
            <div className='container'>
                <div className='header__wrapper'>
                    <div className='header__left'>
                        <Logo />
                        <Search />
                    </div>
                    <div><UserInfo /></div>
                </div>
            </div>
        </div>
    );
};