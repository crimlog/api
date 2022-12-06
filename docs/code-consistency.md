# Code Consistency

## Linting

[Rome](https://rome.tools/) is the project's linting & formatting tool of choice. It includes several defaults out of the box, which generally serve to improve the developer experience by eliminating compelx configurations and the perpetual debates that often surround specific rules. Its configuration is defined in the root-level [`rome.json`](https://github.com/crimlog/api/blob/dev/rome.json) file.

Another benefit of Rome's lack of configuration options (when comared to alternatives such as [ESLint](https://eslint.org/) or [JSLint](https://www.jslint.com/)) is the "freedom" it can offer developers, even on teams, in making some personal coding style decisions. The Crimlog development team is currently small enough to where a slight degree of flexibility like this can end up making software development a more pleasant process. There is no arbitrary linter established by some senior developer 10 years ago that harasses you for every other line of code that you write. Instead, there's a lightweight, minimal linter that provides occasional suggestions for the purpose of enforcing a high-level coding standard, while still allowing you the freedom to code how you prefer and are used to. The humanity of developers can often be overlooked in work environments, and Crimlog aims to preserve the importance of human idiosyncrasy as much as possible.

Although linting can be performed entirely through the CLI, installing the [Rome IDE extension](#rome-vs-code-extension) is recommended for convenience. Linting via CLI is managed through npm scripts. `yarn lint` will output detected issues, and `yarn lint:fix` will automatically resolve them (if possible).

**Explanation of Crimlog specific linting rules that have been disabled**:

### [complexity.noExtraBooleanCast](https://docs.rome.tools/lint/rules/noextrabooleancast/)

Although many uses of the double-bang operator (`!!`) are critized for unnecessary complexity, those attacks often end up being overstatements. The double-bang operator, when used appropriately, provides immediately knowledge to the developer viewing it that the subject value is not a boolean.

JavaScript type coercion, while a beautiful feature, is frequently abused. For example:

```js
if(data) { ... }
```

The developer reading this without any knowledge of the codebase would have very little clue as to the type of `data`. Disregarding TypeScript, because JavaScript is what coerces values at runtime, it is unknown if `data` is a boolean, number, string, object, or anything else. Consider, on the other hand:

```js
if(!!data) { ... }
```

With the double-negation, it is clear to anyone who reads the code in the future that `data` is not a boolean. Developers can avoid any trivial mistakes made in the coding or debugging that would treat `data` as an explicit boolean during runtime.]

Double-negation is preferred over the `Boolean()` constructor because of its shorter character count.

### [correctness.noDelete](https://docs.rome.tools/lint/rules/noDelete/)

The `delete` operator in JavaScript is reasonably safe to use and only [inefficent in loops](https://levelup.gitconnected.com/5-facts-about-delete-operator-in-javascript-c16fd2588cd). It's a convenience operator that, when used responsibly, offers improved readability and syntactic simplicity.

### [style.useBlockStatements](https://docs.rome.tools/lint/rules/useBlockStatements/)

JavaScript differs from many languages in its notable offering of syntactic flexibility. Semicolons are [optional](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion), multi-variable declarations can have their [preceeding keyword omitted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#declaring_and_initializing_two_variables), and single-line statements [don't require curly braces](https://tc39.es/ecma262/#prod-Statement). In particular, single-line statements are a topic of contention amongst JavaScript developers.

It is effectively well-established ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else#description), [StackOverflow](https://stackoverflow.com/questions/4797286/are-braces-necessary-in-one-line-statements-in-javascript)) that block statements should be used to succeed any single-line statement, such as if-else conditionals and for loops. _However_, this can significantly muddle the readability and simplicity of the code. For example:

```js
if (array1.includes(item)) {
	doSomething();
} else if (array2.includes(item)) {
	doSomethingElse();
} else if (array3.includes(item)) {
	doSomethingDifferent();
} else {
	throw new Error();
}
```

This if-else chain could be greatly simplified with in-line consequents:

```js
if (array1.includes(item)) doSomething();
else if (array2.includes(item)) doSomethingElse();
else if (array3.includes(item)) doSomethingDifferent();
else throw new Error();
```

50% less lines to do the exact same thing, without sacrificing clarity. There is no muck of unnecessary line breaks and extra curly braces floating around the statements. _If P then Q_; each conditional is followed immediately by its consequent.

Another particularly redundant case is that of conditional `return` statements:

```js
function isValidData(data) {
	if (!data?.timestamp) {
		return false;
	}
	if (isNaN(data.timestamp)) {
		return false;
	}
	return Date.now() > timestamp;
}
```

The fact that each `return` statement is placed on its own line, when its sole purpose is to exit the fuction and return a value, is displeasing.
Unfortunately, Rome currently does not have a way to check for single- vs multi-line statements in its `useBlockStatements` rule. Until this is added, Crimlog will disable the rule entirely.

### [style.noNegationElse](https://docs.rome.tools/lint/rules/noNegationElse/)

Although there are cases where a negated condition with both a consequent and an alternate can cause readability issues, there are also cases where negating a conditional can actually improve readability. For example:

```js
return !Object.keys({}).length ? true : { foo: { nested: 'bar', array: [] } };
// vs
return !!Object.keys({}).length ? { foo: { nested: 'bar', array: [] } } : true;
```

The single negation in the first conditional ternary serves to both explicitly inform the reader that the conditional value is not a boolean (`!` is shorter than `Boolean()` or even `!!`), and displays the shorter consequent first. Generally, this is more readable than following a long consequent through over dozen characters (or, in some cases, lines) just to arrive at a short alternate.
Conditional negations aren't necessarily recommended under these linting guidelines, but they shouldn't be actively avoided, either.

### [nursery.noExplicitAny](https://docs.rome.tools/lint/rules/noexplicitany/)

Frankly, using the `any` type defeats the purpose of writing code in TypeScript over JavaScript in the first place. If dynamic types are desired, simply return to the hassle-free environment of interpreted JavaScript and avoid the headaches associated with turning a dynamically typed language into a compiled one.
Unfortunately, in the JS ecosystem, dynamic types are nearly inevitable, even when using TypeScript. Usage of third-party libraries is a great example. For reasons like this, the `any` type is **restrictively allowed** in the Crimlog API. It is heavily discouraged, and the linter will provide warnings instead of errors. Developers are encouraged to pursue other solutions, such as the [`unknown`](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)/[`never`](https://www.typescriptlang.org/docs/handbook/2/functions.html#never) types or [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

## Formatting

As established above, [Rome](https://rome.tools/) is also used for formatting, although its functionality is currently limited to JavaScript and TypeScript files. Its configuration is defined in the root-level [`rome.json`](https://github.com/crimlog/api/blob/dev/rome.json) file. To view formatting issues via CLI, use the npm script `yarn format`. To automatically fix formatting issues via CLI, use the npm script `yarn format:fix`.
To supplement areas that the Rome formatter cannot reach, we use [Prettier](https://prettier.io/). However, all Prettier formatting is performed at the IDE level, and is not included in the npm depencies or any CI pipelines. IDE-level formatting is achieved through integrations such as the [Prettier extension for VSCode](#prettier-formatter-for-visual-studio-code).
General formatting settings can be found in [`.vscode/settings.json`](https://github.com/crimlog/api/blob/dev/.vscode/settings.json). Here is a brief summary:

-   Semicolons are **always** used
-   Single quotes are always used unless impractical (e.g. escaping contractions: `'don\'t do this'`)
-   Trailing commas are always used on multiline items (including function parameters/arguments)
-   LF is the preferred EOL character
-   Lines are indented with spaces instead of tabs
    -   Two (2) spaces per indendation-level
-   Organize import statements
    -   External modules appear before relative modules
    -   All import statements are sorted by module name, ascending
    -   All named imports are sorted by export name, ascending
    -   Relative module imports should always be used for local project files
    -   Relative module file extensions should be omitted wherever possible (e.g. `app.module` instead of `app.module.ts`)

## TypeScript Typing

All TypeScript standards from linting apply. Additionally:

-   Explicitly declare types as often as practical
-   Prefer `unknown` over `any`

## Other

-   Use singular form for top-level entity names
    -   Plural form may be used for entity fields when the field will contain multiples of something (e.g. an array)
