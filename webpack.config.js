const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		main: "./ts/main.ts",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name]-bundle.js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.png/,
				type: "asset/resource",
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
      })
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "html",
					globOptions: {
						ignore: [ "textures/**/*" ]
					}
				}
			]
		}),
	],
};