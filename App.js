import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
// import queryString from 'query-string'
// import { call, put, takeEvery } from 'redux-saga/effects'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import StyledButton from './common/StyledButton'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: [],
            input: '',
            categoryList: ['All'],
            category: '',
        };
    }

    componentDidMount() {
        let currentLocation = this.props.location.pathname.replace('/', '');
        this.setState({
            category: currentLocation,
            input: currentLocation
        })

        fetch("http://demo1656942.mockable.io/products.json")
            .then(res => res.json())
            .then(
                (result) => {
                    const categoryList = result.products
                        .map(product => product.bsr_category.toLowerCase())
                        .filter((item, pos, self) => self.indexOf(item) === pos)
                    this.setState({
                        isLoaded: true,
                        products: result.products,
                        categoryList: [...this.state.categoryList, ...categoryList]
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {

        let list = this.state.products.filter((item, i, arr) => {
            return (this.state.input === '' || item.brand.toLowerCase().includes(this.state.input.toLowerCase()))
                && (this.state.category === '' || this.state.category === 'all' || item.bsr_category.toLowerCase().replace(/\s/g, "").includes(this.state.category.toLowerCase()))
        }).map((d, index) => (<li key={index}>
                <i>Name: </i>{d.brand} <br/>
                <i>Price: </i>{d.price} <br/>
                <i>Category: </i>{d.bsr_category} <br/>
                <i vertical-align="top">Photo: </i>
                <img src={d.img} alt={d.img} width="100px" height="100px"/>
                <hr/>
            </li>
        ));

        const {categoryList, category} = this.state;

        let mappedCategoryList = categoryList.map((item, index) => {
            let result;
            result = item === 'All' ?
                <Link to={'all'}>
                    <StyledButton active={category === 'all'} item={'All'} onClick={this.reset.bind(this)}>All</StyledButton>
                </Link>:
                <Link to={item.replace(/\s/g, "")}>
                    <StyledButton active={category === item.replace(/\s/g, "")} key={index} type="button" variant="primary" value={item}
                                onClick={this.handleChange.bind(this)}>
                        {item}
                    </StyledButton>
                </Link>
            return result
        })
        return (
            (<Container>
                <Row>
                    <Col xs={4} sm={4} md={3} lg={3}>
                        <div align="center">Filter by category</div>
                        <Col xs={5} sm={8} md={8} lg={8}>
                            <ul>{mappedCategoryList}</ul>
                        </Col>
                    </Col>
                    <Col xs={5} sm={8} md={9} lg={9}>
                        <Form.Group controlId="searchField">
                            <Form.Label>Search field by name</Form.Label>
                            <Link to={this.state.input}><Form.Control value={this.state.input} type="text"
                                          placeholder="Type here you're looking for"
                                          onChange={this.onChangeHandler.bind(this)}/>
                            </Link>
                        </Form.Group>
                        <ul>{list}</ul>
                    </Col>
                </Row>
            </Container>)
        );
    }

    onChangeHandler(e) {
        this.setState({
            input: e.target.value
        })
    }

    handleChange(e) {
        this.setState({
            category: e.target.value.replace(/\s/g, "")
        });
    }

    reset(e) {
        this.setState({
            category: 'all'
        });
    }
}

export default App;


