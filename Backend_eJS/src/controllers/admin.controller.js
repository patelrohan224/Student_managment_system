const express=require("express")
const router =express.Router();
require("dotenv").config();
const studentSchemata=require('../models/student.model')
const contestSchemata=require('../models/contest.model')
const authorize=require('../middlewares/authorize')
const authenticate=require("../middlewares/authenticate")
const newToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}
router.post('/studentAdd',authenticate,authorize(["admin"]),async function(req, res){
      const user = req.user
      console.log('user:', user._id)
    const student=await studentSchemata.create({ 
    admin: user._id,
    name:req.body.name,
    city:req.body.city,
    age:req.body.age,
    education:req.body.education,
    gender:req.body.gender,
    contact:req.body.contact})
    res.status(200).send({student})
})
router.post('/contestAdd',authenticate,authorize(["admin"]),async function(req, res){
    const user = req.user
    console.log('user:', user._id)
  const contest=await contestSchemata.create({ 
  admin:user._id,
  title:req.body.title,
  type:req.body.type,
  deadline:req.body.deadline,
  tags:req.body.tags,
  time:req.body.time})
  res.status(200).send({contest})
})
router.get('/studentAll',authenticate,authorize(["admin"]),async function(req, res){
    const admin = req.user
    const name = +req.query.name || -1;
    const age = +req.query.age || -1;
    let students
    if(age==-1 && name===1){
        
        try{
            
            students  = await studentSchemata.find({admin:admin._id}).sort({"name":name}).lean().exec();
            if(students.length==0) return res.status(200).send({message: "Admin dnt have any students"}); 
            
        }
        catch(err){
            return res.status(500).send({message: "Sorry for inconvenience please try again later"});
        }
        return res.send({students, admin})
    }else if(age==1)
    {
        try{
            console.log("s");
            students  = await studentSchemata.find({admin:admin._id}).sort({age:age}).lean().exec();
            if(students.length==0) return res.status(200).send({message: "Admin dnt have any students"}); 
            
        }
        catch(err){
            return res.status(500).send({message: "Sorry for inconvenience please try again later"});
        }
        return res.send({students, admin})
    }
    else{
        try{
            
            students  = await studentSchemata.find({admin:admin._id}).sort({name:name,age:age}).lean().exec()
            if(students.length==0) return res.status(200).send({message: "Admin dnt have any students"}); 
            
        }
        catch(err){
            return res.status(500).send({message: "Sorry for inconvenience please try again later"});
        }
        return res.send({students, admin})
    }
})
router.delete('/studentRemove/:studentid',authenticate,authorize(["admin"]),async function(req, res){
    const admin = req.user
    let student
    try{
         student= await studentSchemata.findOne({"admin":admin._id,"_id":req.params.studentid}).lean().exec();
        //  console.log('student:', student)
         student= await studentSchemata.findByIdAndDelete(student._id).lean().exec();
    }
    catch(err){
         return res.status(500).send({message: "Sorry for inconvenience please try again later"});
    }
    return res.send(`deleted`)
})
router.delete('/contestRemove/:contesttid',authenticate,authorize(["admin"]),async function(req, res){
    const admin = req.user
    let contest
    try{
        //  contest= await contestSchemata.findOne({"admin":admin._id,"_id":req.params.contesttid}).lean().exec();
        contest= await contestSchemata.findOne({"_id":req.params.contesttid}).lean().exec();
        //  console.log('contest:', contest)
         contest= await contestSchemata.findByIdAndDelete(contest._id).lean().exec();
    }
    catch(err){
         return res.status(500).send({message: "Sorry for inconvenience please try again later"});
    }
    return res.send(`deleted`)
})
router.get('/contestAll',async function(req, res){
   let contest
   const page = +req.query.page || 1;
   const size = +req.query.limit || 2;
   const deadline = +req.query.deadline || 1;
   const offset = (page - 1) * size;
    contest=await contestSchemata.find().sort({deadline:deadline})
    .skip(offset).limit(size).lean().exec();
    const totalPages = Math.ceil(
        (await contestSchemata.find().countDocuments().lean().exec()) / size
      );
    if(contest.length==0) return res.status(200).send({message: "Admin dnt have any students"}); 
    return res.send({contest,totalPages})

})
module.exports = router,{newToken}