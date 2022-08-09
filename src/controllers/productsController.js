const { Product } = require("../models");

exports.getAll = async (req, res, next) => {
  try {
    const response = await Product.find();
    // Знайти всі продукти
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { title } = req.query;
    // Знайти продукти по назві
    const productByTitle = await Product.find({
      title: {
        $regex: title,
        $options: "i",
      },
    });
    if (!productByTitle) {
      res.status(404).send("Not found");
      return;
    }
    res.json(productByTitle);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, description, imageUrl, price, category } = req.body;
    const newProduct = await Product.create(req.body);
    // Створити новий продукт
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send("Not found");
      return;
    }
    res.json(product);
    // Знайти продукт по id
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, price, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // Оновити існуючий продукт
    if (!updatedProduct) {
      res.status(404).send("Not found");
      return;
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).send("Not found");
      return;
    }
    res.json(deletedProduct);
    // Видалити існуючий продукт
  } catch (error) {
    next(error);
  }
};
