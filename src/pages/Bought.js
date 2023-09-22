import React from "react";
import MyBoughtItemsCollection from "../components/MyBoughtItemsCollection";

const Bought = () => {
    return (

        <div>
            {/* is page pr hum apni upload ki hui items show karenge */}
            {/* isme dono include hongi-->> sold wali + unslod wali */}
            <MyBoughtItemsCollection />
        </div>

    )
}

export default Bought; 