import acceptedCoins from './acceptedCoins';
import chocolates from './chocolates.js';

const ChocolateMachine = {
    getChocolates: () => {
        return chocolates;
    },
    getAcceptedCoins: () => {
        return  acceptedCoins;
    },
    /**
     * when a total is calculated based on the values in cash array
     * the cash array state should be reset
     *
     * @param cashArray
     */
    calculateTotalCash: (cashArray) => {
        if (cashArray.length > 0) {
            return cashArray.reduce(function (sum, value) {
                return sum + value;
            }, 0);
        }

        return 0;
    },
    getUserCoin: (enteredCoin) => {
        const theCoin = acceptedCoins
            .filter(acceptedCoin =>
                (acceptedCoin.id === enteredCoin.toLowerCase())
            )

        if (theCoin[0]) {
            return theCoin[0];
        } else {
            return null;
        }
    }
}

export default ChocolateMachine;
