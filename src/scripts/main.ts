
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

  showLoading();

  try {
    const clubId = select.value;

    const games = await fetchClubGames(clubId);

    grouped = groupGames(games);

    renderAgeTabs();
  } catch (error) {
    console.error("Error fetching games:", error);
  }
  finally {
    hideLoading();
  }
});

function renderAgeTabs() {

  ageTabs.innerHTML = "";

  ageTabs.className = "flex gap-2 border-b border-gray-200 mb-4 overflow-x-auto";

  const ages = sortAges(Object.keys(grouped));

  ages.forEach((age, index) => {

    const btn = document.createElement("button");

    btn.textContent = age;

    btn.className =
      "age-tab px-4 py-2 text-sm font-medium rounded-t-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition";

    btn.onclick = () => {
      renderTeams(age);
      setActiveTab(btn);
    };

    ageTabs?.appendChild(btn);

    if (index === 0) {
      setActiveTab(btn);
      renderTeams(age);
    }

  });
}
function setActiveTab(activeBtn: HTMLButtonElement) {

  document.querySelectorAll(".age-tab").forEach((btn) => {
    btn.classList.remove("bg-blue-600", "text-white");
    btn.classList.add("bg-gray-100", "text-gray-700");
  });

  activeBtn.classList.remove("bg-gray-100", "text-gray-700");
  activeBtn.classList.add("bg-blue-600", "text-white");

}

function renderTeams(age: string) {

  teamsContainer.innerHTML = "";
  gamesContainer.innerHTML = "";

  teamsContainer.className =
    "flex flex-wrap gap-2 mb-6";

  const teams = sortTeams(Object.values(grouped[age]));

  teams.forEach((team, index) => {

    const btn = document.createElement("button");

    btn.textContent = `${team.name} (${team.competition})`;

    btn.className =
      "team-tab px-3 py-1.5 text-sm rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition";

    btn.onclick = () => {
      renderGames(team.games);
      setActiveTeam(btn);
    };

    teamsContainer?.appendChild(btn);

    if (index === 0) {
      setActiveTeam(btn);
      renderGames(team.games);
    }

  });

}

function setActiveTeam(activeBtn: HTMLButtonElement) {

  document.querySelectorAll(".team-tab").forEach((btn) => {
    btn.classList.remove("bg-blue-600", "text-white", "border-blue-600");
    btn.classList.add("bg-white", "text-gray-700", "border-gray-300");
  });

  activeBtn.classList.remove("bg-white", "text-gray-700", "border-gray-300");
  activeBtn.classList.add("bg-blue-600", "text-white", "border-blue-600");

}
const BASE_GAME_URL = "https://hqsport.plus/game/";

function renderGames(games: any[]) {

  gamesContainer.innerHTML = "";
  gamesContainer.className = "grid gap-4";

  games
    .sort((a, b) => a.ts_game_start - b.ts_game_start)
    .forEach((game) => {

      const date = new Date(game.ts_game_start * 1000);

      const link = document.createElement("a");
      link.href = `${BASE_GAME_URL}${game.id}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      link.className =
        "block bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer";

      link.innerHTML = `
        <div class="flex justify-between items-start mb-3 text-sm text-gray-500">
          <div class="flex gap-3">
            <span>${date.toLocaleDateString()}</span>
            <span>${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>

          <span class="text-gray-400 group-hover:text-blue-600 transition">
            ↗
          </span>
        </div>

        <div class="flex items-center justify-between gap-4">

          <div class="flex items-center gap-2 flex-1">
            <img
              src="${game.team1.logo || '/default-team.svg'}"
              alt="${game.team1.name}"
              class="w-8 h-8 object-contain rounded-full bg-gray-50 p-1"
              onerror="this.src='/default-team.svg'"
            />
            <span class="font-semibold text-gray-800">
              ${game.team1.name}
            </span>
          </div>

          <div class="text-gray-400 font-semibold text-sm">
            vs
          </div>

          <div class="flex items-center gap-2 justify-end flex-1">
            <span class="font-semibold text-gray-800 text-right">
              ${game.team2.name}
            </span>
            <img
              src="${game.team2.logo || '/default-team.svg'}"
              alt="${game.team2.name}"
              class="w-8 h-8 object-contain rounded-full bg-gray-50 p-1"
              onerror="this.src='/default-team.svg'"
            />
          </div>

        </div>
      `;

      gamesContainer.appendChild(link);

    });

}

const loading = document.getElementById("loading");

function showLoading() {
  loading?.classList.remove("hidden");
}

function hideLoading() {
  loading?.classList.add("hidden");
}