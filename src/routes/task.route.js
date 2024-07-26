import express from "express";
import taskController from "../app/controllers/TaskController.js";

const router = express.Router();

router.use('/:id', taskController.show);
router.use('/', taskController.index);

export default router;