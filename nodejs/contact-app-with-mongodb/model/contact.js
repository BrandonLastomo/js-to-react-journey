// module prep
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/student-datas");
const Data = mongoose.model("Data", {
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default Data;

// const student = new Data({
//   name: "baron",
//   phone: "085711119999",
//   email: "baron@gmail.com",
// });
// student.save().then((data) => console.log(data));
