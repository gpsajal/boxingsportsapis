exports.aboutus = (req, res)=>{
    var ViewData = {
        path:"/aboutus",
        pageTitle:"About Us",
        activeAboutus:true
    };
    res.render("aboutus", ViewData);
};

exports.contactus = (req, res) =>{ 
    var ViewData = {
        path:"/contactus",
        pageTitle:"Contact Us",
        activeAboutus:true
    };
    res.render("contactus",ViewData);
};