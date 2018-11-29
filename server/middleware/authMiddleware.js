
const ensureGuest = async(req,res, next) => {
  if(req.isAuthenticated()){
    res.redirect('/profile');
  }else{
    next();
  }
}

const ensureAuthentication = async(req,res,next) => {
  if(req.isAuthenticated()){
    next();
  }else {
    res.redirect('/')
  }
}

module.exports = {
ensureAuthentication,
  ensureGuest
}
