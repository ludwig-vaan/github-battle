require('dotenv').config();

const githubID = process.env.CLIENT_ID;
const token = process.env.CLIENT_SECRET;
const params = `?client_id=${githubID}&client_secret=${token}`;

const getProfile = async username => {
    const data = await fetch(
        `https://api.github.com/users/${username}${params}`
    );

    return data.json();
};
const getRepos = async username => {
    const response = await fetch(
        `https://api.github.com/users/${username}/repos${params}&per_page=100`
    );

    return response.json();
};

const getStarCount = repos =>
    repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);

const calculateScore = ({ followers }, repos) =>
    followers * 3 + getStarCount(repos);

const handleError = error => {
    console.warn(error);

    return null;
};

const getUserData = async player => {
    const [profile, repos] = await Promise.all([
        getProfile(player),
        getRepos(player)
    ]);

    return { profile, score: calculateScore(profile, repos) };
};

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

export const battle = async players => {
    const results = await Promise.all(players.map(getUserData)).catch(
        handleError
    );

    return results === null ? results : sortPlayers(results);
};

export const fetchPopularRepos = async language => {
    const encodedURI = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );
    const data = await fetch(encodedURI).catch(handleError);
    const { items } = await data.json();

    return items;
};
