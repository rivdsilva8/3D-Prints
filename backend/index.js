const port = 4000;
import express from "express";
const app = express();
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";

app.use(express.json());
app.use(cors());

// daatabase connection with MongoDB
mongoose.connect(
  `mongodb+srv://rivaldodsilva8:alro23ni@cluster0.ta5fggw.mongodb.net/3D-Prints`
);

//api creation
app.get("/", (req, res) => {
  res.send("Express app is Runnning");
});

// Image storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//creating upload endpoint

app.use("/images", express.static("upload/images"));

app.get("/upload", (req, res) => {
  res.json({
    message: "hello",
  });
});

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//schema for creating products

const Product = mongoose.model("Product", {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;

  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = parseInt(last_product.id) + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: parseInt(id),
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");

  res.json({
    success: true,
    name: req.body.name,
  });
});

//API for deleting products

app.post("/removeproduct", async (req, res) => {
  try {
    let product = await Product.findById(req.body._id);
    if (!product) {
      throw "no product with given id exsists";
    }
    let name = product.name;
    await Product.findOneAndDelete({ _id: req.body._id });
    console.log("Removed");
    res.json({
      success: true,
      name: name,
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

//route for getting all prods
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all products fetched");
  res.send(products);
});

//schema for user

const users = mongoose.model("users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating endpoint for creating user

app.post("/signup", async (req, res) => {
  console.log("req.body.email =" + req.body.email);
  let check = await users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, error: "existing user found with same email" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      _id: user._id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  let user = await users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;

    if (passCompare) {
      const data = {
        user: {
          _id: user._id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token: token });
    } else {
      res.json({
        success: false,
        errors: "2eiter email or password is incorrect",
      });
    }
  } else {
    res.json({
      success: false,
      errors: "1eiter email or password is incorrect",
    });
  }
});

//creating endpoint for newcollection data

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("new collection fetched");
  res.send(newcollection);
});

//creating endpoint for populat in women section
app.get("/popularinart", async (req, res) => {
  let products = await Product.find({ category: "art" });
  let popular_in_art = products.slice(0, 4);
  console.log("Popular in art fetched");
  res.send(popular_in_art);
});

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please login to start buying products" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "please login to start buying products" });
    }
  }
};

//endpoint for adding cart items
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("added", req.body.itemId);
  console.log(req.body, req.user);
  let userData = await users.findOne({ _id: req.user._id });
  console.log("userData=" + userData);
  userData.cartData[req.body.itemId] += 1;
  await users.findOneAndUpdate(
    { _id: req.user._id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

//endpoint for removing products from cartdata

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("in remove route");
  console.log("removed", req.body.itemId);
  let userData = await users.findOne({ _id: req.user._id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await users.findOneAndUpdate(
    { _id: req.user._id },
    { cartData: userData.cartData }
  );
  res.send("removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("get cart");
  let userData = await users.findOne({ _id: req.user._id });
  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("server Running on port " + port);
  } else {
    console.log("Error : " + error.message);
  }
});
