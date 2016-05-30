# sageservice

Serviço cujo objetivo é fornecer informações aos sistemas internos do portal/eCAR.

## Interface

### Indicaroes

API de coleta de informações de indicdores

*/api/v1/indicador* - Lista os indicadores que possuem valores na base de indicdores

*/api/v1/indicador/:codigo* - Lista valores do indicador indicado no código

*/api/v1/indicador/:codigo/:ano* - Lista valores do indicador indicado no código no ano determinado

### Metas

API de coleta de informações de metas

*/api/v1/meta* - Lista as metas com indicadores associados

*/api/v1/meta/:sigla* - Análise da meta indicada na sigla

*/api/v1/meta/cod/:id* - Análise da meta indicada no id

