# onlyfuns
a minimal language, fully built with functions

// with the function getSyntaxTree we can transform "Main(Print(2),Print('nice'),Print(Add(2,3)))" into
// [{
//     "name": "Main",
//     "args": [
//         {
//             "name": "Print",
//             "args": [
//                 2
//             ]
//         },
//         {
//             "name": "Print",
//             "args": [
//                 "'nice'"
//             ]
//         },
//         {
//             "name": "Print",
//             "args": [
//                 {
//                     "name": "Add",
//                     "args": [
//                         2,
//                         3
//                     ]
//                 }
//             ]
//         }
//     ]
// }]