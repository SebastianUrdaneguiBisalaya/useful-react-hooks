import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import perfectionist from 'eslint-plugin-perfectionist';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js, perfectionist },
		rules: {
			'perfectionist/sort-classes': [
				'error',
				{
					order: 'asc',
					type: 'natural',
				},
			],
			'perfectionist/sort-imports': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						['internal', 'parent', 'sibling', 'index'],
					],
					order: 'asc',
					type: 'natural',
				},
			],
			'perfectionist/sort-jsx-props': [
				'error',
				{
					order: 'asc',
					type: 'natural',
				},
			],
			'perfectionist/sort-object-types': [
				'error',
				{
					order: 'asc',
					type: 'natural',
				},
			],
			'perfectionist/sort-objects': [
				'error',
				{
					order: 'asc',
					type: 'natural',
				},
			],
			'perfectionist/sort-variable-declarations': [
				'error',
				{
					order: 'asc',
					type: 'natural',
				},
			],
		},
		extends: ['js/recommended'],
		languageOptions: { globals: globals.browser },
	},
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
]);
