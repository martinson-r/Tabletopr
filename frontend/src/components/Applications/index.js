import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllApplications } from "../../store/tables";
import { getSingleTable } from "../../store/tables";

function Home() {

    const dispatch = useDispatch();
    const { tableId } = useParams();
    const table = useSelector(state => state.tables.table);
    const applications = useSelector(state => state.tables.applications);

    useEffect(() => {
        dispatch(getSingleTable(tableId));
        dispatch(getAllApplications(tableId));
      }, [dispatch, tableId]);

    if (!applications) {
        return null;
    }

    return (
        <>
        <p>Current applications for <b>{table.tableName}</b>:</p>
        {applications.map(application => <div><p>{application.User.username} - <Link to={`/tables/${tableId}/${application.User.id}/application`}>View Application</Link></p></div>)}
     </>
    )
}

export default Home;
