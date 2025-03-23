import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./gameOver.module.css";
import Spacer from "../spacer/spacer";
import Button from "../button/button";
import useGameStore from "@/stores/gameStore";
import useGif from "@/hooks/useGif";

export default function GameOver() {
	const resetGame = useGameStore((state) => state.resetState);

	const { loading, url, error } = useGif();

	if (loading) {
		return <></>;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner}>
				<h2>Congratulations!</h2>
				<p>You found all the anagrams, want to play again?</p>

				<Spacer size={2} />

				<div className={styles.imageWrapper}>
					{error ? (
						<Image
							className={styles.image}
							src="/winner.gif"
							alt="Happy Dance"
							width={500}
							height={500}
						/>
					) : (
						<Image
							className={styles.image}
							src={url}
							alt="Happy Dance"
							width={500}
							height={500}
						/>
					)}
				</div>

				<Spacer size={2} />

				<Button onClick={resetGame} label="Reset game" />
			</div>
		</div>
	);
}
