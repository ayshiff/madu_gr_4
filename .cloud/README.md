#Déploiment du projet

Dépendances nécessaires :
- [Terraform](https://www.terraform.io/)
- [Ansible](https://www.ansible.com/)
- [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)

Un compte AWS est nécessaires pour déployer le projet, avec des [credentials configurés](https://docs.aws.amazon.com/fr_fr/sdk-for-java/v1/developer-guide/setup-credentials.html).

##Déploiment du serveur

Avant de déployer il faut [générer une clé ssh](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html) stockée dans ```~/.ssh/```.

Après avoir générer la clé il faut modifier la variable ```ssh_key``` dans ```/.cloud/terraform/terraform.tfvars``` avec le nom de la clé générée.
```
/.cloud/terraform
$ terraform init

/.cloud/terraform
$ terraform apply
```

Le serveur est déployé sur eu-west-2, déployer sur eu-west-3 n'est pas possible à cause de l'utilisation d'un inventaire dynamique avec Ansible.

##Installation et lancement

Plusieurs options de déploiment sont possibles.

####Réutilisation de l'image existante

```
/.cloud/ansible
$ ansible-playbook -i inventory deployment.yml --tags install+deploy --key-file=/.ssh/[clé_ssh_générée]
```

La commande permet d'installer docker et de lancer le docker-compose avec les images existantes sur [docker hub](https://hub.docker.com/r/amauryfaveriel). Cela permet de déployer sans toucher à la configuration d'Ansible.

####Build des images docker

Il est aussi possible de monter les images et de les stocker sur un hub docker personnel. Cela nécessite une configuration préalable mais permet de générer des noms d'images personnalisés et de modifier le code.

Pour build ses images il faut avoir [accès à docker hub](https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html), puis de ```/.cloud/ansible/inventory/group_vars/local.yml``` modifier la variable ```docker-username``` en mettant le nom de compte docker hub. Il est aussi possible mais pas obligatoire de modifier les variables ```images``` pour les personnaliser.

Pour tout installer et lancer ( installation docker + build image + copie et lancement docker-compose):
```
/.cloud/ansible
$ ansible-playbook -i inventory deployment.yml --key-file=~/.ssh/[clé_ssh_générée]
``` 

Pour build les images et déployer avec docker-compose (docker déjà installer sur le serveur) :
```
/.cloud/ansible
$ ansible-playbook -i inventory deployment.yml --tags rebuildimage --key-file=~/.ssh/[clé_ssh_générée]
``` 

Pour uniquement build les images et les push sur le hub docker :
```
/.cloud/ansible
$ ansible-playbook -i inventory deployment.yml --tags updatedockerfile --key-file=~/.ssh/[clé_ssh_générée]
``` 