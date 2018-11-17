require('dotenv').config();
const axios = require('axios');

const githubID = process.env.CLIENT_ID;
const token = process.env.CLIENT_SECRET;
const params = `?client_id=${githubID}&client_secret=${token}`;

const getProfile = username =>
    axios
        .get(`https://api.github.com/users/${username}${params}`)
        .then(({ data }) => data);
// then( user => user.data )
// then( ( { data } ) => data )

// function getProfile(username) {
//     return axios
//         .get('https://api.github.com/users/' + username + params)
//         .then(function(user) {
//             return user.data;
//         });
// }

const getRepos = username =>
    axios.get(
        `https://api.github.com/users/${username}/repos${params}&per_page=100`
    );

// function getRepos(username) {
//     return axios.get(
//         'https://api.github.com/users/' +
//             username +
//             '/repos' +
//             params +
//             '&per_page=100'
//     );
// }

const getStarCount = repos =>
    repos.data.reduce(
        (count, { stargazers_count }) => count + stargazers_count,
        0
    );

// function getStarCount(repos) {
//     return repos.data.reduce(function(count, repo) {
//         return count + repo.stargazers_count;
//     }, 0);
// }

const calculateScore = ({ followers }, repos) =>
    followers * 3 + getStarCount(repos);

// function calculateScore(profile, repos) {
//     var followers = profile.followers;
//     var totalStars = getStarCount(repos);

//     return followers * 3 + totalStars;
// }

const handleError = error => {
    console.warn(error);
    return null;
};

// function handleError(error) {
//     console.warn(error);
//     return null;
// }

const getUserData = player =>
    Promise.all([getProfile(player), getRepos(player)]).then(
        ([profile, repos]) => ({
            profile,
            score: calculateScore(profile, repos)
        })
    );

// function getUserData(player) {
//     return axios
//         .all([getProfile(player), getRepos(player)])
//         .then(function(data) {
//             var profile = data[0];
//             var repos = data[1];

//             return {
//                 profile: profile,
//                 score: calculateScore(profile, repos)
//             };
//         });
// }

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

// function sortPlayers(players) {
//     return players.sort(function(a, b) {
//         return b.score - a.score;
//     });
// }

module.exports = {
    battle(players) {
        return Promise.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError);
    },

    // battle: function(players) {
    //     return axios
    //         .all(players.map(getUserData))
    //         .then(sortPlayers)
    //         .catch(handleError);
    // },

    fetchPopularRepos(language) {
        const encodedURI = window.encodeURI(
            `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
        );

        return axios.get(encodedURI).then(({ data }) => data.items);
    }

    // fetchPopularRepos: function(language) {
    //     var encodedURI = window.encodeURI(
    //         'https://api.github.com/search/repositories?q=stars:>1+language:' +
    //             language +
    //             '&sort=stars&order=desc&type=Repositories'
    //     );

    //     return axios.get(encodedURI).then(function(response) {
    //         return response.data.items;
    //     });
    // }
};
