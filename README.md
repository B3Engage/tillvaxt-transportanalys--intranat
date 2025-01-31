# sitevision-boilerplate

## Sätta upp nytt repo baserat på denna boilerplate:

Forka repot, välj namn på det nya repot och kom ihåg att välja att "b3grit" ska stå som ägare

Klona repot, kör npm install i root-mappen, dev-mode mappen och i styling-module mappen

sätt upp .dev_properties.json i styling-module mappen. Likt detta: 
{ 
  "domain": "dse-b3grit-intra.sitevision-cloud.se", 
  "siteName": "Sitevision Intranät Demo", 
  "addonName": "Styling-module", 
  "username": "nick.lindstrom@b3.se", 
  "password": "" 
}

kör en "npm run init-module" i root-mappen för att modulen ska komma upp i Sitevision.

Sätt upp en ny roll under webbplatsinställningarna, tex. "Developer"

Peka ut personer eller en grupp på huset med rollen Developer

Gå till Grundmallen och lägg ut modulen "Styling-module" och fyll i rollen du skrev ovan, tex. "Developer". Publicera grundmallen

Kör "npm run dev" i root-mappen och invänta att sidan för localhost:3000 öppnas.

Klicka på devläges knappen för att toggla på och börja styla i dev-läge !

För att sedan deploya ändringar när du är nöjd, kör du enbart skriptet "npm run force-deploy", så kommer all styling du skrivit i Styling-module upp på webbplatsen.

