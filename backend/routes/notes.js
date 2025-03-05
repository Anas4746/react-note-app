
import express from 'express';
import User from '../models/user.js';
import Note from '../models/notes.js';
import { generateToken, verifyToken } from '../middlewares/userAuthentication.js';

const noterouter = express.Router();

noterouter.get("/getnotes", async (req, res) => {
    let success = { success: false }
    const token = req.headers["auth-token"];
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

noterouter.post("/usercreateNote", async (req, res) => {
    var success = { success: false }
    try {
        const authtoken = req.headers["authtoken"]
        // console.log(authtoken)
        const userLogin = verifyToken(authtoken)
        // console.log(userLogin)
        const id = userLogin.userId;
        const { title, content, noteDate } = req.body
        const user = await User.findOne({ _id: id }).populate('notes');
        if (userLogin) {
            const newNote = new Note({
                title: title,
                content: content,
                date: noteDate,
                user: id
            });
            await newNote.save();
            // console.log(user.notes)
            user.notes.push(newNote);
            await user.save();
            console.log(user)
            const userNotes = user.notes
            // const userId = req.session.user._id;
            // console.log(req.session.user._id);
            success.success = true
            res.status(200).json({ success, userNotes })
            // res.render("notes/createNotes", {
            //     userId: userId,
            //     userNotes: user.notes,
            //     authToken: authtoken
            // })
        } else {
            // res.redirect('user/login')
            var enterEmail = "User not found"
            res.status(500).json({ success, enterEmail })
            console.log('Invalid user Login')
        }
    }
    catch (e) {
        var enterEmail = "User not found"
        res.status(500).json({ success, enterEmail })
        console.log(enterEmail, e)
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
        // const authToken = generateToken(user)
        // res.render("notes/createNotes", {
        //     userId: user._id,
        //     userNotes: user.notes,
        //     authToken: authToken
        // });
        res.status(200).json({ user })
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


noterouter.delete("/notedelete/:id", async (req, res) => {
    const { id } = req.params;
    var success = { success: false }
    // console.log(`Note ID to delete: ${id}`);
    try {
        // Find and delete the note
        const notedelete = await Note.findOneAndDelete({ _id: id });
        if (!notedelete) {
            // console.log("Note not found");
            return res.status(404).send("Note not found");
        }
        // console.log(`Deleted note: ${notedelete}`);

        // Find the user associated with the deleted note
        const user = await User.findOne({ _id: notedelete.user }).populate('notes');
        if (!user) {
            // console.log("User not found");
            return res.status(404).send("User not found");
        }
        // console.log(`User found: ${user}`);

        // Generate and verify the auth token
        const authToken = generateToken(user);
        const userLogin = verifyToken(authToken);
        if (userLogin) {
            // Remove the note ID from the user's notes array
            user.notes.pull(id);
            await user.save();
            const notes = user.notes
            // console.log(`Updated user notes: ${user.notes}`);
            success.success = true
            res.status(200).json({ success, notes });
        } else {
            console.log("Invalid user login");
            var invalidUser = "Invalid user Login";
            res.status(400).send({ success, invalidUser });
        }
    } catch (err) {
        console.error("Internal Server Error", err);
        res.status(500).send("Internal Server Error");
    }
});


export default noterouter