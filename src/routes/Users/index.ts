import  express  from "express";
import { body, validationResult } from "express-validator";
import { Users } from "@libs/Users/index";
const router= express.Router();
const users= new Users();


router.post('/signin', 
body('email').isEmail().withMessage("Email enviado tiene formato incorrecto") ,
body('password').isStrongPassword({minLength:8}).withMessage("Contraseña no cumple con los requisitos"),
body('username').isLength({min:5}).withMessage("El username no cumple con la longitud minima"),
body('birthDate').isDate().withMessage("Formato incorrecto"),
async (req, res) => {

    try {
        const validation= validationResult(req);
        if(!validation.isEmpty()) {
            res.status(400).json({errors: validation.array() });
        } else {
            const {name, username, email, birthDate,password} = req.body;
            const result= await users.signin(name, username, email, password, birthDate);
            console.log("Usuario Creado: ", result);
            res.status(200).json({result: true, msg: "Usuario Creado exitosamente"});
        }

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({result: false, error: "Error al crear el usuario"});
    }


});

router.put('/update/:id',
body('email').isEmail().withMessage("Email enviado tiene formato incorrecto"),
body('username').isLength({min:5}).withMessage("El username no cumple con la longitud minima"),
body('status').isIn(['ACT', 'INA']),
async (req,res)=> {
    try {
        const validation= validationResult(req);
        if(!validation.isEmpty()) {
            res.status(400).json({errors: validation.array() });
        } else {
            const {id}= req.params;
            const {username,email,status}= req.body;
            const result= await users.updateUser(id, username, email, status);
            console.log("Usuario actualizado: ", result);
            res.status(200).json({result: true, msg: "Usuario Actualizado exitosamente"});
        }
    
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({error: "Error al actualizar el usuario"});
    }
});

router.get('/getUsers', async (_req, res) => {
    try {
        const result= await users.getAll();
        console.log(result);
        res.status(200).send(result);
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({error: "Error al cargar los datos"});
    }
});

router.get('/byemail',body('email').isEmail().withMessage("Email enviado tiene formato incorrecto"),
 async (req, res) => {
    try {
        const validation= validationResult(req);
        if(!validation.isEmpty()) {
            res.status(400).json({errors: validation.array() });
        }
        else {
            const {email}= req.body; 
            const result= await users.findUserByEmail(email);
            console.log("Usuario encontrado", result);
            res.status(200).send(result);
           
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({error: "Error al cargar los datos"});
    }
});

router.get('/byusername', async (req, res) => {
    try {
            const {username}= req.body;
            const result= await users.findUserByUsername(username);
            console.log("Usuario encontrado", result);
            res.status(200).send(result);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({error: "Error al cargar los datos"});
    }
});

router.put('/addrole/:id', body('role').isIn(['public', 'admin', 'auditor', 'support']).withMessage("Role incorrecto") ,
async (req, res) => {
    try {
        const validation= validationResult(req);
        if(!validation.isEmpty()) {
            res.status(400).json({errors: validation.array() });
        }
        else {
            const {id}= req.params;
            const {role}= req.body;
            const result= await users.addUserRole(id, role);
            console.log("Rol añadido", role);
            res.status(200).json({msg: "Rol añadido", out: result});
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({error: "Error al cargar los datos"});
    }
})

export default router;