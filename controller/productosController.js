import Contenedor from "./filesHandler.js";

const contenedor = new Contenedor("./db/productos.json");

export const getall = async (req, res) => {
  const productos = await contenedor.getAll();
  res.json(productos);
};

export const getById = async (req, res) => {
  const productos = await contenedor.getById(req.params.id);
  res.json(productos);
};

export const save = async (req, res) => {
  req.body.timestamp = Date.now();
  const producto = await contenedor.save(req.body);
  res.json(producto);
};

export const updateById = async (req, res) => {
  req.body.timestamp = Date.now();
  const producto = await contenedor.updateById(req.params.id, req.body);
  res.json(producto);
};

export const deleteById = async (req, res) => {
  const producto = await contenedor.deleteById(req.params.id);
  res.json(producto);
};
