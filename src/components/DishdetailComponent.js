import React from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle } from 'reactstrap';


class DishDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: this.props.selectedDish,
            menu: this.props.menu
        }

        // this.setState({ selectedDish: this.props.selectedDish })
    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish });

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


        const newMenu = this.props.menu.map((dish) => {
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
        console.log(this.props.menu, "menu", this.props.selectedDish, "selected dish")
        return (
            <div>
                {newMenu}
                {/* <h2>hello world</h2> */}
                {this.renderDish(this.state.selectedDish)}
            </div>
        )


    }
}

export default DishDetail;