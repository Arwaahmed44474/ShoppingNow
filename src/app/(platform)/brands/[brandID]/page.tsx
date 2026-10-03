import BrandDetailsScreen from "@/featuers/brands/screens/BrandDetailsScreen";

// by defulte it tke parames with id 
export default async function page({ params }: { params: Promise<{ brandID: string }> }) {
    let { brandID } = await params;
    return <>
        <BrandDetailsScreen brandID={ brandID } />
    </>
}
