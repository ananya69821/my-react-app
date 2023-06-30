// To connect with your mongoDB database
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ananyasakshi1997:OHmhbOpExEIBBGx8@cluster0.7hreybo.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to yourDB-name database');
  } catch (err) {
    console.error(err);
  }
};
connectDB();

// Schema for users of app
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");

console.log("App listen at port 5001");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('users', UserSchema);
User.createIndexes();

app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
});

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }

  } catch (e) {
    console.log(e)
    resp.send("Something Went Wrong");
  }
});

app.listen(5001);
