export function handleError(error){
    if(error.status===400){
        alert(error.response.data.detail)
    }
}