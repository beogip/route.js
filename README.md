# Route.js
Route.js allows executing JavaScript code in the browser under a specific url

## Setup
Include the Route.js script in your HTML markup:

```html
<script src="js/route.min.js"></script>
```
## Usage
In your application code, use the **route()** function like this:

```js
//if the browser url is /some/url
route("/some/url", function(data)
{
  //this code will run
});
```
You can get the url parameters

```js
//if the browser url is /some/foo
route("/some/:id", function(data)
{
  //this code will run and data.id is equal to 'foo'
});
```
You can use a wildcard to run the code in all the urls

```js
route("*", function(data)
{
  //this code will run in any url
});
```
## API
The **route()** function accepts a string as first argument. The second argument must be a **callback** function, which is called if the first argument matchs with the browser url. The callback function receives only one argument, wich is an object with the url params.

## License
Copyright 2015 Juan Ignacio Gipponi. Licensed under the MIT License. See the LICENSE file for more information.
