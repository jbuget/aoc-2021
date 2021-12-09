## Algo:
- construire la heightmap depuis la data
- identifier tous les bassins
- récupérer les 3 bassins ayant la taille la plus grande
- calculer et retourner le résultat

La difficulté de la partie 2 est d'identifier les bassins.

> Astuce : ici, j'ouvre le fichier input, et je fais une recherche sur "9" dans mon IDE (WebStorm) pour qu'il me révèle de façon visuelle les bassins. Y en a plein !!!  

## Mon idée :
- parcourir tous les points non visités (donc non-référencé dans un bassin) de la heightmap
    - si sa height est 9, on ne fait rien
    - si c'est une height
        - si on n'a pas de bassin actuellement en cours de parcours, on le déclare et on l'ajoute à la liste des bassins
        - on récupère notre bassin en cours de parcours
        - on ajoute le point au bassin en cours
        - et on l'indique en visité (`point.marked = true`)
        - on ajoute tous les autres points adjacents non marqués à une queue qu'on visite immédiatement
        - on parcours la file
        - une fois la file parcourue, on ferme le bassin (`currentBasin = null`)


A ce stade de la réflexion, j'ai l'impression qu'on est sur un algo de type [Djikstra](https://www.youtube.com/watch?v=t7UjtzqIXSA).

Possible que je me trompe, je n'ai pas beaucoup confiance en mes skills d'algorithmie pure.

## Déroulé

Mon input commence par un `9`. Avec cet algo, ce n'est pas grave, puisqu'on ne fait rien avec un 9. On considère le 9 comme une sorte de feuille qui va juste réduire la taille de la file courante, qui sert à indiquer si le parcourd d'un basssin est fini ou pas.

Seconde entrée, encore un `9`. Même comportement.

Vient un `7`. On n'a pas de bassin ouvert, alors on en déclare un (qu'on ajoute à la liste des bassins référencés).

> Question : est-ce qu'on peut avoir 2 bassins ouverts en même temps et tomber dans un cas ou il faudrait les merger ? 
> A priori, "non", pas avec cet algo qui attend d'avoir parcouru complètement les ramifications évenutelles d'un bassin avant de le fermer et passer à la suite

Je me pose une question sur comment passer au point suivant après avoir fermé un bassin. 

J'ai réfléchi à une double boucle `for` (on connait `xSize` et `ySize`) mais on dispose d'une Map (grâce à la part 1) et pas d'un double tableau. En plus, gérer les index va être relou.

J'ai ensuite pensé à une boucle `while`, mais là aussi, gérer les index va être pénible et pas forcément fructueux.

J'opte pour considérer la Map<Point> de ma Heightmap comme la file des éléments non traités. Il faudra penser à retirer les éléments au fur et à mesure qu'on les visitera. Ca devrait le faire grâce à la clé.

Il va falloir que j'ajoute une méthode `shift` au prototype du type `Map` pour qu'il se comporte comme une file. J'aime bien l'usabilité de Map qui permet de trouver très facilement un élément via sa clé. Mais j'ai besoin d'une FIFO.

Je vais quand même devoir en passer par une boucle `while` (tant qu'il y a des éléments dans la Map, i.e. des éléments non visités) avec utilisation de `Map.prototype.shift` avant chaque début de parcours de bassin.

En y réfléchissant 2 minutes, une bête méthode `Heightmap#shiftLocation` fera l'affaire.

Revenons-en au `7`. 
- Je marque le Point comme visité. 
- Je le retire de la Map des points (`heightmap.points.delete('2:0'`) (vu qu'il aura été préalablement été shifté, cette étape n'est peut-être pas nécessaire).
- J'ajoute ses points adjacents non visités

Ses points adjacents non visités sont `6` (right, "3:0") et `6` (down, "2:1"). Je les ajoute à la liste des éléments à parcourir.

> Il me faut une file !!!

Allez, on va dire qu'avec une boucle `while` et un tableau on s'en sort…

Tant que j'ai des éléments à visiter pour le bassin courant, je déroule l'algo.

Je visite donc le point "3:0". Comme ce n'est pas un `9`, je fais des trucs.
- Je marque le Point comme visité.
- Je le retire de la Map des points (`heightmap.points.delete('2:0'`) (vu qu'il aura été préalablement été shifté, cette étape n'est peut-être pas nécessaire).
- J'ajoute ses points adjacents non visités : "4:0" (5), "3:1" (5)

J'ajoute le `5` (right) et le `5` (down).

On est sur la forme continue de l'algo.

Je visite donc le point "2:1". Comme ce n'est pas un `9`, je fais des trucs.
- Je marque le Point comme visité.
- Je le retire de la Map des points (`heightmap.points.delete('2:0'`) (vu qu'il aura été préalablement été shifté, cette étape n'est peut-être pas nécessaire).
- J'ajoute ses points adjacents non visités : "3:1" (5), "2:2" (9), "1:1" (7)

> Hummm… il va falloir faire attention quand on va ajouter les autres adjacents ; ou alors il suffira de vérifier au moment de parcourir un adjacent depuis la liste, qu'il n'a pas déjà été visité.

## Edit

J'ai lu trop vite l'énoncé. Encore une fois 🤦‍

On m'avertit dans l'oreillette de relire l'énoncé. (demander du feedback au plus tôt)

Effectivement il y a la phrase :

> … flow downward to a single low point
 
Mais je me méfie du cas où 2 LowPpints appartiendraient au même Bassin. Apparemment, non.

Je vais pouvoir simplifier l'algo et me contenter de partir des Lowpoints.
