const Contato = require('../models/ContatoModel')

module.exports = {
    async index(req, res) {  
        
        const contatos = await Contato.buscaContatos();
        res.render('index', { contatos })                           
    }  
};