module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "react-app"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "promise"
    ],
    "rules": {
        "promise/catch-or-return": "error",
        "promise/valid-params": "warn",
        "promise/no-nesting": "warn",
        "semi": ["error", "always"],
        "camelcase": ["error", { properties: "never" }],
        "object-curly-spacing": ["error", "always", { "arraysInObjects": false, "objectsInObjects": false }],
        "keyword-spacing": ["error"],
        "brace-style": "error",
        // "max-len": ["error", { "code": 100 }]
    }
}
