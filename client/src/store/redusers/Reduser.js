const INIT_DATA = 'INIT_DATA';
const CHANGE_PRICE = 'CHANGE_PRICE';
const CHANGE_COUNT = 'CHANGE_COUNT';
const CHANGE_SUMM = 'CHANGE_SUMM';
const ERROR_TEXT = 'ERROR_TEXT';
const RECALCULATE = 'RECALCULATE';

let initialState = {
    queue: [],
    indexQueue: 0,
    inputs: {
        price: '',
        count:  '',
        summ: '',
    },
    responceText: '',
    fieldName : ['price', 'count', 'summ']
};
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case INIT_DATA:
            return {
                ...state,                                       
                inputs: {
                    ...state.inputs,
                    price: action.data.price,
                    count: action.data.count,
                    summ: action.data.summ,                        
                }
            }
        case CHANGE_PRICE:

            return {
                ...state,
                inputs: {
                    ...state.inputs,                    
                    price: action.value,                    
                }
            }
        case CHANGE_COUNT:
            return {
                ...state,
                inputs: {
                    ...state.inputs,                    
                    count: action.value,                    
                }
            }
        case CHANGE_SUMM:
            return {
                ...state,
                inputs: {
                    ...state.inputs,                    
                    summ: action.value,                    
                }
            }
        
        case ERROR_TEXT:
            return {
                ...state,
                responceText: action.err.responceText,                   
            }
        case RECALCULATE:

            let  [price, count, summ] = [state.inputs.price, state.inputs.count, state.inputs.summ]
            let [queue, indexQueue, fieldName] = [state.queue, state.indexQueue, state.fieldName]
            let insertField
            
            //////////////////////////////////////////////////   Логика заполнения первого поля   ////////////////////////////////////////////////////
            if(queue.length === 0 ) queue.push({name: action.nameInput, index: ++indexQueue })
            if(queue.length === 1 && queue[0].name === action.nameInput){
                return {
                    ...state,
                    inputs: {
                        ...state.inputs,                    
                        [action.nameInput]: action.value,                    
                    },
                    indexQueue: indexQueue
                }
            }
            //////////////////////////////////////////////////   Логика заполнения второго поля   ////////////////////////////////////////////////////
            if(queue.length === 1 && queue[0].name !== action.nameInput) queue.push({name: action.nameInput, index: ++indexQueue })
            if(queue.length === 2 && queue[1].name === action.nameInput){  
               
                fieldName = fieldName.diff( queue.map((el) => el.name) )[0]  //поле , которое вручную еще не заполнялось
                if( fieldName === 'price') insertField = action.nameInput === 'summ' ? +action.value / +count : +summ / +action.value ;
                if( fieldName === 'count') insertField = action.nameInput === 'summ' ? +action.value / +price : +summ / +action.value ;
                if( fieldName === 'summ') insertField = action.nameInput === 'price' ? +action.value * +count : +price * +action.value ;               
                return {
                    ...state,
                    inputs: {
                        ...state.inputs,                    
                        [action.nameInput]: action.value,                    
                        [fieldName]: insertField,                    
                    },
                    indexQueue: indexQueue
                }
            } else if (queue.length === 2 && queue[0].name === action.nameInput){
                fieldName = fieldName.diff( queue.map((el) => el.name) )[0]  //поле , которое вручную еще не заполнялось
                if( fieldName === 'price') insertField = action.nameInput === 'summ' ? +action.value / +count : +summ / +action.value ;
                if( fieldName === 'count') insertField = action.nameInput === 'summ' ? +action.value / +price : +summ / +action.value ;
                if( fieldName === 'summ') insertField = action.nameInput === 'price' ? +action.value * +count : +price * +action.value ;
                queue[0].index= ++indexQueue;
                queue.sort((a, b) => a.index - b.index)
                return {
                    ...state,
                    inputs: {
                        ...state.inputs,                    
                        [action.nameInput]: action.value,                    
                        [fieldName]: insertField,                    
                    },
                    indexQueue: indexQueue,
                    queue: queue
                }
            }
            //////////////////////////////////////////////////  Если произошел переход на третье поле в первый раз   /////////////////////////////////
            if (queue.length === 2 && queue[0].name !== action.nameInput && queue[1].name !== action.nameInput) {
                queue.push({name: action.nameInput, index: ++indexQueue })
                fieldName = queue[0].name
                if( fieldName === 'price') insertField = action.nameInput === 'summ' ? +action.value / +count : +summ / +action.value ;
                if( fieldName === 'count') insertField = action.nameInput === 'summ' ? +action.value / +price : +summ / +action.value ;
                if( fieldName === 'summ') insertField = action.nameInput === 'price' ? +action.value * +count : +price * +action.value ;
                return {
                    ...state,
                    inputs: {
                        ...state.inputs,                    
                        [action.nameInput]: action.value,                    
                        [fieldName]: insertField,                    
                    },
                    indexQueue: indexQueue,
                    queue: queue
                }
            }
            if (queue.length === 3) {
                
                if (action.nameInput === queue[0].name ) {
                    queue[0].index= ++indexQueue;
                    queue.sort((a, b) => a.index - b.index)
                }
                fieldName = queue[0].name
                if( fieldName === 'price') insertField = action.nameInput === 'summ' ? +action.value / +count : +summ / +action.value ;
                if( fieldName === 'count') insertField = action.nameInput === 'summ' ? +action.value / +price : +summ / +action.value ;
                if( fieldName === 'summ') insertField = action.nameInput === 'price' ? +action.value * +count : +price * +action.value ;
                return {
                    ...state,
                    inputs: {
                        ...state.inputs,                    
                        [action.nameInput]: action.value,                    
                        [fieldName]: insertField,                    
                    },
                    indexQueue: indexQueue,
                    queue: queue
                }
            }
            
           
           
        default:
            return state
    }
}
export const changePriceAC = (value) => {
    return {
        type: CHANGE_PRICE,
        value: value
    }
}
export const changeCountAC = (value) => {
    return {
        type: CHANGE_COUNT,
        value: value
    }
}
export const changeSummAC = (value) => {
    return {
        type: CHANGE_SUMM,
        value: value
    }
}
export const initClientDataAC = (data) => {
    return {
        type: INIT_DATA,
        data: data
    }
}
export const errorTextAC = (err) => {
    return {
        type: ERROR_TEXT,
        err: err
    }
}
export const recalculateAC = (nameInput, value) => {
    return {
        type: RECALCULATE,
        nameInput: nameInput,
        value: value
    }
}
 export default Reducer;
