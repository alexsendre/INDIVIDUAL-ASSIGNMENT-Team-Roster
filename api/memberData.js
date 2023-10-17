import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMembers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const getSingleMember = (fbK) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members/${fbK}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getMembers,
  getSingleMember,
};
