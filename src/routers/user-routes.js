const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");


router.post("/users"  ,async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send("Error: " + error);
    }
});

router.post("/users/login",async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send("Error: " + error);
    }
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "age", "email", "password"];
    const isValidUpdate = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
        return res.status(400).send("Error: Invalid updates");
    }
    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send("Error: " + error);
    }
});

router.delete("/users/me", auth, async (req, res) => {
    try {
        await User.findOneAndDelete(req.user)
        res.send(req.user);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

module.exports = router;
