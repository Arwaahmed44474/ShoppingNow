import ProductDetailsFun from '../components/ProductDetails';
import { getProductDetails } from '../services/getProductDetails';

// by defulte it take params
export default async function ProductDetailsScreen({ id }: { id: string }) {
    
    let productDetailsInfo = await getProductDetails(id);
    return <>
        <ProductDetailsFun productDetailsInfo={productDetailsInfo} />
    </>
}
