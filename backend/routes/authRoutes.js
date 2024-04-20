
    

const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require ("path");
const app = express();

const { register,login } = require('../controllers/authController');
const { deleteUser,getUserById ,updateUser,uploadFile} = require('../controllers/userController');

// config multer upload images
app.use('/images', express.static(path.join('images')))
const MIME_TYPE = {
   'image/png': 'png',
   'image/jpeg': 'jpg',
   'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
   // destination
   destination: (req, file, cb) => {
    console.log(req.file)

       const isValid = MIME_TYPE[file.mimetype];
       let error = new Error("Mime type is invalid");
       if (isValid) {
           error = null;
       }
       cb(null, 'images')
   },
   filename: (req, file, cb) => {
    console.log('Originalname:', file.originalname);
    console.log('MIME_TYPE:', MIME_TYPE[file.mimetype]);

    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + extension;
    cb(null, imgName);
}
  
});
const upload = multer({ storage: storage }).single("img");


router.post('/signup',upload, register);
router.post('/login', login);
router.delete('/delete', deleteUser);
router.get('/getUserById/:id', getUserById);
router.put('/updateUser', updateUser);
router.put('/uploadFile/:id',uploadFile)

// router.get('/logout', logout);

module.exports = router; 