import express from "express";
import { UserController } from "./userController";
import { swaggerUi, swaggerDocs } from "./config/swagger";
import cors from 'cors';
import bodyParser from 'body-parser';
import {responseData} from "./dummyData";
import statusMonitor from 'express-status-monitor';
const port = process.env.PORT || 3000;
const app = express();
app.use(statusMonitor());
app.use(cors())
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User management operations
 *     externalDocs:
 *       description: Find out more about Swagger
 *       url: https://swagger.io/specification/
 *
 * /:
 *   get:
 *     summary: Get User
 *     description: Retrieve a user based on name and age.
 *     tags: [User]
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         description: The name of the user.
 *         schema:
 *           type: string
 *       - name: age
 *         in: query
 *         required: true
 *         description: The age of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *       400:
 *         description: Invalid input.
 */

// 👇 Optional: add a custom route to access the dashboard
app.use('/status', statusMonitor());

app.get("/", async (req, res) => {
    const userController = new UserController();
    const result = await userController.getUser({
        name: "sree",
        age: 22
    });
    res.status(400).send(result);
});


/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test Endpoint
 *     description: A simple test endpoint to check server response.
 *     responses:
 *       200:
 *         description: A simple greeting message.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "hiiiiii"
 */
app.get("/test", (req, res) => {
    res.send("hiiiiii");
});

app.get("/login", (req, res) => {
    res.status(200).json({ message: "Login Successful" });
});
app.post( "/signup", (req, res) => {
    res.status(201).json({ message: "Signup Successful" , data: req.body});
})
app.get( "/user", (req, res) => {
    res.status(200).json({ message: "User Details" ,data:responseData});
})
app.listen(port, () => {
    console.log("server started on", port);
});
