import React from "react";
import ItemCard from "./ItemCard";
import { useContext } from "react";
import ProductContext from "../context/product/ProductContext";


const DashboardItemCollection = ({ searchParam }) => {

    const {allProducts} = useContext(ProductContext)
    // console.log(allProducts);
    // this datafile just pasted here for testing
    const items = allProducts
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="sm:text-xl sm:m-[4vh] md:text-lg md:m-[3vh] lg:text-4xl lg:m-[6vh]">
                Find Your Needs Here..
            </div>
            <div className="flex h-[100vh] flex-row flex-wrap justify-center max-w-[1380px] my-0 mx-auto">
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
                                <ItemCard key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    category={item.categoryId}
                                    description={item.description}
                                    seller_id={item.sellerId}
                                    condition={item.condition}
                                    created_at={item.createdAt}
                                    price={item.item_price} />
                            ))
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default DashboardItemCollection;