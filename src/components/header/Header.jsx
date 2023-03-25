import { Logo } from '../logo/Logo';
import { Search } from '../search/Search';
import { UserInfo } from '../userInfo/UserInfo';
import './style.css';
import { ReactComponent as Like } from '../card/like.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { ReactComponent as Login } from "./images/login.svg";


export const Header = ({ setShowModal }) => {
    const { isAuthentificated } =
        useContext(UserContext);
    const { favourites } = useContext(CardContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className='header' id='head'>
            <div className='container'>
                <div className='header__wrapper'>
                    <div className='header__left'>
                        <Logo />
                        <Search />
                    </div>
                    <div>
                        <Link to={"favourites"} className="header__bubble-link">
                            <Like className="header__liked" />
                            {favourites.length !== 0 && <span className="header__bubble">{favourites.length}</span>}
                        </Link>
                    </div>
                    <div className='header__right'>
                        {!isAuthentificated ? <Link to={"/login"} className="header__link" onClick={() => setShowModal(true)}>
                            <Login />
                        </Link> :
                            <span onClick={handleLogout}>logout</span>
                        }
                        <div><UserInfo /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};