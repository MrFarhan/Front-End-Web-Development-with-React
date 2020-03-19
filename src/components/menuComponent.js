import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';
// import App from '../App'



class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
        this.props.dishSelected({ selectedDish: dish });
        console.log(this.selectedDish)

    }

    renderDish(dish) {
        if (dish != null)
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle></CardImgOverlay>
                    </Card>
                </div >
            );
        });
        // console.log(menu.dish, "menu in menu component")
        return (
            <div className="container" >
                <div className="row">
                    {menu}
                </div>
                {/* <DishDetail selectedDish={this.state.selectedDish} /> */}
                <div className="row">
                    <DishDetail menu={menu} />
                    {/* {this.renderDish(this.state.selectedDish)} */}
                </div>
            </div>
        );
    }

}

export default Menu;