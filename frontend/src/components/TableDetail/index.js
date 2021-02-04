import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import application from "../../../../backend/db/models/application";
import { getSingleTable } from "../../store/tables";

function TableDetail() {
    const { tableId } = useParams();
    const dispatch = useDispatch();
    const table = useSelector(state => state.tables.table);
    console.log('TABLE', table)
    const openSpots = table.maxPlayers - table.numPlayers;
    const [applicationStatus, setApplicationStatus] = "";

    useEffect(() => {
        dispatch(getSingleTable(tableId));
      }, [dispatch]);

      if (!table.tableName) {
          return null;
      }

      if (table.Applications.length) {
          if (!table.Applications.approved&&!table.Application.denied) {
              setApplicationStatus("Your application is still pending");
          } else if (table.Applications.approved) {
              setApplicationStatus("Your application has been approved. Congratulations!");
          } else {
              setApplicationStatus("Your application has been denied.");
          }
      }

    return (
        <>
        <h2>{table.tableName}</h2>
        <p>Hosted by: {table.User.username}</p>
        <h3>{table.GameSystem.gameSystem}</h3>
        <h2>Game Description:</h2>
        <p>{table.description}</p>
        <p>Language: {table.Language.language}</p>
        {applicationStatus && (<p><i>{applicationStatus}</i></p>)}
        {!applicationStatus && (<button>Apply to this game</button>)}
        {/* If application status is not true in either slot, it's pending approval
        Otherwise, the 'true' one is displayed */}
        <p>Open spots: {openSpots}</p>
        <h3>Reviews:</h3>
        {table.TableReviews.map(review => (<div><p><b>{review.User.username}:</b></p><p>{review.content}</p></div>))}
        </>
    )
}

export default TableDetail;
