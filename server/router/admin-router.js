const express = require("express")
const router = express.Router();
const {getAllUsers, getAllContacts, getAllServices, deleteUser, getUserById, updateUserById, deleteContact} = require('../controllers/admin-controller');
const {deleteService, getServiceById, updateServiceById} = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');

router.route('/users').get(authMiddleware, adminMiddleware, getAllUsers);  //authMiddleware will verify if user is logged in or not.
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, deleteUser);
router.route('/users/:id').get(authMiddleware, adminMiddleware, getUserById);  //every link/route should be unique
router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, updateUserById);

router.route('/contacts').get(authMiddleware, adminMiddleware, getAllContacts);  //adminMiddleware will verify if user is admin or not.
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware, deleteContact);

router.route('/services').get(authMiddleware, adminMiddleware, getAllServices);
router.route('/services/delete/:id').delete(authMiddleware, adminMiddleware, deleteService);
router.route('/services/:id').get(authMiddleware, adminMiddleware, getServiceById);
router.route('/services/update/:id').patch(authMiddleware, adminMiddleware, updateServiceById);

module.exports = router;