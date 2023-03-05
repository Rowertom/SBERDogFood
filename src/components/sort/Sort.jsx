import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import './style.scss'

export const Sort = () => {

    const { setSortCards } = useContext(UserContext)
    const sortedItems = [
        { id: 'Популярные' },
        { id: 'Новинки' },
        { id: 'Сначала дешевые' },
        { id: 'Сначала дорогие' },
        { id: 'По скидке' }]

    return (
        <div className="sort__cards">
            {sortedItems.map((e) =>
                <span key={e.id} className='sort__cards__item' onClick={() => setSortCards(e.id)}>{e.id}</span>
            )}
        </div>
    )
}