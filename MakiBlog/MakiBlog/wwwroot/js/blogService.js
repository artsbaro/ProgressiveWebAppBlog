define(['./template.js','../lib/showdown/showdown.js'], function (template, showdown) {

    var blogLatestPostsUrl = '/Home/LatestBlogPosts/';
    var blogPostUrl = '/Home/Post/?link=';
    var blogMorePostsUrl = '/Home/MoreBlogPosts/?oldestBlogPostId=';
    var oldestBlogPostId = 0;

    function setOldestBlogPostId(data) {
        var ids = data.map(item => item.postId);
        oldestBlogPostId = Math.min(...ids);
    }

    function loadLatestBlogPosts() {
        fetch(blogLatestPostsUrl)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                template.appendBlogList(data);
                setOldestBlogPostId(data);
            });
    }

    function loadBlogPost(link) {
        fetch(blogPostUrl + link)
            .then(function (response) {
                return response.text();
            }).then(function (data) {
                var converter = new showdown.Converter();
                html = converter.makeHtml(data);
                template.showBlogItem(html, link);
                window.location = '#' + link;
            });
    }

    function loadMoreBlogPosts() {
        fetch(blogMorePostsUrl + oldestBlogPostId)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                template.appendBlogList(data);
                setOldestBlogPostId(data);
            });
    }

return {
    loadLatestBlogPosts: loadLatestBlogPosts,
    loadBlogPost: loadBlogPost,
    loadMoreBlogPosts: loadMoreBlogPosts
}
});