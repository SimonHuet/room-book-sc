# Room-book-sc

> Technical test from Sharing cloud to handle room booking

![Continuous Integration](https://github.com/SimonHuet/room-book-sc/actions/workflows/ci.yml/badge.svg)
## Getting started

### Prerequisites

- Docker and docker compose  

Or
- node
- `npm install`

### Start the project

With Docker: 
```bash
docker compose up
```

Without: 
```
npm start
```

### Retour d'expérience

En terme de demande fonctionnelle je n'ai pas été poussé dans mes retranchements. La demande était claire.
J'ai tout de même eu quelques soucis avec l'api qui ne tourne pas sur node 12, j'ai donc opté pour la conteneurisation ( la config est dans `/apiconfig`)

J'ai décidé d'utiliser `Redux & RTK` pour la gestion d'état et `Redux-Saga` pour gérer les appels API. 
Pour la gestion des styles j'ai utilisé du `scss`. 

Je me suis aussi décidé à faire du `Typescript`, que j'avais seulement vu dans des revues de code, mais jamais pratiqué. 
Je me suis pas mal mordu les doigts au début, je sens que j'ai encore beaucoup à apprendre dessus, notamment les bonnes pratiques. Néanmoins, Typescript m'as évité plusieurs erreurs et bug, sur lequels j'aurai pris un peu de temps avant de comprendre ce qui n'allait. Je continuerais d'en faire dans mes futurs projets.

J'ai aussi utilisé `date-fns` pour faciliter la manipulation de dates. Et `react-toastify` pour notifier l'utilisateur des erreurs de récupération par l'api.

Pour le reste, je n'ai pas utilisé de librairies...
