
import React from 'react';
import Chocolate from '../components/Chocolate';

const ChocolateList = ({chocolates, onChocolateSelect}) => {
    return (
        <div className="chocolate-list">
            {
                chocolates.map(chocolate =>
                    <Chocolate
                        key={chocolate.id}
                        details={chocolate}
                        onChocolateSelectEvent={onChocolateSelect}
                    />
                )
            }
        </div>
    )
}

export default ChocolateList;
