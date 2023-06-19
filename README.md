
# validacao-pix

Faz somente verifica atravez de um regex se a chave tem o formato válido, pelo CPF, TELEFONE, E-MAIL ou chave Aleatória. E retorna ela formatada e tipo chave inserida e se o valor e valido

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)



## Authors

- [@starleydev](https://www.github.com/starleyDev)


## Installation


```bash
  npm i @starley/validacao-pix
```
    
## Usage/Examples

Importe dentro do modulo que ira utilizar 

my-component.module.ts
```typescript
import { ValidacaoPix } from '@starley/validacao-pix';


@NgModule({
})
export class MyComponent {

  constructor (private validacaoPix: ValidacaoPix)

}
```

### Para usar a validação do pix

Ele ira retornar os valores chavePix, tipoChave, isValid!

my-component.ts
```ts

let pixValido: {chavePix, tipoChave, isValid} = this.ValidacaoPix.validarChavePIX(event);
console.log("🚀 ~ :", pixValido)

```


## License


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

