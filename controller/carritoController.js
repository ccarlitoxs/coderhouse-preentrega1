import Contenedor from "./filesHandler.js";

const contenedorCarritos = new Contenedor("./db/carritos.json");
const contenedorProductos = new Contenedor("./db/productos.json");

export const getAllProducts = async (req, res) => {
  const carrito = await contenedorCarritos.getById(req.params.id);
  let productos = []
  for (const idproducto of carrito.product.productos) {
    productos.push(await contenedorProductos.getById(idproducto));
  }
  carrito.product.productos = productos;
  res.json(carrito);
};

export const save = async (req, res) => {
  req.body = {
    productos: [],
    timestamp: Date.now()
  };
  const carrito = await contenedorCarritos.save(req.body);
  res.json(carrito);
};

export const saveProducts = async (req, res) => {
  const producto = await contenedorProductos.getById(req.params.idproducto);
  let carrito = await contenedorCarritos.getById(req.params.idcarrito);
  if (!carrito.product.productos.includes(producto.id)) {
    carrito.product.productos.push(producto.id)
  }
  carrito = await contenedorCarritos.updateById(req.params.idcarrito, {productos:carrito.product.productos, timestamp:Date.now()});

  res.json({ mensaje: "Agregado", carrito });
};

export const deleteById = async (req, res) => {
  await contenedorCarritos.deleteById(req.params.id);
  res.json({ mensaje: "Borrado", id: req.params.id });
};

export const deleteProductById = async (req, res) => {
  const idproducto = parseInt(req.params.idproducto);
  const idcarrito = parseInt(req.params.idcarrito);

  let carrito = await contenedorCarritos.getById(idcarrito);
  carrito.product.productos = carrito.product.productos.filter(
    (id) => id !== idproducto
  );
  carrito.product.timestamp = Date.now();
  carrito = await contenedorCarritos.updateById(idcarrito, carrito.product);

  let productos = [];
  console.log('ids',carrito.product.productos)
  for (const idproducto of carrito.product.productos) {
    productos.push(await contenedorProductos.getById(idproducto));
  }
  carrito.product.productos = productos;

  res.json({ mensaje: "Borrado del carrito", carrito });
};
