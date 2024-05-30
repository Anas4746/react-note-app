
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateToken, verifyToken } from '../middlewares/userAuthentication.js';
import cors from 'cors';

const router = express.Router();

router.use(cors())

router.get("/userRegister", (req, res) => {
    var usertake = ""
    var enterEmail = ''
    res.render("user/register", { usertake, enterEmail })
});

router.post("/userRegister", async (req, res) => {
    let success = { success: false }
    console.log(req.body)
    // console.log(req.body.email, req.body.password)
    try {
        const { email, password } = req.body;
        const UserExist = await User.findOne({ email: email });
        if (!UserExist) {
            const hash = await bcrypt.hash(password, 12);
            const user = new User({
                email: email,
                password: hash
            });
            await user.save();
            req.session.userEmail = user.email;
            // res.render('user/login', { user_email: req.session.userEmail });
            success.success = true
            res.status(200).json({ success, user })
        } else {
            console.log(email, password)
            var usertake = "email taken";
            // res.render('user/register', { usertake });
            res.status(401).json({ success, usertake })
        }
    }
    catch (e) {
        var enterEmail = "Enter email and Password"
        var usertake = ''
        // res.render('user/register', { enterEmail, usertake })
        res.status(500).send({ e, success, enterEmail });
    }
});

router.post("/userLogin", async (req, res) => {
    let success = { success: false };
    console.log(req.body.email ? 'email find' : 'email not find')
    if (req.body.email !== undefined && req.body.password !== undefined) {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await User.findOne({ email: email }).populate('notes');
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            req.session.userEmail = user.email;
            req.session.user = user;
            req.session.userLogin = true;
            const authToken = generateToken(user);
            // console.log(authToken);
            // res.render("notes/createNotes", {
            //     userId: req.session.user._id,
            //     userNotes: req.session.user.notes,
            //     authToken: authToken
            // });
            success.success = true;
            res.status(200).json({ success, authToken })
        } else {
            var enterEmail = 'Email or Password Incorrect'
            // res.render('user/login', { enterEmail })
            res.status(400).json({ success, enterEmail })
        }
    } else {
        var enterEmail = "Enter email and Password"
        // res.render('user/login', { enterEmail })
        res.status(400).json({ success, enterEmail })
    }
});

router.post('/logout', (req, res) => {
    req.session.userLogin = false;
    res.redirect("/")
});

export default router