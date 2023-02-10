import express from 'express'
import { addPost, deletePost, getLastId, getPost, getPosts, updatePost } from '../controllers/post.js'

const router = express.Router()
router.get('/', getPosts)
router.get('/lid', getLastId)
router.get('/:id', getPost)
router.post('/', addPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

export default router