## Setup-instruktioner

1. **Klona repot och installera beroenden:**
   - Klona repot.
   - Kör `npm install` i:
     - root-mappen
     - *dev-mode* mappen
     - *styling-module* mappen

2. **Konfigurera `.dev_properties.json` i *styling-module*-mappen:**

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

3. **Första gången du gör detta:**
   - Kör `npm run init-module` i root-mappen för att modulen ska komma upp i Sitevision.
   - Skapa en ny roll under webbplatsinställningarna, t.ex. **Developer**.
   - Peka ut personer eller en grupp på huset med rollen **Developer**.

4. **Grundmall-konfiguration:**
   - Gå till **Grundmallen**.
   - Lägg ut modulen **Styling-module**.
   - Fyll i den roll du angav ovan (t.ex. **Developer**).
   - Publicera grundmallen.

5. **För att starta dev-läget:**
   - Kör `npm run dev` i root-mappen.
   - Vänta tills sidan på [http://localhost:3000](http://localhost:3000) öppnas.
   - Klicka på dev-lägesknappen för att toggla på och börja styla i dev-läge!

6. **Deploya ändringar:**
   - När du är nöjd med ändringarna, kör `npm run force-deploy` för att publicera all styling från *Styling-module* till webbplatsen.

7. **Vid ändringar i CSS via dev-läget:**
   - Skapa en ny branch från `main`.
   - Gör dina ändringar i CSS enligt guiden ovan.
   - Pusha dina ändringar till din branch.
   - Merge till `main` via en pull request (kontrollera eventuella konflikter).
   - Byt branch till `main` och gör en `git pull`.
   - Om alla steg ovan fungerar bra kan du köra `npm run force-deploy` i root-mappen.
