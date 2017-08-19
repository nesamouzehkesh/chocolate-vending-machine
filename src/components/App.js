
import React, { Component } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import Header from '../components/Header';
import ChocolateList from '../components/ChocolateList';
import CoinDashboard from '../components/CoinDashboard';
import ChocolateBasket from '../components/ChocolateBasket';
import ChocolateMachine from '../services/ChocolateMachine';

class App extends Component {
    constructor() {
        super();

        this.state = {
            chocolates: {},
            selectedChocolate: {},
            coinsToReturn: 0,
            totalEnteredAmount: 0,
            userCashArray: [],
            chocolateBasket: {}
        }

        this.handleChocolateSelect = this.handleChocolateSelect.bind(this);
        this.updateCashArray = this.updateCashArray.bind(this);
        this.handleResetBasket = this.handleResetBasket.bind(this);
        this.resetSelectedChocolate = this.resetSelectedChocolate.bind(this);
    }

    /**
     *
     */
    componentWillMount() {
        this.setState({chocolates: ChocolateMachine.getChocolates()});
    }

    /**
     *
     */
    resetSelectedChocolate() {
        this.setState({
            selectedChocolate: {}
        })
    }

    /**
     * this function only updates the cash array based on the values submitted
     * through the input form in CoinDashboard component
     *
     * @param coin
     */
    updateCashArray(coin) {
        const coinValue = coin.value;
        const newUserCashArray = this.state.userCashArray.concat(coinValue);

        this.setState({
            userCashArray : newUserCashArray
        });
    }

    /**
     * upon clicking "take your <selected chocolate> button the basket state
     * will be reset
     */
    handleResetBasket() {
        this.setState({
            selectedChocolate: {},
            userCashArray: [],
            chocolateBasket: {},
            coinsToReturn: 0
        })
    }

    /**
     * handles the steps to be taken when a chocolate is selected
     *
     * @param selectedChocolate
     */
    handleChocolateSelect(selectedChocolate) {
        //update the selectedChocolate state with the selected chocolate
        this.setState({
              selectedChocolate: selectedChocolate
        });

        //get the price of the selected chocolate
        const chocolatePrice = selectedChocolate.price;

        //is your totalCashEntered enough? If yes calculate the returned amount
        const total = ChocolateMachine.calculateTotalCash(this.state.userCashArray);
        if (total >= chocolatePrice) {
            this.setState({
                chocolateBasket : selectedChocolate,
                coinsToReturn: (total - chocolatePrice)
            })
        } else {
              alert('you need more cash to purchase this chocolate!');
              this.resetSelectedChocolate();
        }
    }

    render() {
        return (
            <div className="container">
                <Panel>
                    <Grid className="row">
                        <div>
                          <Header tagline="Chocolate Vending Machine!"/>
                        </div>
                        <Row className="show-grid">
                            <Col xs={4} md={2} >
                                <ChocolateList
                                    chocolates = {this.state.chocolates}
                                    onChocolateSelect = {this.handleChocolateSelect}
                                />
                            </Col>
                            <Col xs={8} md={10}>
                                <CoinDashboard
                                    userCashArray = {this.state.userCashArray}
                                    updateCashArray = {this.updateCashArray}
                                    onEmptyBasket = {this.handleResetBasket}
                                />
                                <ChocolateBasket
                                    chocolateInBasket = {this.state.chocolateBasket}
                                    coinsToReturn = {this.state.coinsToReturn}
                                    onEmptyBasket = {this.handleResetBasket}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
            </div>
        );
    }
}

export default App;