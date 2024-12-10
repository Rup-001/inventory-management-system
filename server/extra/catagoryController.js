//add catagory --POST
exports.addCategoryPost = async(req, res)=>{
    try{
        const existingCategory = await category.findOne({categoryName: req.body.categoryName})
        if(existingCategory){
            return res.send("category exist")
        }

        const newcategory = new category({
            categoryName : req.body.categoryName,
        })
        const savedcategory = await newcategory.save();
        res.send("category added")
    }
    catch(error){
        console.log(error)
        console.log("category fucked")
    }
}



// Get all categories with associated products// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
      const allCategories = await category.find()
      res.json(allCategories);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving all categories');
    }
  };

  
  

// Get all products where category name is "food"
exports.getAllProductsInCategory = async (req, res) => {
    try {
      // Find the category with the specified name
      const foodCategory = await category.findOne({ categoryName: 'food' });
  
      if (!foodCategory) {
        return res.status(404).send('Category not found');
      }
  
      // Retrieve the associated products for the found category
      const productsInFoodCategory = await product.find({ category: foodCategory._id });
  
      res.json(productsInFoodCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving products in the "food" category');
    }
  };

  



  // Get all products based on the provided category name
exports.getAllProductsInCategoryPost = async (req, res) => {
    try {
      const { categoryName } = req.body;
  
      // Find the category with the specified name
      const targetCategory = await category.findOne({ categoryName });
  
      if (!targetCategory) {
        return res.status(404).send('Category not found');
      }
  
      // Retrieve the associated products for the found category
      const productsInCategory = await product.find({ category: targetCategory._id });
  
      res.json(productsInCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving products in the specified category');
    }
  };