async function gitPullApp() {
    try {
        const username = process.env.PYANYWHERE_USERNAME;
        const apiToken = process.env.PYANYWHERE_API_TOKEN;
        const consoleId = process.env.PYANYWHERE_CONSOLE_ID;

        const url = `https://www.pythonanywhere.com/api/v0/user/${username}/consoles/${consoleId}/send_input/`;

        console.log("Essaie du fetch sur l'url : ", url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${apiToken}`,
                'Content-Type': 'text/plain'
            },
            body: 'git pull'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Git pull exécuté avec succès:", data);

    } catch (error) {
        console.error("❌ Une erreur est survenue :", error);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
    }
}


async function reloadWeb() {
    try {
        const username = process.env.PYANYWHERE_USERNAME;
        const apiToken = process.env.PYANYWHERE_API_TOKEN;

        const url = `https://www.pythonanywhere.com/api/v0/user/${username}/webapps/${username}.pythonanywhere.com/reload/`;

        console.log("Essaie du fetch sur l'url : ", url);

        await fetch(url, {
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
}

await gitPullApp();
await reloadWeb();