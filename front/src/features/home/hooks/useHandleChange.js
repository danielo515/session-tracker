import { useState } from 'react';

const useHandleChange = (initialValue) =>{
    const [value, setter] = useState(initialValue);
    const handleChange = event => setter(event.target.value);
    return [value, handleChange]
}

export default useHandleChange