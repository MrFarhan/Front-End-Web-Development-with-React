import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';


function RenderDish({ dish }) {

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
function RenderComments({ dish }) {
    if (dish != null) {
        const comm = dish.comments.map((cmt) => {
            return (
                <div key={cmt.id} >
                    <ul className="list-unstyled">
                        <li>{cmt.comment}</li>
                        <li>{cmt.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(cmt.date)))}</li>
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

const DishDetail = ({ dish, comm }) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1" >
                    <RenderDish dish={dish} />
                    {console.log(dish, "dish on renderdish")}
                </div>
                <div className="col-12 col-md-5">
                    <RenderComments dish={dish} />
                    {console.log(dish, "dish on rendercomment")}
                </div>
            </div>
        </div>
    );
}


export default DishDetail;