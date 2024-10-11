# DnD Travel Calculator

Der DnD Travel Calculator ist ein nützliches Tool für Dungeons & Dragons-Spieler, um die Reisedauer basierend auf verschiedenen Faktoren zu berechnen. Die Website kann lokal ausgeführt werden und benötigt keinen Server, da es kein Backend gibt.

## Installation

1. Klone das Git-Repository:
    ```bash
    git clone https://github.com/Datengeist/DnDTravelCalculator.git
    ```
2. Öffne die `index.html`-Datei in deinem bevorzugten Webbrowser.

## Nutzung

### Eingabefelder

- **Reisedauer am Tag (in Stunden)**: Gib die Anzahl der Stunden ein, die pro Tag gereist wird.
- **Reise Art**: Wähle die Art der Fortbewegung (z.B. zu Fuß, Pferd, Kutsche).
- **Reisegeschwindigkeit**: Wähle die Geschwindigkeit der Reise (langsam, normal, schnell oder benutzerdefiniert).
- **Untergrund**: Wähle die verschiedenen Untergründe aus, auf denen gereist wird, und gib die entsprechenden Werte in Prozent oder Kilometern an.

### Berechnung

1. Fülle alle erforderlichen Eingabefelder aus.
2. Klicke auf den Button "Berechnen".
3. Die Ergebnisse werden unterhalb des Buttons angezeigt, einschließlich der Gesamtdauer der Reise und der Notwendigkeit von DC-Constitution-Rettungswürfen.

## Funktionen

- **Dark Mode**: Die Website unterstützt einen Dark Mode, der standardmäßig aktiviert ist.
- **Kumulierte Wegangabe**: Sollte ein Untergrund häufiger vorkommen so können beide längen eingaben mit '+' getrennt werden und es wird für beide Teile die Länge berechnet
- **Reiseart und Geschwindigkeit**: Berechnung der Reisedauer basierend auf der Reiseart und -geschwindigkeit.
- **Untergrund**: Berücksichtigung verschiedener Untergründe mit individuellen Modifikatoren.
- **Tranzparenz**: Um Modifier wurden entweder direkt dazu geschrieben oder können durch Hovern über das jeweilige element gesehen werden
- **DC-Constitution-Rettungswürfe**: Bestimmung der Notwendigkeit von Rettungswürfen bei längeren Reisen.
