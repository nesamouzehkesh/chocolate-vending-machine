
import React from 'react';
import { Button } from 'react-bootstrap';

const ChocolateBasket = ({chocolateInBasket, coinsToReturn, onEmptyBasket}) => {

    function getAction() {
        if (chocolateInBasket.name !== undefined) {
            const coinsToTake = coinsToReturn > 0? `Please take $${coinsToReturn} return` : ``;

            return (
                <div>
                    <Button bsStyle="success" onClick={onEmptyBasket}>Take your Item</Button>
                    <h3 className="basket">
                        {chocolateInBasket.name}
                    </h3>
                    { coinsToTake }
                </div>
            );
        } else {
            return (
                <h3 className="basket">No item is selected</h3>
            );
        }
    }

    return (
        <div className="basket">
            { getAction() }
        </div>
    )
}

export default ChocolateBasket;