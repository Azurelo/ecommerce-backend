const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if(!categoryData){
      res.status(404).json({message: 'No Product Found With That ID'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newestData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newestData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          category_id: req.params.id
        }
      }
    );
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const trashCategory = await Category.destroy({
      where: {
        category_id: req.params.id
      }
    });
    if (trashCategory === 0) {
      return res.status(404).json({ message: 'Unknown Category' });
    }
    res.status(200).json({ message: 'Category deleted!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
