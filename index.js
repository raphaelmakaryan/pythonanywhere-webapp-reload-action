const core = require('@actions/core');
const axios = require('axios');
const debug = true;

try {
    const username = core.getInput('username');
    const apiToken = core.getInput('api-token');
    if(debug){
        console.log("User : " + username)
        console.log("TOKEN : " + apiToken)
    }

    const url = `https:///www.pythonanywhere.com/api/v0/user/${username}/webapps/${username}.pythonanywhere.com/reload/`
    if(debug){
        console.log("URL : " + url)
    }

    console.log('Trying to reload webapp...')
    
    axios.post(url, null, {
        headers: {"Authorization" : `Token ${apiToken}`}
    })
    .then(function (response) {
        console.log('Reloaded webapp successfully.')
    })
    .catch(function (error) {
        console.log("Une erreur est survenue : ", error)
        core.setFailed(error.message);
    });
} catch (error) {
    console.log("Une erreur est survenue : ", error)
    core.setFailed(error.message);
}
