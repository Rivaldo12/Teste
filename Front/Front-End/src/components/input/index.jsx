import React from 'react';
import { DivInputs, Labels, Inputs } from './../../pages/login/styles'; // Importe os estilos necessários

const inputComponents = React.forwardRef(({ label, placeholder, type, ...rest }, ref) => {
    return (
        <DivInputs>
            <Labels>{label}</Labels>
            <Inputs ref={ref} type={type} placeholder={placeholder} {...rest}/>
        </DivInputs>
    );
});
export default inputComponents;