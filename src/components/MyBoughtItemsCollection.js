import React,{ useContext } from "react";
import BoughtItemCard from "./BoughtItemCard";
import ProductContext from "../context/product/ProductContext";

const MyBoughtItemsCollection = ({ searchParam }) => {
  // this datafile just pasted here for testing

  const {allProducts,getBoughtItems} = useContext(ProductContext)

  const soldItems = allProducts
  
  

  return (
    <div className="flex justify-center max-w-[1380px] my-0 mx-auto">
      {/* here fetch data from database, and put them all in card one by one using for loop */}

      {/* fetch data */}

      {soldItems.length === 0 ? (
        <div className="mt-12">
          <p>No items Bought</p>
        </div>
      ) : (
        // sold + unsold items dono bhejenge
        // with different props
        // and accordingly, map all of them to the cards
        <div className="flex flex-col justify-center max-w-[1380px] my-0">
          {
            // sold items
            // need to handle the parameters, will do that at the time of backend integration
            // buyer_id:'m210694ca', final_price: '100', purchase_date: ''
            // backednt se, solditems se data fetch nhi ho raha sahi se.
            soldItems.map((item) => (
              <BoughtItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.categoryId}
                description={item.description}
                seller_id={item.sellerId}
                condition={item.pdt_condition}
                created_at={item.createdAt}
                price={item.item_price}
                imageUrl={item.image_url}
                buyer_id={item.buyerId}
                final_price={item.finalPrice}
                purchase_date={item.purchasedAt}
                isReviewed={item.isReviewed}
                
              />
            ))
          }
        </div>
      )}
    </div>
  );
};

export default MyBoughtItemsCollection;
