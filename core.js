clean = (text) => {
    text = text.replace(/\n/g, ";")
    text = text.replace(/\,( )+/g, ",")
    if (text[text.length - 1] != ";") {
        text += ";"
    }
    return text
}

functions = {
    "Print": (args) => {
        console.log(...args)
    },
    "Add": (args) => {
        return args[0] + args[1]
    }
}

// each line is in the form FunctionName(Argument1, Argument2, ...)
// arguments can be either a value or a function call
// eg: Print('nice');Print(Add(2, 3)); will be parsed as
// [{Print: ['nice']}, {Print: [{Add: [2, 3]}]}]
// lines are separated by ;
// arguments are separated by ,
syntaxFunctionRule = /([a-zA-Z0-9]+)\((.*)\)/

throwError = (message) => {
    throw new Error(message)
}

checkSyntax = (text) => {
    cleanedText = clean(text)
    textLines = cleanedText.split(";")
    let line = ""
    let isSyntaxValid = false
    for (let i = 0; i < textLines.length; i++) {
        line = textLines[i]
        if (line == "") {
            continue
        }
        isSyntaxValid = syntaxFunctionRule.test(line)
        if (!isSyntaxValid) {
            return null
        }
    }
    return textLines
}

getSyntaxTree = (line) => {
    let tree = {}
    let char = ""
    let functionName = ""
    let args = ""
 
    for (let j = 0; j < line.length; j++) {
        char = line[j]
        if (char == "(") {
            functionName = line.slice(0, j)
            args = line.slice(j + 1, line.length - 1)
            if (checkSyntax(args) != null) {
                args = getSyntaxTree(args)
            }
            tree[functionName] = [args]
            break
        }
    }
    return tree
}


parse = (text) => {
    let textLines = checkSyntax(text)
    if (textLines == null) {
        console.log("Syntax error on line " + (i + 1) + ": " + line)
        return null
    }
    let line = ""
    let trees = []
    let tree = {}
    for (let i = 0; i < textLines.length; i++) {
        line = textLines[i]
        if (line == "") {
            continue
        }
        tree = getSyntaxTree(line)
        trees.push(tree)
    }
    return trees
}

execute = (tree) => {
    let functionName = Object.keys(tree)[0]
    let args = tree[functionName][0]
    if (typeof args == "string") {
        args = [args]
    }
    if (typeof args == "object") {
        args = args.map((arg) => {
            if (typeof arg == "object") {
                return execute(arg)
            }
            return arg
        })
    }
    return functions[functionName](args)
}


egText = "Print(2)\nPrint('nice');Print(Add(Add(3, 4))))"
console.log(JSON.stringify(parse(egText)))
execute(parse(egText)[0])
