import Label from '../Label/Label';
import FormContext from '../../context/FormContext';
import React, { memo, useContext, useState } from 'react'
import { toast } from 'react-toastify';


const Input = ({fieldLabel, fieldType, fieldPlaceHolder, fieldPattern, fieldErrorMsg, fieldName, fieldValue, fieldClass, onChange, stateSetter=null, allowDebounce=false}) => {

    console.log("Input")

    console.log("Here are value - ", fieldValue)

    const [value, setValue] = useState(fieldValue);
    const {masterData, setMasterData, setIsFormValid } = useContext(FormContext);

    // handle input change function
    function handleInputChange(e)
    {
        // if(fieldName.includes("random"))
        let keys = fieldName.split(".");

        if(fieldName.includes("randomQuestions.totalQuestions") || fieldName.includes("predefinedQuestions.totalQuestions"))
        {   

   
            if( (Number(e.target.value) + Number(masterData.forms[keys[0]][keys[1] === "randomQuestions" ? "predefinedQuestions" : "randomQuestions" ].totalQuestions)) !== Number(masterData.forms[fieldName.split(".")[0]].totalQuestions) ){
                toast.info("Random and/or Predefined Value must be equal to the provided total questions")
                setIsFormValid(false)
            }
            else{
                toast.success("Random and/or Predefined Value are equal to the provided total questions")
                setIsFormValid(true)
            }

            // if(Number(e.target.value) ===  Number(masterData.forms[keys[0]].totalQuestions)){
            //     setMasterData((prev)=>({...prev, forms: { ...prev.forms, [keys[0]] : { ...prev.forms[keys[0]], predefinedQuestions: { ...prev.forms[keys[0]].predefinedQuestions, totalQuestions:"0" }}}}))
            // }

            if(fieldName.includes("randomQuestions.totalQuestions"))
            {   
                if(Number(e.target.value) <= Number(masterData.forms[fieldName.split(".")[0]].totalQuestions))
                    if(Number(e.target.value) < masterData.forms[keys[0]].totalQuestions){
                        setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], predefinedQuestions: { ...prev.forms[keys[0]].predefinedQuestions, [keys[2]]: Number(prev.forms[keys[0]].totalQuestions) - Number(e.target.value) }}}}))
                        setIsFormValid(true)
                    }
                else
                    setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], predefinedQuestions: { ...prev.forms[keys[0]].predefinedQuestions, [keys[2]]: 0 }}}}))
            }

    
        }

        setValue(e.target.value)

        if(stateSetter)
        {
            stateSetter((prev)=>({...prev, options:{ ...prev.options, [fieldName]: {...prev.options[fieldName], value:e.target.value}}}))
        }
        else
        {

            if(keys.length===2)
                setMasterData((prev)=>({...prev, forms: { ...prev.forms, [keys[0]] : { ...prev.forms[keys[0]], [keys[1]]: e.target.value }}}));
            else if(keys.length===3)
                setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: e.target.value }}}}))
        }

        if(fieldPattern)
        {
            let pattern = new RegExp(fieldPattern);
            if(!pattern.test(e.target.value))
                if(e.target.value!='')
                    toast.error(fieldErrorMsg);
        }

        
        
    }

    // debouncing on handleInputchange
    function debounceInput(handleInputChange, delay)
    {
        let timer;
        return function(...args)
        {
            clearTimeout(timer);
            timer = setTimeout(function()
            {
                handleInputChange(...args);
            },delay)
        }
    }

    // function changeWithSetter(e)
    // {
    //     // console.log(fieldValue)
    //     // console.log(fieldName, e.target.value)
    //     stateSetter((prev)=>({...prev, options:{...prev.options, [fieldName] : { ...prev.options[fieldName], value: e.target.value }}}))
    // }

    let debouncedInputData = debounceInput( onChange ?? handleInputChange , 500)

    return (
        <div className={fieldClass}>
        {
            (fieldLabel) && 
            <Label labelName={fieldLabel} labelFor={fieldName}/>
        }
        
        {

            <input className='w-[100%] border p-2 rounded mb-2' id={fieldName} type={fieldType} placeholder={fieldPlaceHolder} value={allowDebounce ? undefined : value} onChange={ onChange ?? allowDebounce ? debouncedInputData : handleInputChange } />

        }


        </div>
    )
}

export default memo(Input);