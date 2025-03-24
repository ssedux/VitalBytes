const productsController = {};

import Product from "../Models/Products.js"; 


productsController.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

productsController.insertProduct = async (req, res) => {
    const { name, idCategory, price, available, description } = req.body;
    const newProduct = new Product({ name, idCategory, price, available, description });

    await newProduct.save();
    res.json({ message: "Product saved" });
};

productsController.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
};
                     
productsController.updateProduct = async (req, res) => {
    const { name, idCategory, price, available, description } = req.body;
    await Product.findByIdAndUpdate(
        req.params.id,
        { name, idCategory, price, available, description },
        { new: true }
    );
    res.json({ message: "Product updated" });
};

export default productsController;