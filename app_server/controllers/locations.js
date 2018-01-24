/*GET home page*/
module.exports.homeList=function(req, res){
    res.render('locations-list',{title: 'Home' });
}
/*GET Location Info page*/
module.exports.locationInfo=function(req, res){
    res.render('location-info',{title: 'Location Info' });
}
/*GET addReview page*/
module.exports.addReview=function(req, res){
    res.render('index',{title: 'Review' });
}