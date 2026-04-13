function calculator(a,b,operator){
    if(typeof a !=='number' || typeof b !=='number'){
        return 'both input should be number'
        
    }
    if(typeof operator!=='string'){
        return 'operator should be string'
    }

    switch(operator){
        case 'add':
            return a+b
        case 'subtract':
            return a-b
        case 'multiply':
            return a*b
        case 'devide':
            if(b===0) return 'it can not devide by zero'
            return a/b
        default:
            return 'select correct operator'
    }
}

console.log(calculator(2 , 4 ,'devide'))