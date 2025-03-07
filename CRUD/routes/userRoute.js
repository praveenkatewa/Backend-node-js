import express from "express"
import { fetch,create,update,deleteUser } from "../controller/userController.js"

const route =express.Router();

route.post("/create",create);
route.get("/getAllUsers",fetch);
route.patch("/update",update);
route.delete("/delete/:id",deleteUser)
route.post("/signup",signup)



export default route;