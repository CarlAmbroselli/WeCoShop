const HOST = "http://localhost:8000";

export default {
  parties: getParties
};

async function getParties() {
  const parties = await fetch(`${HOST}/api/v1/party/list`).then(response =>
    response.json()
  );
  console.log("Having parties", parties);
  return parties;
}
