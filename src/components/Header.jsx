
import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';

const Header = (props) => {
    return (
        <Row>
            <Col xs={12} md={8} >
                <Panel header={props.tagline}>
                </Panel>
            </Col>
        </Row>
    )
}

export default Header;
