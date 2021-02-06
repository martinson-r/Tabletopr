import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllTables } from "../../store/tables";

function SearchResults() {
    const { tableId } = useParams();
    const dispatch = useDispatch();
    const tables = useSelector(state => state.tables.tableList);
    // const openSpots = table.maxPlayers - table.numPlayers;
    // const [applicationStatus, setApplicationStatus] = "";

    // useEffect(() => {
    //     dispatch(getAllTables());
    //   }, [dispatch]);

      if (!tables) {
          return null;
      }

    return (
        <>
       {tables.map(table =>(<div>{<p><Link to={`/tables/${table.id}`}><b>{table.GameSystem.gameSystem}: {table.tableName}</b></Link>, Hosted by: {table.User.username}</p>}</div>))}
        </>
    )
}

export default SearchResults;
