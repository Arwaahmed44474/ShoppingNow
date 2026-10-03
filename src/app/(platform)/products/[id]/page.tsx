import ProductDetailsScreen from "@/featuers/productes/screens/ProductDetailsScreen";

// by defulte it tke parames with id 
export default async function page({ params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;
    return <>
        <ProductDetailsScreen id={ id} />
    </>
}
