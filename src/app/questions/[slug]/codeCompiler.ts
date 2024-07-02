//@ts-ignore
import { transform } from "@babel/standalone";

const compile = (input: string) =>
	transform(input, {
		filename: "random.tsx",
		presets: ["react", "es2017"]
	})?.code;

export const compileCode = (code: string) => {
	const compiled = compile(
		code.replace(
			"import * as React from 'react';  //don't change this line\n",
			""
		)
	)?.replace('"use strict";\n', "");

	//@ts-ignore
	return new Function("React", "", `return ${compiled};`);
};

