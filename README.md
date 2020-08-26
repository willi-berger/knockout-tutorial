# knockout-tutorial
some examples knockout exampkes based on the tutorials from http://learn.knockoutjs.com enhanced with some additioanl features :)

## Seat Reservations
The *seat reservations* tutorial enhanced with a
* remove link
* computed total amount
* computed counts of seleted meals


## Demo
https://willi-berger.github.io/knockout-tutorial/

# Dependencies

Use [yarn](https://classic.yarnpkg.com) to install dependencies.

```
C:\Users\willi\work\web\knockout\knockout-tutorial> yarn install --modules-folder vendor/
```

# Run with Docker
Create a docker container to run this example from your project directory, e.g.:
```
PS C:\Users\willi\work\web\knockout\knockout-tutorial> docker run -dit `
>> -p 8080:80 `
>> -v $PWD/.:/usr/local/apache2/htdocs  `
>> --name knockout-tutorial `
>> httpd:2.4
```
Start the container, if not already running.
```
C:\Users\willi\work\web\knockout\knockout-tutorial> docker start knockout-tutorial
```

