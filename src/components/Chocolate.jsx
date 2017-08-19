
import React from 'react';

const Chocolate = ({details, onChocolateSelectEvent}) => {
    return (
        <div className="">
            <a href="#" onClick={ () => onChocolateSelectEvent(details) }>
                {details.id}: {details.name} ${details.price}
            </a>
        </div>
    )
}

export default Chocolate;
