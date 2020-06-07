import React, { Component } from 'react';
import './App.css';
import Home from './components/home';
import Chat from './components/chat';
import Chatopen from './components/chatopen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom";
class App extends Component
{
  constructor()
  {
    super();
    this.state={
      img:'',
      name:''
    }
  }
  ondata=(name,img)=>{
    const user={
      name:name,
      img:img
    }
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
       window.location=`/chatopen?username=${user.name}`                     
       }
       });
    this.setState({img:img,name:name})
  }
  render()
  {
    return(
        <div className="App">
        <Router>
        <Switch>
        <Route exact path="/">
           <Home/>
        </Route>
        <Route path="/chat">
           <Chat data={this.ondata}/>
        </Route>
        <Route path="/chatopen">
           <Chatopen img={this.state.img} username={this.state.name}/>
        </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
