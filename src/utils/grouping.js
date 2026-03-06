export function groupGames(games){

  const grouped = {};

  games.forEach(game => {

    const age = game.competition.age_category.name;
    const teamId = game.team1.id;

    if(!grouped[age]) grouped[age] = {};

    if(!grouped[age][teamId]){
      grouped[age][teamId] = {
        name: game.team1.name,
        competition: game.competition.name,
        games: []
      };
    }

    grouped[age][teamId].games.push(game);

  });

  return grouped;
}