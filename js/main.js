const cardNameIn = document.querySelector('#card_name');
const cardNumberIn = document.querySelector('#card_number');
const cardDateIn = document.querySelectorAll('.card_dateIn');
const cardCvcIn = document.querySelector('#CVC--in');
const cardName = document.querySelector('.card--name'); 
const cardNum = document.querySelector('.card--number');
const cardDate = document.querySelectorAll('.card_date');
const cardCvc = document.querySelector('.card--CVC');
const cardForm = document.querySelector('.form__container');
const blankError = "Can't be blank";
const containNumberError = "Wrong format, numbers only"; 
const continueBtn = document.querySelector('#btn-continue');

cardNameIn.oninput = () => {
    cardName.innerText = cardNameIn.value;
    validate(cardNameIn);
   
}
cardCvcIn.oninput = () => {
    cardCvc.innerText = cardCvcIn.value;
    cardCvcIn , validate2(cardCvcIn)

}
cardDateIn.forEach( (e, i) => {
    e.oninput = (event) => {
        cardDate[i].innerText = e.value;
        validate2(event.target)

    }
});

cardNumberIn.oninput = () => {
    const cardNumber = cardNumberIn.value.replaceAll(' ','');
    validate2(cardNumberIn);

    if(cardNumber ===''){
        cardNum.innerText = '0000 0000 0000 0000';
        return;
    };
    const formatted = formatCC(cardNumber);
    cardNum.innerText = formatted;
    cardNumberIn.value = formatted;
}

cardForm.addEventListener('submit' , (event) => {
   event.preventDefault();
    if(validateAll()){
        const response =  document.querySelector('.response__container');

        cardForm.style.display = "none";
        response.style.display = "flex";
    }
});
continueBtn.onclick = () => {
    const response = document.querySelector('.response__container');
    reset(cardForm);
    cardForm.style.display = 'block';
    response.style.display = 'none';
    
}

// util
const validate2 = (element) => {
    let res =  true;
    if(IsBlank(element)){
        res = generateError(element, blankError);
    }else if(isNotContainNumber(element)){
        res = generateError(element, containNumberError);
    }else{
        removeError(element);
        res = true;
    }
    errorHandler(element , res);
    return res;
}
const validate = (element)=> {
    let res = true;
    if(IsBlank(element)) {
        generateError(element ,blankError);
        res = false;
    }else{
        removeError(element);
        res=  true;
    }
    errorHandler(element,res);
    return res;
}

const generateError = (element , message) => {
    const parent = !element.parentElement.classList.contains('flex') ? element.parentElement : element.parentElement.parentElement;
    const validate = parent.querySelector('.validate');
    validate.innerText = message;
    validate.style.display = 'block';
}
const removeError = (element) => {
    const parent = !element.parentElement.classList.contains('flex') ? element.parentElement : element.parentElement.parentElement;
    const validate = parent.querySelector('.validate');
    validate.style.display = 'none';
}
const IsBlank = (element) => {
    return !Boolean(element.value);
}
const isNotContainNumber = (element) => {
    return isNaN(Number(element.value.replaceAll(' ', '')));
}

const formatCC = (number) => {
    return number.match(/.{1,4}/g).join(' ');
}
const errorHandler = (element,conditional) => {
    conditional ? element.classList.remove('wrong') : element.classList.add('wrong');
}
const validateAll = () => { 
    const isValidName = validate(cardNameIn) ;
    const isValidNumber = validate2(cardNumberIn)
    const isValidDate = validate2(cardDateIn[0]) && validate2(cardDateIn[1]);
    const isValidCVC = validate2(cardCvcIn);
    return isValidName && isValidNumber && isValidDate && isValidCVC;
}
const reset = (form) => {
    const inputs = form.querySelectorAll('input[type="text"]');
    inputs.forEach(e => e.value ="");
}


