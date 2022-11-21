import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/example', async (req: Request, res: Response) => {
  res.send('Hi there!!!!');
});

export { router as exampleRouter };
