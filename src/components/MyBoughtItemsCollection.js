import React,{ useContext } from "react";
import BoughtItemCard from "./BoughtItemCard";
import ProductContext from "../context/product/ProductContext";

const MyBoughtItemsCollection = ({ searchParam }) => {
  // this datafile just pasted here for testing

  const {allProducts,getBoughtItems} = useContext(ProductContext)

  const soldItems = allProducts
  
  // const soldItems = [
  //   {
  //     item_id: 1,
  //     item_name: "phone",
  //     category_id: "electronics",
  //     description:
  //       "samsung mobilepho naaa ejkbviehbvei khblWFVA SDJVVAHFVAW kfbvaiv ihbvahvf ajhvahfv hsbliahf jhfvahfv  ahvihf   jewhfvjawf ajhvaj ahvaf ajhdvaufvh aa igfaioyrf ajhvagf ajhvajgr ajvafg jsdfvajf jqhvdqufvq qjhvqkufv qjvquhfvq jsvdquwfvrq qjwvquwrhfv jhvqjgvq qjwvquorgv qvqurwgfv qjvqurgvf jqvqiurv qjvfqiurgvf qwvqiurfvyu  jdfvajsgf javfajfv jasdhvajv jahvausgf ejgcutk ugckjgck xkhfckjgcjg ckhfcjm bjgckhfckj u gckuc jyxjyfx jhhnfjyx llllll l l     l   lllll ll lllll llllllllll aaaaaaaaaa aaa aaaaaa aaaa ayyyyy yyyy yyyyyy yyyyyaaa aaaaaaaaaaaaaaaab bb bbbbbbb bbbbbb bbbbbccc cc cccccccc ccccccccc cddddddd d ddddd dd dddddddee eee eeeeeeeeeeeeeee fff ffffffff fffff ffffffffff fg gggggggg  gg gggg ggggg",
  //     seller_id: "m210662ca",
  //     condition:
  //       "samsung mobilephon ejgcutk ugckjgck xkhfckjgcjg ckhfcjm bjgckhfckj u gckuc jyxjyfx jhhnfjyx llllll l l     l   lllll ll lllll llllllllll aaaaaaaaaa aaa aaaaaa aaaa ayyyyy yyyy yyyyyy yyyyyaaa aaaaaaaaaaaaaaaab bb bbbbbbb bbbbbb bbbbbccc cc cccccccc ccccccccc cddddddd d ddddd dd dddddddee eee eeeeeeeeeeeeeee fff ffffffff fffff ffffffffff fg gggggggg  gg gggg ggggg",
  //     created_at: "",
  //     price: "10000",
  //     buyer_id: "m210694ca",
  //     final_price: "100",
  //     purchase_date: "22/09/2023",
  //     isReviewed: 0,
  //   },
  //   {
  //     item_id: 2,
  //     item_name: "mattress",
  //     category_id: "furniture",
  //     description: "sleepwell mattress",
  //     seller_id: "m210662ca",
  //     condition: "new",
  //     created_at: "",
  //     price: "1000",
  //     buyer_id: "m210694ca",
  //     final_price: "100",
  //     purchase_date: "22/09/2023",
  //     isReviewed: 1,
  //   },
  //   {
  //     item_id: 3,
  //     item_name: "umbrella",
  //     category_id: "others",
  //     description: "samsung umbrella",
  //     seller_id: "m210662ca",
  //     condition: "new",
  //     created_at: "",
  //     price: "100",
  //     buyer_id: "m210694ca",
  //     final_price: "100",
  //     purchase_date: "22/09/2023",
  //     isReviewed: 0,
  //   },
  //   {
  //     item_id: 3,
  //     item_name: "umbrella",
  //     category_id: "others",
  //     description: "samsung umbrella",
  //     seller_id: "m210662ca",
  //     condition: "new",
  //     created_at: "",
  //     price: "100",
  //     buyer_id: "m210694ca",
  //     final_price: "100",
  //     purchase_date: "22/09/2023",
  //     isReviewed: 1,
  //   },
  //   {
  //     item_id: 3,
  //     item_name: "umbrella",
  //     category_id: "others",
  //     description: "samsung umbrella",
  //     seller_id: "m210662ca",
  //     condition: "new",
  //     created_at: "",
  //     price: "100",
  //     buyer_id: "m210694ca",
  //     final_price: "100",
  //     purchase_date: "22/09/2023",
  //     isReviewed: 1,
  //   },
  //   {
  //     item_id: 3,
  //     item_name: "umbrella",
  //     category_id: "others",
  //     description: "samsung umbrella",
  //     seller_id: "m210662ca",
  //     condition: "new",
  //     created_at: "",
  //     price: "100",
  //     buyer_id: "m210694ca",
  //     final_price: "100",
  //     purchase_date: "22/09/2023",
  //     isReviewed: 0,
  //   },
  //   {
  //     item_id: 3,
  //     item_name: "umbrella",
  //     category_id: "others",
  //     description: "samsung umbrella",
  //     seller_id: "m210662ca",
  //     condition: "new",
  //     created_at: "",
  //     price: "100",
  //     buyer_id: "m210694ca",
  //     final_price: "100",
  //     purchase_date: "22/09/2023",
  //     isReviewed: 0,
  //   },
  //   {
  //     item_id: 3,
  //     item_name: "umbrella",
  //     category_id: "others",
  //     description: "samsung umbrella",
  //     seller_id: "m210662ca",
  //     condition: "new",
  //     created_at: "",
  //     price: "100",
  //     buyer_id: "m210694ca",
  //     final_price: "100",
  //     purchase_date: "22/09/2023",
  //     isReviewed: 0,
  //   },
  // ];

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
            soldItems.map((item) => (
              <BoughtItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.categoryId}
                description={item.description}
                seller_id={item.sellerId}
                condition={item.condition}
                created_at={item.createdAt}
                price={item.price}
                buyer_id={item.buyerId}
                final_price={item.finalPrice}
                purchase_date={item.updatedAt}
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
