const express = require('express')
const Router = express.Router()
const Category = require('../model/category')
const Post = require('../model/post')

// GET all posts
Router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

Router.get('/category/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const categoryExists = await Category.findById(categoryId)
        if (!categoryExists) {
            return res.status(400).json({ message: 'invalid categoryId' });
        }

        const posts = await Post.find({ Category: categoryId }).populate('Category');
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// GET single post by ID
Router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        if (!posts) {
            return res.status(404).json({ message: 'post not found' })
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// CREATE post
Router.post('/', async (req, res) => {
    const posts = new Post({
        Img: req.body.Img,
        Name: req.body.Name,
        Category: req.body.Category,
        About: req.body.About,
        Price: req.body.Price
    })
    try {
        const Newposts = await posts.save()
        res.status(201).json(Newposts)
        console.log("Posts:", posts);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// UPDATE post
Router.put('/:id', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        if (!posts) {
            return res.status(404).json({ message: 'post not found' })
        }

        posts.Img = req.body.Img || posts.Img;
        posts.Name = req.body.Name || posts.Name;
        posts.Category = req.body.Category || posts.Category;
        posts.About = req.body.About || posts.About;
        posts.Price = req.body.Price || posts.Price;

        const updatedpost = await posts.save()
        res.json(updatedpost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// DELETE post
Router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = Router