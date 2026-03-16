export const ageOrder = [
  "senior",
  "juvenil",
  "cadete",
  "infantil",
  "alevín",
  "benjamín",
  "prebenjamín"
];

export const competitionOrder = [
  "Liga Nacional",
  "1ª JUVENIL",
  "2ª JUVENIL",
  "3ª JUVENIL",

  "1ª CADETE",
  "2ª CADETE",
  "3ª CADETE",

  "1ª INFANTIL",
  "2ª INFANTIL",
  "3ª INFANTIL",

  "1ª ALEVIN",
  "2ª ALEVIN",
  "3ª ALEVIN",

  "1ª BENJAMIN",
  "2ª BENJAMIN",
  "3ª BENJAMIN",
  
  "1ª PREBENJAMIN",
  "2ª PREBENJAMIN",
  "3ª PREBENJAMIN"
];

export function sortAges(ages){
  return ages.sort((a,b)=> ageOrder.indexOf(a) - ageOrder.indexOf(b));
}

export function sortTeams(teams){
  return teams.sort((a,b)=>
    competitionOrder.indexOf(a.competition) -
    competitionOrder.indexOf(b.competition)
  );
}