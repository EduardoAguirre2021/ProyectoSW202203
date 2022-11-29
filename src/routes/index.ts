import { Request, Router} from 'express';
const router = Router();

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

export default router;

export interface WithUserRequest extends Request {
  user?: any;
}