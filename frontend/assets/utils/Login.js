import validator from 'validator'

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validade(e);
        })
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')

        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            alert('Email invalido');
            error = true;
        }

        if(passwordInput.value.length < 6 || passwordInput.value.length > 18) {
            alert('Senha deve possuir entre 3 a 16 caracters');
            error = true;
        }

        if(!error) el.submit();
    }
}
