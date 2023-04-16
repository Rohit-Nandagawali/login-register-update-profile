const mongoose  = require("mongoose")
// mongoose.connect('mongodb://127.0.0.1:27017/internshala')
mongoose.connect(process.env.MONGO_URL)