const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://harish:Harish21*@cluster0.zhducip.mongodb.net/EmployeeDB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require("./moviemodel");
