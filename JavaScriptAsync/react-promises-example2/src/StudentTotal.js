import React from 'react';

const StudentTotal = ({count}) => {
    if (count === 0)
        return <div>No students have registered.</div>
    
    if (count === 1)
        return <div>1 student</div>

    return <div>{count} students</div>
}

export default StudentTotal;