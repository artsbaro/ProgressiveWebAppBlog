define(['./template.js', '../lib/showdown/showdown.js', './clientStorage.js'], function (template, showdown, clientStorage) {

    var blogLatestPostsUrl = '/Home/LatestBlogPosts/';
    var blogPostUrl = '/Home/Post/?link=';
    var blogMorePostsUrl = '/Home/MoreBlogPosts/?oldestBlogPostId=';

    function fetchPromise(url) {
        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    clientStorage.addPosts(data)
                        .then(function () {
                            resolve('The connection is OK, showing latest results');
                        });
                }).catch(function (e) {
                    resolve('No connection, showing offline results');
                });

            setTimeout(function () { resolve('The connection is hanging, showing offline results'); }, 5000);
        });
    }

    function loadData(url) {
        fetchPromise(url)
            .then(function (status) {
                $('#connection-status').html(status);

                clientStorage.getPosts()
                    .then(function (posts) {
                        template.appendBlogList(posts);
                    })
            });
    }

    function loadLatestBlogPosts() {
        loadData(blogLatestPostsUrl);
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
        loadData(blogMorePostsUrl + clientStorage.getOldestBlogPostId());
    }

    return {
        loadLatestBlogPosts: loadLatestBlogPosts,
        loadBlogPost: loadBlogPost,
        loadMoreBlogPosts: loadMoreBlogPosts
    }
});