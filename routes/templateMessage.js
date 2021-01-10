const express = require('express');
const {getTemplateMessages, getTemplateMessageById, addTemplateMessages, updateTemplateMessage} = require('../controllers/templateMessageController');
const router = express.Router();

router.get('/', getTemplateMessages);
router.get('/:templateMessageId', getTemplateMessageById);
router.post('/', addTemplateMessages);
router.patch('/:templateMessageId', updateTemplateMessage);

module.exports = router;