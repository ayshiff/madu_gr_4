# Structure du projet

### Terraform

Instances:
- Un serveur EC2.
- Un groupe de sécurité autorisant les connexions entrantes sur les ports 22 (ssh), 80 (back-office) et 3000 (api) ainsi que toutes les connexions sortantes.
- Une paire de clé utilisée pour la connexion ssh par le serveur.

### Ansible

Rôles :
- installdocker: Installe docker sur le serveur et crée un dossier de déploiment.
- deploydockercompose: Copie le fichier docker compose et le lance.
- updatedockerfile: Build les images docker en local et les push sur docker hub.

# Déploiment du projet

Dépendances nécessaires :
- [Python](https://www.python.org/) / [Pip](https://pypi.org/project/pip/)
- [Terraform](https://www.terraform.io/)
- [Ansible](https://www.ansible.com/)

Un compte AWS est nécessaires pour déployer le projet, avec des [credentials configurés](https://docs.aws.amazon.com/fr_fr/sdk-for-java/v1/developer-guide/setup-credentials.html).

Des dépendances Python sont nécessaires pour utiliser l'inventaire dynamique d'Ansible.

```
/.cloud
$ pip install -r requirement.txt
```

## Déploiment du serveur

Avant de déployer il faut [générer une clé ssh](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html) stockée dans ```~/.ssh/```.

Après avoir générer la clé il faut modifier la variable ```ssh_key``` dans ```/.cloud/terraform/terraform.tfvars``` avec le nom de la clé générée.
```
/.cloud/terraform
$ terraform init

/.cloud/terraform
$ terraform apply
```

Le serveur est déployé sur eu-west-2, déployer sur eu-west-3 n'est pas possible à cause de l'utilisation d'un inventaire dynamique avec Ansible.

## Installation et lancement

Plusieurs options de déploiment sont possibles.

#### Réutilisation de l'image existante

```
/.cloud/ansible
$ ansible-playbook -i inventory deployment.yml --tags install+deploy --key-file=/.ssh/[clé_ssh_générée]
```

La commande permet d'installer docker et de lancer le docker-compose avec les images existantes sur [docker hub](https://hub.docker.com/r/amauryfaveriel). Cela permet de déployer sans toucher à la configuration d'Ansible.

#### Build des images docker

Il est aussi possible de monter les images et de les stocker sur un hub docker personnel. Cela nécessite une configuration préalable mais permet de générer des noms d'images personnalisés et de modifier le code.

Pour build ses images il faut avoir [accès à docker hub](https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html), puis de ```/.cloud/ansible/inventory/group_vars/all.yml``` modifier la variable ```docker-username``` en mettant le nom de compte docker hub. Il est aussi possible mais pas obligatoire de modifier les variables ```images``` pour les personnaliser.

Pour tout installer et lancer ( installation docker + build image + copie et lancement docker-compose):
```
/.cloud/ansible
$ ansible-playbook -i inventory deployment.yml --key-file=~/.ssh/[clé_ssh_générée]
``` 

Pour build les images et déployer avec docker-compose (docker déjà installé sur le serveur) :
```
/.cloud/ansible
$ ansible-playbook -i inventory deployment.yml --tags rebuildimage --key-file=~/.ssh/[clé_ssh_générée]
``` 

Pour uniquement build les images et les push sur le hub docker :
```
/.cloud/ansible
$ ansible-playbook -i inventory deployment.yml --tags updatedockerfile --key-file=~/.ssh/[clé_ssh_générée]
``` 
