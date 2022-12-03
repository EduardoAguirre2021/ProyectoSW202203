import express from 'express';
import { body, validationResult } from 'express-validator';
import { Users } from '@libs/Users/index';
const router = express.Router();
const users = new Users();

router.post(
  '/signin',
  body('email').isEmail().withMessage('Email enviado tiene formato incorrecto'),
  body('password')
    .isStrongPassword({ minLength: 8 })
    .withMessage('Contraseña no cumple con los requisitos'),
  body('username')
    .isLength({ min: 5 })
    .withMessage('El username no cumple con la longitud minima'),
  body('birthDate').isDate().withMessage('Formato incorrecto'),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
      } else {
        const { name, username, email, birthDate, password } = req.body;
        const result = await users.signin(
          name,
          username,
          email,
          password,
          birthDate,
        );
        console.log('Usuario Creado: ', result);
        res
          .status(200)
          .json({ result: true, msg: 'Usuario Creado exitosamente' });
      }
    } catch (error) {
      console.log('Error: ', error);
      res
        .status(500)
        .json({ result: false, error: 'Error al crear el usuario' });
    }
  },
);

router.put(
  '/update/:id',
  body('email').isEmail().withMessage('Email enviado tiene formato incorrecto'),
  body('username')
    .isLength({ min: 5 })
    .withMessage('El username no cumple con la longitud minima'),
  body('status').isIn(['ACT', 'INA']),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
      } else {
        const { id } = req.params;
        const { username, email, status } = req.body;
        const result = await users.updateUser(id, username, email, status);
        console.log('Usuario actualizado: ', result);
        res
          .status(200)
          .json({ result: true, msg: 'Usuario Actualizado exitosamente' });
      }
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  },
);

router.get('/getUsers', async (_req, res) => {
  try {
    const result = await users.getAll();
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Error al cargar los datos' });
  }
});

router.get(
  '/byemail',
  body('email').isEmail().withMessage('Email enviado tiene formato incorrecto'),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
      } else {
        const { email } = req.body;
        const result = await users.findUserByEmail(email);
        console.log(result);
        res.status(200).send(result);
      }
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error al cargar los datos' });
    }
  },
);

router.get('/byusername', async (req, res) => {
  try {
    const { username } = req.body;
    const result = await users.findUserByUsername(username);
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Error al cargar los datos' });
  }
});

router.put(
  '/addrole/:id',
  body('role')
    .isIn(['public', 'admin', 'auditor', 'support'])
    .withMessage('Role incorrecto'),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
      } else {
        const { id } = req.params;
        const { role } = req.body;
        const result = await users.addUserRole(id, role);
        console.log('Rol añadido', result);
        res.status(200).json({ msg: 'Rol añadido', result: true });
      }
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error al cargar los datos' });
    }
  },
);

router.put(
  '/removerole/:id',
  body('role')
    .isIn(['public', 'admin', 'auditor', 'support'])
    .withMessage('Role incorrecto'),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
      } else {
        const { id } = req.params;
        const { role } = req.body;
        const result = await users.removeRoleToUser(id, role);
        console.log('Rol eliminado', result);
        res.status(200).json({ msg: 'Rol eliminado', result: true });
      }
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error al cargar los datos' });
    }
  },
);

//Agregar ruta para login

router.post('/login', body('email').isEmail().withMessage('Email no tiene formato correcto'), async (req, res) => {
    try {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
        } else {
        const { email, password } = req.body;
        const result = await users.login(email, password);
        console.log('Usuario logueado: ', result);
        res.status(200).json(result);
        }
    } catch (error) {
        console.log('Error: ', error);
        res.status(403).json({ error: 'Credenciales no son validas' });
    }
});

router.post(
  '/recoverpassword',
  body('email').isEmail().withMessage('Email enviado tiene formato incorrecto'),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
      } else {
        const { email } = req.body;
        const result = await users.recoverPassword(email);
        if (result == true) {
          res
            .status(200)
            .json({ msg: 'Correo Enviado Exitosamente!', result: true });
        } else {
          res.status(200).json({
            msg: 'Correo no enviado, verifique la direccion de Correo Electronico',
            result: false,
          });
        }
      }
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error al cargar los datos' });
    }
  },
);

/*router.get('/verifypin', body('pin').isNumeric().withMessage("Pin enviado tiene formato incorrecto"),
body('email').isEmail().withMessage("Email enviado tiene formato incorrecto"),
async (req, res) => {
    try {
        const validation= validationResult(req);
        if(!validation.isEmpty()) {
            res.status(400).json({errors: validation.array() });
        }
        else {
            const {pin, email}= req.body;
            const result= await users.verifyPin(pin, email);
            if(result == true)
            {
                res.status(200).json({msg: "Pin Verificado Exitosamente!", result: true});
            }
            else
            {
                res.status(200).json({msg: "Pin no verificado, verifique el pin", result: false});
            }
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({error: "Error al cargar los datos"});
    }
});
*/

router.post(
  '/changepassword',
  body('password')
    .isLength({ min: 7 })
    .withMessage('Password enviado tiene formato incorrecto'),
  body('confirmpassword')
    .isLength({ min: 7 })
    .withMessage('Confirm Password enviado tiene formato incorrecto'),
  body('email').isEmail().withMessage('Email enviado tiene formato incorrecto'),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() });
      } else {
        const { password, confirmpassword, email } = req.body;
        //const result= await users.changePassword(password, confirmPassword, email);
        if (password != confirmpassword) {
          res
            .status(200)
            .json({ msg: 'Las contraseñas no coinciden', result: false });
        } else {
          const result = await users.changePassword(email, password);
          if (result == true) {
            res
              .status(200)
              .json({ msg: 'Contraseña cambiada exitosamente', result: true });
          } else {
            res
              .status(200)
              .json({ msg: 'No se pudo cambiar la contraseña', result: false });
          }
        }
      }
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error al cargar los datos' });
    }
  },
);

export default router;
