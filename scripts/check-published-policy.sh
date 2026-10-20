#!/usr/bin/env bash
# Verifica que /privacy y /support estén publicadas (200, HTML) y nombren la app y al
# desarrollador exactamente como en la ficha de Google Play.
#
# Regla: la política nombra al desarrollador exactamente como en Google Play: Awesome Apps V,
# y a la app con el título exacto de la ficha (Daily Math: Number Puzzle, com.awesome.apps.daily.math).
# Google Play rechazó Match Pairs por no hacerlo (2026-10-20). Contacto público: solo
# awesomee.apps@gmail.com.
set -euo pipefail
BASE="${BASE:-https://daily-math-server.vercel.app}"
fallo=0
for ruta in privacy support; do
    url="$BASE/$ruta"
    codigo=$(curl -s -o /dev/null -w '%{http_code}' -L "$url")
    tipo=$(curl -s -o /dev/null -w '%{content_type}' -L "$url")
    echo "$url -> HTTP $codigo, $tipo"
    [ "$codigo" = 200 ] || { echo "  ERROR: no responde 200" >&2; fallo=1; continue; }
    case "$tipo" in text/html*) ;; *) echo "  ERROR: no es text/html" >&2; fallo=1 ;; esac
    pagina=$(curl -sL "$url")
    for marca in "Awesome Apps V" "Daily Math: Number Puzzle" "com.awesome.apps.daily.math" "awesomee.apps@gmail.com"; do
        case "$pagina" in *"$marca"*) ;; *) echo "  ERROR: falta \"$marca\"" >&2; fallo=1 ;; esac
    done
    for prohibido in flo88d zildjiandm outerspatial Marcher rmsgames; do
        case "$pagina" in *"$prohibido"*) echo "  ERROR: contiene \"$prohibido\"" >&2; fallo=1 ;; esac
    done
done
[ "$fallo" = 0 ] && echo OK || exit 1
