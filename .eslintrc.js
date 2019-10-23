module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "standard"
    ],
    "globals": {
        "$": 'readonly',
        'GM_addStyle': 'readonly'
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    }
};