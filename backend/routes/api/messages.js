const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Message, Table, GameSystem, GameType, User, Language, TableReview, Application, PlayerList } = require('../../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();


 router.get('/', asyncHandler(async (req, res) => {
    const fetchAllMessagesPeriod = await Message.findAll({
        include: [User, {model: User, as: "Recipient" }]
    })
    return res.json(fetchAllMessagesPeriod);
 }));

router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const fetchAllUserMessages = await Message.findAndCountAll({
        where: { [Op.or]: {
            userId,
            recipientId: userId
        } },
        include: [User, {model: User, as: "Recipient" }],
        limit: 10,
    })
    return res.json(fetchAllUserMessages);
 }));

 router.post('/:userId/:recipientId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const recipientId = req.params.recipientId;
    const { message } = req.body;
    const saveConversations = await Message.build({
        userId,
        recipientId,
        content: message
    })
    saveConversations.save();

    const fetchAllUserMessages = await Message.findAll({
        where: { userId, recipientId },
        include: [User, {model: User, as: "Recipient" }]
    })
    return res.json(fetchAllUserMessages);

 }));

 module.exports = router;
