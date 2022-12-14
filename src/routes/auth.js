const router = require("express").Router();

const { body } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.get("/status", authController.isAuth, authController.getUserStatus);

router.put("/status", authController.isAuth, authController.updateUserStatus);

module.exports = router;
