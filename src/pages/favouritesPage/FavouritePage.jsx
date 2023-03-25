import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardList } from "../../components/cardList/CardList";
import { CardContext } from "../../context/cardContext";
import "./style.scss";

export const FavouritePage = () => {
  const { favourites } = useContext(CardContext);

  const navigate = useNavigate();

  return (
    <div className="favorites">
      <span className="favorites__back" onClick={() => navigate(-1)}>
        {"< "}Назад
      </span>
      <h1>Избранное</h1>
      {!!favourites.length ? (
        <CardList cards={favourites} />
      ) : (
        <div className="not-found">Вы не добавили еще ни одного товара</div>
      )}
    </div>
  );
};