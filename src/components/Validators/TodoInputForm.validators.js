export function isFormFiledValid(isTaskAdding,value,minLength,type){
    let message = '';
    if(isTaskAdding && !value){
        message = 'Please fill the above mandatory field';
    }
    if(value.length < minLength) {
        message = `Please enter minimum ${minLength} characters of ${type}`;
    }
    return message;
}