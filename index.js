const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then((er) => console.log("Server is connected"))
  .catch((e) => console.log(e));

let express = require("express");

let alldata = require("./alldata.json");

let app = express();

const { v4: uuidv4 } = require("uuid");

app.use(express.json());

// allproduct
app.get("/alldata", function (req, res) {
  res.send(alldata);
});

// A  product
app.get("/Aproduct/:id", (req, res) => {
  let oneproduct = alldata.find((d) => {
    return d.id === req.params.id;
  });
  res.send(oneproduct);
});

// A new Product
app.post("/newproduct", (req, res) => {
  let final = {
    id: uuidv4(),
    name: req.body.name,
    age: req.body.age,
    salary: req.body.salary,
    Email: req.body.Email,
  };

  alldata.push(final);
  res.send(final);
});

// update a product

app.put("/updateaproduct/:id", (req, res) => {
  let index = alldata.findIndex((e) => {
    return e.id === req.params.id;
  });

  if (index === -1) {
    res.status(404).send({
      message: "This is not valid id",
    });
  }

  alldata[index] = req.body.name;
  alldata[index] = req.body.age;
  alldata[index] = req.body.salary;
  alldata[index] = req.body.Email;

  res.send({
    products: alldata[index],
  });
});

// delete a product

app.delete("/delete/:id", (req, res) => {
  let index = alldata.findIndex((e) => {
    return e.id === req.params.id;
  });

  if (index === -1) {
    res.status(404).send({
      message: "This is is not valid",
    });
  } else {
    let final = alldata.splice(index, 1);
    res.send(final);
  }
});

app.listen(3000, function (e) {
  console.log("Server is Running");
});
