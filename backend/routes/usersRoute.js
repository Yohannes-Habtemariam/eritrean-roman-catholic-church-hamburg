import express from "express";
import authorizeUser from "../middleware/authorizeUser.js";

const router = express.Router();

router.use(authorizeUser);

router.get("/:id") 

router.post("/:id");

export default router;