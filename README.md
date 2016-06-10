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
      "id":47,
      "sigla":"0266",
      "nome":"Ampliar o acesso à atenção odontológica na atenção básica, passando para 29 mil equipes de saúde bucal implantadas. ",
      "ano":2016,
      "linhaBase":24467,
      "meta":25000,
      "metaQuadrienal":29000,
      "codigoindicador":"ESB01",
      "nomeindicador":"Número de equipes de saude bucal",
      "meses":[  
         {  
            "nome":"Jan",
            "realizado":-15,
            "aRealizar":548,
            "resultadoAnual":-0.02737226277372263,
            "aRealizar19":4548,
            "resultadoQuadrienal":-0.0032981530343007917,
            "qtdAcumulada":24452
         },
         {  
            "nome":"Fev",
            "realizado":26,
            "aRealizar":522,
            "resultadoAnual":0.04980842911877394,
            "aRealizar19":4522,
            "resultadoQuadrienal":0.005749668288367979,
            "qtdAcumulada":24478
         },
         {  
            "nome":"Mar",
            "realizado":-16,
            "aRealizar":538,
            "resultadoAnual":-0.02973977695167286,
            "aRealizar19":4538,
            "resultadoQuadrienal":-0.0035257822829440283,
            "qtdAcumulada":24462
         },
         {  
            "nome":"Abr",
            "realizado":204,
            "aRealizar":334,
            "resultadoAnual":0.6107784431137725,
            "aRealizar19":4334,
            "resultadoQuadrienal":0.047069681587448085,
            "qtdAcumulada":24666
         },
         {  
            "nome":"Mai",
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0,
            "qtdAcumulada":0
         },
         {  
            "nome":"Jun",
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0,
            "qtdAcumulada":0
         },
         {  
            "nome":"Jul",
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0,
            "qtdAcumulada":0
         },
         {  
            "nome":"Ago",
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0,
            "qtdAcumulada":0
         },
         {  
            "nome":"Set",
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0,
            "qtdAcumulada":0
         },
         {  
            "nome":"Out",
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0,
            "qtdAcumulada":0
         },
         {  
            "nome":"Nov",
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0,
            "qtdAcumulada":0
         },
         {  
            "nome":"Dez",
            "realizado":0,
            "aRealizar":0,
            "resultadoAnual":0,
            "aRealizar19":0,
            "resultadoQuadrienal":0,
            "qtdAcumulada":0
         }
      ]
   }
]
```
