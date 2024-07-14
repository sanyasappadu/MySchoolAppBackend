const express = require('express');
const router = express.Router();
const {
    createGame,
    getGames,
    getGameById,
    deleteGame,
} = require('../controllers/schoolGames'); // Adjust the path as needed

router.post('/', createGame);
router.get('/', getGames);
router.get('/:id', getGameById);
router.delete('/:id', deleteGame);

module.exports = router;
