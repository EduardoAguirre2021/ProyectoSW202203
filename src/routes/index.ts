import express from 'express';
import UsersRouter from "@routes/Users/index";
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.use('/security', UsersRouter);

export default router;
