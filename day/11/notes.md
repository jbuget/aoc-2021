# Day 11: Dumbo Octopus

## Part 1

La première chose à faire est de constituer une matrice 10x10 depuis le jeu de données.

D'après ce que l'on a vu lors des précédents jours, une Map est l'une des structures les plus pratiques et performantes.

Dans la mesure où il y a une notion d'état à conserver / faire évoluer, je vais définir une classe `Octopus` qui aura une position (x, y) et un niveau d'énergie (`energyLevel`). Une Octopus possédera les méthodes `increaseEnergyLevel` et `resetEnergyLevel`.

Par ailleurs, comme il n'y a pas beaucoup d'éléments (100 max) et qu'ils n'en génèrent pas d'autres (coucou Lanternfishes) on peut se le permettre.

~~Je vais aussi modéliser une classe `Step`.~~

Algo:
- constituer la Map des Octopus
- initier compteur de flashes
- répéter 100 fois :
  - initier une liste des Pieuvres à incrémenter
  - initier une liste des Pieuvres ayant flashé au cours du Tour (`markedOctopus`)
  - l'alimenter avec les 100 pieuvres
  - tant qu'il y a des pieuvres à traiter :
    - récupérer la première pieuvre (`shift`) 
    - augmenter le niveau d'énergie de la pieuvre
    - si son niveau est supérieur à `9` ET qu'elle n'a pas déjà flashé au cours du tour (elle n'est pas encore dans la liste des `markedOctopus`), alors :
      - marquer la pieuvre comme venant de flashé (l'ajouter à la Map des pieuvres ayant flashé)
      - incrémenter le compteur de flashes de `1`
      - ajouter tous ses adjacents à la liste des pieuvres à traiter
  - réinitialiser toutes les pieuvres ayant flashé
- retourner le compteur de flashes

