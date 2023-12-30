import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

export const addUserv = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (!userName || !email || !password)
            returnres.status(404).send("חסר פרמטרים ");
        if (!/[0-9]{2}[A-Za-z]{2}/.test(password))
            return res.status(400).send("סיסמא לא תקינה");
        let hashedPassword = await bcrypt.hash(password, 15);
        let newUser = new User({ userName, password: hashedPassword, email });
        await newUser.save();
        res.json(newUser);
    }
    catch (err) {
        res.status(500).send("שגיאה");
    }
}

export const login = async (req, res) => {
    try {
        let { userName, password } = req.body;
        if (!userName || !password)
            return res.status(404).send("חסר פרמטרים");
        if (!/[0-9]{2}[A-Za-z]{2}/.test(password))
            return res.status(400).send("סיסמא לא תקינה");
        let loggedInUser = await User.findOne({ userName });
        if (!loggedInUser)
            return res.status(404).send("אין משתמש");
        if (!await bcrypt.compare(password, loggedInUser.password))
            return res.status(404).send("אין משתמש");
        let { userName: u, _id, email } = loggedInUser;
        res.json({ userName: u, _id, email });
    }
    catch (err) {
        return res.status(500).send("שגיאה");

    }
}

export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find({}, "-passwors");
        res.json(allUsers);
    }
    catch (err) {
        return res.status(500).send("שגיאה");

    }
}