const userModel = require('../../models/user/user.model')
const genrateToken = require('../../utility/jwt')
const { hashPassword, comparePassword } = require('../../utility/bcrypt')

exports.userSignup = async (req, res) => {

    try {
        const { firstname, lastname, email, phone, country, address, state,pin, password, confirm_password } = req.body

        if (
            !email ||! phone) return res.status(401).json({
            message: "Email and Phone are Mendentory Fields"
        })

          if (password !== confirm_password) {
            return res.status(400).json({
                message: "Password and Confirm Password do not match"
            });
        }

        const existingEmail = await userModel.findOne({ email })
        const existingPhone = await userModel.findOne({ phone })
        if (existingEmail || existingPhone) return res.status(401).json({
            message: "Email or Phone is Already Registered"
        })
        const hashedPassword = await hashPassword(password)
        const user = new userModel({
            firstname,
            lastname,
            email,
            phone,
            country,
            address,
            state,
            pin,
            password: hashedPassword,
            role: "User"
        })
        const userData = await user.save()
        res.status(200).json({
            success: true,
            userInfo: userData,
            message: "User Signup"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}

/*exports.userLogin=async (req,res) => {
    try {
        const {email,phone,password}=req.body
        const existingEmail=await userModel.findOne({email})
        const existingPhone=await userModel.findOne({phone})
        if(!existingEmail||!existingPhone)return res.status(401).json({
            message:"USer not Found"
        })
        const ismatach=await comparePassword(password,existingEmail.password || existingPhone.password)
        if (!ismatach) return res.status(401).json({
            message: "invaild password"
        })
        const token = genrateToken({
            id:existingEmail._id||existingPhone._id,
            role:"user"
        })

         res.status(200).json({
            message: "User Login Successfully",
            tokenDetail:token
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
}*/


exports.userLogin = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        // find user by email OR phone
        const user = await userModel.findOne({
            $or: [{ email }, { phone }]
        });

        if (!user) {
            return res.status(401).json({ message: "User not Found" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = genrateToken({
            id: user._id,
            role: user.role   // ✅ use DB role
        });

        res.cookie("AccessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ dev/prod safe
            sameSite: 'none'
        });

        return res.status(200).json({
            message: "User Login Successfully",
            tokenDetail: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.userGet=async (req,res) => {
    try {
         const userData= await userModel.find()
    res.status(200).json({
        success:true,
        userinfo:userData,
        message:"All User Details"
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
   

}

exports.userDelete=async (req,res) => {

    try {
         const userData=await userModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        userDeleted:userData,
        message:"Deleted User Info"
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
   
}

exports.userUpdate=async (req,res) => {
    try {
       const update=req.body
       if(update.password){
        update.password=await hashPassword(update.password)
       }
       const update_data=await userModel.findByIdAndUpdate(req.params.id,update,{new:true})
       res.status(200).json({
        success:true,
        updated_data:update_data,
        message:"User detail Has Been Updated"
       })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


