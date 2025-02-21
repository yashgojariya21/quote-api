// const user = require("../models/user_schema");

// const login = async (req, res) => {


//     const { first_name, last_name, email, password, confirm_password } = req.body;
//     if (!first_name || !last_name || !email || !password || !confirm_password) {
//         return res.status(400).json({
//             message: "error",
//             status: 400,
//             error: {
//                 message: "All field are required"
//             }
//         })
//     }
//     const email_check = /@./.test(email);
//     if (!email_check) {
//         return res.status(400).json({
//             message: "error",
//             status: 400,
//             error: {
//                 message: "Email is not valid"
//             }
//         })
//     }

//     try {
//         if (confirm_password === password) {
//             const user_login = new user(req.body);
//             console.log(req.body);
//             const inserSave = await user_login.save();
//             return res.json({
//                 message: "Success",
//                 status: 200,
//                 data: inserSave
//             });
//         } else {
//             return res.status(400).json({
//                 message: "error",
//                 status: 400,
//                 error: {
//                     message: "Confirm password must match password"
//                 }
//             })
//         }
//     } catch (error) {
//         res.status(400).json({
//             message: "error",
//             status: 400,
//             error: {
//                 message: "User are already exist"
//             }
//         })
//     }
// }

// const data = async (req, res) => {
//     try {
//         const getData = await user.find({});
//         res.status(200).json({
//             message: "Data fetched successfully",
//             status: 200,
//             data: getData
//         });
//     } catch (error) {
//         console.log(error);

//     }
// }

// module.exports = { login, data };

const User = require("../models/user_schema");
const { body, validationResult } = require("express-validator");

const login = async (req, res) => {
    try {
        // Input validation using express-validator
        await Promise.all([
            body("first_name").notEmpty().withMessage("First name is required").run(req),
            body("last_name").notEmpty().withMessage("Last name is required").run(req),
            body("email").isEmail().withMessage("Invalid email format").run(req),
            body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters").run(req),
            body("confirm_password").custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Confirm password must match password");
                }
                return true;
            }).run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "error",
                status: 400,
                errors: errors.array()
            });
        }

        const { first_name, last_name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "error",
                status: 400,
                error: { message: "User already exists" }
            });
        }

        // Save new user
        const newUser = new User({ first_name, last_name, email, password });
        const savedUser = await newUser.save();

        return res.status(201).json({
            message: "Success",
            status: 201,
            data: savedUser
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "error",
            status: 500,
            error: { message: "Internal server error" }
        });
    }
};

const data = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude password field
        return res.status(200).json({
            message: "Data fetched successfully",
            status: 200,
            data: users
        });
    } catch (error) {
        console.error("Data Fetch Error:", error);
        return res.status(500).json({
            message: "error",
            status: 500,
            error: { message: "Failed to fetch data" }
        });
    }
};

module.exports = { login, data };
