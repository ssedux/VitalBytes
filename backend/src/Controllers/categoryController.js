const categoryController = {};

import Category from "../Models/Category.js"; 

categoryController.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

categoryController.insertCategory = async (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({ name });

    await newCategory.save();
    res.json({ message: "Category saved" });
};

categoryController.deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
};

categoryController.updateCategory = async (req, res) => {
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
    );
    res.json({ message: "Category updated" });
};

export default categoryController;