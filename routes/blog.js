const express = require('express');
const blogController = require('../controllers/controllerblog');
const appConfig  = require('../config/appconfig');
//declaring an instance or creating an application instance


//middlewares

let setroute = (app) => {
    let baseurl = appConfig.apiVersion + '/blogs';
    console.log("base url "+baseurl);
    app.get(baseurl + '/all', blogController.getAllBlog);   //  api/v1/blog/all
    app.post(baseurl + '/create', blogController.createBlog);
    app.get(baseurl+'/view/:blogId',blogController.viewByBlogId);
    app.get(baseurl+'/view/by/category/:category',blogController.viewByCategory);
    
    app.put(baseurl+'/:blogId/edit',blogController.editBlog);

}

module.exports = {
    setroute: setroute
}