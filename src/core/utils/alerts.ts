
import swal from 'sweetalert2';
export const status = {
    OK: 200,
    CREATED: 201,
    NOCONTENT: 203,
    BADREQUEST: 400,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    NOTACEPTABLE: 406,
};

export const data = {
    status,
};

export const dialogElimination = ({ title, text }: { title: string, text?: string }) => {
    return swal.fire({
        title: title,
        ...text && {
            text: text
        },
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#15DB29'
    });
};

export const dialogConfirm = ({ title, text, icon = 'success' }: { title: string, text?: string, icon?: string }) => {
    return swal.fire({
        title: title,
        ...text && {
            text: text
        },
        // icon: 'success',
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#15DB29',
        timer: 1500,
        // cancelButtonColor:
    });
};

export const dialogConfirmYesOrDont = ({ title, text }: { title: string, text?: string }) => {
    return swal.fire({
        title: `<div style='font-size: 0.7rem'>${title}</div>`,
        ...text && {
            text: text
        },
        // icon: 'success',
        showCancelButton: false,
        showDenyButton: true,
        denyButtonText: 'No',
        denyButtonColor: '#621132',
        confirmButtonText: 'Sí',
        confirmButtonColor: '#15DB29',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#EC3737',
    });
};

export const dialogConfirmWithText = ({ title, placeholder, textValidation }: { title: string, placeholder?: string, textValidation?: string }) => {
    return swal.fire({
        inputLabel:  `<div style='font-size: 0.7rem'>${title}</div>`,
        ...placeholder && {
            inputPlaceholder: placeholder
        },
        input: "textarea",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: '##15DB29',
    });
};

export const dialogSuccess = ({ title, text }: { title: string, text?: string }) => {
    return swal.fire({
        title: title,
        ...text && {
            text: text
        },
        position: 'top-end',
        icon: 'success',
        titleText: title,
        text: text,
        showConfirmButton: false,
        timer: 2500
        // cancelButtonColor:
    });
};


export const dialogError = ({ title, text }: { title: string, text?: string }) => {

    return swal.fire({
        title: title,
        ...text && {
            text: text
        },
        position: 'top-end',
        icon: 'error',
        titleText: title,
        text: text,
        showConfirmButton: false,
        timer: 2500
        // cancelButtonColor:
    });
}