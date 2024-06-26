export const getPoliticalParties = () => [
  {
    id: 'kmt',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Blue_Sky_White_Sun.png',
    weight: {
      economic: 40,
      civil: 45,
      environmental: 40,
      societal: 35,
      sovereignty: 30,
      us_vs_china: 45,
    },
  },
  {
    id: 'lp',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Labor_Party_%28Taiwan%29_emblem.svg',
    weight: {
      economic: 80,
      civil: 50,
      environmental: 50,
      societal: 50,
      sovereignty: 10,
      us_vs_china: 10,
    },
  },
  {
    id: 'dpp',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Green_Island_with_White_Cross.svg',
    weight: {
      economic: 55,
      civil: 55,
      environmental: 60,
      societal: 60,
      sovereignty: 70,
      us_vs_china: 70,
    },
  },
  {
    id: 'np',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/32/LogoCNP.svg',
    weight: {
      economic: 30,
      civil: 30,
      environmental: 35,
      societal: 25,
      sovereignty: 20,
      us_vs_china: 25,
    },
  },
  {
    id: 'gpt',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Green_Party_Taiwan_logo.png',
    weight: {
      economic: 65,
      civil: 70,
      environmental: 90,
      societal: 75,
      sovereignty: 70,
      us_vs_china: 70,
    },
  },
  {
    id: 'pfp',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/LogoPFP.svg',
    weight: {
      economic: 35,
      civil: 40,
      environmental: 35,
      societal: 30,
      sovereignty: 25,
      us_vs_china: 30,
    },
  },
  {
    id: 'tsu',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Taiwan_orange.svg',
    weight: {
      economic: 40,
      civil: 50,
      environmental: 30,
      societal: 30,
      sovereignty: 80,
      us_vs_china: 70,
    },
  },
  {
    id: 'cupp',
    icon: 'https://upload.wikimedia.org/wikipedia/zh/6/66/China_unify_party_logo.gif',
    weight: {
      economic: 10,
      civil: 10,
      environmental: 20,
      societal: 20,
      sovereignty: 10,
      us_vs_china: 10,
    },
  },
  {
    id: 'npp',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Black_Lik_Gold_Circle.svg',
    weight: {
      economic: 70,
      civil: 70,
      environmental: 80,
      societal: 75,
      sovereignty: 80,
      us_vs_china: 65,
    },
  },
  {
    id: 'sdp',
    icon: 'https://upload.wikimedia.org/wikipedia/zh/2/2b/SDparty_logo.png',
    weight: {
      economic: 60,
      civil: 60,
      environmental: 60,
      societal: 80,
      sovereignty: 70,
      us_vs_china: 70,
    },
  },
  {
    id: 'tsp',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Daijish%C5%8D_in_brown.svg',
    weight: {
      economic: 60,
      civil: 75,
      environmental: 50,
      societal: 60,
      sovereignty: 80,
      us_vs_china: 70,
    },
  },
  {
    id: 'tpp',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Emblem_of_Taiwan_People%27s_Party_2019_Logo_Only.svg',
    weight: {
      economic: 45,
      civil: 45,
      environmental: 45,
      societal: 45,
      sovereignty: 45,
      us_vs_china: 45,
    },
  },
]

export const getPoliticalParty = (id) => getPoliticalParties().filter((value) => value.id == id)[0]
