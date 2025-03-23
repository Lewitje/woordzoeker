import type { Word } from "@/types/common";
import { useState } from "react";
import styles from './dictionaryWord.module.css'
import clsx from "clsx";

type DictionaryWordProps = {
    word: Word,
    isFound: boolean
}

export default function DictionaryWord ({ word, isFound }: DictionaryWordProps) {
    const [ showHint, setShowHint ] = useState(false)
    
    return (
        <div onClick={() => setShowHint(true)} className={clsx([ styles.word, isFound && styles.wordFound])}>
            { word.word } { (showHint || isFound) && <span>⇄ { word.anagram }</span> }
        </div>
    )
}