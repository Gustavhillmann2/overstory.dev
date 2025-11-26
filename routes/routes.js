import express from 'express';
import {} from '../controllers/accountController.js'; //Referer til controlleren. 
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();
router.use(express.json());

router.get('/', isAuthenticated, getAccounts); // HTTP endpoints

export default router;