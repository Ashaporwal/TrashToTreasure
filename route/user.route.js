
import express from "express";
import { createUser,verifyAccount,login ,getAllUser} from "../Controller/user.controller.js";
import { body } from "express-validator";

const router = express.Router();

// router.get("/",list);

// router.post("/","name","name is required").notEmpty(),
// body("name", "only alphabets are required".isAlpha(),
// body("email","email is required").notEmpty(),
// body("password","password is required").isEmail(),
// body("contact","contact number is required").notEmpty(),
// body("contact","only digit are allowed"),
// createUser
// );


// router.post("/",auth);

router.post("/",createUser)
router.post("/verification",verifyAccount);
router.get("/",getAllUser);
router.post("/login",login);

export default router;