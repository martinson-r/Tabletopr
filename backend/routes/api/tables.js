const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Table, GameSystem, GameType, User, Language, TableReview, Application, PlayerList } = require('../../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const fetchTables = await Table.findAll({
        include: [GameSystem, GameType, User, { model: Application, required: false}]
    })
    return res.json(fetchTables);
 }));

 router.get('/playerlists', restoreUser, asyncHandler(async (req, res) => {
   const { user } = req;
   if (user !== undefined) {
       const userId = user.id;
       const fetchPlayerLists = await PlayerList.findAll({
         where: { playerId: userId },
         include: { model: Table,
            include: [User, {
            model: PlayerList, where: {
                tableId: {[Op.col]: 'Table.id'},
            }, include: [User]
        }]
    }
});
       return res.json(fetchPlayerLists);
   }
}));

 router.get('/:tableId', restoreUser, asyncHandler(async (req, res) => {
    const id = req.params.tableId;
    const { user } = req;
    if (user !== undefined) {
        const userId = user.id;
        const fetchSingleTable = await Table.findOne({
            where: {id},
            include: [GameSystem, GameType, User, Language, { model: User, as: "Player", through: [PlayerList]}, { model: TableReview, include: User }, { model: Application, required: false, where: {
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


 router.get('/players/:playerId', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    if (user !== undefined) {
        const userId = user.id;
        const fetchSingleTable = await Table.findAll({
            include: [GameSystem, GameType, User, Language,
                { model: TableReview, include: User },
                { model: User, as: 'Player', through: [PlayerList] },
                { model: Application, required: false } ]
        })
        return res.json(fetchSingleTable);
    }
    return res.json('Must log in');
 }));

 router.get('/:tableId/:playerId/application', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const { playerId } = req.params;
    const { tableId } = req.params;
    if (user !== undefined) {
        const userId = user.id;
        const fetchSingleApplication = await Application.findOne({
            where: { playerId, tableId },
            include: { model: Table, where: { hostId: userId }}
        })
        return res.json(fetchSingleApplication);
    }
    return res.json('Must log in');
 }));

 router.post('/:tableId/:playerId/application', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const { playerId, tableId, approved, denied } = req.body;
    if (user !== undefined) {
        const userId = user.id;
        const fetchSingleApplication = await Application.findOne({
            where: { userId: playerId, tableId },
            include: [User, { model: Table, where: { hostId: userId }}]
        })
        if (fetchSingleApplication) {
            await fetchSingleApplication.update({
                approved,
                denied
            });
        }
        return res.json(fetchSingleApplication);
    }
    return res.json('Must log in');
 }));

 router.get('/:tableId/applications', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const { tableId } = req.params;
    if (user !== undefined) {
        const userId = user.id;
        const fetchSingleApplication = await Application.findAll({
            where: { tableId },
            include: [{ model: Table, where: { hostId: userId }}, User]
        })
        return res.json(fetchSingleApplication);
    }
    return res.json('Must log in');
 }));

 router.post('/search', asyncHandler(async(req, res) => {
    const { query } = req.body;
    const searchTables = await Table.findAll({
      where: {
            [Op.or]: [
                { tableName: { [Op.iLike]: `%${query}%` } },
                { description: { [Op.iLike]: `%${query}%` } },
                { '$GameSystem.gameSystem$': { [Op.iLike]: `%${query}%` } },
                { '$GameType.gameType$': { [Op.iLike]: `%${query}%` } },
                { '$User.username$': { [Op.iLike]: `%${query}%` } },
              ]
        },
         include: [
           {
            model: GameSystem,
            required: false,
        },
      { model: GameType,
      required: false},
      { model: User,
        required: false}],
      });
      res.json(searchTables);
    }));

    router.post('/', restoreUser, asyncHandler(async (req, res) => {
        const id = req.params.tableId;
        const { user } = req;
        const { tableName, description, isVirtual, address, city, state, country, zipcode, gameTypeId, gameSystemId, languageId, maxPlayers } = req.body;
        if (user !== undefined) {
            const userId = user.id;
            const createTable = await Table.create({
                hostId: userId,
                tableName,
                description,
                isVirtual,
                address,
                city,
                state,
                country,
                zipcode,
                gameTypeId,
                gameSystemId,
                languageId,
                languageId,
                maxPlayers,
                isOpen: true
            })
            await createTable.save();

            const returnTable = await Table.findOne({
                where: { tableName, description, hostId: userId },
                include: [GameSystem, GameType, User, Language, { model: TableReview, include: User }]
            })
            return res.json(returnTable);
        }
        return res.json('Must be logged in to create table')
     }));

     router.post('/:tableId/apply/', restoreUser, asyncHandler(async (req, res) => {
        const tableId = req.params.tableId;
        const { user } = req;
        const { playStyle, characterConcept, whyJoin, experience } = req.body;
        if (user !== undefined) {
            const userId = user.id;
            const createApplication = await Application.create({
                userId,
                tableId,
                playStyle,
                characterConcept,
                whyJoin,
                experience,
                approved: false,
                denied: false
            });

            await createApplication.save();

            const updatedTable = await Table.findOne({
                where: { id: tableId },
                include: [GameSystem, GameType, User, Language, { model: TableReview, include: User }, { model: Application, required: false, where: {
                    userId: userId
                  }} ]
            })

            console.log('UPDATED TABLE*****', updatedTable)
            return res.json(updatedTable);
        }
        return res.json('Must be logged in to apply to a table')
     }));


module.exports = router;
