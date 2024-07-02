"use client"
import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
	const toast = useToast();
	const [output, setOutput] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const runCode = async () => {
		const sourceCode = editorRef.current.getValue();
		if (!sourceCode) return;
		try {
			setIsLoading(true);
			const { run: result } = await executeCode(language, sourceCode);
			setOutput(result.output.split("\n"));
			result.stderr ? setIsError(true) : setIsError(false);
		} catch (error) {
			console.log(error);
			toast({
				title: "An error occurred.",
				description: error.message || "Unable to run code",
				status: "error",
				duration: 6000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div>
				Output
			</div>
			<button onClick={runCode}>
				Run Code
			</button>
			<div>
				{output
					? output.map((line, i) => <Text key={i}>{line}</Text>)
					: 'Click "Run Code" to see the output here'}
			</div>
		</>
	);
};
export default Output;
