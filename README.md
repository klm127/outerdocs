## Outerdocs

_by klm127_

Outerdocs is a plugin for jsdocs which eases the linking of external documentation. It was inspired by [Intersphinx](https://www.sphinx-doc.org/en/master/usage/extensions/intersphinx.html) for Python.

<h2 id="toc"> Table of Contents </h2>

1. [How it works](#toc1)
1. [Installing](#toc2)
1. [Adding/Configuring an external namespace](#toc3)
1. [Referencing an external namespace](#toc4)
1. [Configuring a namespace for MDN built ins](#toc5)
1. [Configuring a namespace for React documentation](#toc6)

<h2 id="toc1"> How it works</h2>

1. Looks for `@outerdocs` tags in source files.
2. When the tag is found, finds the external doc namespace reference, which is the first word in the value. So for `@outerdocs Phaser.Game`, outerdoc will find `Phaser` 
3. Looks in the [jsdoc configuration file](https://jsdoc.app/about-configuring-jsdoc.html) for the `outerdocs` configuration object.
4. Looks in the `outerdocs` object for the found namespace configuration object. 
5. Builds a URL based on that namespace's settings and the value given to `@outerdocs`.
6. Adds a [@link](https://jsdoc.app/tags-inline-link.html) to the [@see array](https://jsdoc.app/tags-see.html) of the doclet.
7. Sets the url of the `@link` to the built URL. Sets the text of the `@link` to the text that was given to the `@outerdocs` tag.

You can see a simple example of the output on [these docs](http://www.quaffingcode.com/outerdocs/)

So, for example, in your jsdoc you might have an outerdocs tag like this:
```
* @outerdocs Phaser.Physics
```
And in your output documentation, you will have something like:
<dl class="details">
 <dt class="tag-see">See:</dt>
 <dd class="tag-see">
    <ul>
     <li>
       <a href="https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics">Phaser.Physics</a>
     </li>
    </ul>
 </dd>
</dl>

<h2 id="toc2">Installing</h2>

Outerdocs is not on NPM yet. It needs to be added to your package manually for the moment.

1. Copy `outerdocs.js` from this repo to the repository you want to document.
2. Create a [configuration file](https://jsdoc.app/about-configuring-jsdoc.html) for jsdoc if you don't already have one. 
3. Create a top level property in the configuration file named `"outerdocs"`.
4. Add outerdocs to the plugins array in the jsdoc config. E.g.: `"plugins": [ "./docs-configuration/outerdocs.js" ]` . Note that for a plugin outside of the jsdoc default plugins, you need to include the `./` to tell jsdoc it's a relative path.


<h2 id="toc3">Adding an external namespace</h2>

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

<h2 id="toc4">Referencing the namespace</h2>

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

And the output in the docs will be:
And in your output documentation, you will have something like:
<dl class="details">
 <dt class="tag-see">See:</dt>
 <dd class="tag-see">
    <ul>
     <li>
       <a href="https://newdocs.phaser.io/docs/3.55.2/Phaser.GameObjects.Image">Phaser.GameObjects.Image</a>
     </li>
    </ul>
 </dd>
</dl>


<h2 id="toc5">Configuring a namespace for MDN built ins</h2>

Lets say we want to be able to reference built in objects from the MDN documentation. MDN's documentation is different from Phasers. Each namespace is separated with `/` characters instead of `.` characters. We also want our internal namespace name to NOT be included in the final URL.

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

And in your output documentation, you will have something like:
<dl class="details">
 <dt class="tag-see">See:</dt>
 <dd class="tag-see">
    <ul>
     <li>
       <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind">BuiltIn.Function.bind</a>
     </li>
    </ul>
 </dd>
</dl>


<h2 id="toc6">Example: Configuring a namespace for React documentation</h2>

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

And in your output documentation, you will have something like:
<dl class="details">
 <dt class="tag-see">See:</dt>
 <dd class="tag-see">
    <ul>
     <li>
       <a href="https://reactjs.org/docs/react-component.html#render">React.react-component#render</a>
     </li>
    </ul>
 </dd>
</dl>
