import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import img from '../images/chat.svg';
class Home extends Component
{
    constructor()
    {
        super();
        this.state={
            username:""
        }
    }
    onChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });
      }
      fun=(e)=>{
          e.preventDefault();
          if(document.getElementById("username").value=="")
          { 
              alert("Please Enter a Valid UserName");
              window.location="/";
          }
          else
          {
            var url = new URL(window.location.href); 
            var params = new URLSearchParams(url.search);              
            const user={
                name:this.state.username
              }
              console.log(user)

              fetch("http://localhost:8082/checkuser", {
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
                  alert("Username Already Exists!! Please Enter Another UserName");
                  window.location="/";
                }
                else
                {
                  window.location=`/chat?username=${document.getElementById("username").value}`

                }
              });

             
              
          }
      }
    render()
    {
        return(
          <div className="container5" style={{width:"70%",marginTop:"6%"}}>
          <div className="row">
          <div className="col-6">
              <img src={img} style={{height:"100%",width:"100%",marginTop:"6%"}}/>
          </div>
          <div className="col-6">
          <br/><br/><br/><br/><br/><br/><br/>
          <h1 style={{color:"black"}}>JOIN</h1><br/>
          <div className="form-group">
          <input type="text" className="form-control" id="username" name="username" onChange={this.onChange}  placeholder="Enter Display Name" required/>
          <br/>
          <br/>
          <center><button id="button2" onClick={(e)=>{this.fun(e)}} style={{marginLeft:"3%"}}>Join</button></center>
          </div>
          </div>                      
        </div><br/>
      <br/><br/> 
      </div>
        )
    }
}
export default Home;