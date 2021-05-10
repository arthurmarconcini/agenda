const Login = require('../models/LoginModel')

module.exports = {
    index(req, res) {
        if(req.session.user) return res.render('login-logado')
        return res.render('login')
    },

    async register(req, res) {
        try {
            const login = new Login(req.body)
            await login.register()  
        
            if(login.errors.length > 0) {
                req.flash('errors', login.errors); 
                req.session.save(function() {
                    return res.redirect('back')
                })                               
                return;
            }

            req.flash('success', 'Seu usuário foi criado com sucesso.');
            req.session.save(function() {
                return res.redirect('back')
            })
        } catch (err) {
            return res.render('404')
        }        
    },

    async login(req, res) {
        try {
            const login = new Login(req.body)
            await login.login()  
        
            if(login.errors.length > 0) {
                req.flash('errors', login.errors); 
                req.session.save(function() {
                    return res.redirect('back')
                })                               
                return;
            }           

            req.flash('success', 'Você está logado!');
            req.session.user = login.user;
            req.session.save(function() {
                return res.redirect('back')
            })
        } catch (err) {
            return res.render('404')
        }        
    },

    logout(req, res){
        req.session.destroy();
        res.redirect('/')
    }
}