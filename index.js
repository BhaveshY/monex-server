const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://vipulrpatil:onayeinsaan@leveling.b4twip1.mongodb.net/monex?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to DB");
    app.listen(3333, () => console.log("Server listening on port 3333."));
  })
  .catch((err) => console.log(err));

const Blog = require("./models/blog");
const Transaction = require("./models/transaction");
const User = require("./models/user");
const { request } = require("http");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});


app.get("/transactions/:user/:top(\\d+)", (req, res) => {
  Transaction.find({ user: req.params.user })
    .sort({ createdAt: -1 })
    .limit(req.params.top)
    .then((result) => {
      res.send({ success: true, result });
    })
    .catch((err) => console.log(err));
});
app.get("/transactions/:user/all", (req, res) => {
  Transaction.find({ user: req.params.user })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send({ success: true, result });
    })
    .catch((err) => {
      console.log(err)
      res.send({ success: false, error:err });
    }
    );
});
app.post("/transaction/delete", async (req, res) => {
  let transactionId = req.body.transactionId
  let userId = req.body.userId
  let transaction = await Transaction.findById(transactionId);
  if(transaction){ 
    Transaction.deleteOne({ _id: transactionId })
    .then(async (result) => {
      const user = await User.findByFirebaseId(userId);
      console.log(user.balance.toString(),'u')
      console.log(parseFloat(user.balance),'u',parseFloat(transaction.amount))
      if(transaction.type){
        user.balance =  parseFloat(user.balance) -  parseFloat(transaction.amount)
      }else{
          user.balance =  parseFloat(user.balance) +  parseFloat(transaction.amount)
      } 
      await user.save();
      console.log(result)
      res.send({ success: true, result });
    })
    .catch((err) => console.log(err));
  }
  
});

app.get("/balance/:user", (req, res) => {
  User.findOne({ firebaseId: req.params.user })
    .then((result) => {
      res.send({ success: true, result });
    })
    .catch((err) => console.log(err));
});
app.post("/register", (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  user
    .save()
    .then((result) => {
      res.send({ success: true, result });
    })
    .catch((err) => console.log(err));
});
app.post("/transaction", (req, res) => {
  const transaction = new Transaction(req.body);
  transaction
    .save()
    .then((result) => {
      res.send({ success: true, result });
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
