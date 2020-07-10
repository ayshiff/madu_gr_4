# Structure du projet

### Terraform

Instances:
- Stack client (back-office):
    - Un ou plusieurs serveurs au choix
    - Un load-balancer pour réguler la charge sur plusieurs serveurs, ouvert sur le port 80
    - Un groupe de sécurité ouvert sur les ports 22 (accès ssh) et 80
- Stack back-end:
    - Un ou plusieurs serveurs au choix
    - Un load-balancer pour réguler la charge sur plusieurs serveurs, ouvert sur le port 80
    - Un groupe de sécurité ouvert sur les ports 22 (accès ssh) et 3000
- Stack base de données:
    - Un serveur
    - Un groupe de sécurité ouvert sur les ports 22 (accès ssh) et 27017

### Ansible

Rôles :
- common: Installe les dépendances nécessaires et met à jour le gestionnaire de paquet
- geerlingguy.docker (rôle pré-configuré): Installe docker
- client: Importe le docker-compose du client et le lance
- back-end: Importe le docker-compose du back-end et le lance
- database: Importe le docker-compose de la database, la lance et initialise la base données

# Déploiement du projet

Dépendances nécessaires :
- [Python](https://www.python.org/) / [Pip](https://pypi.org/project/pip/)
- [Terraform](https://www.terraform.io/)
- [Ansible](https://www.ansible.com/)
- [Docker](https://www.docker.com/)

Un compte AWS est nécessaires pour déployer le projet, avec des [credentials configurés](https://docs.aws.amazon.com/fr_fr/sdk-for-java/v1/developer-guide/setup-credentials.html).

Des dépendances Python et Ansible sont nécessaires.

```
/.cloud
$ pip install -r requirement.txt
$ ansible-galaxy install -r requirement.yml
```

## Déploiement des serveurs

Avant de déployer il faut [générer une clé ssh](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html).
Pour l'utilisation de la pipeline CI/CD, il faut obligatoirement générer une clé rsa, il faut donc mettre l'option ```-t rsa``` au moment de la création de la clé.

Le chemin d'accès à la clé sera demandé au lancement du script terraform.
```
/.cloud/terraform
$ terraform init

/.cloud/terraform
$ terraform apply
```

Pour changer le nombre de serveurs déployés, il faut modifié les variables client_instance_count pour le nombre de serveurs client et back_end_instance_count pour le nombre de serveurs back-end dans ```/.cloud/terraform/main.tf``` 

Les serveurs sont déployés sur eu-west-2, déployer sur eu-west-3 n'est pas possible à cause de l'utilisation d'un inventaire dynamique avec Ansible.

## Installation et lancement

Plusieurs options de déploiement sont possibles.

**Si le déploiement continu (avec circleci) est utilisé, seul la partie 'Valeurs du vault' est utile ici.**

### Prérequis

- ### Variables

Plusieurs variables doivent être modifiés avant de lancer le script ou même build les images


```
/.cloud/ansible/inventory/all/all.yml
docker_username: [Le compte sur lequel les images seront push]

back_end_docker_image_name: [Nom de l'image back-end]
back_end_docker_image_tag: [Tag de l'image back-end]

client_docker_image_name: [Nom de l'image client]
client_docker_image_tag: [Tag de l'image client]

database_uri: [ip privée du serveur database]
```

- ### Images docker

Le script Ansible ne build pas les dockerfile, il faudra donc [le faire](https://docs.docker.com/engine/reference/commandline/build/) et [push les images](https://docs.docker.com/engine/reference/commandline/push/) sur un repo.

Lors du build de l'image client, il est nécessaire de passer en argument l'adresse du load-balancer back-end.
```
--build-arg=API_BASE_URL=[url_du_load_balancer]
```

Il faut que les noms et tags d'images correspondent aux valeurs entrées dans la partie variables au dessus.

- ### Valeurs du vault

Un fichier vault.yml est présent dans .cloud/ansible/inventory/group_vars/all, ce fichier contient les identifiants de connexion à la base de données, il faut donc le remplir puis l'encrypter.

```
/.cloud/ansible/inventory/group_vars/all
ansible-vault encrypt vault.yml
```

Pour l'encrypter il faut définir un mot de passe qui sera demandé au lancement du script

Pour le decrypter et changer les valeurs:

```
/.cloud/ansible/inventory/group_vars/all
ansible-vault decrypt vault.yml
```
**Ne jamais push le code sur un repo sans encrypter le fichier, les identifiants de connexion à la base serait accessible.**

### Installation totale

```
/.cloud/ansible
$ ansible-playbook staging.yml -i inventory --ask-vault-pass --user=ubuntu --key-file=[chemin_de_la_clé_ssh_générée]
```

La commande permet une installation totale et le lancement de l'application.

### Gestion des tags

Plusieurs tags sont disponibles, ils peuvent être combiné suivant les besoins. Ne mettre aucun tag revient à les mettre tous.

Exemple:
```
.cloud/ansible
$ ansible-playbook staging.yml -i inventory --ask-vault-pass --user=ubuntu --tags "[tag1], [tag2], [tag3]" --key-file=[chemin_de_la_clé_ssh_générée]
```
- installation: Lance les rôles common et geerlingguy.docker, permet l'installation de docker sur les serveurs, est nécessaire avant tout autre rôle.

- deployment: Lance les rôles client, back-end et database, permet donc de déployer l'application dans sa totalité.

- client: Lance le rôle client, permet de déployer l'application client (le back-office).

- back-end: Lance le rôle back, permet de déployer l'application back-end, **à besoin que database fonctionne pour que l'application se lance**.

- database: Lance le rôle database, permet de déployer la base données.

- db_init: Initialise la base données, il est donc recommander de **ne le lancer qu'une fois au démarrage de l'application** puis d'échapper le tag au lancement du script les fois d'après en utilisant **--skip-tags db_init** lors des mises à jour. Si cela n'est pas fait **une partie de la base pourrait être supprimé ou dupliquée**.
```
.cloud/ansible
ansible-playbook staging.yml -i inventory --ask-vault-pass --user=ubuntu --tags "[tag1], [tag2], [tag3]" --skip-tags "db_init" --key-file=[chemin_de_la_clé_ssh_générée]
```

## Déploiement continu

Pour utiliser le déploiement continu, la connexion à [circleci](https://circleci.com/) est nécessaire, il faut set up le projet ainsi que créer quelques variables d'environnement.

Le déploiement se fait lors du push sur la branche master du repository, mais il faut installer docker sur les serveurs et initialiser la base de donnée avec la commande suivante:
```
.cloud/ansible
ansible-playbook staging.yml -i inventory --ask-vault-pass --user=ubuntu --tags "installation, database" --key-file=[chemin_de_la_clé_ssh_générée]
```

Une fois la commande utilisée, le déploiement continu peut-être utilisé.

### Variables d'environnement:

- REGISTRY_USERNAME: L'identifiant de repository d'images docker
- REGISTRY_PASSWORD: Le mot de passe de repository d'images docker
- DOCKER_CLIENT_IMAGE_NAME: Le nom qu'aura l'image client
- DOCKER_BACK_END_IMAGE_NAME: Le nom qu'aura l'image back-end
- VAULT_PASS: Le mot de passe pour utilisé le vault ansible
- COVERALLS_REPO_TOKEN: Le token de connexion à coveralls

Cette dernière variables n'est utile que si l'on a besoin de connaître le coverage du code, si cela n'est pas nécessaire, il suffit de supprimer la dernière commande du job test_client. Sinon, il faut aussi set up le projet sur [coveralls](https://coveralls.io).

Il faut aussi ajouter la clé ssh du projet, et changer le fingerprint dans le job deploy par celui de la clé ajoutée.

Toutes les variables sont nécessaires pour que le déploiement puisse se faire.

Les images docker créée lors du déploiement auront pour tag le hash du commit git.
