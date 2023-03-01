# Ligne de commande

Pour installe le projet

```
yarn
```

# Création d'une database

```
yarn cli --createDatabase mydb
```

# Création des tables

Pour creer toutes les tables dans la db mydb, il faut ajouter le flag -db:

```
yarn cli --createTable all -db mydb
```

# Peuplement des tables

Pour peupler les tables :

```
yarn cli --seed all -db mydb
```

# Gestion des opérations courantes

inscription d’un nouvel abonné :

### Des ordres SQL qui permettent la gestion des abonnés :

```
yarn cli --seed user -db mydb
```

mise à jour de ses données personnelles :

mettre le flag portant le nom de la data qu'on veut modifier par exemple :

```
yarn cli --updateData user --email salut@gmail.com -db mydb
```

changement d’abonnement :

```
yarn cli --updateData user --subscription EXTRAGOLD -db mydb
```

### Des ordres SQL qui permettent la gestion des biens :

ajout / suppression d’un bien :

```
yarn cli --deleteOutOfService scooter -db mydb
```

Lister les 10 biens disponibles et les plus proches d'un utilisateur :

```
yarn cli --table scooter --request location -db mydb
```

Lister les biens nécessitant une intervention :

```
yarn cli --table scooter --request intervention -db mydb
```

Calculer le prix d'une location selon l'abonnement de l'utilisateur :

```
yarn cli --table scooter --request rentalCost --iduser 1 -db mydb
```

Calculer le coût total des locations d'un client au cours du dernier mois :

```
yarn cli --table bill --request rentalMonthTotalCost -db mydb
```

Obtenir la durée moyenne d'une location par utilisateur :

```
yarn cli --table bill --request averageRentalTime --iduser 1 -db mydb
```

Obtenir la durée totale d'une location pour tous les utilisateurs :

```
yarn cli --table bill --request totalRentalTimeSpent -db mydb
```

Calculer le chiffre d'affaires généré au cours du dernier mois :

```
yarn cli --table bill --request monthTotalCost -db mydb
```

## Nos requetes

savoir si il sont vieux :

```
yarn cli --table user --request oldpeople -db mydb
```

connaitre la distance que les gens parcours selon le lieux

```
yarn cli --table scooter --request distancePeopleTravelPlace --city saint-denis -db mydb
```

savoir si les utilisateur casse les scooters selon le lieux

```
yarn cli --table scooter --request brokenScooter --city saint-denis --status broken -db mydb
```

savoir si on a des scooter vieux qui sont encore en services

```
yarn cli --table scooter --request oldScooter -db mydb
```

Number of scooter available and in repair :

```
yarn cli --table user --request warehouseScooterStatus --city saint-denis -db mydb
```
