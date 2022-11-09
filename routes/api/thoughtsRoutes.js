const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtsControllers');

const router = require('express').Router();

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).post(updateThought).delete(deleteThought)

router.route('/:thoughtId/reaction').put(createReaction)

router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction)

module.exports = router;