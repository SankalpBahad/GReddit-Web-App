// import express, { response } from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bcrypt from 'bcrypt'

// import User from "./models/User.js";
// import Post from "./models/Posts.js";
// import Subg from "./models/Subg.js";
// import Saved from "./models/SavedPost.js";
// import Report from "./models/Report.js";


let User = require("./models/User");
let Post = require("./models/Posts");
let Subg = require("./models/Subg");
let Saved = require("./models/SavedPost");
let Report = require("./models/Report");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();
//import routes
// const authRoutes = require("./routes/user");
// const { db } = require("./models/User");
//app
const app = express();

app.use(express.json())
app.use(cors());
// db
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://Sankalp:J8jOCgiUjISeeBtH@cluster1.ozgj0tw.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("DB Connected"));
//middlewares
// app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  // console.log("post request from /login")
  User.find((err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      // console.log(data);
      res.send(data)
    }
  })
  //   try {
  //     const uname=req.body.uname;
  //     const passwd=req.body.passwd;
  //     const user = await User.findOne({ uname })
  //     const match = await user.checkPassword(passwd)
  //     if (match) {
  //       const token = user.generateToken();
  //       return res.send({ token })
  //     }

  //   }
  //   catch {
  // res.send("fail")
  //   }

})

app.post("/blockafterreport", (req, res) => {
  const user = req.body.user;
  const subgid = req.body.subgid;
  Subg.find({ _id: subgid }, function (err, data) {
    if (err) { }
    else {
      Subg.updateOne({ _id: subgid },
        { $pull: { nonblocked: user } },
        function (err4, data4) {
          if (err) { }
          else {
            // console.log("Join Request sent, please wait for the user to accept it.")
            // res.send("Join Request sent, please wait for the moderator to accept it.")
            Subg.updateOne({ _id: subgid },
              { $push: { blocked: user } },
              function (err4, data4) {
                if (err) { }
                else {
                  // console.log("Join Request sent, please wait for the user to accept it.")
                  // res.send("Join Request sent, please wait for the moderator to accept it.")
                }
              })
          }
        })
    }
  })
})


app.post("/deletepostafterreport", (req, res) => {
  const postid = req.body.postid;
  console.log(postid)
  const subgid = req.body.subgid;
  Post.findOneAndRemove({ _id: postid },
    function (err2, data2) {
      if (err2) { console.log(err2) }
      else {
        console.log("post deleted")
        // res.send("Join Request sent, please wait for the moderator to accept it.")
      }
    })
  Report.deleteOne({ postid: postid },
    function (err4, data4) {
      if (err4) { console.log(err4) }
      else {
        console.log("report removed")
        // res.send("Join Request sent, please wait for the moderator to accept it.")
      }
    })
  Saved.deleteOne({ postid: postid },
    function (err4, data4) {
      if (err4) { console.log(err4) }
      else {
        console.log("report removed")
        // res.send("Join Request sent, please wait for the moderator to accept it.")
      }
    })
  Subg.findOne({ _id: subgid }, function (err3, data3) {
    if (err3) { }
    else {
      let val = data3.posts
      val = val - 1
      Subg.updateOne({ _id: subgid }, { posts: val }, function (err5, data5) {
        if (err5) { }
        else { }
      })
    }
  })
}
)

// app.get('/register',(req,res)=>{
//   // res.send("")
//   console.log("get request from /register")
// })

app.post('/register', async (req, res) => {
  const { first_name, last_name, user_name, email, contactnumber, age, password } = req.body;
  const salt = await bcrypt.genSalt();
  const user = new User({ first_name, last_name, user_name, email, contactnumber, age, password });
  user.password = await bcrypt.hash(user.password, salt)
  await user.save();
  // console.log("post request from /register");
  res.send(user)
})

