async function Gitdata() {
    const form = document.getElementById("text");
    fetch(`https://api.github.com/users/${form.value}`)
        .then(responseData => responseData.json())
        .then(dataTransfer => {
            const repos = dataTransfer.public_repos;
            return Promise.all([
                dataTransfer,
                fetch(`https://api.github.com/users/${form.value}/repos?type=owner&per_page=${repos}`)
            ]);
        })
        .then(([dataTransfer, responseData]) => Promise.all([dataTransfer, responseData.json()]))
        .then(([dataTransfer, reposform]) => {
            const content = reposform.reduce((acc, repo) => acc + repo.forks_count, 0);
            const script = document.getElementById("script-display");
            script.innerHTML = `
            <p>Name: ${dataTransfer.name ? dataTransfer.name : 'Not found'}</p>
            <p>Bio: ${dataTransfer.bio ? dataTransfer.bio : 'Not found'}</p>
            <p>Followers: ${dataTransfer.followers ? dataTransfer.followers : 'Not found'}</p>
            <p>Following: ${dataTransfer.following ? dataTransfer.following : '0'}</p>
            <p>Joined: ${new Date(dataTransfer.created_at ? dataTransfer.created_at : 'Not found').toLocaleDateString()}</p>
            <p>Total Repositories: ${dataTransfer.public_repos ? dataTransfer.public_repos : 'Repos not found'}</p>
            <p>Total Forks: ${content}</p>
            `;
            script.style.border = "1px solid gray";
            script.style.padding = "10px";
            script.style.borderRadius = "5px";
        })
        .catch(error => console.error(error));
}

async function scraper() {
    const url = document.getElementById("url-web");
    const div = document.getElementById("div-btn");
    const show = document.getElementById("script-show");
    div.addEventListener("click", () => {
        const fetching = url.value;
        fetch(fetching)
            .then(response => response.json())
            .then(fetchurl => {
                show.innerText = JSON.stringify(fetchurl, null, 2)
                show.style.border = "1px solid gray";
                show.style.padding = "10px";
                show.style.borderRadius = "5px";
            })
            .catch(nullerror => {
                show.innerText = "Error url have never json format" + nullerror.message;
            });
    });
}
scraper();

async function copyClipboard() {
    const formatText = document.getElementById("script-show");
    navigator.clipboard.writeText(formatText.textContent);
}

async function copyanother() {
    const textCopy = document.getElementById("script-display");
    navigator.clipboard.writeText(textCopy.textContent);
}

const link = () => {
    const linkOpen = document.getElementById("link-web");
    linkOpen.addEventListener("click", () => {
        window.open("https://www.facebook.com/Techabm", "_blank");
    })
}
link();

const reposElement = () => {
    const liveRepos = document.getElementById("total-repos");
    fetch("https://api.github.com/users/Technical-Abm/repos")
        .then(resp => resp.json())
        .then(data => {
            const repoData = data.length;
            liveRepos.textContent = repoData
        })
}
reposElement();

const refreshReload = () => {
    const reload = document.getElementById("refreshPage")
    reload.addEventListener("click", () => {
        location.reload();
    })
}
refreshReload();