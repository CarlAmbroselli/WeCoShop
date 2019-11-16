const HOST = "http://localhost:8000";

export default {
  parties: getParties
};

async function getParties() {
  const parties = fetch(`${HOST}/api/v1/search/list`);
}
