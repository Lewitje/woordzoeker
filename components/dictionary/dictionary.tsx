import useGameStore from "@/stores/gameStore";
import type { Word } from "@/types/common";
import styles from "./dictionary.module.css";
import clsx from "clsx";
import DictionaryWord from "./dictionaryWord";
import Button from "@/components/button/button";

export default function Dictionary() {
	const words = useGameStore((state) => state.words);
	const foundWords = useGameStore((state) => state.foundWords);
	const resetGame = useGameStore((state) => state.resetState);

	const requestResetGame = () => {
		const allowReset = confirm("Are you sure?");

		if (!allowReset) {
			return;
		}

		resetGame();
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner}>
				<div className={styles.header}>
					<h1>Woordzoeker</h1>
					<p>Find the anagrams to the following words.</p>
					<p>
						<small>Hint: Tap on a word to reveal it's anagram</small>
					</p>
				</div>
				<div className={styles.content}>
					{words.map((word: Word) => (
						<DictionaryWord
							key={word.word}
							word={word}
							isFound={!!foundWords.find((o) => o.word === word.word)}
						/>
					))}
				</div>

				<div className={styles.footer}>
					<Button onClick={requestResetGame} label="Reset game" />
				</div>
			</div>
		</div>
	);
}
