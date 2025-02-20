const user = require("../models/user_schema");



const login = async (req, res) => {
    const { first_name, last_name, email, password, confirm_password } = req.body;
    if (!first_name || !last_name || !email || !password || !confirm_password) {
        return res.status(400).json({
            message: "error",
            status: 400,
            error: {
                message: "All field are required"
            }
        })
    }
    const email_check = /@./.test(email);
    if (!email_check) {
        return res.status(400).json({
            message: "error",
            status: 400,
            error: {
                message: "Email is not valid"
            }
        })
    }

    try {
        if (confirm_password === password) {
            const user_login = new user(req.body);
            console.log(req.body);
            const inserSave = await user_login.save();
            return res.json({
                message: "Success",
                status: 200,
                data: inserSave
            });
        } else {
            return res.status(400).json({
                message: "error",
                status: 400,
                error: {
                    message: "Confirm password must match password"
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "error",
            status: 400,
            error: {
                message: "User are already exist"
            }
        })
    }

}

module.exports = login;