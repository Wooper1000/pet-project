export default  function (subtask){
    return {
        contact: subtask.contact,
        phone: subtask.phone,
        status: subtask.status,
        description: subtask.description,
        lounge: subtask.lounge,
        floor: subtask.floor,
        priority: subtask.priority
    }
}