    const User = require("../model/User")
    const bcrypt = require("bcrypt")
    const jwt = require("jsonwebtoken");
    const dashboardModel = require("../model/dashboard")
    exports.signup = async(req,res)=>{
    try {
        const {name,email,password,confirmPassword} = req.body
        if(!(name&&email&&password&&confirmPassword)){
            return res.status(400).json({message:"ALL fields are required"})
        }
        if(password!==confirmPassword){
            return res.status(400).json({message:"Password should match confirmpassword"})
        }
        const isUser = await User.findOne({email:email})
        if(isUser){
            return res.status(400).json({message:"User already exist please login"})
        }
            
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log("otp",otp)

        const hashedpassword = await bcrypt.hash(password,10)
        console.log("hashh",hashedpassword)
        const data = {
            name,
            email,
            password:hashedpassword,
            confirmPassword: hashedpassword
        }
        const user = await User.create(data)
        if(user){
            return res.status(202).json({message:"Signup successful",data})
        }
    } catch (error) {
            return res.status(202).json({message:`error hain bhai ${error}`})
    }
    }

exports.verifyOtp =  async(req,res)=>{
    const {email,otp} = req.body
    const user = await User.findOne({email:email})
    if(user.otp===otp){
        const token = jwt.sign(
            {id:user._id},
            "supersecretkey",
            {expiresIn:'7d'}
        )
        if(token){
            return res.status(202).json({message:"Otp verified , now you are logged in",token,
            user:{
            name:user.name,
            email:user.email,
        }
    })}
    }else{
            return res.status(202).json({message:"otp is not verified"})
        }
    
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const isUser = await User.findOne({ email })
        if (!isUser) {
            return res.status(400).json({ message: "User not registered, please signup first" })
        }

        const isMatch = await bcrypt.compare(password, isUser.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: isUser._id, email: isUser.email },
            "supersecretkey",
            { expiresIn: "7d" }
        )

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: isUser._id,
                email: isUser.email,
                name: isUser.name
            }
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

exports.dashboardAdd = async(req,res) => {
    const {title,contact,city,address} = req.body;
    if(!(title&&contact&&city&&address)){
        return res.status(400).json({
            message: "all input field are required"
        })
    }
    const data = {
        title,contact,city,address
    }
    const dashboardData = await dashboardModel.create(data);
    console.log("dashboardData",dashboardData);

    if(dashboardData){
        return res.status(202).json({
            message: "added",
            data
        })
    }
}

exports.dashboardList = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", status } = req.query;

    limit = Math.min(parseInt(limit), 10);
    page = parseInt(page);

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (status) {
      filter.status = status; 
    }

    const skip = (page - 1) * limit;

    const total = await dashboardModel.countDocuments(filter);

    const listData = await dashboardModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); 

    return res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: listData,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.dasshboardOne = async (req,res) => {
    const {id}=req.params;
    const oneData = await dashboardModel.findById(id);
    if(oneData){
        return res.status(202).send(oneData)
    }
}

exports.dashboardUpdate = async(req,res) => {
    const {id}=req.params;
    const {title,contact,city,address}=req.body;
    const data={
        title,contact,city,address
    }
    const updateData = await dashboardModel.findByIdAndUpdate(id,data);
    if(updateData){
        return res.status(202).send({
            message: "updated data",
            updateData
        })
    }
}

