const express = require("express");
const upload = require('../../utils/multer');
const router = new express.Router();
const ProductControls = require('../../controllers/ProductController');

router.post("/produits", upload.single('photo'), ProductControls.CreateProduct);
router.get("/produits", ProductControls.getAllProduct);
router.get("/getproduits/:categorie", ProductControls.getAllProductCategory);
module.exports = router;


