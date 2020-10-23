const app = new Vue({
    el: '#app',
    data: {
        // Statement
        errorMsg: "",
        successMsg: "",
        // CRUD Post
        showCreatePost: false,
        showEditPost: false,
        showDeletePost: false,
        showOfferChoose: false,
        // CRUD Comment
        showComment: false, //showCommentById
        showEditComment: false,
        showDeleteComment: false,
        posts: {},
        newPost: {
            content: "",
            offer: "",
        },
        currentPost: {},
        currentUser: {}
    },
    mounted: function () {
        this.getAllPosts();
    },
    methods: {
        getAllPosts() {
            axios
                .get('http://localhost/crud-vue/process-post.php?action=read')
                .then(function (response) {
                    if (response.data.error) {
                        app.errorMsg = response.data.message;
                    }
                    else {
                        app.posts = response.data.posts;
                    }
                });
        },

        addPostContent() {
            let contentBody = tinymce.activeEditor.getContent();
            app.newPost = { content: contentBody };
        },

        updatePostContent() {
            let contentBody = tinymce.activeEditor.getContent();
            app.currentPost = { content: contentBody };
        },

        addPost() {
            let formData = app.toFormData(app.newPost);

            axios.post('http://localhost/crud-vue/process-post.php?action=create', formData).then(function (response) {
                app.newPost = { content: "", offer: "" };
                if (response.data.error) {
                    app.errorMsg = response.data.message;
                }
                else {
                    app.successMsg = response.data.message;
                    app.getAllPosts();
                }
            });
        },

        updatePost() {
            let formData = app.toFormData(app.currentPost);

            axios.post('http://localhost/crud-vue/process-post.php?action=update', formData).then(function (response) {
                app.currentPost = { content: "", offer: "", id: "" };
                if (response.data.error) {
                    app.errorMsg = response.data.message;
                }
                else {
                    app.successMsg = response.data.message;
                    app.getAllPosts();
                }
            });
        },

        deletePost() {
            let formData = app.toFormData(app.currentPost);

            axios.post('http://localhost/crud-vue/process-post.php?action=delete', formData).then(function (response) {
                app.currentPost = { content: "", offer: "", id: "" };
                if (response.data.error) {
                    app.errorMsg = response.data.message;
                }
                else {
                    app.successMsg = response.data.message;
                    app.getAllPosts();
                }
            });
        },

        toFormData(obj) {
            let fd = new FormData();
            for (let i in obj) {
                fd.append(i, obj[i]);
            }
            return fd;
        },

        selectPost(post) {
            app.currentPost = post;
        },

    }
});

