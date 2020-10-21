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
        textareaContent: ""
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
        addPost() {
            let formData = app.toFormData(app.newPost);
            axios
                .post('http://localhost/crud-vue/process-post.php?action=create', formData)
                .then(function (response) {
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
        toFormData(obj) {
            let fd = new FormData();
            for (let i in obj) {
                fd.append(i, obj[i]);
            }
            return fd;
        },
    }
})

