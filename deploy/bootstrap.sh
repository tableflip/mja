# Alias for ansible-playbook and all the trimmings.
# Usage:
#  ./bootstrap.sh <env name `next`, `production`>

INVENTORY=$1
PLAYBOOK="bootstrap.yml"

if [ $# -eq 0 ]
  then
    echo "Usage: ./bootstrap.sh <env name `next`, `production`>"
    exit 2
fi

if [[ $INVENTORY == production ]]; then
  read -p "PRODUCTION? Are you sure? " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo "Bootstrap **PRODUCTION**"
    ansible-playbook $PLAYBOOK -i $INVENTORY --ask-vault-pass --extra-vars "ansible_user=root"
  fi
else
  ansible-playbook $PLAYBOOK -i $INVENTORY --ask-vault-pass --extra-vars "ansible_user=root"
fi
