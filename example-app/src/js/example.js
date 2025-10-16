import { Sim } from '@capgo/capacitor-sim';

const checkPermissionsButton = document.getElementById('checkPermissionsButton');
const requestPermissionsButton = document.getElementById('requestPermissionsButton');
const getSimCardsButton = document.getElementById('getSimCardsButton');

const statusLine = document.getElementById('statusLine');
const permissionsOutput = document.getElementById('permissionsOutput');
const cardsContainer = document.getElementById('cardsContainer');

const setStatus = (message) => {
  if (statusLine) {
    statusLine.textContent = `Status: ${message}`;
  }
};

const setPermissions = (payload) => {
  if (permissionsOutput) {
    permissionsOutput.textContent = JSON.stringify(payload, null, 2);
  }
};

const renderSimCards = (cards = []) => {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = '';
  if (!cards.length) {
    const note = document.createElement('p');
    note.textContent = 'No SIM cards returned.';
    cardsContainer.appendChild(note);
    return;
  }

  cards.forEach((card) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'card';

    const title = document.createElement('h3');
    title.textContent = card.carrierName || 'Unknown carrier';

    const meta = document.createElement('pre');
    meta.className = 'meta';
    meta.textContent = JSON.stringify(card, null, 2);

    wrapper.appendChild(title);
    wrapper.appendChild(meta);
    cardsContainer.appendChild(wrapper);
  });
};

checkPermissionsButton?.addEventListener('click', async () => {
  try {
    setStatus('Checking permissions...');
    const result = await Sim.checkPermissions();
    setPermissions(result);
    setStatus('Permissions checked');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setPermissions({ error: message });
    setStatus('Check permissions failed');
  }
});

requestPermissionsButton?.addEventListener('click', async () => {
  try {
    setStatus('Requesting permissions...');
    const result = await Sim.requestPermissions();
    setPermissions(result);
    setStatus('Permissions requested');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setPermissions({ error: message });
    setStatus('Request permissions failed');
  }
});

getSimCardsButton?.addEventListener('click', async () => {
  try {
    setStatus('Fetching SIM card info...');
    const result = await Sim.getSimCards();
    renderSimCards(result.simCards);
    setStatus(`Retrieved ${result.simCards.length} SIM card(s)`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    renderSimCards([]);
    setStatus(`Get SIM cards failed: ${message}`);
  }
});
