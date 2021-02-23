import axios from 'axios';
import React from 'react';

class Deliveryaddress extends React.Component{
  constructor(props){
    super(props);
    this.state={
      users:[],
      id:this.props.data

    }
    //  console.log(this.props.data);
  }
  componentDidMount(){
    axios.get(`http://localhost:8080/api/users/${this.state.id}`)
    .then((res)=>{
      // console.log(res);
      const users=res.data;
      this.setState({users})
        //  console.log(users);
    })
  }
  render(){
    return(
      <div>
        <h2>Delivery Address</h2>
          Name :{this.state.users.username}<br></br>
          Address :{
            // this.state.users.map((user)=>{
            //   return <div key={user.userId}>
            //       {user.address}
            //   </div>
            // })
            this.state.users.address
          }<br></br>

      </div>
    )
}
}
export default Deliveryaddress;
