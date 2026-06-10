import express from 'express';
import { index } from '../controllers/products';

// importazione controllers

//importazione middlewares

// impostazione router

const router = express.Router();

// rotta index
router.get('', index);

// rotta show

export default router;