import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // it is used to save the hashed password in the database
    // moreover it is already using "sync" in the function itself, so no need to use await for this
    
    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save(); // as this saving takes few seconds, we will use await as to stay in this line until its complete
        res.status(201).json('User created successfully!');
    } catch(err) {
        res.status(500).json(err.message);
    }
    
};

