const OFF = 0;
const WARN = 1;
const ERROR = 2

module.exports = {
  env: {
    node: true,
    mocha: true,
    es6: true
  },
  globals: {
    DAY_6_DISTANCE_THRESHOLD: false,
    DAY_7_TIME_ADDITION: false,
    DAY_7_WORKER_COUNT: false,
    DAY_10_MAX_SEARCH_TIME: false,
    DAY_11_GRID_SIZE: false,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'no-console': WARN,
    'no-duplicate-case': ERROR,
    'no-extra-parens': OFF,
    'accessor-pairs': OFF,
    'block-scoped-var': OFF,
    complexity: OFF,
    'default-case': WARN,
    'guard-for-in': WARN,
    'no-eq-null': OFF,
    'no-fallthrough': OFF,
    'no-implicit-coercion': OFF,
    'no-invalid-this': OFF,
    'no-param-reassign': OFF,
    'no-process-env': OFF,
    'no-unused-expressions': WARN,
    'no-useless-call': WARN,
    'no-void': OFF,
    'init-declarations': OFF,
    'no-catch-shadow': WARN,
    'no-undef': ERROR,
    'callback-return': WARN,
    'computed-property-spacing': [WARN, 'never'],
    'consistent-this': [WARN, 'that'],
    'func-names': OFF,
    'func-style': OFF,
    'id-length': OFF,
    'lines-around-comment': OFF,
    'linebreak-style': [WARN, 'unix'],
    'new-cap': WARN,
    'newline-after-var': OFF,
    'no-inline-comments': OFF,
    'no-nested-ternary': OFF,
    'no-ternary': OFF,
    'no-underscore-dangle': OFF,
    'object-curly-spacing': [
      WARN,
      'never',
      {
        arraysInObjects: true
      }
    ],
    'operator-linebreak': OFF,
    'id-match': OFF,
    'sort-vars': OFF,
    'keyword-spacing': ['warn'],
    'space-unary-ops': OFF,
    'max-params': OFF,
    'max-statements': OFF,
    'comma-dangle': [ERROR, {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore'
    }],
    'no-cond-assign': [ERROR, 'except-parens'],
    'no-constant-condition': ERROR,
    'no-control-regex': WARN,
    'no-debugger': ERROR,
    'no-dupe-args': ERROR,
    'no-dupe-keys': ERROR,
    'no-empty-character-class': WARN,
    'no-empty': WARN,
    'no-ex-assign': WARN,
    'no-extra-boolean-cast': WARN,
    'no-extra-semi': WARN,
    'no-func-assign': WARN,
    'no-inner-declarations': [WARN, 'both'],
    'no-invalid-regexp': ERROR,
    'no-irregular-whitespace': ERROR,
    'no-negated-in-lhs': WARN,
    'no-obj-calls': WARN,
    'no-regex-spaces': WARN,
    'no-sparse-arrays': WARN,
    'no-unreachable': WARN,
    'use-isnan': WARN,
    'valid-jsdoc': WARN,
    'valid-typeof': WARN,
    'no-unexpected-multiline': WARN,
    'consistent-return': WARN,
    curly: [WARN, 'all'],
    'dot-notation': [
      WARN,
      {
        allowKeywords: true,
        allowPattern: ''
      }
    ],
    'dot-location': [WARN, 'property'],
    eqeqeq: WARN,
    'no-alert': WARN,
    'no-caller': WARN,
    'no-div-regex': WARN,
    'no-else-return': WARN,
    'no-eval': ERROR,
    'no-extend-native': WARN,
    'no-extra-bind': WARN,
    'no-floating-decimal': WARN,
    'no-implied-eval': WARN,
    'no-iterator': WARN,
    'no-labels': WARN,
    'no-lone-blocks': WARN,
    'no-loop-func': WARN,
    'no-multi-spaces': WARN,
    'no-multi-str': WARN,
    'no-native-reassign': ERROR,
    'no-new-func': WARN,
    'no-new-wrappers': WARN,
    'no-new': WARN,
    'no-octal-escape': WARN,
    'no-octal': WARN,
    'no-proto': WARN,
    'no-redeclare': [
      WARN,
      {
        builtinGlobals: true
      }
    ],
    'no-return-assign': WARN,
    'no-script-url': WARN,
    'no-self-compare': WARN,
    'no-sequences': WARN,
    'no-throw-literal': ERROR,
    'no-warning-comments': OFF,
    'no-with': ERROR,
    radix: WARN,
    'vars-on-top': OFF,
    'wrap-iife': [WARN, 'inside'],
    yoda: OFF,
    strict: [WARN, 'never'],
    'no-delete-var': WARN,
    'no-label-var': WARN,
    'no-shadow-restricted-names': WARN,
    'no-shadow': [
      ERROR,
      {
        hoist: 'functions'
      }
    ],
    'no-undef-init': WARN,
    'no-undefined': OFF,
    'no-unused-vars': WARN,
    'no-use-before-define': ERROR,
    'handle-callback-err': WARN,
    'no-mixed-requires': WARN,
    'no-new-require': WARN,
    'no-path-concat': WARN,
    'no-process-exit': WARN,
    'no-restricted-modules': [WARN, ''],
    'no-sync': OFF,
    'array-bracket-spacing': [WARN, 'never', {}],
    'brace-style': [
      WARN,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    camelcase: [
      WARN,
      {
        properties: 'never'
      }
    ],
    'comma-spacing': [
      WARN,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [WARN, 'last'],
    'eol-last': WARN,
    indent: [
      WARN,
      2,
      {
        SwitchCase: 1
      }
    ],
    'key-spacing': [
      WARN,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'max-nested-callbacks': [WARN, 6],
    'new-parens': WARN,
    'no-array-constructor': WARN,
    'no-continue': WARN,
    'no-lonely-if': WARN,
    'no-mixed-spaces-and-tabs': WARN,
    'no-multiple-empty-lines': [
      WARN,
      {
        max: 2
      }
    ],
    'no-new-object': WARN,
    'no-spaced-func': WARN,
    'no-trailing-spaces': WARN,
    'no-unneeded-ternary': WARN,
    'one-var': [WARN, 'never'],
    'operator-assignment': [WARN, 'never'],
    'padded-blocks': OFF,
    'quote-props': OFF,
    quotes: [WARN, 'single', {avoidEscape: true}],
    'semi-spacing': [
      WARN,
      {
        before: false,
        after: true
      }
    ],
    semi: [WARN, 'always'],
    'space-before-blocks': [WARN, 'always'],
    'space-before-function-paren': [
      WARN,
      {
        anonymous: 'always',
        named: 'never'
      }
    ],
    'space-in-parens': [WARN, 'never'],
    'space-infix-ops': WARN,

    'spaced-comment': [WARN, 'always'],
    'wrap-regex': WARN,
    'max-depth': [WARN, 4],
    'max-len': [WARN, 121, 2, {}],
    'no-bitwise': OFF,
    'no-plusplus': WARN,

    /* ES6 */
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-spacing': [
      WARN,
      {
        before: true,
        after: true
      }
    ],
    'constructor-super': WARN,
    'generator-star-spacing': OFF,
    'no-class-assign': WARN,
    'no-const-assign': WARN,
    'no-this-before-super': WARN,
    'no-var': WARN,
    'object-shorthand': [WARN, 'always'],
    'prefer-const': WARN,
    'prefer-spread': WARN,
    'prefer-reflect': OFF,
    'require-yield': WARN,
  }
};
