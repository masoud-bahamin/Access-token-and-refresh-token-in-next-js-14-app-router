const validator = require("fastest-validator");

const v = new validator();

const registerSchema = {
  email: {
    type: "string",
    min: "3",
    max: "50",
  },
  password: {
    type: "string",
    min: "3",
    max: "50",
  },
};

export const registerValidator = v.compile(registerSchema);
