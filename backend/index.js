const express = require('express')
const cors = require('cors')
const User = require('./db/User')
const dotenv = require('dotenv')

dotenv.config()

require('./db/config')


const app = express()
app.use(cors())
app.use(express.json())


app.post('/register',async(req,res)=>{
    let user = new User(req.body)
    let data = await user.save();
    data = data.toObject()
    delete data.password
    res.send(data)
})

app.post('/login',async(req,res)=>{
    if(req.body.password && req.body.email) {

        let user =await User.findOne(req.body).select('-password')
        if(user){
            res.send(user)
        }else{
            res.send({result:"No user found"})
        }
    }
    else{
        res.send({result:"No user found"})
    }
})

app.put('/:id',async(req, res)=>{
    let result = await User.updateOne(
       {_id:req.params.id},
       {
        $set:req.body
       }
    )
    res.send(result)
})

const PORT = process.env.PORT || 5000

app.listen(PORT)