import express from 'express'
const router = express.Router();
router.route("/").get((req, res) =>
    res.status(404).json({ "hello": "world" }));
    
export default router;