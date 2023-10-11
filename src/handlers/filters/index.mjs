import { Router } from 'express';
import multer from 'multer';
import applyFiltersHandler from './applyFiltersHandler.mjs';

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 50 } });

const router = Router();
router.post('/', upload.array('images[]'), applyFiltersHandler);

router.get('/', (req, res) => {
  res.send('images Get');
});

export default router;
