const axios = require('axios');

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

    fetchPopularReactRepos: function(language) {
        // see github
    },

    fetchPopularReactNativeRepos: function(language) {
        // see github
    }
};
