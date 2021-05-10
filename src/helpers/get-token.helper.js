const fetch = require('node-fetch');
const user = require('../../config/credentials.json')
const URL = require('../../config/options.json').baseApiURL

export async function getAccessToken() {
    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ email: user.Login, password: user.Password, recaptcha: null, totp: null }),
    });

    if (response.status === 401) {
        throw new Error(`Unauthorized.\n${appURL}`);
    }

    const json = await response.json(); 
    return json.token;
}