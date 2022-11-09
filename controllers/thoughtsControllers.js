const { User, Thoughts} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
        .then((thoughts) => {return res.json(thoughts)})
        .catch((err) =>{
            console.error({ message: err});
            return res.status(500).json(err);
        });
    },
    getSingleThought(req, res) {
        Thoughts.findOne({_id: req.params.thoughtId})
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    createThought(req, res) {
        Thoughts.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                {username: thought.username},
                { $addToSet: {thoughts: thought._id}},
                {new: true}
            );
        })
        .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
           {_id: req.params.thoughtId},
           {$set: req.body},
           {runValidators: true, new: true} 
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that id!'})
        : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    deleteThought(req, res) {
        Thoughts.findOneAndRemove({_id: req.params.thoughtId})
        .then((thought) => 
        !thought
        ?res.status(404).json({message: 'No thought with that id!'})
        :res.json('Thought deleted')
        )
        .catch((err) => res.status(500).jason(err))
    },
    createReaction(req, res) {
        Thoughts.findByIdAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: {reactions: [req.body]}},
            {new: true}
        )
        .then((thought) =>
        !thought
          ? res
            .status(404)
          : res.json('Created the reaction 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: {reactions: {_id: req.params.reactionId}}},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json("Reaction Deleted")
          )
          .catch((err) => res.status(500).json(err));
    }
}