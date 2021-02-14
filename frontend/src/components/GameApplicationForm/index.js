import React, { useState, useEffect } from "react";
// import './Search.css';
import {searchTables} from "../../store/tables";
import { useSelector, useDispatch } from "react-redux";
import {  useHistory, useParams } from "react-router-dom";
import { applyToTable } from "../../store/tables";

const GameApplicationForm = () => {
  const dispatch = useDispatch();
  const { tableId } = useParams();
  const history = useHistory();
  const [playStyle, setPlayStyle] = useState("");
  const [characterConcept, setCharacterConcept] = useState("");
  const [whyJoin, setWhyJoin] = useState("");
  const [experience, setExperience] = useState("");
  const updatePlayStyle = (e) => setPlayStyle(e.target.value);
  const updateCharacterConcept = (e) => setCharacterConcept(e.target.value);
  const updateWhyJoin = (e) => setWhyJoin(e.target.value);
  const updateExperience = (e) => setExperience(e.target.value);

  const submitForm = async (e) => {
    e.preventDefault();
    const payload = {
        playStyle,
        characterConcept,
        whyJoin,
        experience,
        tableId
      };
    dispatch(applyToTable(payload));
    console.log('apply to table dispatched', payload);
    history.push(`/tables/${tableId}`)
  };

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div>
            <label htmlFor="playStyle">Describe your play style:</label>
            <input type="text" name="playStyle" value={playStyle} onChange={updatePlayStyle} required></input>
            <label className="question" htmlFor="characterConcept">Describe your character concept for this game:</label>
            <input type="text" name="characterConcept" value={characterConcept} onChange={updateCharacterConcept} required></input>
            <label htmlFor="experience">Describe your experience playing tabletop games:</label>
            <input type="text" name="experience" value={experience} onChange={updateExperience} required></input>
            <label htmlFor="whyJoin">Why do you want to join this game?</label>
            <input type="text" name="whyJoin" value={whyJoin} onChange={updateWhyJoin} required></input>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default GameApplicationForm;
