+++
date = "2016-10-17T20:28:15Z"
title = "Adding desktop entries in GNOME 3"
image = ""
math = false
tags = ["gnome","firefox"
]

+++

Firefox Developer Edition has newer features than what was available from my distribution's package manager (Fedora).  Whereas I've been using it as my daily driver, I've had to do so through a terminal to launch it.  With an alias in my `/.bashrc` such as
```
dfox="~/Preview/firefox-developer/firefox --profile ~/.mozilla/firefox/7ahl24yk.default/'
```
I was able to launch Firefox Developer quickly enough.  Unfortunately, I found it annoying that I couldn't just type [Super Key] + "Fire" in GNOME and be on my way to browsing the web.<!--more-->

## Adding a launcher icon for Firefox Developer

I wanted to add a desktop entry/launcher icon for Firefox Developer.  I searched and found the Alacarte package, which is the GUI-way of doing this.  Alas, adding entries in Alacarte led to the following problem:

**Problem 1:** Alacarte didn't allow me to actually click "OK".  Both with the version from the Fedora repositories, `alacarte-3.11.91-4.fc24` via `sudo dnf install alacarte`, as well as a version built from source, `1bb265f7` via `git clone git://git.gnome.org/alacarte` did I have these issues.

{{< figure src="/img/Screenshot from 2016-10-17 14-10-49.png" >}}

**Solution:** Create the .desktop file by hand.  (Also, probably submit a bug report.)

In `~/.local/share/applications/firefox.desktop`, I added the following lines:
```desktop
[Desktop Entry]
Comment=Browse the World Wide Web
Terminal=false
Name=Firefox Developer Browser
Exec=~/Preview/firefox-developer/firefox --profile ~/.mozilla/firefox/xxxxxxxx.default %U
Type=Application
Icon=~/Preview/firefox-developer/browser/icons/mozicon128.png
Categories=Network;
```
where `xxxxxxxx.default` is my default profile directory. My starting point was browsing a few .desktop files in `~/.local/share/applications/` (user installed applications) and `/usr/share/applications/` (system-wide applications), for reference.

I ran into an issue, however:

**Problem 2:** If I added Firefox to my Favorites (the dock on the left where openened and manually added applications sit), I would get a duplicated menu entry.

**Solution:** Add `StartupWMClass=Firefox` to `~/.local/share/applications/firefox.desktop`

I came acrossed a proper solution [here](https://askubuntu.com/questions/403766/duplicate-icons-for-manully-created-gnome-launcher-items#635839).  In short, I fired up Firefox Developer, ran `xprop WM_CLASS` in the terminal, clicked the Firefox window, and added the entry to `firefox.desktop`

My final file looks like this: 
```desktop
[Desktop Entry]
Comment=Browse the World Wide Web
Terminal=false
Name=Firefox Developer Browser
Exec=~/Preview/firefox-developer/firefox --profile ~/.mozilla/firefox/xxxxxxxx.default %U
Type=Application
Icon=~/Preview/firefox-developer/browser/icons/mozicon128.png
Categories=Network;
StartupWMClass=Firefox
```

## Exercise - Repeating the process for Earlybird (Thunderbird Alpha)

1. Go to the [Thunderbird Release Channel](https://www.mozilla.org/en-US/thunderbird/channel/)

    {{< figure src="/img/Screenshot from 2016-10-17 14-49-06.png" >}}

    * `cd ~/Preview`

    * `wget https://ftp.mozilla.org/pub/thunderbird/nightly/latest-comm-aurora/thunderbird-51.0a2.en-US.linux-x86_64.tar.bz2`

    * `tar -xvf thunderbird-51.0a2.en-US.linux-x86_64.tar.bz2 -C thunderbird`

    * If you use Thunderbird already, determine your profile: `ls ~/.thunderbird/*.default`

2. Create the desktop entry, `~/.local/share/applications/thunderbird.desktop`, with the following contents:
```desktop
[Desktop Entry]
Name=Thunderbird
Comment=Send and receive mail with Thunderbird
Type=Application
Exec=~/Preview/thunderbird/thunderbird --profile ~/.thunderbird/xxxxxxxx.default %u
Icon=~/Preview/thunderbird/chrome/icons/default/default256.png
Categories=Network;
StartupWMClass=Thunderbird
```
Replace `xxxxxxxx.default` with your profile.

{{< figure src="/img/Screenshot from 2016-10-17 15-16-18.png" >}}

For any other application like this, I would just copy firefox.desktop to myapplication.desktop and adjust the contents to suit your needs.  Then, in general, launch the application and run `xprop WM_CLASS` to determine the value to put in the `StartupWMClass=` field. 
