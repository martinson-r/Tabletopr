import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTables } from "../../store/tables";
import "./Home.css";

function Home() {

    const dispatch = useDispatch();
    const tables = useSelector(state => state.tables.tableList);

    useEffect(() => {
        dispatch(getAllTables());
      }, [dispatch]);

    return (
        <>
        <p>Newest Tables:</p>
        <div className="card-container">
     {tables.map(table =>(<Link to={`/tables/${table.id}`}>{<div className="table-card"><p>{table.GameSystem.gameSystem}:<br />{table.tableName}</p><p>Hosted by:<br />{table.User.username}</p></div>}</Link>))}
     </div>
     </>
    )
}

export default Home;
