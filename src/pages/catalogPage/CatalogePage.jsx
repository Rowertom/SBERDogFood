import { useContext } from "react"
import { CardList } from "../../components/cardList/CardList";
import { Sort } from "../../components/sort/Sort";
import { CardContext } from "../../context/cardContext"
import { UserContext } from "../../context/userContext";
import { cast } from "../../utils/Utils";

export const CatalogPage = () => {

    const {cards} = useContext(CardContext);
    const {searchQuery} = useContext(UserContext);

    return <>
        {searchQuery && (
                <p>
                  По запросу {searchQuery} найдено {cast(cards.length)}
                </p>
              )}
              <Sort/>
              <CardList cards={cards} />
    </>
};