app.post('/newsubgrdform', async (req, res) => {
  const { creator, followers, posts, subgrdname, subgrddesc,tags, bannedkeys } = req.body;
  const user = new Subg({ creator, followers, posts, subgrdname, subgrddesc,tags, bannedkeys });
  await user.save();
  // console.log("post request from /newsubgrdform");
  // console.log(user);
  res.send(user)
})

// app.use("/login", loginrouter)
// app.use("/register", registerrouter)
// app.use("/newsubgrrediit", newsubgrrouter)

app.post("/follow", async (req, res) => {
  const by = req.body.username;
  // console.log(req.body);
  // console.log(by)
  const to = req.body.poster;
  User.findOne({ user_name: by }, function (err, data) {
    if (err) { }
    else {
      if ((data.following).includes(to)) {
        res.send("You have already followed this user")
      }
      else {
        User.updateOne(
          { user_name: to },
          { $push: { followers: by } },
          function (error, success) {
            if (error) {
              // console.log(error);
            } else {
              // console.log(success);
            }
          }
        );
        User.updateOne(
          { user_name: by },
          { $push: { following: to } },
          function (error, success) {
            if (error) {
              // console.log(error);
            } else {
              // console.log(success);
            }
          }
        );
        res.send("Followed successfully!!")
      }
    }
  })
})

app.post("/leave", (req, res) => {
  const subgid = req.body.id;
  const usr = req.body.user;
  User.findOne({ user_name: usr }, function (err, data) {
    if (err) { }
    else {
      Subg.findOne({ _id: subgid }, function (err2, data2) {
        if (err) { }
        else {
          Subg.updateOne({ _id: subgid },
            { $push: { left: data.user_name } },
            function (err3, data3) {
              if (err) { }
              else {
                // console.log("Join Request sent, please wait for the user to accept it.")
                // res.send("Join Request sent, please wait for the moderator to accept it.")
              }
            })
          Subg.updateOne({ _id: subgid },
            { $pull: { nonblocked: data.user_name } },
            function (err4, data4) {
              if (err) { }
              else {
                // console.log("Join Request sent, please wait for the user to accept it.")
                // res.send("Join Request sent, please wait for the moderator to accept it.")
              }
            })
          let val = data2.followers
          val = val - 1
          Subg.updateOne({ _id: subgid },
            { followers: val },
            function (err4, data4) {
              if (err) { }
              else {
                // console.log("Join Request sent, please wait for the user to accept it.")
                // res.send("Join Request sent, please wait for the moderator to accept it.")
              }
            })
        }
      })
    }
  })
})

app.post("/joinrequest", async (req, res) => {
  const id = req.body.id
  const user = req.body.user
  User.findOne({ user_name: user }, function (err, data) {
    if (err) { }
    else {
      Subg.findOne({ _id: id }, function (err2, data2) {
        if ((data2.joinreqs).includes(user)) {
          res.send("Request already sent, Please wait for the moderator to accept your request")
        }
        else {
          if (data2.left.includes(user)) {
            return res.send("You have already left this subgreddiit, you can't rejoin it")
          }
          if (data2.blocked.includes(user)) {
            return res.send("You are not allowed to join this subgreddiit")
          }
          Subg.updateOne({ _id: id },
            { $push: { joinreqs: data } },
            function (err3, res2) {
              if (err) { }
              else {
                // console.log("Join Request sent, please wait for the user to accept it.")
                res.send("Join Request sent, please wait for the moderator to accept it.")
              }
            })
        }
      })
    }
  })

})

app.post("/joinreqdata", async (req, res) => {
  const id = req.body.id
  Subg.findOne({ _id: id }, function (err, data) {
    if (err) { }
    else {
      res.send(data.joinreqs)
      // console.log(data.joinreqs)

    }
  })
})

