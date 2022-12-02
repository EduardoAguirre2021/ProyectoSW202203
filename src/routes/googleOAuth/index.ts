import express from 'express';
import passport from 'passport';
import '@server/middleware/googleOAuth';
import { UsersGoogle } from '@libs/googleUsers/index';
import { body, validationResult } from 'express-validator';
const router = express.Router();
const googleUser = new UsersGoogle();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    successRedirect: '/auth/success',
    failureRedirect: '/auth/error',
  }),
);

router.get('/success', (_req, res) => {
  res.status(200).json({ result: true, msg: 'Autenticacion Exitosa' });
});

router.get('/error', (_req, res) => {
  res.status(400).json({ result: false, msg: 'Error al autenticar' });
});

router.get('/google/getAllUsers', async (_req, res) => {
  try {
    const result = await googleUser.getAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ msg: 'Error al cargar los datos' });
  }
});

router.get(
  '/google/byemail',
  body('email').isEmail().withMessage('Email enviado tiene formato incorrecto'),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
      } else {
        const { email } = req.body;
        const result = await googleUser.getUserByEmail(email);
        res.status(200).send(result);
      }
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error al cargar los datos' });
    }
  },
);

export default router;
