## PDF Playground

```
HTTP_PORT=3000
```

```sh
cd pdf-playground

npm i

npm start

```

### Sample

```javascript

async function PDF() {

const {code, data} = await ajaxGET('https://jsonplaceholder.typicode.com/posts?userId=2');
  return {
    content: [
      {text: 'Teste do relatório dinâmico\n\n', style: 'header'},
      {
			  style: 'tableExample',
			  table: {
				  body: data.map(e =>  [e.id, e.title, e.userId])
			  }
		  }
	  ]
  }
}

```

```sh
docker image build -t playground .
docker container run --name playground -p 8000:3000 -e HTTP_PORT=3000 -e NODE_ENV=production playground
```

### Preview
![preview](https://github.com/eugenio-cunha/pdf-playground/blob/master/preview.png)