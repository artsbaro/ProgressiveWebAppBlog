var blogService = require('./blogService.js');

window.pageEvents = {
    loadBlogPost: function (link) {
        blogService.loadBlogPost(link);
    },
loadMoreBlogPosts: function () {
    blogService.loadMoreBlogPosts();
}
};

blogService.loadLatestBlogPosts();