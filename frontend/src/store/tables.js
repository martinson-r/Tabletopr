import Cookies from 'js-cookie';

export const LOAD_TABLES = './locations/LOAD_TABLES';
export const LOAD_SINGLE_TABLE = './locations/LOAD_SINGLE_TABLE';
export const LOAD_ALL_APPLICATIONS = './locations/LOAD_ALL_APPLICATIONS';
export const LOAD_SINGLE_APPLICATION = './locations/LOAD_SINGLE_APPLICATION';
export const LOAD_FELLOW_PLAYERS = './locations/LOAD_FELLOW_PLAYERS';

const loadAllTables = (tableList) => ({
    type: LOAD_TABLES,
    tableList,
  });

  const loadSingleTable = (table) => ({
    type: LOAD_SINGLE_TABLE,
    table,
  });


  const loadSingleApplication = (application) => ({
    type: LOAD_SINGLE_APPLICATION,
    application,
  });

  const loadAllApplications = (applications) => ({
    type: LOAD_ALL_APPLICATIONS,
    applications,
  });

  const loadFellowPlayers = (players) => ({
    type: LOAD_FELLOW_PLAYERS,
    players,
  })

  export const getAllTables = () => async (dispatch) => {
    const response = await fetch(`/api/tables/`);

    if (response.ok) {
      const tables = await response.json();
      dispatch(loadAllTables(tables));
    }
  };

  export const getAllApplications = (tableId) => async (dispatch) => {
    const response = await fetch(`/api/tables/${tableId}/applications`);

    if (response.ok) {
      const applications = await response.json();
      dispatch(loadAllApplications(applications));
    }
  };

  export const getPlayerTables = (playerId) => async (dispatch) => {
    console.log('player tables got');
    const response = await fetch(`/api/tables/players/${playerId}`);

    if (response.ok) {
      const tables = await response.json();
      console.log('THUNK TABLES', tables);
      dispatch(loadAllTables(tables));
    }
  };


  export const getSingleTable = (id) => async (dispatch) => {
    const response = await fetch(`/api/tables/${id}`);
    if (response.ok) {
      const table = await response.json();
      dispatch(loadSingleTable(table));
    }
  };

  export const searchTables = (payload) => async (dispatch) => {
    const { query } = payload;
    const response = await fetch(`/api/tables/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "XSRF-Token": `${Cookies.get('XSRF-TOKEN')}` },
      body: JSON.stringify({
        query
      })
    });
    if (response.ok) {
      const tableResults = await response.json();
      dispatch(loadAllTables(tableResults));
    }
  };

  export const applyToTable = (payload) => async (dispatch) => {
    const { playStyle,
      characterConcept,
      whyJoin,
      experience,
      tableId } = payload;
    const response = await fetch(`/api/tables/${tableId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "XSRF-Token": `${Cookies.get('XSRF-TOKEN')}` },
      body: JSON.stringify({
        playStyle,
        characterConcept,
        whyJoin,
        experience,
        tableId
      })
    });
    if (response.ok) {
      const updatedTable = await response.json();
      dispatch(loadSingleTable(updatedTable));
    }
  };


  export const submitTable = (payload) => async (dispatch) => {
    const { tableName, description, isVirtual, gameTypeId, gameSystemId, languageId, maxPlayers } = payload;
    const response = await fetch(`/api/tables`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "XSRF-Token": `${Cookies.get('XSRF-TOKEN')}` },
      body: JSON.stringify({
        tableName,
        description,
        isVirtual,
        gameTypeId,
        gameSystemId,
        languageId,
        maxPlayers
      })
    });
    if (response.ok) {
      const updatedTable = await response.json();
      dispatch(loadSingleTable(updatedTable));
    }
  };

  export const approveApplication = (payload) => async (dispatch) => {
    const { approved, tableId, playerId } = payload;
    console.log('payload', payload)
    const response = await fetch(`/api/tables/${tableId}/${playerId}/application`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "XSRF-Token": `${Cookies.get('XSRF-TOKEN')}` },
      body: JSON.stringify({
        approved,
        denied: false,
        tableId,
        playerId
      })
    });
    if (response.ok) {
      const applications = await response.json();
      console.log('APPLICATIONS RESPONSE', applications);
      dispatch(loadSingleApplication(applications));
    }
  };

  export const denyApplication = (payload) => async (dispatch) => {
    const { denied, tableId, playerId } = payload;
    console.log('payload', payload)
    const response = await fetch(`/api/tables/${tableId}/${playerId}/application`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "XSRF-Token": `${Cookies.get('XSRF-TOKEN')}` },
      body: JSON.stringify({
        approved: false,
        denied,
        tableId,
        playerId
      })
    });
    if (response.ok) {
      const applications = await response.json();
      dispatch(loadSingleApplication(applications));
    }
  };

  export const getFellowPlayers = () => async (dispatch) => {

      const response = await fetch('api/tables/playerlists');

      if (response.ok) {
        const playerList = await response.json();
        dispatch(loadFellowPlayers(playerList));
      };
  };


  const initialState = {
    tableList: [],
    table: {},
    applications: []
  }

  const tableReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
      case LOAD_TABLES: {
            return {
              ...state,
              tableList: action.tableList,
            };
        }
        case LOAD_SINGLE_TABLE: {
            return {
              ...state,
              table: action.table,
            };
        }
        case LOAD_ALL_APPLICATIONS: {
          return {
            ...state,
            applications: action.applications,
          };
      }
      case LOAD_SINGLE_APPLICATION: {
        // let applications = [];
        // for (let key in action.application) {
        //   applications.push(action.application[key])
        // }
        return {
          ...state,
          applications: [action.application]
        };
      }
      case LOAD_FELLOW_PLAYERS: {
        return {
          ...state,
          players: action.players,
        }
      }
    //     case ADD_LISTING: {
    //         if (!state[action.locationlist.id]) {
    //             const newState = {
    //               ...state,
    //               [action.locationlist.id]: action.locationlist
    //             };
    //             const locationList = newState.locationlist.map(location => newState[location.id]);
    //             locationList.push(action.shelf);
    //             newState.shelf = locationList;
    //             return newState;
    //           }
    //           return {
    //             ...state,
    //             [action.locationlist.id]: {
    //               ...state[action.locationlist.id],
    //               ...action.locationlist,
    //             }
    //           };
    //         }
    //        case LOAD_SEARCH: {

    //         return {
    //           ...state,
    //           locationlist: action.locationlist[0].closeProximityLocations,
    //           searchLocation: action.locationlist[1]
    //         };
    // }

        default:
          return state;
      }
  }

export default tableReducer;
