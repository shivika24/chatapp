var con= require('./../dbconnection');

module.exports.adduser = async function(req,res){
    var users={
         "name":req.body.name,
         "type":"admin"
       }
       con.query("SELECT COUNT(*) AS cnt FROM users WHERE type = ? " , users.type , function(err , data){
        if(err){
            console.log(err); 
        }   
        else{
            console.log(data[0].cnt)
            if(data[0].cnt == 1){  

              con.query("SELECT COUNT(*) AS cnt FROM users WHERE name = ? " , users.name , function(err , data){
                if(err){
                    console.log(err); 
                }   
                else{
                  if(data[0].cnt==1)
                  {
                    if(req.body.img)
                    {
                    var q1="UPDATE users SET type='"+users.type+"',image='"+req.body.img+"'WHERE name='"+users.name+"'";
                    var query1 = con.query(q1, function(err, result) {  
                    if(err)
                    console.log(err)
                    else
                    return res.status(400).json({code:1});                    
                    })
                    }
                    else
                    {
                      var q1="UPDATE users SET type='"+"user"+"',image='"+req.body.img+"'WHERE name='"+users.name+"'";
                      var query1 = con.query(q1, function(err, result) {  
                        if(err)
                        console.log(err)
                        else
                        return res.status(400).json({code:1});      
                      })
                    }

                  }
                  else
                  {
                    if(req.body.img)
                var sql = "INSERT INTO `users` (`name`, `type`, `image`) VALUES ('" + users.name + "','" + "user" + "','" +req.body.img + "')";
                else
                var sql = "INSERT INTO `users` (`name`, `type`, `image`) VALUES ('" + users.name + "','" + "user" + "','" +" " + "')";
                var query = con.query(sql, function(err, result) {  
                  if (err) {
                    console.log(err);
                    return res.json({code:0});
                  } else {
                    return res.status(400).json({code:1});
                    }
                }); 
                  }
                }})              
            }
            else
            {
              con.query("SELECT COUNT(*) AS cnt FROM users WHERE name = ? " , users.name , function(err , data){
                if(err){
                    console.log(err); 
                }   
                else{
                  if(data[0].cnt==1)
                  {
                    if(req.body.img)
                    {
                    var q1="UPDATE users SET type='"+users.type+"',image='"+req.body.img+"'WHERE name='"+users.name+"'";
                    var query1 = con.query(q1, function(err, result) {  
                    if(err)
                    console.log(err)
                    else
                    return res.status(400).json({code:1});                    
                    })
                    }
                    else
                    {
                      var q1="UPDATE users SET type='"+"user"+"',image='"+req.body.img+"'WHERE name='"+users.name+"'";
                      var query1 = con.query(q1, function(err, result) {  
                        if(err)
                        console.log(err)
                        else
                        return res.status(400).json({code:1});      
                      })
                    }

                  }
                  else
                  {
                    if(req.body.img)
                var sql = "INSERT INTO `users` (`name`, `type`, `image`) VALUES ('" + users.name + "','" + "admin" + "','" +req.body.img + "')";
                else
                var sql = "INSERT INTO `users` (`name`, `type`, `image`) VALUES ('" + users.name + "','" + "admin" + "','" +" " + "')";
                var query = con.query(sql, function(err, result) {  
                  if (err) {
                    console.log(err);
                    return res.json({code:0});
                  } else {
                    return res.status(400).json({code:1});
                    }
                }); 
                  }
                }}) 
            }
        }
        })
                 
  }

  module.exports.checkuser = async function(req,res){
    var users={
         "name":req.body.name,
       }
       con.query("SELECT COUNT(*) AS cnt FROM users WHERE name = ? " , users.name , function(err , data){
        if(err){
            console.log(err);  
        }   
        else{
            console.log(data[0].cnt)
            if(data[0].cnt == 1){  
                return res.status(400).json({code:0});
            }
            else
            {
             return res.status(400).json({code:1}); 
            }
        }
        })
                 
  }

  module.exports.deleteuser = async function(req,res){
    var users={
         "name":req.body.name,
       }
       con.query("DELETE FROM users WHERE name = ? " , users.name , function(err , data){
        if(err){
            console.log(err)
            return res.status(400).json({code:0}); 
        }   
        else{
             return res.status(400).json({code:1}); 
        }
        })
                 
  }
  module.exports.checktype = async function(req,res){
    var users={
         "name":req.body.name,
       }
       console.log(users) 
       con.query("SELECT * FROM users WHERE name = ? " , users.name , function(err , data){
        if(err){
            console.log(err);  
        }   
        else{
            if(data[0].type==="admin") 
            {
                return res.status(400).json({code:1});
            }
            else
            return res.status(400).json({code:0});
        }
        })
                 
  }

  module.exports.deleteuser = async function(req,res){
    var users={
         "name":req.body.name,
       }
       con.query("DELETE FROM users WHERE name = ? " , users.name , function(err , data){
        if(err){
            console.log(err)
            return res.status(400).json({code:0}); 
        }   
        else{
             return res.status(400).json({code:1}); 
        }
        })
                 
  }

  
  module.exports.adminname = async function(req,res){
    var users={
         "type":"admin",
       }
       con.query("SELECT * FROM users WHERE type = 'admin'" , users.type , function(err , data){
        if(err){
            console.log(err); 
        }   
        else{
            console.log(data[0].name)
            return res.status(400).json({code:data[0].name});
        }
        })
                 
  }
  module.exports.addmsg = async function(req,res){
    var d=new Date().toISOString().slice(0, 19).replace('T',' ');
    var users={
         "name":req.body.name,
         "msg":req.body.msg,
         "date":d
       }
       var s1="SELECT type FROM users WHERE name='"+users.name+"'";
       var query = con.query(s1, function(err, result) {  
        if (err) {
          return res.status(400).json({code:0});
        } else {
          if(result[0].type==="admin")
          {
            var sql = "INSERT INTO `post`(`name`,`msg`,`date`) VALUES ('" + users.name + "','" + users.msg + "','" + users.date  +"')";
              var query = con.query(sql, function(err, result) {  
                if (err) {
                  return res.status(400).json({code:0});
                } else {
                  return res.status(400).json({code:1});
                  }
              });         

          }
          else
          {
            return res.status(400).json({code:-1});
          }
          }
      });  
    
              
            
  }
  module.exports.getmsg = async function(req,res){
              var sql = "SELECT * FROM post";
              var query = con.query(sql, function(err, result) {  
                if (err) {
                  return res.status(400).json({code:0});
                } else {
                  return res.status(400).json({code:result});
                  }
              });         
            
  }

  module.exports.checkadmin = async function(req,res){
    var users={
         "type":"admin",
       }
       con.query("SELECT COUNT(*) AS cnt FROM users WHERE type = ? " , users.type , function(err , data){
        if(err){
            console.log(err);  
        }   
        else{
            if(data[0].cnt == 0){  
                return res.status(400).json({code:0});  
            }
            else
            {
             return res.status(400).json({code:1}); 
            }
        }
        })
                 
  }

  module.exports.updateimg = async function(req,res){
    var users={
         "img":req.body.img,
         "type":"admin",
         "name":req.body.name
       }
       con.query("UPDATE `users` SET `image`='"+users.img+"',`type`='"+users.type+"' WHERE `name`='"+users.name+"'", function(err , data){
        if (err) {
          console.log(err);
          return res.json({code:0});
        } else {
          return res.send("updated");
          } 
      });
    }

    module.exports.getimage = async function(req,res){
      var img="";
      var users={
         "name":req.body.name,
         "type":"admin"
         }
         console.log(users)
         con.query("SELECT * FROM users WHERE type = ? " , users.type , function(err , data){
          if(err){
              console.log(err);  
          }   
          else{
            con.query("SELECT * FROM users WHERE name = ? " , data[0].name , function(err , data){
              if(err){
                  console.log(err);  
              }   
              else{
                return res.json({code:data[0].image});
              }
              }) 
          }
          })
        
                   
    }