app.post("/acceptjoinreq", async (req, res) => {
  const id = req.body.id
  const user = req.body.uname
  let value = 0
  User.findOne({ user_name: user }, function (err, data) {
    if (err) { }
    else {
      // console.log(data)
      Subg.findOne({ _id: id }, function (err2, data2) {
        if (err2) { }
        else {
          Subg.updateOne({ _id: id },
            { $push: { nonblocked: data.user_name } },
            function (err3, res1) {
              if (err3) { }
              else {
                // console.log("Push")
                // console.log(data)
                // res.send("Join Request sent, please wait for the moderator to accept it.")
              }
            })
          Subg.updateOne({ _id: id },
            { $pull: { joinreqs: data } },
            function (err4, res2) {
              if (err4) { }
              else {
                // console.log("Pull")
                // console.log(data)
                // res.send("Join Request sent, please wait for the moderator to accept it.")
              }
            })
          // console.log(data2)
          let val = data2.nonblocked.length + 1
          // console.log("bef",val)
          val = val + 1
          // console.log("aft",val)
          Subg.updateOne({ _id: id }, { followers: val }, function (err5, data8) {
            if (err5) { }
            else { }
          })
        }
      })
    }
  })
})

app.post("/rejectjoinreq", async (req, res) => {
  const id = req.body.id
  const user = req.body.uname
  User.findOne({ user_name: user }, function (err, data) {
    if (err) { }
    else {
      Subg.findOne({ _id: id }, function (err, data2) {
        if (err) { }
        else {
          Subg.updateOne({ _id: id },
            { $pull: { joinreqs: data } },
            function (err4, res2) {
              if (err4) { }
              else {
                // console.log("Pull")
                // console.log(data)
                // res.send("Join Request sent, please wait for the moderator to accept it.")
              }
            })
        }
      })
    }
  })
})

app.post("/usersdata", async (req, res) => {
  const id = req.body.id
  Subg.findOne({ _id: id }, function (err, data) {
    if (err) { }
    else { res.send(data.nonblocked) }
  })
})

app.post("/blockedusersdata", async (req, res) => {
  const id = req.body.id
  Subg.findOne({ _id: id }, function (err, data) {
    if (err) { }
    else { res.send(data.blocked) }
  })
})

app.post("/update", async (req, res) => {
  const { fname, lname, uname, cno, age, id } = req.body;
  // console.log(fname, lname, uname, cno, age, id)
  User.findOne({ _id: id }, async function (err, data) {
    if (err) { console.log(err) }
    else {
      // console.log(data)
      User.updateOne({ _id: id }, {
        first_name: fname,
        last_name: lname,
        user_name: uname,
        contactnumber: cno,
        age: age,
      }, function (err2, data2) {
        if (err2) { }
        else { res.send("Update Successful") }
      })
    }
  })
})

app.post("/removefollower", (req, res) => {
  const usr = req.body.usrname;
  const foller = req.body.target;
  // console.log(usr,"    ",foller);
  User.findOne({ user_name: usr }, function (err, data) {
    if (err) { }
    else {
      if ((data.followers).includes(foller)) {
        User.updateOne(
          { user_name: usr },
          { $pull: { followers: foller } },
          function (error, success) {
            if (error) {
              // console.log(error);
            } else {
              // console.log(success);
            }
          }
        );
        User.updateOne(
          { user_name: foller },
          { $pull: { following: usr } },
          function (error, success) {
            if (error) {
              // console.log(error);
            } else {
              // console.log(success);
            }
          }
        );
      }
      else { }
    }
  })

})

app.post("/stopfollowing", (req, res) => {
  const usr = req.body.usrname;
  const folling = req.body.target;
  // console.log(usr,"    ",folling);
  User.findOne({ user_name: usr }, function (err, data) {
    if (err) { }
    else {
      if ((data.following).includes(folling)) {
        User.updateOne(
          { user_name: usr },
          { $pull: { following: folling } },
          function (error, success) {
            if (error) {
              // console.log(error);
            } else {
              // console.log(success);
            }
          }
        );
        User.updateOne(
          { user_name: folling },
          { $pull: { followers: usr } },
          function (error, success) {
            if (error) {
              // console.log(error);
            } else {
              // console.log(success);
            }
          }
        );
      }
      else { }
    }
  })

})

