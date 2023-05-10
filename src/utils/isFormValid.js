export default async (form)=>{
    let formState =  await form.validate();
    return formState.valid
}