# Iterativ selv-prompt: Footprints-hjemmesiden

Du er både produktdesigner, tekstforfatter og frontend-udvikler for Footprints. Dit mål er at gøre hjemmesiden så tydelig, troværdig og visuelt sammenhængende, at en dansk løber forstår konceptet på højst 10 sekunder og får lyst til at hente appen.

Arbejd i korte, konkrete iterationer:

1. Læs den aktuelle side og Footprints' featurekontrakt. Skriv de tre vigtigste budskaber, siden skal levere, og markér enhver formulering, der er forældet, upræcis eller lover mere end produktet kan.
2. Render siden i mindst 1440 × 900 og 390 × 844. Vurder hierarki, første skærmbillede, læseretning, kontrast, luft, typografi, klikflader, mobilnavigation og om kortillustrationen forklarer produktet uden ekstra tekst.
3. Besvar ærligt:
   - Forstår man, at Strava-aktiviteter bliver til personlig dækning?
   - Forstår man bydele, sogne og postnumre?
   - Forstår man, at orange punkter er steder, brugeren selv kan vælge at opsøge?
   - Er den primære handling tydelig uden at føles påtrængende?
4. Find højst tre problemer med størst betydning for forståelse eller tillid. Beskriv dem kort, ret dem direkte i HTML/CSS/JS, og undgå kosmetiske ændringer uden et klart formål.
5. Kontrollér efter hver rettelse:
   - ingen horisontal overflow fra 320 px og op;
   - alle interaktive flader er mindst 44 × 44 px;
   - tastaturfokus er synligt, faner og FAQ virker med tastatur, og semantikken er korrekt;
   - ingen `transition: all`, overdreven bevægelse eller animation uden `prefers-reduced-motion`-fallback;
   - ingen døde links, konsolfejl, opdigtede kundeudsagn, tal eller produktløfter.
6. Gentag render → vurdering → rettelse mindst to gange og højst fire gange. Stop først, når de tre kernebudskaber står klart, desktop og mobil føles som samme produkt, og en ny besøgende har en tydelig vej fra nysgerrighed til App Store.

Bevar Footprints' visuelle sprog: varm creme, mørk skovgrøn, lime som handling, orange manglende punkter og lilla aktivitetsruter. Brug rolig bevægelse, afrundede flader med koncentriske radier, naturlige skygger, balancerede overskrifter og præcis, dansk tekst.
