import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './menuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { About } from './AboutComponent';
import { addComments, addLeader, fetchCommets, fetchDishes, fetchPromos } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes.dishes,
        comments: state.comments.comments,
        promotions: state.promotions.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComments: (dishId, rating, author, comment) => dispatch(addComments(dishId, rating, author, comment)),
    addLeader: (dishId, name, designation, description, image) => dispatch(addLeader(dishId, name, designation, description, image)),
    postFeedback: (feedback) => dispatch(addLeader(feedback)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchComments: () => { dispatch(fetchCommets()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    // postFeedback:(feedback)    
    
});


class Main extends Component {

    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.fetchDishes()
        this.props.fetchComments()
        this.props.fetchPromos ()
    }
    render() {
        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props?.dishes?.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComments={this.props.addComments} addLeader={this.props.addLeaders} />
            );
        };

        const HomePage = () => {
            return (
                <Home
                    dish={this.props?.dishes?.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />);
        }
        return (
            <div>
                <Header />

                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props?.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/home" />
                </Switch>


                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));