import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  realm: import.meta.env.VITE_REACT_APP_IAM_REALM,
  url: import.meta.env.VITE_REACT_APP_IAM_URL,
  clientId: import.meta.env.VITE_REACT_APP_IAM_CLIENT_ID,
});

export default keycloak;
