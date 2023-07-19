const express = require('express');
const connectDB = require('./db');
const User = require('./userSchema');
const app = express();
const port = 3000;

app.use(express.json());

connectDB();
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/register', async (req, res) => {
    try {
        const {name, email, password, age} = req.body;
        console.log(name);
        const user = new User({name, email, password, age});
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.put('/users/:userId', async (req, res) => {
    try {
      const { name, email, password, age } = req.body;
     // const { postId } = req.params;
      const { userId } = req.params;
  
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { name, email, password, age },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
      //console.log(user);
    } catch (error) {
      console.error('Error updating user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findOneAndDelete({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (error) {
      console.error('Error deleting user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.listen(port, () => {
    console.log('Server is running on port 4000 ');
});