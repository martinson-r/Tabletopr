const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Table, GameSystem, GameType, User, Language, TableReview, Application } = require('../../db/models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const fetchTables = await Table.findAll({
        include: [GameSystem, GameType, User]
    })
    return res.json(fetchTables);
 }));

 router.get('/:tableId', restoreUser, asyncHandler(async (req, res) => {
    const id = req.params.tableId;
    const { user } = req;
    if (user !== undefined) {
        const userId = user.id;
        const fetchSingleTable = await Table.findOne({
            where: {id},
            include: [GameSystem, GameType, User, Language, { model: TableReview, include: User }, { model: Application, required: false, where: {
                userId: userId
              }} ]
        })
        return res.json(fetchSingleTable);
    }
    const fetchSingleTable = await Table.findOne({
        where: {id},
        include: [GameSystem, GameType, User, Language, { model: TableReview, include: User }]
    })
    return res.json(fetchSingleTable);


 }));


module.exports = router;
