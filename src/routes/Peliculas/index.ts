import { Router} from 'express';
import { IPeliculas, Pelicula } from '@libs/Peliculas';
import { WithUserRequest } from '@routes/index';
const router = Router();
const PeliculaInstance = new Pelicula();


router.get('/', async (req: WithUserRequest, res)=>{
  try {
    console.log("PELICULAS", req.user);
    res.json(await PeliculaInstance.getAllPeliculas());
  } catch (ex) {
    console.error(ex);
    res.status(503).json({error:ex});
  }
});


router.post('/new', async (req: WithUserRequest, res)=>{
  try {
    const newPelicula = req.body as unknown as IPeliculas;
    //VALIDATE

    const newPelculaIndex = await PeliculaInstance.addPelicula(newPelicula);
    res.json({newIndex: newPelculaIndex});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.put('/update/:index', async (req, res)=>{
  try {
    const { index : id } = req.params;
    const PeliculaFromForm = req.body as IPeliculas;
    await PeliculaInstance.updatePelicula(id, PeliculaFromForm);
    res.status(200).json({"msg":"Registro Actualizado"});
  } catch(error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.delete('/delete/:index', (req, res)=>{
  try {
    const { index : id } = req.params;
    if (PeliculaInstance.deletePelicula(id)) {
      res.status(200).json({"msg": "Registro Eliminado"});
    } else {
      res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al eliminar Registro'});
  }
});


export default router;
