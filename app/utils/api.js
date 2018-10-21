const axios = require('axios');

var githubID = '33487210';
var sec = '3bba8c661dffc99771352be9ca5153429b429d14';
const params = '?client_id=' + githubID + '&client_secret=' + sec;

function getProfile() {
    return axios
        .get('https://api.github.com/users/' + username + params)
        .then(function(user) {
            console.log(user);
            return user.data;
        });
}

function getRepos(username) {
    return axios
        .get(
            'https://api.github.com/users/' +
                username +
                '/repos' +
                params +
                '&per_page=100'
        )
        .then(function(user) {
            console.log(user);
            return user.data;
        });
}
function getStarCountRepos(repos) {
    return repos.data.reduce(function(count, repo) {
        return count + repos.stargazers_count;
    }, 0);
}

function calculateScore(profile, repos) {
    const followers = profile.followers;
    const totalStars = getStarCountRepos(repos);

    return followers * 3 + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    axios.all([getProfile(player), getRepos(player)]).then(function(data) {
        const profile = data[0];
        const repos = data[1];
        return {
            profile: profile,
            score: calculateScore(profile, repos)
        };
    });
}

function sortPlayers(players) {
    return player.sort(function(a, b) {
        return a.score - b.score;
    });
}
module.exports = {
    fetchPopularRepos: function(language) {
        // see github
        const encodedURI = window.encodeURI(
            `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
        );
        return axios.get(encodedURI).then(function(response) {
            return response.data.items;
        });
    },
    battle: function(players) {
        return axios
            .all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError);
    }
};
