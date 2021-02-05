import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllApplications } from "../../store/tables";
import { getSingleTable } from "../../store/tables";
import { approveApplication } from "../../store/tables";
import { denyApplication } from "../../store/tables";

function ApplicationDetail() {

    const dispatch = useDispatch();
    const { tableId } = useParams();
    const { playerId } = useParams();
    const [applicationStatus, setApplicationStatus] = useState("");

    console.log(playerId);

    const table = useSelector(state => state.tables.table);
    const applications = useSelector(state => state.tables.applications);
    const currentApplication = applications.filter(application => application.userId == parseInt(playerId))
    // console.log(currentApplication[0].approved);

    useEffect(() => {
        dispatch(getSingleTable(tableId));
        dispatch(getAllApplications(tableId));
      }, [dispatch, tableId, playerId]);

    useEffect(() => {
        if (currentApplication[0]) {
            if (currentApplication[0].approved == true) {
                setApplicationStatus("This application has been approved.");
            } else if (currentApplication[0].denied == true) {
                setApplicationStatus("This application has been denied.");
            }
        }
    }, [currentApplication])

      const handleApprove = (e) => {
          e.preventDefault();
          const payload = {
              approved: true,
              playerId,
              tableId
          }
        dispatch(approveApplication(payload))
      }

      const handleDeny = (e) => {
          e.preventDefault();
        const payload = {
            denied: true,
            playerId,
            tableId
        }
      dispatch(denyApplication(payload))
    }

    if (!applications.length) {
        return null;
    }



    return (
        <>
       <h2>{currentApplication[0].User.username}'s Application</h2>
       <p>Why Join?</p>
       <p>{currentApplication[0].whyJoin}</p>
       <p>Character Concept:</p>
       <p>{currentApplication[0].characterConcept}</p>
       <p>Play Style:</p>
       <p>{currentApplication[0].playStyle}</p>
       <p>Experience:</p>
       <p>{currentApplication[0].experience}</p>
       {(currentApplication[0].approved || currentApplication[0].denied) && (
           <p>Application status: {applicationStatus}</p>
       )}
       {(!currentApplication[0].approved && !currentApplication[0].denied) && (
           <>
        <button onClick={handleApprove}>Approve</button>
        <button onClick={handleDeny}>Deny</button>
        </>
       )}
     </>
    )
}

export default ApplicationDetail;
