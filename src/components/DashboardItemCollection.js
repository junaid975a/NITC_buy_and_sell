import React from "react";
import ItemCard from "./ItemCard";


const DashboardItemCollection = ({searchParam}) => {

    // this datafile just pasted here for testing
    const employees = [
        { id: 1, name: 'Alice', country: 'Austria' },
        { id: 2, name: 'Bob', country: 'Belgium' },
        { id: 3, name: 'Carl', country: 'Canada' },
    ];
    return (
        <div className="flex flex-row w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0">
            {/* here fetch data from database, and put them all in card one by one using for loop */}

            {/* fetch data */}

            {employees.length === 0 ?
                (
                    <div>
                        <p>No items available</p>
                    </div>
                ) :
                (
                    employees.map((employee) => (
                        <ItemCard key={employee.id} 
                        id={employee.id}
                        name={employee.name}
                        country={employee.country}/>
                    ))
                )
            }

        </div>
    )
}

export default DashboardItemCollection;