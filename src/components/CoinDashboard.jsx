
import React from 'react';
import { FormGroup, FormControl, Col, Row, Button, ButtonToolbar } from 'react-bootstrap';
import ChocolateMachine from '../services/ChocolateMachine';

class CoinDashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            cashOutArray : [],
            acceptedCoins : ChocolateMachine.getAcceptedCoins()
        }

        this.getCurrentTotal = this.getCurrentTotal.bind(this);
        this.handleEnterCoin = this.handleEnterCoin.bind(this);
        this.handleCoinReturnOnCancel = this.handleCoinReturnOnCancel.bind(this);
    }

    /**
     * get the current total
     * @returns {*}
     */
    getCurrentTotal() {
        return ChocolateMachine.calculateTotalCash(this.props.userCashArray);
    }

    /**
     * this function will get the current cash array state from App component
     * to have a copy of it in its own cashOutArray state to be able to return the
     * coins (one by one) to user on cancellation.
     */
    handleCoinReturnOnCancel() {
        const { userCashArray, onEmptyBasket } = this.props;

        this.setState({
            cashOutArray: userCashArray
        })

        //this is to clear the userCashArray state in App component
        onEmptyBasket();
    }

    /**
     *
     * @param event
     */
    handleEnterCoin(event) {
        event.preventDefault();

        //update the enteredCoin state with the current entered value in the input
        const enteredCoin = this.amount.value;

        /*validate the entered amount by searching in acceptedCoins to see if it's
         * one of the accepted coins*/
        const theCoin = ChocolateMachine.getUserCoin(enteredCoin);

        if (theCoin) {
            //add the coin value to user's cash array
            this.props.updateCashArray(theCoin);
            this.amount.value = '';
        } else {
            alert('the amount entered is invalid');
        }
    }

    render() {
        return (
            <form onSubmit={ (event) => this.handleEnterCoin(event) }>
                <FormGroup>
                    <h5>Input your coin and press the button, once done choose a chocolate!
                        Accepted amounts are: 10c, 20c, 50c, $1, $2</h5>
                    <Row>
                        <Col sm={10} md={3}>
                            <FormControl
                                type="text"
                                placeholder="Enter your coin"
                                inputRef={(input) => this.amount = input}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={10} md={10}>
                            <p>your coin count: ${this.getCurrentTotal()}</p>
                            <ButtonToolbar>
                                <Button bsStyle="primary" type="submit">Enter coin</Button>
                                <Button bsStyle="danger" onClick={() => this.handleCoinReturnOnCancel() }>Cancel</Button>
                            </ButtonToolbar>
                            <div>
                                {
                                    this.state.cashOutArray.map(coin =>
                                        <span>{coin} </span>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </FormGroup>
            </form>
        )
    }
}

export default CoinDashboard;