---
title: "Using Chocaletly in an Ansible SSH Windows environment"
date: "2026-03-30"
tags: ["Ansible", "Windows", "SSH", "Automation"]
summary: "A continuation into "
previewImage: "/assets/ansible-lanman-part1/working.png"
---

In the last few weeks, I've been working on a collection of Ansible Playbooks with a focus of LAN Gaming setups, and I was at turning point. I originally intended to stick with Winget to setup the applications needed however I quickly found some limits with Winget. So I decided to spend some time looking into alternatives and I landed on using Chocolatey for a variety of reasons, but this led me to rewriting the Ansible playbooks that managed installing of applications.

# Why Chocolatey over Winget

To explain my actions, I want to explain some of the issues I've been having try to use and setup Winget in my project so far:

- **Lack of native Ansible support, this is a big one but there is no specific module to take advantage of Winget**
- **Some applications are effectively broken, most notably Battle.Net launcher requires a lot of extra arguments to get working well in my Windows VM**
- **Lack of Driver Packages such as GPU/Chipset Drivers**
- **Lack of options for offline install**

The second to last point about Driver Packages feels like a particularly relevant point considering that a lot of new game releases and updates often require a fresh video card driver from Nvidia/AMD/Intel, and with Winget there doesn't appear to be a good way to do this.

Now the reason **why I stuck with Winget as I didn't want to install an additional package manager,** however with the experience I've had trying to use Winget. I personally feel it's fine for simple things but trying to do anything within Ansible is a nightmare, hence looking at **Chocolatey**.

Looking at [Chocolatey](https://community.chocolatey.org/) packages repo, there is not only a lot more packages available but most importantly, drivers and chipset packages which can be super useful for remote managing. The icing on the cake for this switch is that Chocolatey has a native Ansible collection hosted on [Galaxy](https://galaxy.ansible.com/ui/repo/published/chocolatey/chocolatey/).

This collection allows for a lot of customization, more interestingly we can disable the use of Community repos and use an internal one which might be super useful in a context where we don't want the machines to have outbound internet access.

# Automating the initial Chocolatey Setup in this environment is tricky

The first thing I wanted to do was to automate the setup of Chocolatey with Ansible as I don't want the user/operator having to install the package manager to get the automation started.

Now I thought this would be easy doing the bootstrap script and using the Ansible collection to sort that out for me. However, I found that controlling the Windows machine via SSH causes a lot of these methods to fail, which led me having to do an unusual solution for this which is resorting to the .msi file as shown below.

```yaml
---
- name: Install Latest Chocolatey via GitHub Releases
  hosts: windows
  gather_facts: no
  vars:
    github_api_url: "https://api.github.com/repos/chocolatey/choco/releases/latest"
    temp_download_path: 'C:\temp\chocolatey_latest.msi'

  tasks:
    # Ensure the directory exists before copying to it
    - name: Ensure temp directory exists
      ansible.windows.win_file:
        path: C:\temp
        state: directory

    # Grab the latest install from Github
    - name: Get latest release info from GitHub API
      ansible.builtin.uri:
        url: "{{ github_api_url }}"
        return_content: yes
        status_code: 200
      register: gh_release
      delegate_to: localhost

    # Grabbing the .MSI file link with some attr selection
    - name: Get the MSI download URL
      set_fact:
        choco_msi_url: "{{ gh_release.json.assets | selectattr('name', 'search', '\\.msi$') | map(attribute='browser_download_url') | first }}"

    # From the fact we just got, download the .msi file
    - name: Download the latest Chocolatey MSI
      ansible.windows.win_get_url:
        url: "{{ choco_msi_url }}"
        dest: "{{ temp_download_path }}"

    - name: Install Chocolatey
      ansible.windows.win_package:
        path: "{{ temp_download_path }}"
        state: present

    # Cleanup after the fact
    - name: Cleanup MSI installer
      ansible.windows.win_file:
        path: "{{ temp_download_path }}"
        state: absent
```

Whilst this is not the normal way to do things, considering that we need to have an internet connection to do this sort of setup. I don't believe it is too problematic. The script can be run over again and again and work every time, so I'm happy with it.

# Installing multiple packages Chocolatey

Next is to install the apps via Chocolatey which can be done with the Ansible Galaxy collection which adds this functionality. It is short and sweet :

```yaml
---
- name: Install Apps via Chocolatey
  hosts: windows
  gather_facts: no

  tasks:
    # Before Beginning, we need to check for an active internet connection as we will need internet for this
    - name: Check if we have a valid internet connection
      ansible.windows.win_wait_for:
        host: www.google.com
        port: 80
        state: started
        delay: 0
        timeout: 5

    # Using the community repo : https://community.chocolatey.org/
    - name: Install multiple packages
      win_chocolatey:
        name: "{{ item }}"
        state: present
        force: yes # Forcing reinstall regardless of state
      loop:
        - steam
        - ea-app
        - ubisoft-connect
        - goggalaxy
        - epicgameslauncher
        - googlechrome
        - discord
```

One thing to highlight in this script is that we are using the "force" tag, the reason being that during testing, I found that manually uninstalling the apps in Windows caused the package manager to get a little out of sync. I've issued the force flag, so it will always install the application regardless of the state that package manager thinks it's in. If these were big applications, I wouldn't want to do this but considering these apps aren't that big, I'm comfortable leaving them in this state.

# What is next on the list?

In the next week or so, I want to implement a way to automate the graphics driver install, this may take a bit of time as I've been doing a bunch of my work in a virtual machine and I think I'm going to need some bare metal hardware to test this properly.

If we can't do it, I'd like to continue automating other things and fleshing out the playbooks and ways that the user/operator can automate things across their systems.
