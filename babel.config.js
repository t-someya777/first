// module.exports = function(api) {
//   api.cache(true);

//   const presets = [
//     [
//       '@babel/preset-env',
//       {
//         targets: {
//           ie: 11,
//           esmodules: true
//         },
//         useBuiltIns: 'usage',
//         corejs: 3
//       }
//     ]
//   ];

//   return { presets };
// };

// export default function(api) {
//   api.cache(true);

//   const presets = [
//     [
//       '@babel/preset-env',
//       {
//         targets: {
//           ie: 11,
//           esmodules: true
//         },
//         useBuiltIns: 'usage',
//         corejs: 3
//       }
//     ]
//   ];

//   return { presets };
// };

export default function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env'];

  return { presets };
};