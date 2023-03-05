import { useParams } from "react-router-dom";
import { Product } from "../../components/product/Product";


export const ProductPage = () => {
    
    const id = useParams();

    return <Product id={id.productId}/>
}