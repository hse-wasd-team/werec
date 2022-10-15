import * as React from 'react'

interface Tag {
    text: string
}
function Tag(props: Tag){
    return <div className='tag'>
        {props.text}
    </div>
}

export default Tag