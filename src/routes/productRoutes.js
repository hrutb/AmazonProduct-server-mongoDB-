


const express = require('express');

const router = express.Router();

const { 
         sendProducts,sendProductById,createProduct

      }   = require('../controller//productController')






router.get('/', sendProducts); 
router.get('/:id',sendProductById);
router.post('/', createProduct);





module.exports = router;