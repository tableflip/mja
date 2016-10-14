# Murray John Infrastructure

Ansible scripts to deploy murrayjohn.com

## Prerequisits

- Vagrant & virtualbox & Ansible installed
- Ansible vault passphrase. Ask a TABLEFLIPer for the secret.
- Add your ssh public key to `roles/bootstrap/files/public-keys/`

## Usage

- `vagrant up` - **bootstrap** a fresh vm, and **deploy** the app. (~8mins execution time.)

Also of note:
- `deploy.sh <env name>` - Update just the app. (~2mins)
- `bootstrap.sh <env name>` - Install the app and all dependencies like the firewall, ssl, etc. (~5mins)

### Local dev

Add `10.100.119.100 dev.murrayjohn.com` to your `/etc/hosts`

```sh
# provision and bootstrap a local vm on that ip.
vagrant up
```
A VM will be provisioned, then you'll be prompted for the vault password when vagrant hands off to ansible for bootstrap and deploy. Once it finishes, the app should be available locally at http://dev.murrayjohn.com

The provision & bootstrap steps take a while, but only need to be run once. To redeploy just the cube services, run:

```sh
# Just update the cube services
deploy.sh dev
```

### Set up a staging server `next.cubep.in`

Once everything works as expected, bootstrap & deploy a staging server (`next`) for user testing the next release.

Provision the VM and configure a dns record for `next.murrayjohn.com` then:

```sh
# Bootstrap all the required services and install cube.
./bootstrap.sh next
```

The app should now be available at https://next.murrayjohn.com

SSL/TLS certs are generated via [letsencrypt].

As with local dev, to redeploy just the cube services, run:

```sh
# redeploy the app to `next.murrayjohn.com`
./deploy.sh next
```

---

## Secrets - Ansible Vault

See: http://docs.ansible.com/ansible/playbooks_vault.html

**Creating Encrypting Files**

Encrypt a list of files. You'll be prompted for a passphrase which'll be the key for decrypting them.

```sh
# ansible-vault encrypt [files]
$ ansible-vault encrypt group_vars/all/secrets.yml
```

**Editing Encrypted Files**

```sh
ansible-vault edit group_vars/all/secrets.yml
```

Will prompt you for the passphrase and open the file your default $EDITOR as configured in your shell.

---

 (╯°□°）╯︵[TABLEFLIP] <3's [ipfs]

[TABLEFLIP]: http://tableflip.io
[letsencrypt]: https://letsencrypt.org
