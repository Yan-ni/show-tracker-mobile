// never push this varibla as true
const isDevelopment = false;

export const BASE_URL = isDevelopment ? 'http://localhost:5000': 'https://show-tracker-server.herokuapp.com';