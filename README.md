# Setup-instruktioner

- **Klona repot och installera beroenden:**

  - Klona repot.
  - Kör `npm install` i:
    - root-mappen
    - _dev-mode_ mappen
    - _styling-module_ mappen

- **Konfigurera `.dev_properties.json` i _styling-module_-mappen:**

  Skapa filen med följande innehåll:

  ```json
  {
    "domain": "dse-b3grit-intra.sitevision-cloud.se",
    "siteName": "Sitevision Intranät Demo",
    "addonName": "Styling-module",
    "username": "firstName.lastName@b3.se",
    "password": ""
  }
  ```

## Första gången du gör detta:

- **Första justeringar:**

  - Kör `npm run init-module` i root-mappen för att modulen ska komma upp i Sitevision.
  - Skapa en ny roll under webbplatsinställningarna, t.ex. **Developer**.
  - Peka ut personer eller en grupp på huset med rollen **Developer**.

- **Grundmall-konfiguration:**
  - Gå till **Grundmallen**.
  - Lägg ut modulen **Styling-module**.
  - Fyll i den roll du angav ovan (t.ex. **Developer**).
  - Publicera grundmallen.

## Om du vill starta dev-läget på en befintlig eller nyligt uppsatt miljö:

- **Devläge:**

  - Kör `npm run dev` i root-mappen.
  - Vänta tills sidan på [http://localhost:3000](http://localhost:3000) öppnas.
  - Klicka på dev-lägesknappen för att toggla på och börja styla i dev-läge!

- **Deploya ändringar:**

  - När du är nöjd med ändringarna, kör `npm run force-deploy` för att publicera all styling från _Styling-module_ till webbplatsen.

- **Vid ändringar i CSS via dev-läget:**
  - Skapa en ny branch från `main`.
  - Gör dina ändringar i CSS enligt guiden ovan.
  - Pusha dina ändringar till din branch.
  - Merge till `main` via en pull request (kontrollera eventuella konflikter).
  - Byt branch till `main` och gör en `git pull`.
  - Om alla steg ovan fungerar bra kan du köra `npm run force-deploy` i root-mappen.

## Driftsättning på produktionsmiljö

På en produktionsmiljö kan du inte använda `force-deploy` för att publicera styling. Istället behöver du bygga, signera och ladda upp _Styling-module_ som en vanlig webapp:

- Uppdatera versionsnumret i manifest.json
- Kör `npm run build` i _styling-module_-mappen för att bygga modulen.
- Kör `npm run sign` i _styling-module_-mappen för att signera modulen.
- Ladda upp den nya versionen av modulen.
