import express from 'express'
import { getUser, getUsers } from '../controllers/user.js'

const router = express.Router()
router.get('/', getUsers)
router.get('/:id', getUser)
//router.post('/', addPost)
//router.delete('/:id', deletePost)
//router.put('/:id', updatePost)

export default router