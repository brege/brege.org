+++
image = ""
math = false
tags = ["certbot", "ssl", "https", "systemd"
]
date = "2016-10-11T00:15:22Z"
title = "Automatic renewal of Let's Encrypt Certificates"

+++

Let's Encrypt certificates need to be renewed every three months.
[The Arch Wiki](https://wiki.archlinux.org/index.php/Let%E2%80%99s_Encrypt#Automatic_renewal) has good documentation on automating the renewal process with systemd.<!--more-->

* In `/etc/systemd/system/certbot.service`:

``` ini
[Unit]
Description=Let's Encrypt renewal

[Service]
Type=oneshot
ExecStart=/usr/bin/certbot renew --quiet --agree-tos
```

* In `/etc/systemd/system/certbot.timer`:

``` ini
[Unit]
Description=Daily renewal of Let's Encrypt's certificates

[Timer]
OnCalendar=daily
RandomizedDelaySec=1day
Persistent=true

[Install]
WantedBy=timers.target
```

* Enable and start the timer:

``` bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```
