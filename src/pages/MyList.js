import React from "react";
import MyListItemsCollection from '../components/MyListItemsCollection';
const MyList = () => {
  

  return (
    <div>
        {/* is page pr hum apni upload ki hui items show karenge */}
        {/* isme dono include hongi-->> sold wali + unslod wali */}
        <MyListItemsCollection />
    </div>
  );
};

export default MyList;
