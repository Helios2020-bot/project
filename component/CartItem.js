import React from 'react';
import NumericInput from 'react-numeric-input';

export default class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       product : this.props,
      quantity:this.props.product.quantity
    };
  }
  incQty=event=>{

     this.setState({quantity:event.target.value})
      console.log(this.state.quantity);
  }
	render(){
    const { product } = this.props;
    let amountToPay = 0;
     for (let i=0; i<product.length; i++) {
       amountToPay += product[i].price * product[i].quantity;}
		return (
      <>
		    <div className="card" style={{ marginBottom: "10px"}}>
			  <div className="card-body">
			    <h4 className="card-title">{product.dishName}</h4>
			    <h5 className="card-text"><small>price: </small>{'\u20B9'}{product.price}</h5>
			    <span className="card-text text-success"><small>Quantity: </small><NumericInput size={2} min={0} max={100} value={this.state.quantity}  onChange={this.incQty}/></span>

			    <button className="btn btn-sm btn-warning float-right" onClick={() => this.props.remove(product)}>Remove from cart</button>

			  </div>
			</div>
      	{ product.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">${amountToPay}</span></h4><hr/></div>: ''}
		</>)
	}
}
