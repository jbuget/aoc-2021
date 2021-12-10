# Day 10: Syntax Scoring

## Part one

```
[({(<(())[]>[[{[]{<()<>>
```

Exercice de pattern matching.

Algo :
- pour chaque ligne :
  - pour chaque caractère :
    - si c'est un caractère ouvrant (`(`, `[`, `{`, `<`) :
      - on ajoute le caractère fermant correspondant à la pile des caractères fermant attendus
    - si c'est un caractère fermant (`)`, `]`, `}`, `>`) :
      - on dépile le caractère attendu
      - on compare les deux
        - s'ils correspondent alors, le chunk est correct et on avance
        - sinon on retourne le caractère attendu
- on calcule le score

## Part two

Exactement la même chose, en utilisant la partie 1 pour ignorer les lignes avec un caractère illégal et ne conserver que les lignes incomplètes.

On sait que toutes les lignes sont soit incomplètes, soit erronées.

Pour chaque ligne, il suffit de vérifier si elle est erronée. Si ce n'est pas le cas, alors c'est qu'elle est incomplète et il suffit de récupérer la pile des caractères fermant attendus pour pouvoir effectuer le scoring.

> J'ai (encore une fois…) lu la consigne trop vite et je n'avais pas vu dans un premier temps que les lignes illégales sont ignorées

Remarque : il a fallu que je définisse la méthode `sort` passée en paramètre du tableau des scores des lignes incomplètes. Je croyais pourtant que les tableaux de `Number` se triaient par défaut.

Algo :
- pour chaque ligne :
  - on cherche un caractère illégal
  - si on en trouve un
    - on passe à la ligne d'après
  - sinon :
    - pour chaque caractère :
      - si c'est un caractère ouvrant (`(`, `[`, `{`, `<`) :
        - on ajoute le caractère fermant correspondant à la pile des caractères fermant attendus
      - si c'est un caractère fermant (`)`, `]`, `}`, `>`) :
        - on dépile le caractère attendu
    - on renvoie la liste des caractères fermant attendus
- on calcule le score
