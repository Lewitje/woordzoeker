import useGameStore from "@/stores/gameStore";
import styles from "./chooseDifficulty.module.css";
import { GameDifficulties } from "@/hooks/useGame";
import Button from "@/components/button/button";
import Spacer from "@/components/spacer/spacer";

export default function ChooseDifficulty() {
	const setDifficulty = useGameStore((state) => state.setGameDifficulty);

	return (
		<div className={styles.container}>
			<h2>Choose a mode</h2>

			<Spacer size={4} />

			<div className={styles.difficultyPickerWrapper}>
				{GameDifficulties.map((item) => (
					<div className={styles.difficultyItemWrapper} key={item.value}>
						<h3>{item.name}</h3>
						<Spacer size={1} />
						<p>{item.description}</p>
						<Spacer size={4} />
						<Button
							onClick={() => setDifficulty(item.value)}
							label={item.name}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
