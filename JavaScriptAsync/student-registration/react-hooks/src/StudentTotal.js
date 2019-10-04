import React from 'react';

export default function StudentTotal({count}) {
    if (count === 0)
        return <div>No students have registered.</div>
    
    if (count === 1)
        return <div>1 student</div>

    return <div>{count} students</div>
}
