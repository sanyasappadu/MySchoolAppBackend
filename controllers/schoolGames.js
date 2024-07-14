const Game = require('../models/SchoolGames'); // Adjust the path as needed

// Create a new game
const createGame = async (req, res) => {
    const { name, idnumber, class: className, game } = req.body;

    try {
        const newGame = new Game({
            name,
            idnumber,
            class: className,
            game,
        });

        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all games
const getGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a game by ID
const getGameById = async (req, res) => {
    const { id } = req.params;

    try {
        const game = await Game.findById(id);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a game by ID
const deleteGame = async (req, res) => {
    const { id } = req.params;

    try {
        const game = await Game.findByIdAndDelete(id);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createGame,
    getGames,
    getGameById,
    deleteGame,
};
