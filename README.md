## Outerdocs

_by klm127_

Outerdocs is a plugin for jsdocs which eases the linking of external documentation.

It looks for `@outerdocs` tags and, when it finds one, figures out the appropriate link based on your configuration settings and adds that to the `@see` list for the doclet with a `@link` tag to the configured documentation source. The URL of the link will be the base URL, with the path to the resource generated based on the settings in your jsdoc configuration file.

You can see a simple example of the output on [these docs](http://www.quaffingcode.com/outerdocs/)

## Installing

Outerdocs is not on NPM yet. It needs to be added to your package manually for the moment.

1. Copy `outerdocs.js` from this repo to the repository you want to document.
2. Create a [configuration file](https://jsdoc.app/about-configuring-jsdoc.html) for jsdoc if you don't already have one. 
3. Create a top level property in the configuration file named `"outerdocs"`.

## Adding an external namespace

Inside your `conf.json:outerdocs` property add a property for the external namespace. This is what you will use to quickly reference with the `@outerdocs` tag throughout your source file. Each namespace should have 4 properties; `url`, `structure`, `appendhtml`, and `dropFirst`.

#### Example of a Phaser3 configuration
```
{
    ...
    "outerdocs": {
        "Phaser": {
            "url": "https://newdocs.phaser.io/docs/3.55.2/",
            "structure": "dots",
            "appendhtml": false,
            "dropFirst": false
        }
    }
}
```

## Referencing the namespace

To reference the namespace, use the `@outerdocs <namespace>` tag. The `<namespace>` value can include member names and the html link will be constructed based on the settings in the configuration file.

#### Example of a Phaser3 reference

```
/**
 * @outerdocs Phaser.GameObjects.Image
 * @description Some object that's been extended
 */
class myImage extends Phaser.GameObjects.Image{
}
```

This will add a new value to the `@see` ([link](https://jsdoc.app/tags-see.html)) array of the doclet.

Based on these configuration settings, this `outerdocs` command would be the equivalent of writing:

```
/**
* @see { @link https://newdocs.phaser.io/docs/3.55.2/Phaser.GameObjects.Image Phaser.GameObjects.Image}
*/
```

## Example: Configuring a namespace for MDN built ins

Lets say we want to be able to reference built in objects from the MDN documentation.

#### Example of an MDN Built ins configuration

```
{
    ...
    "outerdocs: {
        "BuiltIn": {
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/",
            "structure": "slashes",
            "appendhtml": false,
            "dropFirst": true

        }
    }
}
```

`"structure":"slashes"` tells outerdocs to convert the dots in the namespace reference to slashes in the URL.
`"appendhtml":false"` tells outerdocs not to append `.html` at the end of the URL.
`"dropFirst":true"` tells outerdocs to not include the namespace name, "BuiltIn" when constructing the URL.

#### Example of an MDN built in reference

```
/**
* Does some cool stuff and binds the context differently 
* @outerdocs BuiltIn.Function.bind
*/
class myFunction {
}
```

Based on these configuration settings, the `@outerdocs` tag would be the equivalent of writing:

```
/*
* @see { @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind BuiltIn.Function.bind}
*/
```

## Example: Configuring a namespace for React documentation

#### Example React namespace configuration file

```
...
"outerdocs": {
        "React": {
            "url":"https://reactjs.org/docs/",
            "structure": "slashes",
            "appendhtml": true,
            "dropFirst": true
        }
    }
```

Name references don't have to work as normal javascript syntax

#### Example outerdoccing a React component function with an ID
```
class MyComponent extends React.Component {

    /**
     * This is how my component renders
     * @outerdocs React.react-component#render
     */
    render() {
    }
}
```

Based on these configuration settings, the `@outerdocs` tag would be the equivalent of writing

```
/*
* @see { @link https://reactjs.org/docs/react-component.html#render React.react-component#render}
*/
render() {}
 ```
