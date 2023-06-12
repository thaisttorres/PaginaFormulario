

let b7validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        b7validator.clearErrors();

        for(let i=0; i<inputs.length;i++){
            let input = inputs[i];
            let check = b7validator.checkInput(input);
            if(check !== true){
                send = false;
                b7validator.showError(input, check)
            }

        }

    
        if(send){
            form.submit();
        }
    },
    checkInput:(input)=> {
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if(input.value == ''){
                            return 'Campo nao pode ser vazio.';
                        }
                        break;
                
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo precisa de pelo menos '+rDetails[1]+'Caracteres';
                        }
                        break;
                        case 'email':
                            if(input.value != ''){
                                let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if(!regex.test(input.value.toLowerCase())){
                                    return 'E-mail invalido';
                                }
                            }
                            break;
                }
            }
        }

        return true;
    },
    showError:(input, error)=>{
        input.style.borderColor = '#FF0000'

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {

        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }
           
        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
            
        }
    }
};

let form = document.querySelector('.b7validator');
form.addEventListener('submit', b7validator.handleSubmit);

function typewriter(elemento){
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textoArray.forEach((letra, i) => {
        setTimeout(()=> elemento.innerHTML += letra, 75 * i );
    });
}
const titulo = document.querySelector('.titulo')
typewriter(titulo);


let button = document.querySelector('.btn-cadastro');
let div = document.querySelector('.rightside')
div.remove();

button.addEventListener("click", function() {

    if(div){
        let container = document.querySelector('.screen');
        container.appendChild(div);
        button.remove();
    }

});

