const path=require('path');
module.exports={
	entry:'./src/index.js',
	output:{
		filename:'bundle.js',
		path:path.resolve(__dirname,'dist')

	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		],
		rules: [
			{ test: /\.handlebars$/, loader: "handlebars-loader" },
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	}
};
