import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getHostTables } from "../../store/tables";
import { getPlayerTables } from "../../store/tables";

function MyTables() {

    const sessionUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();
    const allUserTables = useSelector(state => state.tables.tableList);
    let playingTables = [];

    const hostedTables = allUserTables.filter(table => table.hostId === sessionUser.id);
    // const playingTables = allUserTables.filter()
    allUserTables.forEach(table => {
        for (let i = 0; i < table.Player.length; i++) {
            if (table.Player[i].PlayerList.playerId === sessionUser.id) {
                playingTables.push(table)
            }
        }
    });

    console.log(playingTables);

    useEffect(() => {
        dispatch(getPlayerTables());
        console.log('playertables dispatched');
      }, [dispatch]);

      if (!allUserTables) {
          return null;
      }

    return (
        <>
        <p>Tables I'm Hosting:</p>

            {hostedTables.map(table =>(<Link to={`/tables/${table.id}`}>
                {<p>{table.GameSystem.gameSystem}: {table.tableName} - View Applications ({table.Applications.length}) </p>}</Link>))}

        <p>Tables I'm Playing In:</p>
        {playingTables.map(table =>(<Link to={`/tables/${table.id}`}>
                {<p>{table.GameSystem.gameSystem}: {table.tableName}</p>}</Link>))}
     </>
    )
}

export default MyTables;
