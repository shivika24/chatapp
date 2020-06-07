import React, { Component } from 'react';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';
import img4 from '../images/img4.png';
import img5 from '../images/img5.png';
import './chatopen.css';
class Chatopen extends Component
{
    constructor()
    {
        super()
        {
            this.state={
                image:'',
                type:'',
                username1:'',
                msg:[]
            }
        }
    }
    componentDidMount()
    {
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        const user={
            name:params.get('username')
        }
        fetch("http://localhost:8082/getimg", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
             body: JSON.stringify(user)
            })
            .then(res => res.json())
             .then(res => {
                 
        if(res.code=="img1")
        {
            document.getElementById("avtarselect").src=img1;
        }
        else if(res.code=="img2")
        {
            document.getElementById("avtarselect").src=img2;
        }
        else if(res.code=="img3")
        {
            document.getElementById("avtarselect").src=img3;
        }
        else if(res.code=="img4")
        {
            document.getElementById("avtarselect").src=img4;
        }
        else
        {
            document.getElementById("avtarselect").src=img5;
        }             
        });
            


        fetch("http://localhost:8082/checkadmin", {
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
             window.location=`/chat?username=${params.get('username')}`;
             }
             else
             {
                fetch("http://localhost:8082/adminname", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    })
                    .then(res => res.json())
                     .then(res => {
                         this.setState({username1:res.code})
                     });
             }
             });       
         setInterval(this.getmsg,1000);   
         setInterval(this.checkadmin,1000);     
         }

    componentWillUnmount()
    {
        console.log("component unmount called");
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        const user={
            name:params.get('username')
        }
        fetch("http://localhost:8082/deleteuser", {
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
         alert("User Not Deleted");
         }
         else
         {
         alert(`User Deleted SUCCESFULLY!!`);
         window.location=`/chat?username=${params.get('username')}`
         }
         });
    }
    checkadmin=()=>{
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
             if(res.code === 0)
             {
             window.location=`/chat?username=${params.get('username')}`;
             }
            })
    }
    addmsg=(e,msg)=>{
        e.preventDefault();
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        const user={
            name:params.get('username'),
            msg:msg
        }
        console.log(user);
        fetch("http://localhost:8082/addmsg", { 
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
             body: JSON.stringify(user)
            })
            .then(res => res.json())
             .then(res => {
             if(res.code===-1)
             {
                 alert('only admin can enter Messages');
             }
             else if(res.code === 0)
             {
             alert("Message Not Added");
             }
             else
             {
             alert(`Message Added SUCCESFULLY!!`);
             document.getElementById("message").value="";
             this.getmsg();
             }
             });

    }
    getmsg=()=>{
        console.log("getmsg")
        fetch("http://localhost:8082/getmsg", {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            },
            })
            .then(res => res.json())
             .then(res => {
                 console.log(res.code)
                 this.setState({msg:res.code})
             });
    }
    render()
    {
        return (
            <div class="chat">
            {console.log(this.state.msg)}
            <img src={this.props.img} id="avtarselect" class="imgs"/>
            <div class="chat__sidebar" id="sidebar">
            <h3 id="nname">{this.state.username1}</h3>
            </div>
            <div class="chat__main">
                <div  id="messages" class="chat__messages">
                {this.state.msg.map((i)=>{return <div>
                <p style={{color:"black"}}><span>{i.name}</span><span style={{marginLeft:"2%"}}>{i.date}</span></p>
                <p style={{color:"black"}}>{i.msg}</p>
                </div>})} </div>
                <div class="compose">
                    <form id="chatform">
                       
                        
                    <div class="input-group mb-3">
                            <input type="text"  class="form-control" placeholder="type your message..."  id="message" autocomplete="off"/>
                            <div class="input-group-append">
                                <input class="input-group-text" type="submit" id="send-button" onClick={(e)=>{this.addmsg(e,document.getElementById('message').value)}} id="messageBtn" style={{backgroundColor: "#b8d8fd"}}/>
                            </div>
                          </div>
                    </form>
               
                </div>
            </div>
        </div>
        )
    }
}
export default Chatopen;