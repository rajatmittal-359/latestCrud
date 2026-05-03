const express=require("express");
const route=express.Router();
const authcontroller = require("../controller/authController")

route.post("/signup",authcontroller.signup)
route.post("/login",authcontroller.login)
route.post("/verifyOtp",authcontroller.verifyOtp)
route.post("/add",authcontroller.dashboardAdd)
route.post("/list",authcontroller.dashboardList)
route.post("/dasshboardOne/:id",authcontroller.dasshboardOne)
route.put("/update/:id",authcontroller.dashboardUpdate)
module.exports = route;