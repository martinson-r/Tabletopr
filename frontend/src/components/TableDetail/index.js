import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import application from "../../../../backend/db/models/application";
import { getSingleTable } from "../../store/tables";

function TableDetail() {
    const { tableId } = useParams();
    const dispatch = useDispatch();
    const table = useSelector(state => state.tables.table);
    const sessionUser = useSelector((state) => state.session.user);
    const openSpots = table.maxPlayers - table.numPlayers;
    const [applicationStatus, setApplicationStatus] = useState([false, ""]);

    useEffect(() => {
        dispatch(getSingleTable(tableId));
        console.log("Got table");
}, [dispatch, tableId]);

useEffect(() => {
    if (table.Applications) {
        console.log("Apps filtering");
        if (table.Applications.length) {
            const matchingApp = table.Applications.filter(application => application.userId === sessionUser.id);
            if (matchingApp) {
                console.log('matchingApp', matchingApp)
                if (matchingApp[0].denied) {
                    setApplicationStatus([true, "Your application has been denied."])
                } else if (matchingApp[0].approved) {
                    setApplicationStatus([true, "Your application has been approved"])
                } else {
                    console.log('neither true nor false');
                    setApplicationStatus([true, "Your application is still being reviewed."])
                }
            }
        }
    }

}, [tableId])

      if (!table.tableName) {
          return null;
      }

    return (
        <>
        <h2>{table.tableName}</h2>
        <p>Hosted by: {table.User.username}</p>
        <h3>{table.GameSystem.gameSystem}</h3>
        <h2>Game Description:</h2>
        <p>{table.description}</p>
        <p>Language: {table.Language.language}</p>
        {(applicationStatus[0]) && (<p><i>{applicationStatus[1]}</i></p>)}
        {(!applicationStatus[0]) && (<Link to={`/tables/${tableId}/apply`}>Apply to this game</Link>)}
        <p>Open spots: {openSpots}</p>
        <h3>Reviews:</h3>
        {!table.TableReviews.length && (<p>There are no reviews for this table, yet.</p>)}
        {table.TableReviews && (table.TableReviews.map(review => (<div><p><b>{review.User.username}:</b></p><p>{review.content}</p></div>)))}
        </>
    )
}

export default TableDetail;
