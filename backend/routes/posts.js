const express = require('express');
const router = express.Router();
const Post = require('../schemas/newPost');
const auth = require('../authentication/auth');
const User = require('../schemas/newUser');
const {
    check,
    validationResult
} = require('express-validator');

router.get('/posts', async (req, res) => {
    try {
        //вивод всіх постів
        let posts = await Post.find();

        res.json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error')
    }
});

//Вирахування лайків
router.get('/posts/liked', async (req, res) => {
    try {
        //Сортуємо
        let posts = await Post.find().sort({
            likes: -1
        });

        res.json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error')
    }
});

//Останній пост
router.get('/posts/the_most_recent', async (req, res) => {
    try {
        //Від нового(меншого)
        let posts = await Post.find().sort({
            date: -1
        });

        res.json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error')
    }
});

router.get('/posts/the_most_commented', async (req, res) => {
    try {
        //коменти
        let posts = await Post.find().sort({
            comments: -1
        });

        res.json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error')
    }
});

//Один певний пост
router.get('/single_post/:post_id', async (req, res) => {
    try {
        //пошук поста по ID з маршрута
        let posts = await Post.findById(req.params.post_id);

        res.json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error')
    }
});

router.get('/user_post/:user_id', async (req, res) => {
    try {

        let posts = await Post.find({
            user: req.params.user_id
        });

        res.json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error')
    }
});

//Пости користувача
router.get('/user_post', auth, async (req, res) => {
    try {
        //Проходимо аут і зрівнюємо користувачів у БД і запроса, якщо вони підходять, токени правильні
        let posts = await Post.find();

        //Знаходим всі пости з БД і фільтруємо з постами даного користувача
        let userPosts = posts.filter(post => post.user.toString() === req.user.id.toString());

        res.json(userPosts);
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error')
    }
});

//Додавання нового поста через testOfThePost
router.post('/', auth, [
    check('textOfThePost', ' Text is required').not().isEmpty()
], async (req, res) => {

    //Отримуєм дані
    let {
        textOfThePost
    } = req.body;

    let err = validationResult(req);

    if (!err.isEmpty()) return res.status(400).json({
        err: err.array()
    });
    try {

        //провірка користувача через token(user.id)
        let user = await User.findById(req.user.id).select('-password');

        if (!user) return res.status(404).json('User is not found');

        //Створення нового поста, дані з запросу, імя, аватар, користувач з БД
        let newPost = new Post({
            textOfThePost,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        //Збереження нового поста
        await newPost.save();

        res.json('Post is created');
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error')
    }
});

module.exports = router;