try {
    const username = core.getInput('username');
    const apiToken = core.getInput('api-token');
    console.log("User:", username);
    console.log("TOKEN:", apiToken);

    const url = `https://www.pythonanywhere.com/api/v0/user/${username}/webapps/${username}.pythonanywhere.com/reload/`;
    console.log("URL:", url);

    console.log('Trying to reload webapp...');

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${apiToken}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Reloaded webapp successfully:", data);
        })
        .catch(error => {
            console.error("❌ Une erreur est survenue :", error);
        });

} catch (error) {
    console.error("❌ Une erreur est survenue :", error);
    if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
    }
}