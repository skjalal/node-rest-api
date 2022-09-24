const { expect } = require("chai");
const { stub } = require("sinon");
const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("AuthControllerTest", () => {
  it("should test login failed", async () => {
    stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "abc@123.com",
        password: "abc",
      },
    };
    const result = await AuthController.login(req, {}, () => {});

    expect(result).to.be.an("error");
    expect(result).to.have.property("statusCode", 500);
    expect(User.findOne.called).to.be.true;

    User.findOne.restore();
  });
});
