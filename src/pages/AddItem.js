import React from "react";
import AddItemComponent from '../components/AddItemComponent';

const AddItem = () => {
    return (
        <div className="w-[1000px] flex items-center justify-center">
            {/* import add item component */}
            <AddItemComponent />
        </div>
    )
}

export default AddItem;