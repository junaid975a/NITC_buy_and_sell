import React from "react";
import ItemCard from "./ItemCard";


const DashboardItemCollection = ({ searchParam }) => {

    // this datafile just pasted here for testing
    const items = [
        { item_id: 1, item_name: 'phone', category_id: 'electronics', description: 'samsung mobilepho naaa ejkbviehbvei khblWFVA SDJVVAHFVAW kfbvaiv ihbvahvf ajhvahfv hsbliahf jhfvahfv  ahvihf   jewhfvjawf ajhvaj ahvaf ajhdvaufvh aa igfaioyrf ajhvagf ajhvajgr ajvafg jsdfvajf jqhvdqufvq qjhvqkufv qjvquhfvq jsvdquwfvrq qjwvquwrhfv jhvqjgvq qjwvquorgv qvqurwgfv qjvqurgvf jqvqiurv qjvfqiurgvf qwvqiurfvyu  jdfvajsgf javfajfv jasdhvajv jahvausgf ejgcutk ugckjgck xkhfckjgcjg ckhfcjm bjgckhfckj u gckuc jyxjyfx jhhnfjyx llllll l l     l   lllll ll lllll llllllllll aaaaaaaaaa aaa aaaaaa aaaa ayyyyy yyyy yyyyyy yyyyyaaa aaaaaaaaaaaaaaaab bb bbbbbbb bbbbbb bbbbbccc cc cccccccc ccccccccc cddddddd d ddddd dd dddddddee eee eeeeeeeeeeeeeee fff ffffffff fffff ffffffffff fg gggggggg  gg gggg ggggg', seller_id: 'm210662ca', condition: 'samsung mobilephon ejgcutk ugckjgck xkhfckjgcjg ckhfcjm bjgckhfckj u gckuc jyxjyfx jhhnfjyx llllll l l     l   lllll ll lllll llllllllll aaaaaaaaaa aaa aaaaaa aaaa ayyyyy yyyy yyyyyy yyyyyaaa aaaaaaaaaaaaaaaab bb bbbbbbb bbbbbb bbbbbccc cc cccccccc ccccccccc cddddddd d ddddd dd dddddddee eee eeeeeeeeeeeeeee fff ffffffff fffff ffffffffff fg gggggggg  gg gggg ggggg', created_at: '', price: '10000' },
        { item_id: 2, item_name: 'mattress', category_id: 'furniture', description: 'sleepwell mattress', seller_id: 'm210662ca', condition: 'new', created_at: '', price: '1000' },
        { item_id: 3, item_name: 'umbrella', category_id: 'others', description: 'samsung umbrella', seller_id: 'm210662ca', condition: 'new', created_at: '', price: '100' },
        { item_id: 3, item_name: 'umbrella', category_id: 'others', description: 'samsung umbrella', seller_id: 'm210662ca', condition: 'new', created_at: '', price: '100' },
        { item_id: 3, item_name: 'umbrella', category_id: 'others', description: 'samsung umbrella', seller_id: 'm210662ca', condition: 'new', created_at: '', price: '100' },
        { item_id: 3, item_name: 'umbrella', category_id: 'others', description: 'samsung umbrella', seller_id: 'm210662ca', condition: 'new', created_at: '', price: '100' },
        { item_id: 3, item_name: 'umbrella', category_id: 'others', description: 'samsung umbrella', seller_id: 'm210662ca', condition: 'new', created_at: '', price: '100' },
        { item_id: 3, item_name: 'umbrella', category_id: 'others', description: 'samsung umbrella', seller_id: 'm210662ca', condition: 'new', created_at: '', price: '100' },
    ];
    return (
        <div className="flex flex-col items-center justify-center">
            <div class="sm:text-xl sm:m-[4vh] md:text-lg md:m-[3vh] lg:text-4xl lg:m-[6vh]">
                Find Your Needs Here..
            </div>
            <div className="flex flex-row flex-wrap justify-center max-w-[1380px] my-0 mx-auto">
                {/* here fetch data from database, and put them all in card one by one using for loop */}

                {/* fetch data */}

                {items.length === 0 ?
                    (
                        <div>
                            <p>No items available</p>
                        </div>
                    ) :
                    <div className="flex flex-wrap justify-center max-w-[1380px] my-0 mx-auto">
                        {

                            items.map((item) => (
                                <ItemCard key={item.item_id}
                                    id={item.item_id}
                                    name={item.item_name}
                                    category={item.category_id}
                                    description={item.description}
                                    seller_id={item.seller_id}
                                    condition={item.condition}
                                    created_at={item.created_at}
                                    price={item.price} />
                            ))
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default DashboardItemCollection;