import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );

        } else {
            return <div></div>
        }
    }

    //function renderComments
    renderComments(dish) {
        if (dish != null) {
            const comm = dish.comments.map((cmt) => {
                return (
                    <div key={cmt.id} >
                        <ul className="list-unstyled">
                            <li>{cmt.comment}</li>
                            <li>{cmt.author} , {cmt.date}</li>
                        </ul>
                    </div>
                );
            })
            return (
                <div>
                    <h4 className="col-12">Comments</h4>
                    <div>{comm}</div>
                </div>
            )
        }
        else {
            return <div></div>
        }
    }

    //function render
    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1" >
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5">
                    {this.renderComments(this.props.dish)}
                    {console.log("this.props", this.props, "this.props.dish", this.props.dish, "this.props.comments", this.comm)}
                </div>
            </div>
        );
    }

    //function renderDish

}

export default DishDetail;