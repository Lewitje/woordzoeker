import useToastStore from "@/stores/toastStore";
import styles from "./toast.module.css";

export default function Toast() {
	const activeToast = useToastStore((state) => state.activeToast);

	if (!activeToast) {
		return;
	}

	return (
		<div className={styles.toastWrapper}>
			<div className={styles.toastInner}>{activeToast}</div>
		</div>
	);
}
