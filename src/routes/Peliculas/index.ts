import { Request, Response, Router } from 'express';
import { IPelicula, Pelicula } from '@libs/Peliculas';

const router = Router();
const peliculaInstance = new Pelicula();

router.get('/', async (_req: Request, res: Response) => {
  try {
    res.json(await peliculaInstance.getAllPeliculas());
  } catch (ex) {
    res.status(503).json({ error: ex });
  }
});

router.post('/new', async (req: Request, res: Response) => {
  try {
    const newPelicula = req.body as IPelicula;
    const result = await peliculaInstance.addPelicula(newPelicula);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put('/update/:index', async (req, res) => {
  try {
    const { index: id } = req.params;
    const PeliculaFromForm = req.body as IPelicula;
    await peliculaInstance.updatePelicula(id, PeliculaFromForm);
    res.status(200).json({ msg: 'Registro Actualizado' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.delete('/delete/:index', (req, res) => {
  try {
    const { index: id } = req.params;
    if (peliculaInstance.deletePelicula(id)) {
      res.status(200).json({ msg: 'Registro Eliminado' });
    } else {
      res.status(500).json({ msg: 'Error al eliminar Registro' });
    }
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ msg: 'Error al eliminar Registro' });
  }
});

export default router;
