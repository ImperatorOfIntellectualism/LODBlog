import {db} from '../db.js'

export const getPosts = (req, res)=> {
    const q = req.query.cat 
    ? "SELECT * FROM posts WHERE cat=?" 
    : "SELECT * FROM posts"

    db.query(q,[req.query.cat], (err,data)=>{
        if(err) return res.send(err)

        return res.status(200).json(data)
    })
}

export const getLastId = (req, res)=> {
  const q = "SELECT MAX(Id) AS lastid FROM posts"

  db.query(q, (err,data)=>{
      if(err) return res.send(err)
      return res.status(200).json(data[0])
  })
}

export const getPost = (req, res) => {
    const q =
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  };

export const addPost = (req, res)=> {
  const q ="INSERT INTO posts(`title`, `desc`, `img`, `uid`, `cat`) VALUES (?)";
  console.log(req.body.title)
  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.uid,
    req.body.cat
]
db.query(q, [values], (err, data) => {
  if(err) console.log(err)
  return res.status(200).json("Post has been created.");
});
}

export const deletePost = (req, res)=> {
  const q =
  "DELETE FROM posts WHERE `id` = ?";
db.query(q, [req.params.id], (err, data) => {
  if (err) return res.status(500).json(err);
  return res.status(200).json(data);
});
}

export const updatePost = (req, res)=> {
  const q =
  "UPDATE posts SET `title`=?,`desc`=?,`cat`=? WHERE `id` = ?";

const values = [req.body.title, req.body.desc, req.body.cat, req.params.id];

db.query(q, [...values], (err, data) => {
  if (err) return res.status(500).json(err);
  return res.json("Post has been updated.");
});
}