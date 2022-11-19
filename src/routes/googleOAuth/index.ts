import express from 'express';
import passport from 'passport';
import '@server/middleware/googleOAuth';
const router  = express.Router();


router.get ('/google', 
    passport.authenticate('google', {scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', 
    { 
        session: false, 
        successRedirect: '/auth/success',
        failureRedirect: '/auth/error'
    })
);


router.get('/success', (_req, res) => {
    res.status(200).json({result: true, msg: 'Autenticacion Exitosa'});
});

router.get('/error', (_req, res) => {
    res.status(400).json({result: false, msg: 'Error al autenticar'});
})

export default router;