app.post("/getuserdata", async (req, res) => {
  const uname = req.body.val;
  // console.log(uname)
  const details = await User.findOne({
    user_name: uname
  })
  // console.log(details)
  res.send({ details: details });
});

app.post("/getsubgdata", async (req, res) => {
  const uname = req.body.val;
  // console.log(uname)

  const details = await User.findOne({
    user_name: uname
  })
  // console.log(details)
  res.send({ details: details });
});

app.post("/upvote", async (req, res) => {
  const id = req.body.e;
  let value = 0
  // console.log(id)
  Post.find({ _id: id }, (err, data) => {
    if (err) { }
    else {
      // console.log(data)
      value = data[0].upvotes
      value = value + 1
      // console.log(value)
      Post.updateOne({ _id: id }, { upvotes: value }, function (err2, data2) {
        if (err2) { }
        else { }
      })
      Saved.updateOne({ postid: id }, { upvotes: value }, function (err3, data3) {
        if (err3) { }
        else { }
      })
      // data.upvotes=data.upvotes+1
      // console.log(data)
    }
  })
})
// console.log(value)



app.post("/downvote", async (req, res) => {
  const id = req.body.e;
  let value = 0
  // console.log(id)
  Post.find({ _id: id }, (err, data) => {
    if (err) { }
    else {
      // console.log(data)
      value = data[0].downvotes
      value = value + 1
      // console.log(value)
      Post.updateOne({ _id: id }, { downvotes: value }, function (err2, data2) {
        if (err2) { }
        else { }
      })
      Saved.updateOne({ postid: id }, { downvotes: value }, function (err3, data3) {
        if (err3) { }
        else { }
      })
      // data.upvotes=data.upvotes+1
      // console.log(data)
    }
  })
})

app.post("/getallsubgs", async (req, res) => {
  Subg.find((err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      // console.log(data);
      res.send(data)
    }
  })
})

app.post("/getmysubgs", async (req, res) => {
  const val = req.body.val;
  Subg.find({ creator: val }, (err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      // console.log(data);
      res.send(data)
    }
  })
})

app.post("/getsubgrddata", async (req, res) => {
  const data = await Subg.findById(req.body.id)
  // console.log(data)
  res.send({ data: data })
})

app.post("/getsubgrdname", async (req, res) => {
  const data = await Subg.findById(req.body.id)
  console.log(data[0].subgrdname)
  res.send({ name: data[0].subgrdname })
})


app.post("/deletesubgr", (req, res) => {
  const id = req.body.subgrdid;
  // console.log("deletesubgr")
  // console.log(name)
  Subg.deleteOne({ subgrdid: id }, function (err, data) {
    if (err) { }
    else {
      Post.deleteMany({ subgrdid: id }, function (err2, data2) {
        if (err2) { }
        else { console.log("Done fron posts") }
        // console.log("YES")
      })
      Saved.deleteMany({ subgrdid: id }, function (err3, data3) {
        if (err3) { }
        else { console.log("Done from saved") }
        // console.log("YES")
      })
    }
  })
  // console.log("deleted")
})

app.post("/deletefromsaved", (req, res) => {
  const id = req.body.id
  console.log(id)
  Saved.deleteOne({ _id: id }, function (err3, data3) {
    if (err3) { }
    else { console.log("Done from saved") }
    // console.log("YES")
  })
})
// app.post("/deleteallposts", async (req, res) => {
//   // console.log(req)
//   const id = req.body.subgrdid
//   // console.log(id)
//   // // console.log("deletesubgr")
//   // // console.log(name)
//   // await Post.deleteAll({ subgrdid: id })
//   // // console.log("deleted")
//   Post.deleteMany({ subgrdid: id }, function (err, data) {
//     // console.log("YES")
//   })
// })

