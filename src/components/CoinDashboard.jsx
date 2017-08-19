
import React from 'react';
import { FormGroup, FormControl, Col, Row, Button } from 'react-bootstrap';
import ChocolateMachine from '../services/ChocolateMachine';

class CoinDashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            acceptedCoins : ChocolateMachine.getAcceptedCoins()
        }

        this.getCurrentTotal = this.getCurrentTotal.bind(this);
        this.handleCurrentTotal = this.handleCurrentTotal.bind(this);
    }

    /**
     * get the current total
     * @returns {*}
     */
    getCurrentTotal() {
        return ChocolateMachine.calculateTotalCash(this.props.userCashArray);
    }

    /**
     *
     * @param event
     */
    handleCurrentTotal(event) {
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
            <form onSubmit={ (event) => this.handleCurrentTotal(event) }>
                <FormGroup>
                    <h5>Input your coin and press the button, once done choose a chocolate!
                    Accepted amounts are: 10c, 20c, 50c, $1, $2</h5>
                    <Row>
                        <Col sm={10} md={3}>
                            <input
                                type="text"
                                placeholder="Enter your coin"
                                ref={(input) => this.amount = input}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={10} md={10}>
                            <p>your coin count: ${this.getCurrentTotal()}</p>
                            <Button bsStyle="primary" type="submit">Enter coin</Button>
                        </Col>
                    </Row>
                </FormGroup>
            </form>
        )
    }
}

export default CoinDashboard;