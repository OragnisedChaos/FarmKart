const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
// Mongoose connection
const Product = require("./models/product");
const Farm = require("./models/farm");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Connection Error!!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//FARM ROUTES
app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms });
});

app.get("/farms/:id", async (req, res) => {
  const farm = await Farm.findById(req.params.id);
  res.render("farms/show", { farm });
});

app.get("/farms/:id/products/new", (req, res) => {
  const { id } = req.params;
  res.render("products/new", { catergories, id });
});

app.post("/farms/:id/products", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  const { name, price, catergory } = req.body;
  const product = new Product({ name, price, catergory });
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.send(farm);
});

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect("/farms");
});

//PRODUCT ROUTES
const catergories = ["fruit", "vegetable", "dairy", "meat"];

//Products home page
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

//Adding new Product
app.get("/products/new", (req, res) => {
  res.render("products/new", { catergories });
});
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

//Displaying Each Product
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});
// Editing the information of product
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, catergories });
});
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// Deleting Product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("App listening on 3000");
});