app.post("/getallposts", async (req, res) => {
  const id = req.body.id;
  // console.log(id);
  // console.log("post request to /getallposts")
  // const data = await Post.findOne({
  //   subgrdid:id
  // })
  // console.log(data)
  // res.send({data:data})
  Post.find({ subgrdid: id }, (err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      // console.log(data);
      res.send(data)
    }
  }
  )
})

app.post("/savedposts", async (req, res) => {
  const { user, posted_by, posted_in, posttext, upvotes, downvotes, comments } = req.body
  const savedpost = new Saved({ user, posted_by, posted_in, posttext, upvotes, downvotes, comments });
  await savedpost.save();

})

app.post("/getsavedposts", async (req, res) => {
  const username = req.body.name
  // console.log(req.body.name);
  Saved.find({ username: req.body.name }, (err, data) => {
    if (err) { }
    else {
      console.log(data)
      res.send(data)
      //   if (data[0]) {
      //     const id = data[0].postid;
      //     // console.log(data[0].subgrdname)
      //     // console.log(id)
      //     Post.find({ _id: id }, function (err2, data2) {
      //       if (err) { }
      //       else {
      //         console.log(data2)
      //         res.send(data2)
      //       }
      //     })
      //   }
    }
  })
})

app.post("/getpost", async (req, res) => {
  const id = req.body.id;
  // console.log(id)
  const data = await Post.findOne({ _id: id });
  // console.log(data);
  res.send({ data: data });
})

app.post("/newpost", async (req, res) => {
  const { poster, subgrdid, subgrdname, posttext, upvotes, downvotes } = req.body;
  const post = new Post({ poster, subgrdid, subgrdname, posttext, upvotes, downvotes });
  await post.save();
  Subg.find({ _id: subgrdid }, function (err, data) {
    if (err) { }
    else {
      let val = data[0].posts
      console.log(val)
      val = val + 1
      Subg.updateOne({ _id: subgrdid }, { posts: val }, function (err2, data2) {
        if (err) { }
        else { }
      })
    }
  })
  // console.log("post request from /newpost")
})

app.post("/togglevisibility", (req, res) => {
  const id = req.body.id;
  Report.findOne({ _id: id }, function (err, data) {
    // console.log(data)
    let val = data.visibility;
    // console.log("before",val)
    if (val == true) { val = false }
    else { val = true }
    // console.log(val)
    Report.updateOne({ _id: id }, { visibility: val }, function (err2, data2) {
      if (err) { }
      else { }
    })
  })
})

app.post("/newreport", async (req, res) => {
  const { subgid, postid, posttext, reported_by, reported_user, concern, visibility } = req.body;
  // console.log(subgid,postid,reported_by,reported_user,concern)
  const report = new Report({ subgid, postid, posttext, reported_by, reported_user, concern, visibility });
  await report.save();
})

app.post("/getallreports", (req, res) => {
  Report.find({ subgid: req.body.subgid }, (err, data) => {
    if (err) { }
    else { res.send({ data: data }) }
  })
})

app.post("/addcomment", (req, res) => {
  const id = req.body.id
  const user = req.body.commenter
  const matter = req.body.comment
  // console.log(matter)
  Post.find({ _id: id }, function (err, data) {
    if (err) { }
    else {
      Post.updateOne({ _id: id },
        { $push: { comments: { user, matter } } },
        function (err2, data2) {
          if (err) { }
          else { console.log(data2) }
        })
    }
  })
  Saved.find({ postid: id }, function (err, data) {
    if (err) { }
    else {
      Saved.updateOne({ postid: id },
        { $push: { comments: { user, matter } } },
        function (err2, data2) {
          if (err) { }
          else { console.log(data2) }
        })
    }
  })
})

// app.post("/login",(req,res)=>{
//   console.log("yesssss")
// })
//routes middleware
// app.use("/api", authRoutes);
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
});
