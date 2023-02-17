import './style.css'

export const UserInfo = ({currentUser}) => {
    return (<div className="user__info">
        <div>
            <img className='bender' src={currentUser.avatar} alt='no__photo'  />
        </div>
        <div className="user__data">
            <span className="user__name">{currentUser.name}</span>
            <span className="user__about">{currentUser.about}</span>
            <span className="user__contact">{currentUser.email}</span>
        </div>
    </div>)
};