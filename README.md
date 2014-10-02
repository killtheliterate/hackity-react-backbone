# Hackity some React and Backbone

A Prototype that demonstrates some ideas for replacing Backbone.Views with React
components.

## Benefits:
* Opportunity to strictly enforce separation of concerns.
* View re-renders are implicit. They occur whenever a Backbone object changes.
* View re-renders are *fast*. They are done by diffing, so only parts that need 
  changing are changed.
* React components are composable.
* JSX is badass.

## Development:

```
$ gem install bundler
$ bundle install
$ npm install
$ gulp --fatal=off
```

## Links worth visiting:

* todo MVC example: http://bit.ly/1nAw4K3
* SO example: http://bit.ly/1ux2nvm
* Another example: http://bit.ly/1yx0uBz
* Another example: http://bit.ly/1rFmJ3z

### Uh...
![alt tag](https://raw.githubusercontent.com/killtheliterate/hackity-react-backbone/master/hackity.gif)
