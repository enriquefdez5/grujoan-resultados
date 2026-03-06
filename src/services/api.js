export async function fetchClubGames(clubId) {

  const response = await fetch(`https://apihq.azzulei.com/v1/games?status=finished&club_id=${clubId}`);

  if (!response.ok) {
    throw new Error("Error llamando a la API");
  }

  const json = await response.json();

  return json.data;
}