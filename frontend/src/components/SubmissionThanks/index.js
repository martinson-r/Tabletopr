import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPlayerTables } from "../../store/tables";

function SubmissionThanks() {

    const sessionUser = useSelector((state) => state.session.user);
    const { playerId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayerTables())
      }, [dispatch]);

    return (
        <div className="container">
            <p>Thank you for your submission!</p>
        </div>
    )
}

export default SubmissionThanks;
