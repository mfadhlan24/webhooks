const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

const SECRET = 'somesecretvalue';

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const payload = JSON.stringify(req.body);
    const signature = `sha1=${crypto.createHmac('sha1', SECRET).update(payload).digest('hex')}`;

    if (req.headers['x-hub-signature'] === signature) {
        console.log('Payload:', req.body);
        res.status(200).send('Success');
    } else {
        console.warn('Invalid signature');
        res.status(401).send('Invalid signature');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
