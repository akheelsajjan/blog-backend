
const express = require('express');
const mongoose = require('mongoose');
const blogModel = mongoose.model('Blog');
const shortid = require('shortid');


let getAllBlog = (req, res) =>{
    blogModel.find()
             .select('-_v-_id')
             .lean()
             .exec( ( err, result) => {
                 if(err){
                     console.log(err);
                 }else if(result == ""|| result == undefined || result == null ){
                        console.log("blog not found");
                        res.send("No Blog Found");
                 }else{
                    res.send(result);
                 }
             })
}

let viewByBlogId  =  (req, res) =>{
    blogModel.findOne({ 'blogId': req.params.blogId} , (err, result) =>{
        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}

let createBlog = (req, res) => {
    var today = Date.now();
    let blogId = shortid.generate();

    let newBlog = blogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: today,
        lastModified: today
    })

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)

        }
    }) // end new blog save

}

let viewByCategory = (req, res) => {

    blogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}
let editBlog = (req, res) => {

    let options = req.body;
    console.log(options);
    blogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}



module.exports = {
    getAllBlog:getAllBlog,
    createBlog:createBlog,
    viewByBlogId:viewByBlogId,
    viewByCategory:viewByCategory,
    editBlog: editBlog
}