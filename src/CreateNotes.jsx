import React, { useState } from "react"
import { notesRef } from "./firebase"


/**const CreateNotes = () => {
    const [note , setNote] = useState("")

    const createnote = (e) => {
        e.preventDefault()

        const item = {
            task:note,
            done:false
        }

        notesRef.push(item)
        setNote("")
    }

    return(
        <form onSubmit={createnote}>
            <input type="text" value={note} onChange={(e)=> setNote(e.target.value)} placeholder="your note" />
            
        </form>
    )

}

export default CreateNotes*/
