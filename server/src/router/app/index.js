const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
	res.send('HELLO, WELCOME to MyApp');
});

module.exports = router;