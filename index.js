const core = require('@actions/core');
const axios = require('axios');

try {
    const username = core.getInput('username');
    const apiToken = core.getInput('api-token');

    const url = `https:///www.pythonanywhere.com/api/v0/user/${username}/webapps/${username}.pythonanywhere.com/reload/`

    console.log('Trying to reload webapp...')
    
    axios.post(url, null, {
        headers: {"Authorization" : `Token ${apiToken}`}
    })
    .then(function (response) {
        console.log('Reloaded webapp successfully.')
    })
    .catch(function (error) {
        core.setFailed(error.message);
        console.log("Une erreur est survenue : ", error)
    });
} catch (error) {
    core.setFailed(error.message);
}
