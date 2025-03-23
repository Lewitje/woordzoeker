import type { IWordGrid, Word } from "@/types/common";
import {
	getSelectedWord,
	findMatchingWord,
	getSelectedCells,
} from "./checkWord";

const grid: IWordGrid = [
	["C", "A", "T"],
	["D", "O", "G"],
	["P", "I", "G"],
];

const words: Word[] = [
	{ word: "God", anagram: "dog", easy: true },
	{ word: "Act", anagram: "cat", easy: true },
];

test("getSelectedCells returns all horizontal cells", () => {
	const cells = getSelectedCells({ col: 0, row: 0 }, { col: 2, row: 0 });
	expect(cells).toEqual([
		{ col: 0, row: 0 },
		{ col: 1, row: 0 },
		{ col: 2, row: 0 },
	]);
});

test("getSelectedCells returns all vertical cells", () => {
	const cells = getSelectedCells({ col: 0, row: 0 }, { col: 0, row: 2 });
	expect(cells).toEqual([
		{ col: 0, row: 0 },
		{ col: 0, row: 1 },
		{ col: 0, row: 2 },
	]);
});

test("getSelectedCells returns no diagonal cells", () => {
	const cells = getSelectedCells({ col: 0, row: 0 }, { col: 2, row: 2 });
	expect(cells).toEqual([]);
});

test("getSelectedWord gets vertical word", () => {
	const word = getSelectedWord({ row: 0, col: 2 }, { row: 2, col: 2 }, grid);
	expect(word).toBe("TGG");
});

test("getSelectedWord gets horizontal word", () => {
	const word = getSelectedWord({ row: 1, col: 0 }, { row: 1, col: 2 }, grid);
	expect(word).toBe("DOG");
});

test("getSelectedWord should not find diagonal word", () => {
	const word = getSelectedWord({ row: 0, col: 0 }, { row: 2, col: 2 }, grid);
	expect(word).toBe("");
});

test("findMatchingWord finds direct anagram", () => {
	const result = findMatchingWord("dog", words);
	expect(result).toEqual(words[0]);
});

test("findMatchingWord finds reversed anagram", () => {
	const result = findMatchingWord("god", words);
	expect(result).toEqual(words[0]);
});

test("findMatchingWord returns false if no match", () => {
	const result = findMatchingWord("pig", words);
	expect(result).toEqual(null);
});
