
import { fetchClubGames } from "../services/api.js";
import { groupGames } from "../utils/grouping.js";
import { sortAges, sortTeams } from "../utils/ordering.js";

const btn = document.getElementById("buscarBtn");
const select = document.getElementById("clubSelect");

const ageTabs = document.getElementById("ageTabs");
const teamsContainer = document.getElementById("teams");
const gamesContainer = document.getElementById("games");

let grouped = {};

btn?.addEventListener("click", async () => {

  const clubId = select.value;

  const games = await fetchClubGames(clubId);

  grouped = groupGames(games);

  renderAgeTabs();

});

function renderAgeTabs(){

  ageTabs.innerHTML = "";

  const ages = sortAges(Object.keys(grouped));

  ages.forEach((age, index) => {

    const btn = document.createElement("button");

    btn.textContent = age;

    btn.onclick = () => renderTeams(age);

    ageTabs?.appendChild(btn);

    if(index === 0) renderTeams(age);

  });

}

function renderTeams(age){

  teamsContainer.innerHTML = "";
  gamesContainer.innerHTML = "";

  const teams = sortTeams(Object.values(grouped[age]));

  teams.forEach(team => {

    const btn = document.createElement("button");

    btn.textContent = `${team.name} (${team.competition})`;

    btn.onclick = () => renderGames(team.games);

    teamsContainer?.appendChild(btn);

  });

}

function renderGames(games){

  gamesContainer.innerHTML = "";

  games
    .sort((a,b)=> a.ts_game_start - b.ts_game_start)
    .forEach(game => {

      const date = new Date(game.ts_game_start * 1000);

      const div = document.createElement("div");

      div.innerHTML = `
        <strong>${game.name}</strong><br>
        ${date.toLocaleString()}<br>
        ID: ${game.id}
        <hr>
      `;

      gamesContainer?.appendChild(div);

    });

}
