require('dotenv').config();
import axios from 'axios';

const githubID = process.env.CLIENT_ID;
const token = process.env.CLIENT_SECRET;
const params = `?client_id=${githubID}&client_secret=${token}`;

const getProfile = username =>
    axios
        .get(`https://api.github.com/users/${username}${params}`)
        .then(({ data }) => data);

const getRepos = username =>
    axios.get(
        `https://api.github.com/users/${username}/repos${params}&per_page=100`
    );

const getStarCount = repos =>
    repos.data.reduce(
        (count, { stargazers_count }) => count + stargazers_count,
        0
    );

const calculateScore = ({ followers }, repos) =>
    followers * 3 + getStarCount(repos);

const handleError = error => {
    console.warn(error);
    return null;
};

const getUserData = player =>
    Promise.all([getProfile(player), getRepos(player)]).then(
        ([profile, repos]) => ({
            profile,
            score: calculateScore(profile, repos)
        })
    );

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

export const battle = players =>
    Promise.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError);

export const fetchPopularRepos = language => {
    const encodedURI = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );

    return axios.get(encodedURI).then(({ data }) => data.items);
};
