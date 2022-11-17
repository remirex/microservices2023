import express from 'express';

const app = express();

app.get('/api/users/test', (req, res) => {
    res.send('Hi there!');
});

app.listen(3002, () => {
    console.log('Listening on port 3002222.')
})

