# Rails + graphql + relay

## Command

Create graphal schema on server side.

`bundle exec rake dump_schema`

Create relay query on client side using server dump

`yarn relay`

Development watch

`yarn watch`

Production build

`yarn build`


## Test Query

http://localhost:3001/graphiql

```
{
  testfield
}
```

```
{
  users {
    name,
    email
  }
}
```


```
{
  user(id: 1) {
    name
    email
  }
}
```




## Links


http://graphql-ruby.org/

https://facebook.github.io/relay/docs/en/installation-and-setup.html

https://www.howtographql.com/basics/0-introduction/

https://qiita.com/kielze/items/b2168d7214992e5d37bf



https://github.com/kielze/graphql-ruby-demo





