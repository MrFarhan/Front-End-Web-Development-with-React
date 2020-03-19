import React from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/menuComponent';
import { DISHES } from './shared/dishes';
// import DishDetail from './components/DishdetailComponent'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: [],

    };


  }

  dishSelected(dishSelect) {
    this.setState({ dishSelect: dishSelect })
  }

  render() {
    return (
      <div className="App">


        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand></div>
        </Navbar>
        {console.log(this.state.dish)}

        <Menu dishSelected={(selectedDish) => this.setState({ selectedDish: this.state.dish })} dishes={this.state.dishes} />
        {/* <DishDetail dishes={this.state.dishes} /> */}
        {console.log(this.state)}
      </div>
    )
  }
}
export default App;
