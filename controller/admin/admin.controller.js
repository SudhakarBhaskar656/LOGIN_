const adminModel = require('../../models/admin/admin.model')
const { hashPassword, comparePassword } = require('../../utility/bcrypt')
const genrateToken = require('../../utility/jwt')

exports.adminSignup = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(401).json({
            messasge: "Email Password is Required"
        })
        const existingEmail = await adminModel.findOne({ email })
        if (existingEmail) return res.status(401).json({
            messasge: "email exist"
        })
        const hashedPassword = await hashPassword(password)
        const admin = new adminModel({ email, password: hashedPassword, role: "admin" })
        const adminData = await admin.save()
        res.status(200).json({
            success: true,
            details: adminData,
            message: "Admin Signup Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingEmail = await adminModel.findOne({ email });

        if (!existingEmail) {
            return res.status(401).json({ message: "User not Found" });
        }

        const isMatch = await comparePassword(password, existingEmail.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = genrateToken({
            id: existingEmail._id,   
            role: existingEmail.role 
        });

        res.cookie("AccessToken", token, {   
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.status(200).json({
            message: "Admin login successfully",
            tokenDetail: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.adminGet = async (req, res) => {
    try {
        const data = await adminModel.find()
        res.status(200).json({
            success: true,
            adminDetail: data,
            message:"All admin Data"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }



}

exports.adminDelete = async (req, res) => {
    try {
        const deleteData = await adminModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            deletedData: deleteData,
            message: "Admin has Been Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.adminUpdate = async (req, res) => {
    try {
        const update = req.body
        if (update.password) {
            update.password = await hashPassword(update.password)
        }
        const update_data = await adminModel.findByIdAndUpdate(req.params.id, update, { new: true })
        res.status(200).json({
            success: true,
            updated_data: update_data,
            message: "Admin detail Has Been Updated"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}

exports.authAdmin = (req , res)=>{
    try {

        if (req.user.role !== 'admin') {
            return res.status(400).json({ success: false, error: "Wrong user role." });
        }

        return res.status(200).json({ success: true, message: "Authentication successfully." });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
}