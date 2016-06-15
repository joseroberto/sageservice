# sageservice

Serviço cujo objetivo é fornecer informações aos sistemas internos do portal/eCAR.

## Interface

### Indicadores

API de coleta de informações de indicdores

*/api/v1/indicador* - Lista os indicadores que possuem valores na base de indicdores

*/api/v1/indicador/:codigo* - Lista valores do indicador indicado no código

*/api/v1/indicador/:codigo/:ano* - Lista valores do indicador indicado no código no ano determinado

### Metas

API de coleta de informações de metas

*/api/v1/meta* - Lista as metas com indicadores associados

*/api/v1/meta/:sigla* - Análise da meta indicada na sigla

*/api/v1/meta/cod/:id* - Análise da meta indicada no id

#### Formato de saída

```json
[
   {
      "id":45,
      "sigla":"0265",
      "nome":"Ampliar o número de equipes da Estratégia Saúde da Família para 46 mil. ",
      "ano":2016,
      "linhaBase":39308,
      "meta":43465,
      "metaQuadrienal":46465,
      "codigoindicador":"PSF01",
      "nomeindicador":"Número total de equipes de saúde da família habilitadas",
      "meses":[
         {
            "nome":"Jan",
            "valor":40196,
            "realizado":888,
            "aRealizar":3269,
            "resultadoAnual":0.27164270419088404,
            "aRealizar19":6269,
            "resultadoQuadrienal":0.14164938586696443
         },
         {
            "nome":"Fev",
            "valor":40307,
            "realizado":111,
            "aRealizar":3158,
            "resultadoAnual":0.035148828372387586,
            "aRealizar19":6158,
            "resultadoQuadrienal":0.018025332900292304
         },
         {
            "nome":"Mar",
            "valor":40155,
            "realizado":-152,
            "aRealizar":3310,
            "resultadoAnual":-0.045921450151057405,
            "aRealizar19":6310,
            "resultadoQuadrienal":-0.024088748019017434
         },
         {
            "nome":"Abr",
            "valor":40483,
            "realizado":328,
            "aRealizar":2982,
            "resultadoAnual":0.10999329309188464,
            "aRealizar19":5982,
            "resultadoQuadrienal":0.05483116014710799
         },
         {
            "nome":"Mai",
            "valor":0,
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0
         },
         {
            "nome":"Jun",
            "valor":0,
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0
         },
         {
            "nome":"Jul",
            "valor":0,
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0
         },
         {
            "nome":"Ago",
            "valor":0,
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0
         },
         {
            "nome":"Set",
            "valor":0,
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0
         },
         {
            "nome":"Out",
            "valor":0,
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0
         },
         {
            "nome":"Nov",
            "valor":0,
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0
         },
         {
            "nome":"Dez",
            "valor":0,
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0
         }
      ]
   }
]
```
