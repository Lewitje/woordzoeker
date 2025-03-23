import useToastStore from "@/stores/toastStore";

export default function useToast() {
	const setActiveToast = useToastStore((state) => state.setActiveToast);
	const removeActiveToast = useToastStore((state) => state.removeActiveToast);

	const addToast = (message: string) => {
		setActiveToast(message);

		setTimeout(() => {
			removeActiveToast();
		}, 4000);
	};

	return {
		addToast,
	};
}
