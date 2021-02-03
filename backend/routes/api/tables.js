const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Table, GameSystem, GameType, User, Language, TableReview } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const fetchTables = await Table.findAll({
        include: [GameSystem, GameType, User]
    })
    return res.json(fetchTables);
 }));

 router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const fetchSingleTable = await Table.findOne({
        where: {id},
        include: [GameSystem, GameType, User, Language, { model: TableReview, include: User }]
    })
    return res.json(fetchSingleTable);
 }));


module.exports = router;
