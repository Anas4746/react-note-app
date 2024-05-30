
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import methodOverride from "method-override";
import User from './models/user.js';
import Note from './models/notes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { generateToken, verifyToken } from './middlewares/userAuthentication.js';
import router from './routes/user.js';
import noterouter from './routes/notes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

mongoose.connect('mongodb://127.0.0.1:27017/note-app-database', { useNewUrlParser: true, useUnifiedTopology: true })
    // It is help to populate the databse
    .then(() => {
        console.log("Connected with MongoDB")
    })
    .catch(err => {
        console.log(`Mongo Not Connect`)
        console.log(err)
    });

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride("_method"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    var enterEmail = ''
    res.render('user/login', { enterEmail })
})

app.post('/body', (req, res) => {
    try {
        console.log(req.body.bodyName)
        res.json(req.body.bodyName)
    } catch (e) {
        res.status(500).send(e, "Internal server error")
    }
})

app.use("/user", router);
app.use("/notes", noterouter);


app.listen(2600, () => {
    console.log("Get Request")
});

// app.get("/userRegister", (req, res) => {
//     var usertake = ""
//     var enterEmail = ''
//     res.render('user/register', { usertake, enterEmail })
// });

// app.post("/userRegister", async (req, res) => {
//     let success = { success: false }
//     console.log(req.body.email, req.body.password)
//     if (req.body.email, req.body.password) {
//         const { email, password } = req.body;
//         const UserExist = await User.findOne({ email: email });
//         if (!UserExist) {
//             const hash = await bcrypt.hash(password, 12);
//             const user = new User({
//                 email: email,
//                 password: hash
//             });
//             await user.save();
//             req.session.userEmail = user.email;
//             // res.render('user/login', { user_email: req.session.userEmail });
//             success.success = true
//             res.json({ success, user })
//         } else {
//             console.log(email, password)
//             var usertake = "email taken";
//             // res.render('user/register', { usertake });
//             res.json({ success, usertake })
//         }
//     } else {
//         var enterEmail = "Enter email and Password"
//         var usertake = ''
//         // res.render('user/register', { enterEmail, usertake })
//         res.json({ success, enterEmail })
//     }
// });

// app.post("/userLogin", async (req, res) => {
//     if (req.body.email, req.body.password) {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email: email }).populate('notes');
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (validPassword) {
//             req.session.userEmail = user.email;
//             req.session.user = user;
//             req.session.userLogin = true;
//             const authToken = generateToken(user);
//             // console.log(authToken);
//             res.render("notes/createNotes", {
//                 userId: req.session.user._id,
//                 userNotes: req.session.user.notes,
//                 authToken: authToken
//             });
//         } else {
//             var enterEmail = 'Email or Password Incorrect'
//             res.render('user/login', { enterEmail })
//         }
//     } else {
//         var enterEmail = "Enter email and Password"
//         res.render('user/login', { enterEmail })
//     }
// });


// app.post('/logout', (req, res) => {
//     req.session.userLogin = false;
//     res.redirect("/")
// });

// app.post("/:id/usercreateNote", async (req, res) => {
//     const { id } = req.params;
//     const { title, content, noteDate, authtoken } = req.body
//     const user = await User.findOne({ _id: id }).populate('notes');
//     const userLogin = verifyToken(authtoken)
//     if (userLogin) {
//         const newNote = new Note({
//             title: title,
//             content: content,
//             date: noteDate,
//             user: user
//         });
//         await newNote.save();
//         user.notes.push(newNote);
//         await user.save();
//         const userId = req.session.user._id;
//         // console.log(req.session.user._id);
//         res.render("notes/createNotes", {
//             userId: userId,
//             userNotes: user.notes,
//             authToken: authtoken
//         })
//     } else {
//         res.redirect('user/login')
//         console.log('Invalid user Login')
//     }
// });

// app.delete("/notedelete/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const notedelete = await Note.findOneAndDelete({ _id: id });
//         const user = await User.findOne({ _id: notedelete.user }).populate('notes');
//         const authToken = generateToken(user);
//         const userLogin = verifyToken(authToken)
//         if (userLogin) {
//             user.notes.pull(id);
//             await user.save();
//             // console.log(authToken);
//             res.render("notes/createNotes", {
//                 userId: user._id,
//                 userNotes: user.notes,
//                 authToken: authToken
//             });

//         } else {
//             res.redirect('user/login')
//             console.log('Invalid user Login')
//         }
//     } catch (err) {
//         res.render("notes/createNotes", {
//             userId: req.session.user._id,
//             userNotes: req.session.user.notes,
//             authToken: null
//         });
//         console.log(err)
//     }
// });
