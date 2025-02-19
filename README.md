## Setup-instruktioner

- **Klona repot och installera beroenden:**
  - Klona repot.
  - Kör `npm install` i:
    - root-mappen
    - *dev-mode* mappen
    - *styling-module* mappen

- **Konfigurera `.dev_properties.json` i *styling-module*-mappen:**

  Skapa filen med följande innehåll:
  ```json
  {
    "domain": "dse-b3grit-intra.sitevision-cloud.se",
    "siteName": "Sitevision Intranät Demo",
    "addonName": "Styling-module",
    "username": "nick.lindstrom@b3.se",
    "password": ""
  }
  ```

- # Första gången du gör detta:
  - Kör `npm run init-module` i root-mappen för att modulen ska komma upp i Sitevision.
  - Skapa en ny roll under webbplatsinställningarna, t.ex. **Developer**.
  - Peka ut personer eller en grupp på huset med rollen **Developer**.

- **Grundmall-konfiguration:**
  - Gå till **Grundmallen**.
  - Lägg ut modulen **Styling-module**.
  - Fyll i den roll du angav ovan (t.ex. **Developer**).
  - Publicera grundmallen.

- # Om du vill starta dev-läget på en befintlig miljö:
  - Kör `npm run dev` i root-mappen.
  - Vänta tills sidan på [http://localhost:3000](http://localhost:3000) öppnas.
  - Klicka på dev-lägesknappen för att toggla på och börja styla i dev-läge!

- **Deploya ändringar:**
  - När du är nöjd med ändringarna, kör `npm run force-deploy` för att publicera all styling från *Styling-module* till webbplatsen.

- **Vid ändringar i CSS via dev-läget:**
  - Skapa en ny branch från `main`.
  - Gör dina ändringar i CSS enligt guiden ovan.
  - Pusha dina ändringar till din branch.
  - Merge till `main` via en pull request (kontrollera eventuella konflikter).
  - Byt branch till `main` och gör en `git pull`.
  - Om alla steg ovan fungerar bra kan du köra `npm run force-deploy` i root-mappen.
