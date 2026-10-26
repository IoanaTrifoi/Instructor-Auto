# Instructor auto Cat. B Sighetu Marmației — Claudiu Pintea

Site static (HTML/CSS/JS, fără build). Deschide `index.html` sau publică folderul ca atare.

- `index.html` — Acasă (hero, citat, despre, cursul, FAQ, recenzii, CTA)
- `examen.html` — Informații examen (timeline), linkuri utile, ghidul orașului
- `contact.html` — Contact + formular de înscriere (trimite cererea pe WhatsApp la 0744 470 807)

## De completat înainte de publicare
- **Recenzii**: în `index.html`, secțiunea `#recenzii` conține texte-exemplu marcate „[Exemplu]”.
  Înlocuiește-le cu recenzii reale din Google Maps.
- **Fotografie**: `assets/img/claudiu-pintea-examen.jpg` este decupată dintr-o captură de ecran;
  înlocuiește-o cu o fotografie la rezoluție mare. Pentru hero video, vezi comentariul din `index.html`.
- **E-mail**: în `contact.html` există un rând de e-mail comentat — adaugă adresa reală și decomentează-l.

## Publicare (GitHub Pages)
Workflow-ul `.github/workflows/deploy-pages.yml` publică automat site-ul la fiecare push pe `main`.
Configurare (o singură dată): Settings → Pages → Source: **GitHub Actions**.
Pentru un repository privat, GitHub Pages necesită un plan plătit (GitHub Pro); altfel repository-ul trebuie să fie public.
Domeniu propriu (opțional): Settings → Pages → Custom domain.
