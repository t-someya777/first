// const PATH = require('path');//node.jsの関数でパスを操作できる。require('path')についてhttps://ocws.jp/blog/post1825/
// const JS_PATH = PATH.join(__dirname, './src/js');//トランスパイルするファイルまでの絶対パスを作る。PATH.joinは__dirname + ./src/jsと同じととらえて良い。__dirnameついてhttps://gist.github.com/uupaa/da42698d6b2d2cbb3cca
// const JS_DIST_PATH = PATH.join(__dirname, './');//出力先までの絶対パスを作る

// const { kernel } = require('sharp');

// module.exports = [
//   {
//     mode: 'development',//開発モードdevelopmentと納品モードproductionがある。納品モードではコメントなどを消すなどができる。
//     entry: {//入出力の設定
//       'dist/js/bundle': JS_PATH + '/main.js'//「：」より左側は出力先、右側はターゲットファイル
//     },
//     output: {//出力の設定。
//       path: JS_DIST_PATH,//出力先のパス
//       filename: '[name].js'//出力時のファイル名。[name]はentryの「：」の右側で決めたパスになる。dist/common/js/bundle.jsこうなる
//     },
//     resolve: {//ここから下は現時点では理解していなくても大丈夫です、気になる方はググってください。
//       extensions: ['.js'],
//       modules: [JS_PATH, 'node_modules']
//     },
//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           use: [
//             {
//               loader: 'babel-loader',
//               options: {
//                 presets: [
//                   [
//                     '@babel/env',
//                     {
//                       modules: false
//                     }
//                   ]
//                 ]
//               }
//             }
//           ],
//           exclude: /node_modules/
//         }
//       ]
//     }
//   }
// ];

import PATH from 'path';
import { fileURLToPath } from 'url';

// ESモジュールでは__dirnameは使用できないため、import.meta.urlを使って同等のパスを取得
const __dirname = PATH.dirname(fileURLToPath(import.meta.url));

const JS_PATH = PATH.join(__dirname, './src/js');
const JS_DIST_PATH = PATH.join(__dirname, './');

export default [
  {
    mode: 'development',
    entry: {
      'dist/js/bundle': JS_PATH + '/main.js'
    },
    output: {
      path: JS_DIST_PATH,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.js'],
      modules: [JS_PATH, 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/env',
                    {
                      modules: false
                    }
                  ]
                ]
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    }
  }
];
