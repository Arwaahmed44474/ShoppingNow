import CatProductesScreen from "@/featuers/catogries/CatsScreen/CatProductesScreen";

export default async function page({params}: {params: Promise<{catID: string}>}) {
    let { catID } = await params;
    return <>
        <CatProductesScreen catID ={ catID} key={catID}/>
    </>
}



