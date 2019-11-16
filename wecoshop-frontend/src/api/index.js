const HOST = "http://localhost:8000";

export default {
  parties: getParties,
  createParty: createParty,
  getCurrentUser,
  findLocation,
  getParty,
  findItems,
  addItemToParty
};

async function getCurrentUser() {
  const user = await fetch(`${HOST}/api/v1/me`, {
    credentials: "include"
    // mode: "same-origin"
  }).then(response => response.json());
  return user;
}

async function getParties() {
  const parties = await fetch(`${HOST}/api/v1/party/list`, {
    credentials: "include"
    // mode: "same-origin"
  }).then(response => response.json());
  return parties;
}

async function findLocation(text) {
  const locations = await fetch(`${HOST}/api/v1/search/location/${text}`, {
    credentials: "include"
    // mode: "same-origin"
  }).then(response => response.json());
  return locations;
}

async function findItems(text, page) {
  const items = await fetch(`${HOST}/api/v1/search/item/${text}/${page}`, {
    credentials: "include"
    // mode: "same-origin"
  }).then(response => response.json());
  return items;
}

async function getParty(partyId) {
  console.log(
    "Query party",
    partyId,
    `${HOST}/api/v1/party/${partyId}/details`
  );
  return await fetch(`${HOST}/api/v1/party/${partyId}/details`, {
    credentials: "include"
    // mode: "same-origin"
  }).then(response => response.json());
}

async function createParty(data) {
  const parties = await fetch(`${HOST}/api/v1/party/create`, {
    method: "POST",
    credentials: "include",
    // mode: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  }).then(response => response.json());
  return parties;
}

async function addItemToParty(partyId, data) {
  const parties = await fetch(`${HOST}/api/v1/party/${partyId}/addItem`, {
    method: "POST",
    credentials: "include",
    // mode: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  }).then(response => response.json());
  return parties;
}
