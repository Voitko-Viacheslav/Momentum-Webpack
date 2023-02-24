const path = require('path'); 
const htmlWebpackPlugin = require('html-webpack-plugin') // подключаем HTML библиотеку
const FaviconsWebpackPlugin = require('favicons-webpack-plugin') // подключаем Favicon

module.exports = {
  mode: 'production',
  entry: {
    filename: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'index.js', // как будет называтся в папке dist
    filename: '[name][contenthash].js', // что бы не было кеширования 
    assetModuleFilename: '[name][ext]', 
    // [name] имя которое у фотографии
    // [ext] то же расширение фотографии

    clean: true // что бы файлы не дублировались после сборки
  },
  performance: {
    hints: false, // отключаем подсказки
    maxAssetSize: 512000,  // максимальный размер изображения
    maxEntrypointSize: 512000    // после подгрузки если размер больше
  },
  devServer: {
    port: 9000,     // порт любой можно
    compress: true, // сжатие файлов при отображении на локальном сервере
    hot: true,      // автоматически перезагрузка сервера
    static: {       // какие файлы покажем
      directory: path.join(__dirname, 'dist')  // полный путь с нужной папкой 'dist'
    }  // 'dist' - покажем на сервере
  },
  module: {   // правила подключения дополнительных правил
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,  // свойство test: какие файлы будем выбирать
        use: ['style-loader', 'css-loader', 'sass-loader']  
      }, // свойство use: какие библиотеки будут использованы
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,  // перечисляем форматы, i - регистры
        type: 'asset/resource'
      }, // свойство type: указываем что это изображение /resource

      //! Эти не сработали строки сделал в файле audio-player.js через import 
      {
        test: /\.(mp3?|wav|ogg|mpe?g)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/sounds/[name][hash][ext]',
        },
      }





    ]
  },
  plugins: [ // свойства плагинов
  new htmlWebpackPlugin ({     // плагин
    title: 'My Web Page',      // название страницы
    filename: 'index.html',    // название файла
    template: 'src/index.html' // подключаем файл index.html
  }),
  new FaviconsWebpackPlugin({
    logo: 'src/assets/fav.png',
     //logo: 'src/img/icon.svg',
     mode: 'webapp',
     devMode: 'webapp',
     prefix: 'assets/favicons/',
     cache: true,
     inject: htmlPlugin => {
       return true
       return basename(htmlPlugin.options.filename) === 'pages/articles.html'
     },
     favicons: {
       background: '#fff',
       theme_color: '#333',
     },
   }),  
] 
}