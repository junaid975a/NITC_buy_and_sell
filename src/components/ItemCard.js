import React from "react";

const ItemCard = ( {id, name, country } ) => {
    
    return (
        <div>
            
            <p>{id}</p>
            <p>{name}</p>
            <p>{country}</p>

        </div>
    )
}

export default ItemCard;