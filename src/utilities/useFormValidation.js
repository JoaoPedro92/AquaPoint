import { ref } from "vue";

export function useFormValidation(){
    const errors = ref({})

    function validate(fields){

        Object.entries(fields).forEach(([key, value]) => {
            if(!value || value.toString().trim() === ''){
                errors.value[key] = 'O campo é obrigatório'
            }
        })

        return Object.keys(errors.value).length === 0
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!email || email.trim() === ''){
            return 'O email é obrigatório'
        }

        if(!regex.test(email)) {
            return 'O email não é válido'
        }

        return null
    }

    function clearErrors(){
        errors.value = {}
    }

    return { errors, validate, validateEmail, clearErrors }
}