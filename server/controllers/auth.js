exports.getLogin = (req, res) => {
  res.render('auth/login', {
    title: 'Login'
  });
}

exports.postLogin = (req, res) => {
  res.render('auth/login', {
    title: 'Login'
  });
}

exports.getRegister = (req, res) => {
  res.render('auth/register', {
    title: 'Register'
  });
}

exports.postRegister = (req, res) => {
  res.render('auth/register', {
    title: 'Register'
  });
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

