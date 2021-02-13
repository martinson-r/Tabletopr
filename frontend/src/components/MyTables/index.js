import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPlayerTables } from "../../store/tables";

function MyTables() {

    const sessionUser = useSelector((state) => state.session.user);
    const allUserTables = useSelector(state => state.tables.tableList);
    const { playerId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayerTables())
      }, [dispatch]);

    let playingTables = [];
    const hostedTables = allUserTables.filter(table => table.hostId === sessionUser.id);
        allUserTables.forEach(table => {
            if (table.Player) {
              for (let i = 0; i < table.Player.length; i++) {
                  if (table.Player[i].PlayerList.playerId === sessionUser.id) {
                      playingTables.push(table)
                  }
              }
          }
      });


      if (!sessionUser || !allUserTables.length) {
          return (
              <p>It looks like you don't have any tables yet. Why not join or start a game?</p>
          );
      }

    return (
        <div className="container">
        <h2>Tables I'm Hosting:</h2>
        {!hostedTables[0] && ( <p>It looks like you aren't hosting any tables. Maybe you should think about starting a game!</p>)}
            {hostedTables[0] && (hostedTables.map(table =>(<p><Link to={`/tables/${table.id}`}>{table.GameSystem.gameSystem}: {table.tableName}</Link> - <Link to={`/tables/${table.id}/applications`}>View Applications ({table.Applications.length})</Link> </p>)))}
        <h2>Tables I'm Playing In:</h2>
        <div>{playingTables.map(table =>(<Link to={`/tables/${table.id}`}>
                {<p>{table.GameSystem.gameSystem}: {table.tableName}</p>}</Link>))}</div>
     </div>
    )
}

export default MyTables;
