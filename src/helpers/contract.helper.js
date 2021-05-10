const fetch = require('node-fetch');
const URL = require('../../config/options.json').baseApiURL
const team_id = require('../../config/options.json').team_id
const getToken = require('./get-token.helper').getAccessToken

export async function getAllContracts() {
    const token = await getToken();
    const response = await fetch(`${URL}/contracts/list?team_id=${team_id}&limit=20`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-auth-token': token
        },
    });

    return response.json();
}