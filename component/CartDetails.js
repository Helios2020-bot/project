import axios from 'axios';
import React from 'react';
import icons from 'glyphicons'
 import 'bootstrap/dist/css/bootstrap.css';
import Quantity from './Quantity';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
//  import { Glyphicon } from 'react-bootstrap';
//  import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class CartDetails extends React.Component{
  constructor(props){
    super(props);
    this.state={
       users:this.props.details,
       newList:this.props.details.dishes
    }

  }

  // componentDidMount(){
  //   axios.get('http://localhost:8000/order')
  //   .then((res)=>{
  //     const users=res.data;
  //     this.setState({users});
  //     console.log(users);
  //   })
  // }
  onRemoveProduct (id) {
    const newList = this.state.newList.filter((item) => item.dishId !== id);
    this.setState({ newList});
    // this.forceUpdate();
    //  console.log(newList);
  };
clearCart=()=>{
  this.setState({newList:[]})
}

  additem(){
    const quantity=this.state.newList.quantity + 1;
    this.setState({quantity})
  }

  render(){
     let amountToPay = 0;
     for (let i=0; i<this.state.newList.length; i++) {
       amountToPay += this.state.newList[i].price * this.state.newList[i].quantity;
     }
    return(
    //   <>
    //    <section className="container">
    //   <ul className="products">
    //     {this.state.newList.map((product, index) => {
    //       return (
    //         <li className="row" key={index}>
    //           <div className="col left">
    //             <div className="thumbnail">
    //               <a href="#">
    //                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5d_U24KzfUvZ-UqAr-jP2vv_ezJnAZK7KNw&usqp=CAU" alt={product.name} />
    //               </a>
    //             </div>
    //             <div className="detail">
    //               <div>
    //                <button onClick={this.additem}>
    //                 {icons.plus}
    //                 </button>
    //                 <Quantity></Quantity>
    //               </div>
    //               <div className="name" style={{float:'right'}}>
    //                  <a href="#">{product.dishName}</a>
    //               </div>
    //               <div className="description" style={{float:'right'}}>{product.quantity}*{product.price}</div>
    //             </div>
    //           </div>

    //            <div className="col right">


    //             <div className="remove">
    //             <button type="button" onClick={()=>this.onRemoveProduct(product.dishId)}>
    //         Remove
    //       </button>
    //             </div>
    //           </div>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </section>
    // <div style={{float:'right'}}>Total : {amountToPay}</div>
    //          <button type="button" className="btn btn-primary">place order</button>
    //          <button type="button" onClick={this.clearCart}>Clear Cart</button></>
      <>
      <div className=" container">
				<h2 className="card-title">Cart</h2>

				<hr/>
				{
					this.state.newList.map((product, index) => <CartItem product={product} remove={()=>this.onRemoveProduct(product.dishId)} key={index}/>)
				}
				<hr/>
				{ this.state.newList.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">{'\u20B9'}{amountToPay}</span></h4><hr/></div>: ''}

				{ !this.state.newList.length ? <EmptyCart/>: ''}
				{/* <Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link> */}
				<button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
				<br/><br/><br/>
			</div></>
    )
}
}
export default CartDetails;
