import express from 'express'
export const router = express.Router()
import {body, validationResult} from 'express-validator'
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config.js'
import fetchUser from '../middleware/fetchUser.js'
// Create User
router.post("/create/", [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Minimum length at least 3 characters').isLength({ min: 5 }),
    body('password', 'Minimum length at least 3 characters').isLength({ min: 3 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);

    // Check if user exists
    try {
        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }
        const secureSalt = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            email: req.body.email,
            password: secureSalt,
            name: req.body.name
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        console.log(user);
        return res.status(201).json({ msg: 'User created successfully',authToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/login/', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Minimum length at least 3 characters').isLength({ min: 3 })
], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try
    {
        let user = await User.findOne({
            email: req.body.email
        })
        if (user)
        {
            const passwordCompare = await bcrypt.compare(req.body.password, user.password)
            if (!passwordCompare){
                return res.status(400).json({msg:`Please login with correct credentials`})
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            return res.status(200).json({msg: "Login Success", authToken})
        }
        else
        {
            return res.status(400).json({msg:`Please login with correct credentials`})
        }

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
})

// get user details
router.get('/getuser/', fetchUser, async(req, res) =>{
    try{
        const userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.json(user).status(200)
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
} )
