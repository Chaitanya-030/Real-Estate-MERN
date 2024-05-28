import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // it is used to save the hashed password in the database
    // moreover it is already using "sync" in the function itself, so no need to use await for this

    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save(); // as this saving takes few seconds, we will use await as to stay in this line until its complete
        res.status(201).json('User created successfully!');
    } catch(err) {
        next(err);
    }
};


export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email}); // finds an email in the database
        if(!validUser) return next(errorHandler(404, 'User not found!'));

        const validPassword = bcryptjs.compareSync(password, validUser.password); // we need to compare the normal password with the hashed password stored in the database
        if(!validPassword) return next(errorHandler(401, 'Incorrect credential!'));

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password: pass, ...rest} = validUser._doc; // as the password we see is in the validUser._doc and not in normal validUser
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } catch(err) {
        next(err);
    }
}

