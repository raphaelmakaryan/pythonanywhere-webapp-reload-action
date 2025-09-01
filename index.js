const axios = require('axios');
const core = require('@actions/core');

async function run() {
    try {
        const username = core.getInput('username');
        const apiToken = core.getInput('api-token');
        console.log("User:", username);
        console.log("TOKEN:", apiToken);

        const url = `https://www.pythonanywhere.com/api/v0/user/${username}/webapps/${username}.pythonanywhere.com/reload/`;
        console.log("URL:", url);

        console.log('Trying to reload webapp...');
        const response = await axios.post(url, null, {
            headers: {"Authorization" : `Token ${apiToken}`}
        });

        console.log("✅ Reloaded webapp successfully:", response.status);

    } catch (error) {
        console.error("❌ Une erreur est survenue :", error.response ? error.response.data : error.message);
        core.setFailed(error.message);
    }
}

run();
