const HOST = "http://localhost:8000";

export default {
  parties: getParties,
  createParty: createParty,
  getCurrentUser,
  findLocation
};

async function getCurrentUser() {
  const user = await fetch(`${HOST}/api/v1/me`, {
    credentials: "include"
  }).then(response => response.json());
  return user;
}

async function getParties() {
  const parties = await fetch(`${HOST}/api/v1/party/list`, {
    credentials: "include"
  }).then(response => response.json());
  return parties;
}

async function findLocation(text) {
  const locations = await fetch(`${HOST}/api/v1/search/location/${text}`, {
    credentials: "include"
  }).then(response => response.json());
  return locations;
}

async function createParty(data) {
  const parties = await fetch(`${HOST}/api/v1/party/create`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data)
  }).then(response => response.json());
  return parties;
}
