const express = require ('express');
const router = express.Router();
const usercontroller = require ('../controllers/usercontroller');

router.post('/user',usercontroller.Createusers);
router.get('/user',usercontroller.view)
router.get('/userall',usercontroller.viewall)
router.get('/user/:id',usercontroller.singleuser)
router.delete('/user/:id', usercontroller.deleteuser);
router.put('/user',usercontroller.edituser);

router.post('/Add',usercontroller.addproduct);
router.get('/Fetchcategories',usercontroller.fetchCategory);
router.get('/Add',usercontroller.viewallproducts);
router.get('/Add/:id',usercontroller.singleproductview);

module.exports = router