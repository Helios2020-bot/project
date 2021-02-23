import React,{Component} from 'react';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import Cart from './cart';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserList from './test';

class Menu extends Component{
  constructor(props){
    super(props);
    this.state={
      menu:[],
     total:0,
      dish:[
        {dishName:'',
         dishId:'',
         price:0,
         total:0,
         restId:''
       }
      ]
    };



    }

   componentDidMount() {
        axios.get(`http://localhost:8080/api/restaurants/1`)
          .then(res => {
            const menu = res.data;
            this.setState({ menu });
          //  console.log(menu);

          })
      }

      addValue(id,name,price,restId,evt)
    {
      evt.preventDefault();

        let dish = this.state.dish;
        let price1=parseInt(price);
     let total=parseInt(this.state.total +=price1);
      // console.log(total);
        dish.push({dishName:name,
                   dishId:id,
                   price:price,

                   total:total+=price,
                   restId:restId
                   });
        this.setState({dish:dish
         });
        console.log(this.state.dish);

    }


    removeItemFromCart = (idx) => {
      let dish = [this.state.dish];
      console.log(`onclick remove ${dish}`);
      for(let i=0;i<dish.length;i++){
        if(dish.dishId!==idx)
        dish.splice(idx, 1);
      }

      this.setState({dish:dish,total:0
      });
     console.log(dish);

  }



  deleteTask(taskToDelete,price) {
  //  this.setState((prevState, props) => {
      const tasks = [...this.state.dish];

      //console.log(tasks)
      const indexOfTaskToDelete = tasks.findIndex(
        task => task.dishName === taskToDelete
      );

      tasks.splice(indexOfTaskToDelete, 1);
      let total=this.state.total-=price
     // let total=this.state.total -=task.price;
      console.log(tasks)
      this.setState({dish:tasks,total:total})
    }



     submitState = () => {
       this.props.acceptState(this.state.dish);
     }

      render() {
        console.log(`this is array${this.state.dish}`);
        {console.log(`state is ${this.state}`)}
        return (
          <div>
          <ul>
            { this.state.menu.map(menu =>(
                <Card className="card-style">

                 <Card.Body>
                   <Card.Title id="title"> {menu.restId}</Card.Title>
                   <Card.Title id="title"> {menu.dishName}</Card.Title>
                   <Card.Subtitle className="mb-2 text-muted">{menu.dishName}</Card.Subtitle>
                   <Card.Text> {menu.price}</Card.Text>
                {/*}   <Button variant="primary" onClick={this.add.bind(this, menu.dishName,menu.price)} >Add to cart</Button>
                   <Button variant="primary" onClick={this.remove.bind(this, menu.dishName,menu.price)} >remove from cart</Button>*/}
                   <Button variant="primary" onClick={this.addValue.bind(this,menu.dishId,menu.dishName,menu.price,menu.restId)} >Add to cart</Button>
                   <Button variant="primary" onClick={this.removeItemFromCart.bind(this,menu.dishId)} >Checkout</Button>
                   <Button variant="primary" onClick={this.deleteTask.bind(this,menu.dishName,menu.price)} >remove</Button>
                   <Link to="/cart"><Button variant="primary">order</Button></Link>

                   <Route path='/cart' render={(total) => (
    <UserList {...total}  />
  )}/>
                   {/*<input type="checkbox" value={menu.dishId} defaultChecked={false} onClick={this.handleClick.bind(this, menu.price)}/>*/}
                 </Card.Body>
               </Card>

            ))}
          </ul>
         <div>
           <h2>Order placed</h2>

         </div>
         <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>total</th>
            </tr>
          </thead>
            <tbody>
              {this.state.dish.map(user =>
                (
                 <tr  onClick={this.addValue,this.removeDish}>
                   <td>{user.dishName}</td>
                   <td>{user.price}</td>
                    <td>{user.total}</td>
                 </tr>
                )
              )}

            </tbody>
        </table>
      </div>


          </div>

        )
      }
}
export default Menu;
