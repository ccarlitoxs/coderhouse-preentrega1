// import createError from 'http-errors';
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import productosRouter from "./routes/productos/index.js";
import carritoRouter from "./routes/carrito/index.js";

let app = express();

const moduleURL = new URL(import.meta.url);

const __dirname = path.dirname(moduleURL.pathname);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/carritos", carritoRouter);
app.use("/api/productos", productosRouter);

app.get("/", (req, res) => res.send("SERVER UP!"));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (req, res, next) {
  res.json({
    error: -2,
    descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`,
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

export default app;
