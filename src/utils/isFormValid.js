export default async (form)=>{
    let formState =  await form.validate();
    console.log('form validation ', formState.valid)
    return formState.valid
}