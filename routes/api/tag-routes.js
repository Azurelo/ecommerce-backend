const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if(!tagData){
      res.status(404).json({message: 'No Tag Found With That ID'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newestTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newestTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // update a tag's name by its `id` value

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          tag_id: req.params.id
        }
      }
    );
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const trashTag = await Tag.destroy({
      where: {
        tag_id: req.params.id
      }
    });
    if (trashTag === 0) {
      return res.status(404).json({ message: 'Unknown Tag' });
    }
    res.status(200).json({ message: 'Tag deleted!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
