
import express from 'express';
import User from '../models/user.js';
import Note from '../models/notes.js';
import { generateToken, verifyToken } from '../middlewares/userAuthentication.js';

const noterouter = express.Router();

noterouter.get("/getnotes", async (req, res) => {
    let success = { success: false }
    const token = req.header("auth-token");
    const userLogin = verifyToken(token);
    if (userLogin) {
        const user = await User.findOne({ _id: userLogin.userId }).populate('notes');
        // console.log(user);
        const notes = user.notes
        success.success = true
        res.status(200).json({ success, notes })
    } else {
        var err = "User Not login, User Not found";
        res.status(401).json({ success, err })
    }
})

noterouter.post("/:id/usercreateNote", async (req, res) => {
    const { id } = req.params;
    const { title, content, noteDate, authtoken } = req.body
    const user = await User.findOne({ _id: id }).populate('notes');
    const userLogin = verifyToken(authtoken)
    if (userLogin) {
        const newNote = new Note({
            title: title,
            content: content,
            date: noteDate,
            user: user
        });
        await newNote.save();
        user.notes.push(newNote);
        await user.save();
        const userId = req.session.user._id;
        // console.log(req.session.user._id);
        res.render("notes/createNotes", {
            userId: userId,
            userNotes: user.notes,
            authToken: authtoken
        })
    } else {
        res.redirect('user/login')
        console.log('Invalid user Login')
    }
});

noterouter.get("/noteupdate/:id", async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
        return res.status(404).send("Note not found");
    }
    res.render('notes/updateNote', { note })
});

noterouter.put("/noteupdate/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    // console.log(title, content)
    try {
        // Verify the token
        // const userLogin = verifyToken(authtoken);
        // if (!userLogin) {
        //     return res.redirect('/user/login');
        // }

        // Find the note by ID and Update the note properties
        const note = await Note.findByIdAndUpdate(id, { title: title, content: content }, { new: true })
        if (!note) {
            return res.status(404).send("Note not found");
        }
        const user = await User.findById(note.user).populate('notes');
        // render to the page where the note was updated
        const authToken = generateToken(user)
        res.render("notes/createNotes", {
            userId: user._id,
            userNotes: user.notes,
            authToken: authToken
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


noterouter.delete("/notedelete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const notedelete = await Note.findOneAndDelete({ _id: id });
        const user = await User.findOne({ _id: notedelete.user }).populate('notes');
        const authToken = generateToken(user);
        const userLogin = verifyToken(authToken)
        if (userLogin) {
            user.notes.pull(id);
            await user.save();
            // console.log(authToken);
            res.render("notes/createNotes", {
                userId: user._id,
                userNotes: user.notes,
                authToken: authToken
            });

        } else {
            res.redirect('user/login')
            console.log('Invalid user Login')
        }
    } catch (err) {
        res.render("notes/createNotes", {
            userId: req.session.user._id,
            userNotes: req.session.user.notes,
            authToken: null
        });
        console.log(err)
    }
});

export default noterouter