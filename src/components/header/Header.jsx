import { Logo } from '../logo/Logo';
import { Search } from '../search/Search';
import { UserInfo } from '../userInfo/UserInfo';
import './style.css';

export const Header = ({setSearchQuery, currentUser}) => {

    return (
        <div className='header' id='head'>
            <div className='container'>
                <div className='header__wrapper'>
                    <div className='header__left'>
                        <Logo />
                        <Search setSearchQuery={setSearchQuery}/>
                    </div>
                    <div><UserInfo currentUser={currentUser}/></div>
                </div>
            </div>
        </div>
    );
};