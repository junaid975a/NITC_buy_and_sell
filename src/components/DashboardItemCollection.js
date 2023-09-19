import React from "react";
import ItemCard from "./ItemCard";


const DashboardItemCollection = ({ searchParam }) => {

    // this datafile just pasted here for testing
    const items = [
        { item_id: 1, item_name: 'phone', category_id: 'electronics', description: 'samsung mobile phonejgcutkugckjgckxkhfckjgcjgckhfcj ,mb jgckhfckjugckucjyxjyfxjh hnfjyxlllllllllllllllllllllllllllllllaaaaaaaaaaaaaaaaaaaaaaaayyyyyyyyyyyyyyyyyyyyaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffffgggggggggggggggggggg', seller_id: 'm210662ca', condition: 'no scratch', created_at: '', price: '10000' },
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
            <div>
                <h2 className="text-4xl m-[6vh]">Find Your Needs Here..</h2>
            </div>
            <div className="flex flex-row flex-wrap justify-center max-w-[1300px] my-0 mx-auto">
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