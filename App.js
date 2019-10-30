import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';
import {requestProduct} from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
// import queryString from 'query-string'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import StyledButton from './common/StyledButton'

//Creating our component
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            input: '',
            category: ' ',
            categoryList: []
        };
    }

    componentDidMount() {

        this.props.loadProducts();

        // save location category from address bar
        let currentLocation = this.props.location.pathname.replace('/', '');
        this.setState({
            category: currentLocation,
        })
    }

    render() {
        let currentLocation = this.props.location.pathname.replace('/', '');
        const {products} = this.props;
        //Displayed each item as these fields: name, price, category, image
        let list = products && products.filter((item, i, arr) => {
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

        const {category} = this.props;
        //filtering list of our items & find uniqe category therefore displayed them as buttons
        let categoryList = products && products
            .map(product => product.bsr_category.toLowerCase())
            .filter((item, pos, self) => self.indexOf(item) === pos)

        //Adding another one button in the beginning which will display all products
        categoryList && categoryList.unshift('all')

        //Displaying each item as button
        let mappedCategoryList = categoryList && categoryList.map((item, index) => {
                let result;
                result = item === 'all' ?
                    <Link to={'all'}>
                        <StyledButton active={category === 'all'} item={'all'}
                                      onClick={this.reset.bind(this)}>all</StyledButton>
                    </Link> :
                    <Link to={item.replace(/\s/g, "")}>
                        <StyledButton active={category === item.replace(/\s/g, "")} key={index} type="button"
                                      variant="primary" value={item}
                                      onClick={this.handleChange.bind(this)}>
                            {item}
                        </StyledButton>
                    </Link>
                return result
            })
        return (
            //Displaying our layout
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
                            <Link to={currentLocation +this.state.input}><Form.Control value={this.state.input} type="text"
                                                                      placeholder="Type here you're looking for"
                                                                      onChange={this.onChangeHandler.bind(this)}

                            />
                            </Link>
                        </Form.Group>
                        <ul>{list}</ul>
                    </Col>
                </Row>
            </Container>)
        );
    }
    //function which set new state of input field
    onChangeHandler(e) {
        this.setState({
            input: e.target.value
        })
    }
    //function which set new state of category
    handleChange(e) {
        this.setState({
            category: e.target.value.replace(/\s/g, "")
        });
    }
    //function which reset filter & display all items
    reset(e) {
        this.setState({
            category: 'all'
        });
    }
}

const mapStateToProps = state => ({
    loading: state.loading,
    products: state.products,
    categoryList: state.categoryList
})

//Connect Redux
const mapDispatchToProps = dispatch => ({
    loadProducts: () => dispatch(requestProduct())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

