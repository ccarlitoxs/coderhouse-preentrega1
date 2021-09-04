import express from "express";
import adminAuth from "../../middlewares/adminAuth.js";
import userAuth from "../../middlewares/userAuth.js";

import {
  getall,
  getById,
  save,
  updateById,
  deleteById,
} from "../../controller/productosController.js";

const router = express.Router();

// api/productos

router.get("/", userAuth, getall);

router.get("/:id", userAuth, getById);

router.post("/", adminAuth, save);

router.put("/:id", adminAuth, updateById);

router.delete("/:id", adminAuth, deleteById);

export default router;
