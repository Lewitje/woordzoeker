import { useCallback, useEffect, useState } from "react";
import type { Cell } from "@/components/wordGrid/wordGrid";
import type { IWordGrid, Word } from "@/types/common";
import useToast from "./useToast";
import useGameStore from "@/stores/gameStore";
import {
	findMatchingWord,
	getSelectedCells,
	getSelectedWord,
} from "@/utils/checkWord";

export default function UseWordGridHandler() {
	const { addToast } = useToast();
	const [startCell, setStartCell] = useState<Cell>({ col: null, row: null });
	const [endCell, setEndCell] = useState<Cell>({ col: null, row: null });

	const wordGrid = useGameStore<IWordGrid>((state) => state.wordGrid);
	const words = useGameStore((state) => state.words);
	const foundWords = useGameStore((state) => state.foundWords);
	const addFoundWord = useGameStore((state) => state.addFoundWord);
	const setGameOver = useGameStore((state) => state.setGameOver);
	const addFoundCells = useGameStore((state) => state.addFoundCells);

	const checkWord = useCallback(() => {
		const word = getSelectedWord(startCell, endCell, wordGrid);
		const matchedWord = findMatchingWord(word, words);

		if (matchedWord) {
			// User can't find the same word twice
			if (isWordAlreadyFound(matchedWord)) {
				addToast("You already found this anagram");
			} else {
				const cells = getSelectedCells(startCell, endCell);
				// User found the word, save it to found words
				addFoundWord(matchedWord);
				// Add cells to show user what they've already found
				addFoundCells(cells);
				addToast(
					`You found the anagram ${matchedWord.anagram} ⇄ ${matchedWord.word}`,
				);
			}
		} else {
			// No word found
			addToast(`${word.toLowerCase()} is not a word you're looking for`);
		}

		resetSelection();
	}, [addFoundWord, endCell, startCell, wordGrid, words, addToast]);

	const isWordAlreadyFound = (word: Word) => {
		if (foundWords.some((o) => o.word === word.word)) {
			return true;
		}

		return false;
	};

	const resetSelection = () => {
		setStartCell({ col: null, row: null });
		setEndCell({ col: null, row: null });
	};

	const onHighlightItem = (col: number, row: number) => {
		if (endCell.col !== null) {
			resetSelection();
		} else if (startCell.col === col && startCell.row === row) {
			resetSelection();
		} else if (startCell.col === null || endCell.col !== null) {
			// Set the start cell
			setStartCell({ col, row });
			setEndCell({ col: null, row: null });
		} else {
			// Set the end cell
			setEndCell({ col, row });
		}
	};

	useEffect(() => {
		if (endCell.col !== null) {
			checkWord();
		}
	}, [endCell, checkWord]);

	useEffect(() => {
		if (words.length && foundWords.length === words.length) {
			setGameOver();
		}
	}, [foundWords, words, setGameOver]);

	return {
		startCell,
		endCell,
		checkWord,
		isWordAlreadyFound,
		onHighlightItem,
	};
}
