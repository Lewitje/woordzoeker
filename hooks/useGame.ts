import useGameStore from "@/stores/gameStore";
import type { Word, IWordGrid } from "@/types/common";

import { useEffect, useState } from "react";
import { shuffle } from "underscore";
import anagrams from "@/resources/anagrams.json";

const gridSize = 10;
const MAX_ATTEMPTS = 10;

export enum GameDifficulty {
	easy = "EASY",
	hard = "HARD",
}

export const GameDifficulties = [
	{
		name: "Easy",
		description: "Small grid. No reversed anagrams. Short words.",
		value: GameDifficulty.easy,
		gridSize: 10,
	},
	{
		name: "Hard",
		description: "Large grid. Chance of reversed anagrams. Longer words.",
		value: GameDifficulty.hard,
		gridSize: 15,
	},
];

export function useGame() {
	const words = useGameStore((state) => state.words);
	const difficulty = useGameStore((state) => state.difficulty);
	const wordGrid = useGameStore((state) => state.wordGrid);
	const setWords = useGameStore((state) => state.setWords);
	const setWordGrid = useGameStore((state) => state.setWordGrid);

	const getWords = (difficulty: GameDifficulty) => {
		let allWords = [];
		if (difficulty === GameDifficulty.easy) {
			allWords = anagrams.filter((o) => o.easy);
		} else {
			allWords = anagrams.filter((o) => !o.easy);
		}

		allWords = shuffle(allWords);
		return allWords.slice(0, 5);
	};

	const placeWord = (word: Word, grid: IWordGrid) => {
		let tryCount = 0;
		let errorPlacingWord = false;
		let wordArray = word.anagram.split("");

		// Whether the word should be horizontal or vertically placed
		const isHorizontal = Math.random() < 0.5;

		// Lower chance of being reversed because that's evil
		const isReversedChance = difficulty === GameDifficulty.easy ? 0 : 0.6;
		const isReversed = Math.random() < isReversedChance;

		if (isReversed) {
			wordArray = wordArray.reverse();
		}

		let placed = false;

		// Try to place the word up-to MAX_ATTEMPTS tries
		while (!placed) {
			tryCount++;

			// Find a position on the grid, pad it with the length of the word
			const x = Math.floor(
				Math.random() * (isHorizontal ? gridSize - wordArray.length : gridSize),
			);
			const y = Math.floor(
				Math.random() * (isHorizontal ? gridSize : gridSize - wordArray.length),
			);

			let canPlace = true;

			for (let i = 0; i < wordArray.length; i++) {
				const cell = isHorizontal ? grid[y][x + i] : grid[y + i][x];

				// If the cell is filled or isn't the same letter then the character cant be placed
				// Check for same character to allow overlaps in words
				if (cell && cell !== wordArray[i]) {
					canPlace = false;
					break;
				}
			}

			// Word can be placed, insert letters into cells
			if (canPlace) {
				for (let i = 0; i < wordArray.length; i++) {
					if (isHorizontal) {
						grid[y][x + i] = wordArray[i];
					} else {
						grid[y + i][x] = wordArray[i];
					}
				}

				placed = true;
			}

			// Word can't be placed, try again
			if (tryCount >= MAX_ATTEMPTS) {
				errorPlacingWord = true;
				break;
			}
		}

		if (errorPlacingWord) {
			return false;
		}

		return true;
	};

	// Returns any random letter of the alphabet
	const getRandomLetter = () => {
		const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
		return alphabet[Math.floor(alphabet.length * Math.random())];
	};

	// Fills the empty places of the grid with random letters
	const fillEmptyGrid = (grid: IWordGrid) => {
		return grid.map((col) =>
			col.map((cell) => (cell ? cell : getRandomLetter())),
		);
	};

	const createGrid = () => {
		let errorCreatingGrid = false;
		const gridSize = GameDifficulties.find(
			(o) => o.value === difficulty,
		)?.gridSize;

		// Creates a 2d array with null values
		const grid: IWordGrid = Array.from({ length: gridSize }, () =>
			Array.from({ length: gridSize }, () => null),
		);

		for (const word of words) {
			const wordPlaced = placeWord(word, grid);

			if (!wordPlaced) {
				errorCreatingGrid = true;
				// alert("Failed to place all words");
				break;
			}
		}

		// If a word can't be placed after MAX_ATTEMPTS tries start again with a fresh grid
		if (errorCreatingGrid) {
			createGrid();
			return false;
		}

		const filledGrid = fillEmptyGrid(grid);

		setWordGrid(filledGrid);
	};

	useEffect(() => {
		if (difficulty && !words.length) {
			setWords(getWords(difficulty));
		}

		if (difficulty && words.length && wordGrid.length === 0) {
			createGrid();
		}
	}, [difficulty, words]);
}
