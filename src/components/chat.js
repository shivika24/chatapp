import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';
import img4 from '../images/img4.png';
import img5 from '../images/img5.png';
import './chat.css';
class Chat extends Component
{
    constructor()
    {
        super();
        this.state={
            id:''
        }
    }
    componentDidMount()
    {
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        const user={
            name:params.get('username')
        }
    fetch("http://localhost:8082/checkadmin", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
       body: JSON.stringify(user)
      })
      .then(res => res.json())
       .then(res => {
         if(res.code===1)
         {
            fetch("http://localhost:8082/adduser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
              })
                .then(res => res.json())
                .then(res => {
                  if(res.code === 0)
                  {
                    alert("User Not Added");
                  }
                  else
                  {
                  alert(`User ADDED SUCCESFULLY!!`);  
                  window.location=`/chatopen?username=${params.get('username')}`                        
                  }
                });      
         }
         
       })
       setInterval(this.check,1000);
        
    }
    check=()=>{
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        const user={
            name:params.get('username')
        }
        fetch("http://localhost:8082/checkadmin", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
             body: JSON.stringify(user)
            })
            .then(res => res.json())
             .then(res => {
             if(res.code === 1)
             {
             window.location=`/chatopen?username=${params.get('username')}`;
             }
            })
    }
    funimage=(e,img)=>{
        e.preventDefault();
        alert("image:-"+img);
        this.setState({id:img})
    }
    render()
    {
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        return (
            <div>
                <center><h1 style={{marginTop:"2%",color:"#2099c7"}}>CHOOSE AVATARS</h1></center>
                <div id="selectavtar" >
        <div style={{marginTop:"10%"}}>
        <Link to={`/chatopen?username=${params.get('username')}`}>
        <button onClick={()=>this.props.data(params.get('username'),'img1')}> 
            <img src={img1} class="imgmodel"/>
        </button></Link>
        <Link to={`/chatopen?username=${params.get('username')}`}><button onClick={()=>this.props.data(params.get('username'),'img2')}>
            <img src={img2} class="imgmodel"/>
        </button></Link>
        <Link to={`/chatopen?username=${params.get('username')}`}><button onClick={()=>this.props.data(params.get('username'),'img3')}>
            <img src={img3} class="imgmodel"/>
        </button></Link>
        <Link to={`/chatopen?username=${params.get('username')}`}><button onClick={()=>this.props.data(params.get('username'),'img4')}>
            <img src={img4} class="imgmodel"/>
        </button></Link>
        <Link to={`/chatopen?username=${params.get('username')}`}><button onClick={()=>this.props.data(params.get('username'),'img5')}>
            <img src={img5} class="imgmodel"/>
        </button></Link>

       </div>
   </div>
            </div>
        )
    }
}
export default Chat;