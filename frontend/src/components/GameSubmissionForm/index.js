import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  useHistory, useParams } from "react-router-dom";
import { submitTable } from "../../store/tables";

const GameSubmissionForm = () => {
  const dispatch = useDispatch();
  const { tableId } = useParams();
  const history = useHistory();
  const [tableName, setTableName] = useState("");
  const [description, setDescription] = useState("");
  const [isVirtual, setIsVirtual] = useState(true);
  const [languageId, setLanguageId] = useState(1);
  const [gameTypeId, setGameTypeId] = useState(1);
  const [gameSystemId, setGameSystemId] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(1);
  const updateTableName = (e) => setTableName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGameTypeId = (e) => setGameTypeId(e.target.value);
  const updateGameSystemId = (e) => setGameSystemId(e.target.value);
  const updateLanguageId = (e) => setLanguageId(e.target.value);
  const updateMaxPlayers = (e) => setMaxPlayers(e.target.value);

  const submitForm = async (e) => {
    e.preventDefault();

    const payload = {
        tableName,
        description,
        isVirtual,
        gameTypeId,
        gameSystemId,
        languageId,
        maxPlayers
      };

    dispatch(submitTable(payload));
    console.log('submit table dispatched. Payload: ', payload);
    //ref HeadCanon to see how to send them to the table they created
    // history.push(`/tables/${tableId}`)
  };

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div>
            <label htmlFor="tableName">What is the title of your game?</label>
            <input type="text" name="tableName" value={tableName} onChange={updateTableName} required></input>
            <label htmlFor="description">Describe the game you plan on running:</label>
            <input type="text" name="description" value={description} onChange={updateDescription} required></input>
            <p>Is this a virtual game (Zoom, Discord, etc)?</p>
            <label htmlFor="isVirtualYes">Yes</label>
            <div className="radio"> <input type="radio" name="isVirtualYes" value={true} checked={isVirtual === true}  onClick={() => setIsVirtual(true)} ></input></div>
            <label htmlFor="isVirtualNo">No</label>
            <div className="radio"> <input type="radio" name="isVirtual" value={false} checked={isVirtual === false} onClick={() => setIsVirtual(false)} ></input></div>
            <label>
          What type of game are you running?
          </label>
          <select value={gameTypeId} onChange={updateGameTypeId}>
            <option value={1}>Play by Post</option>
            <option value={2}>Physical Table</option>
            <option value={3}>Zoom</option>
            <option value={4}>LARP</option>
            <option value={5}>Discord</option>
            <option value={6}>Roll20</option>
            <option value={7}>Ventrilo</option>
            <option value={8}>Other (VOIP)</option>
          </select>

        <label>What game system do you plan on using? Please state the specific edition in your game description.</label>
          <select value={gameSystemId} onChange={updateGameSystemId}>
            <option value={1}>Dungeons &amp; Dragons</option>
            <option value={2}>Pathfinder</option>
            <option value={3}>Shadowrun</option>
            <option value={4}>Blue Rose</option>
            <option value={5}>Warrior, Rogue &amp; Mage</option>
            <option value={6}>Labyrinth Lord</option>
            <option value={7}>GURPS</option>
            <option value={8}>World of Darkness</option>
            <option value={9}>Vampire: The Masquerade</option>
            <option value={10}>d20 System (generic)</option>
            <option value={11}>Paranoia</option>
            <option value={12}>Fate</option>
            <option value={13}>Call of Cthulhu</option>
            <option value={14}>d20 Modern</option>
            <option value={15}>Exalted</option>
            <option value={16}>Lamentations of the Flame Princess</option>
            <option value={17}>Warhammer</option>
            <option value={18}>Big Eyes, Small Mouth</option>
            <option value={19}>Mutants &amp; Masterminds</option>
            <option value={20}>TORG</option>
            <option value={21}>7th Sea</option>
            <option value={22}>Dungeon World</option>
            <option value={23}>Champions/Hero</option>
            <option value={24}>Spirit of the Century</option>
            <option value={25}>All Flesh Must Be Eaten</option>
            <option value={26}>Changeling</option>
            <option value={27}>Frontier Space</option>
            <option value={28}>BattleTech</option>
            <option value={29}>Palladium</option>
            <option value={30}>Amber Diceless Roleplaying</option>
            <option value={31}>Marvel Heroic RPG</option>
            <option value={32}>FASERIP</option>
            <option value={33}>Freeform</option>
            <option value={34}>Miscellaneous/Other</option>
          </select>
          What type of game are you running?
          <label>What language will the game primarily be run in?</label>
          <select value={languageId} onChange={updateLanguageId}>
            <option value={1}>English</option>
            <option value={2}>Spanish</option>
            <option value={3}>Portuguese</option>
            <option value={4}>Mandarin Chinese</option>
            <option value={5}>German</option>
            <option value={6}>Hindi</option>
            <option value={7}>Arabic</option>
            <option value={8}>Russian</option>
            <option value={9}>Japanese</option>
            <option value={10}>French</option>
            <option value={12}>Indonesian</option>
            <option value={13}>Urdu</option>
            <option value={14}>Swahili</option>
            <option value={15}>Marathi</option>
            <option value={16}>Other</option>
          </select>
          <label htmlFor="maxPlayers">How many players will you accept?</label>
            <input type="number" name="maxPlayers" value={maxPlayers} onChange={updateMaxPlayers} required></input>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default GameSubmissionForm;
