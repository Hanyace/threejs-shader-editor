import { languages } from "monaco-editor";

export const GLSL_KEYWORDS = [
    "uniform",
    "attribute",
    "varying",
    "vec2",
    "vec3",
    "vec4",
    "mat3",
    "mat4",
    "void",
    "main",
    "float",
    "int",
    "if",
    "else",
    "for",
    "while",
    "in",
    "out",
    "include",
    "gl_FragColor",
    "gl_Position",
    "gl_PointSize",
    "gl_FragCoord",
    "gl_PointCoord",
    "return",
    "discard",
    "const",
    "sampler2D",
];

export const GLSL_BUILTINS = [
    "sin",
    "cos",
    "tan",
    "abs",
    "min",
    "max",
    "clamp",
    "mix",
    "step",
    "smoothstep",
    "length",
    "distance",
    "dot",
    "cross",
    "normalize",
    "pow",
    "exp",
    "log",
    "sqrt",
    "fract",
    "mod",
    "floor",
    "ceil",
    "sign",
    "texture2D",
];

export const TYPE_KEYWORDS = [
    "float",
    "int",
    "bool",
    "void",
    "vec2",
    "vec3",
    "vec4",
    "mat4",
    "sampler2D",
];

export const OPERATORS = ["=", ">", "<", "!", "+", "-", "*", "/"];

export const TOKENIZER: {
    [name: string]: languages.IMonarchLanguageRule[];
} = {
    root: [
        [
            /[a-zA-Z_]\w*/,
            {
                cases: {
                    "@keywords": "keyword",
                    "@builtins": "function",
                    "@typeKeywords": "types",
                    "@default": "identifier",
                },
            },
        ],
        [/\d+\.\d+/, "number.float"],
        [/\d+/, "number"],
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@comment"],
        [/\(/, "punctuation.parenthesis.begin"],
        [/\)/, "punctuation.parenthesis.end"],
        [/\[/, "punctuation.bracket.begin"],
        [/\]/, "punctuation.bracket.end"],
        [/\{/, "punctuation.brace.begin"],
        [/\}/, "punctuation.brace.end"],
        [/[;,.]/, "delimiter"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string"],
    ],
    comment: [
        [/\*\//, "comment", "@pop"],
        [/./, "comment"],
    ],
    string: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
    ],
};
