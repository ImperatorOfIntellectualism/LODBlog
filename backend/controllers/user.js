import {db} from '../db.js'

export const getUser = (req, res) => {
    const q =
      "SELECT * FROM users WHERE id = ? ";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  };

  export const getUsers = (req, res)=> {
    const q = "SELECT * FROM users"

    db.query(q, (err,data)=>{
        if(err) return res.send(err)
        return res.status(200).json(data)
    })
}