import { useCallback, useEffect, useState } from "react";

type useGif = {
	loading: boolean;
	url: string;
	error: boolean;
};

export default function useGif(): useGif {
	const [loading, setLoading] = useState(false);
	const [url, setUrl] = useState("");
	const [error, setError] = useState(false);
	const apiKey = "AwFnVU2pJ2qHxjrFkJnxFsVAOFPJGAbY";

	const fetchGif = useCallback(async () => {
		if (url !== "" || loading) {
			setLoading(false);
			return;
		}

		setLoading(true);
		const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=happydance&rating=g`;

		try {
			const response = await fetch(endpoint);
			if (!response.ok) {
				setError(true);
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();
			setUrl(json.data.images.original.url);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [loading, url]);

	useEffect(() => {
		fetchGif();
	}, []);

	return {
		loading,
		url,
		error,
	};
}
