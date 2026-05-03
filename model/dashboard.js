const mongoose=require("mongoose");
const dashboardSchema = new mongoose.Schema({
    title: {
        type: String
    },
    contact: {
        type: Number
    },
    city: {
        type: String
    },
    address: {
        type: String
    }
},
{
    "timestamp": true
})

module.exports = mongoose.model("dashboard",dashboardSchema)