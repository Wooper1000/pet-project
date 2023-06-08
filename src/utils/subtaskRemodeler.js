export default  function (subtask){
    let marks = subtask.marks || [];

    marks = marks.map(_m => _m.id);

    return {
        contact: subtask.contact,
        phone: subtask.phone,
        status: subtask.status,
        description: subtask.description,
        lounge: subtask.lounge,
        floor: subtask.floor,
        priority: subtask.priority,
        markIds: marks
    }
}