import type { Cell } from "@/components/wordGrid/wordGrid";
import type { Word, IWordGrid } from "@/types/common";

export function getSelectedCells(start: Cell, end: Cell): Cell[] {
	const cells: Cell[] = [];

	// User selected vertical words
	if (start.col === end.col) {
		const lowerCell = Math.min(start.row ?? 0, end.row ?? 0);
		const upperCell = Math.max(start.row ?? 0, end.row ?? 0);

		// Select all of the cells between the chosen cells and add the letters
		for (let i = lowerCell; i <= upperCell; i++) {
			cells.push({ col: start.col, row: i });
		}
	}

	// User selected horizontal words
	if (start.row === end.row) {
		const lowerCell = Math.min(start.col ?? 0, end.col ?? 0);
		const upperCell = Math.max(start.col ?? 0, end.col ?? 0);

		// Select all of the cells between the chosen cells and add the letters
		for (let i = lowerCell; i <= upperCell; i++) {
			cells.push({ col: i, row: start.row });
		}
	}

	return cells;
}

export function getSelectedWord(
	start: Cell,
	end: Cell,
	grid: IWordGrid,
): string {
	let word = "";

	const cells: Cell[] = getSelectedCells(start, end);

	if (!cells.length) {
		return word;
	}

	for (const cell of cells) {
		if (cell.row === null || cell.col === null) continue;

		word += grid[cell.row][cell.col];
	}

	return word;
}

export function findMatchingWord(word: string, words: Word[]): Word | null {
	// Look for the word
	const foundForwardWord = words.find((o) => o.anagram === word);

	if (foundForwardWord) {
		return foundForwardWord;
	}

	// Flip the word and try again
	const reversedWord = word.split("").reverse().join("");
	const foundReversedWord = words.find((o) => o.anagram === reversedWord);

	if (foundReversedWord) {
		return foundReversedWord;
	}

	return null;
}
