import Cookies from 'js-cookie';

export const LOAD_TABLES = './locations/LOAD_TABLES';
export const LOAD_SINGLE_TABLE = './locations/LOAD_SINGLE_TABLE';

const loadAllTables = (tableList) => ({
    type: LOAD_TABLES,
    tableList,
  });

  const loadSingleTable = (table) => ({
    type: LOAD_SINGLE_TABLE,
    table,
  });

  export const getAllTables = () => async (dispatch) => {
    const response = await fetch(`/api/tables/`);

    if (response.ok) {
      const tables = await response.json();
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
    console.log('TOKEN', Cookies.get('XSRF-TOKEN'))
    if (response.ok) {
      const tableResults = await response.json();
      console.log('Search Results:   ', tableResults)
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


  const initialState = {
    tableList: [],
    table: {}
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
