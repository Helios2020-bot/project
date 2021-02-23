import axios from 'axios';
import React from 'react';
import Deliveryaddress from './Deliveryaddress';
import CartDetails from './CartDetails';
import Quantity from './Quantity';


class UserList extends React.Component{
  constructor(){

    super();
    this.state={
      users:[],
      selectedDish:{
        restId:2,
        userId:1,
        dishes:[{
          dishId:3,
          dishName:"paneer butter masala",
          quantity:1,
          price:250
        },
      {
        dishId:15,
        dishName:"paratha",
        quantity:3,
        price:200
      },
      {
        dishId:1,
        dishName:"chicken",
        quantity:2,
        price:350}],

      }

    }
  }
  componentDidMount(){
    axios.get('http://localhost:8080/api/orders')
    .then((res)=>{
      const users=res.data;
      this.setState({users})
      //  console.log(users);
    })
  }
  render(){
    return(
      <div className="container justify-content-md-center mt-5 bg-light border border-primary h-100"style={{height: 900}}>
        <div className="row justify-content-md-center border-left">
        <div className="col border border mr-md-5 mt-2 ">
            < Deliveryaddress data={this.state.selectedDish.userId}/>
          </div>
        </div>
        <div className="row justify-content-md-center">

          <div className="col mr-md-5 mt-1 border border">
              <CartDetails details={this.state.selectedDish}></CartDetails>
              {/* <Quantity></Quantity> */}
          </div>
        </div>
    </div>
    )

}

}
export default UserList;
