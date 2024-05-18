"use client"

import { useState } from "react";

interface Props {
    type: string;
}


export default function Ide({type}: Props): JSX.Element {
    const [code, setCode] = useState("");

    return(
        <textarea className="text-black" value="Enter input here" name={type} rows={8} cols={40} onChange={e => setCode(e.target.value)}/>
    )
}