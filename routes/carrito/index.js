import express from "express";
import userAuth from "../../middlewares/userAuth.js";

import {
  getAllProducts,
  save,
  saveProducts,
  deleteById,
  deleteProductById,
} from "../../controller/carritoController.js";

const router = express.Router();

// api/carritos

router.get("/:id/productos", userAuth, getAllProducts);

router.post("/", userAuth, save);

router.post("/:idcarrito/productos/:idproducto", userAuth, saveProducts);

router.delete("/:id", userAuth, deleteById);

router.delete("/:idcarrito/productos/:idproducto", userAuth, deleteProductById);

export default router;
