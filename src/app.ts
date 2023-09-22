import express from "express"
import { createUser, deleteUser, getOneUsers, getUsers, updateUser } from "./logic";
import { isUserBodyValidation } from "./middlewares/isUserBodyValid";
import { isUserEmailUnique } from "./middlewares/isUserEmailUnique";
import { isUserIdValid } from "./middlewares/isUserIdValid";

const app = express();

app.use(express.json());

app.get("/users", getUsers);
app.get("/users/:id", isUserIdValid, getOneUsers);
app.post("/users", isUserBodyValidation, isUserEmailUnique, createUser);
app.delete("/users/:id", isUserIdValid, deleteUser);
app.patch("/users/:id", isUserIdValid, isUserEmailUnique, updateUser);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`API started sucessfully in port ${PORT}.`)
})