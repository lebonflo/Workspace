const app = new Vue({
    el: '#app',
    data: {
        // Statement
        errorMsg: false,
        successMsg: false,
        // CRUD Post
        showCreatePost: false,
        showEditPost: false,
        showDeletePost: false,
        // CRUD Comment
        showComment: false,
        showEditComment: false,
        showDeleteComment: false
    }
})