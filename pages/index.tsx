"use client";

import { Inter } from "next/font/google";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import useGameStore from "@/stores/gameStore";
import { WordGrid } from "@/components/wordGrid/wordGrid";
import Dictionary from "@/components/dictionary/dictionary";
import ChooseDifficulty from "@/components/chooseDifficulty/chooseDifficulty";
import Toast from "@/components/toast/toast";
import GameOver from "@/components/gameOver/gameOver";
import { useGame } from "@/hooks/useGame";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const difficulty = useGameStore((state) => state.difficulty);
	const showGameOver = useGameStore((state) => state.gameOver);
	useGame();

	return (
		<>
			<Head>
				<title>Woordzoeker | Made by Lewi</title>
				<meta name="description" content="Find all the anagrams" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={inter.className}>
				{difficulty ? (
					<div className={styles.gameWrapper}>
						<WordGrid />
						<Dictionary />
					</div>
				) : (
					<ChooseDifficulty />
				)}

				{showGameOver && <GameOver />}

				<Toast />
			</main>
		</>
	);
}
