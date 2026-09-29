export interface SkillTopic {
  id: string;
  name: string;
  category: 'core' | 'red' | 'blue';
  description: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  platform: string;
  url: string;
  type: 'Platform' | 'Course' | 'Interactive Lab' | 'Documentation' | 'YouTube' | 'Guide';
  description: string;
  badge: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: 'Networking' | 'Recon' | 'Web' | 'Defense' | 'OS' | 'Exploit' | 'Forensics' | 'Active Directory';
  description: string;
  practicalUse: string;
  starterTip?: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Phase {
  id: number;
  slug: string;
  title: string;
  timeframe: string;
  durationMonths: string;
  tagline: string;
  accentColor: string; // Tailwind color class or hex
  description: string;
  trackFocus: {
    general: string;
    red: string;
    blue: string;
  };
  topics: SkillTopic[];
  resources: ResourceItem[];
  tools: ToolItem[];
  milestones: MilestoneItem[];
  quiz: QuizQuestion[];
  proTip: string;
}

export const ROADMAP_PHASES: Phase[] = [
  {
    id: 1,
    slug: 'foundations',
    title: 'Foundations',
    timeframe: '0–2 Months',
    durationMonths: '2 Months (approx. 10–12 hrs/week)',
    tagline: 'Mastering the Digital Plumbing: Networks, OS & Terminal Agility',
    accentColor: '#06b6d4', // cyan-500
    description:
      'You cannot defend or exploit what you do not understand. In this phase, you build unbreakable fundamentals in computer networks, operating system architectures (Linux & Windows), and command-line agility.',
    trackFocus: {
      general: 'Build strong universal mental models of packets, IP routing, and terminal agility.',
      red: 'Learn how packets are structured so you can craft and manipulate them later.',
      blue: 'Understand normal baseline system and network behavior to detect anomalies later.',
    },
    topics: [
      {
        id: 'p1_tcp_ip',
        name: 'TCP/IP & OSI Model',
        category: 'core',
        description: 'Understand Layer 2 through Layer 7, headers, packet encapsulation, and how data moves across the internet.',
      },
      {
        id: 'p1_net_protocols',
        name: 'Core Network Protocols',
        category: 'core',
        description: 'Master DNS resolution, DHCP lease flows, ARP resolution, HTTP/HTTPS, ICMP, and TLS 1.3 handshakes.',
      },
      {
        id: 'p1_subnetting',
        name: 'Subnetting & IP Addressing',
        category: 'core',
        description: 'IPv4 vs IPv6, CIDR notation (/24, /16, /8), default gateways, and private RFC 1918 vs public ranges.',
      },
      {
        id: 'p1_linux_core',
        name: 'Linux Filesystem & Permissions',
        category: 'core',
        description: 'Navigating Linux hierarchies (/etc, /var/log, /proc), understanding chmod, chown, SUID, and bash scripting.',
      },
      {
        id: 'p1_windows_internals',
        name: 'Windows Internals & PowerShell',
        category: 'core',
        description: 'Windows registry, services, processes, Event Viewer logs, and automated cmdlets with PowerShell.',
      },
      {
        id: 'p1_python_basics',
        name: 'Basic Scripting (Python & Bash)',
        category: 'core',
        description: 'Writing automation scripts: parsing log files, automating socket connections, and making HTTP requests.',
      },
    ],
    resources: [
      {
        id: 'r_overthewire_bandit',
        name: 'OverTheWire: Bandit',
        platform: 'OverTheWire',
        url: 'https://overthewire.org/wargames/bandit/',
        type: 'Interactive Lab',
        description: 'The gold standard gamified wargame for learning Linux commands, SSH, file analysis, and shell piping.',
        badge: '100% Free',
      },
      {
        id: 'r_prof_messer_net',
        name: 'Professor Messer Network+ (N10-008/009)',
        platform: 'YouTube',
        url: 'https://www.youtube.com/@professormesser',
        type: 'Course',
        description: 'Comprehensive, high-yield free video curriculum covering all fundamental networking concepts and protocols.',
        badge: 'Free Video Course',
      },
      {
        id: 'r_linux_journey',
        name: 'Linux Journey',
        platform: 'Linux Journey',
        url: 'https://linuxjourney.com/',
        type: 'Platform',
        description: 'Interactive, structured bite-sized guide covering CLI, permissions, processes, networking, and kernel basics.',
        badge: 'Free Interactive Guide',
      },
      {
        id: 'r_cisco_netacad',
        name: 'Cisco Skills For All: Intro to Cybersecurity',
        platform: 'Cisco NetAcad',
        url: 'https://skillsforall.com/',
        type: 'Course',
        description: 'Free self-paced beginner security foundational course with verified digital badges directly from Cisco.',
        badge: 'Free Official Cert',
      },
    ],
    tools: [
      {
        id: 't_wireshark',
        name: 'Wireshark',
        category: 'Networking',
        description: 'World standard graphical packet analyzer for deep network troubleshooting and protocol dissection.',
        practicalUse: 'Capture live interfaces and isolate TCP 3-way handshakes, DNS queries, and plaintext credentials.',
        starterTip: 'Filter by "http" or "dns" or "ip.addr == 192.168.1.1" to isolate relevant streams.',
      },
      {
        id: 't_bash',
        name: 'Bash / Zsh CLI',
        category: 'OS',
        description: 'Command line shell for Unix/Linux systems with pipeline chaining capabilities.',
        practicalUse: 'Automate file manipulation, search logs with grep/awk/sed, and manage system background jobs.',
        starterTip: 'Combine commands: `cat access.log | awk \'{print $1}\' | sort | uniq -c | sort -nr`.',
      },
      {
        id: 't_powershell',
        name: 'PowerShell',
        category: 'OS',
        description: 'Task automation and configuration management framework with object-oriented cmdlets.',
        practicalUse: 'Query active processes, inspect event log streams, and manage Windows security policies.',
        starterTip: 'Use `Get-Service | Where-Object {$_.Status -eq "Running"}` to audit active daemons.',
      },
      {
        id: 't_netcat',
        name: 'Netcat (nc)',
        category: 'Networking',
        description: 'The "Swiss Army knife" of networking for arbitrary TCP/UDP connections and listeners.',
        practicalUse: 'Banner grabbing, testing firewall ports, raw HTTP requests, and transferring raw files.',
        starterTip: 'Listen on port 4444: `nc -lvnp 4444` or test open port: `nc -zv 10.10.10.1 80`.',
      },
      {
        id: 't_virtualbox',
        name: 'VirtualBox / VMware Player',
        category: 'OS',
        description: 'Desktop hypervisors for running virtualized guest operating systems safely.',
        practicalUse: 'Spin up isolated host-only virtual machines (Kali Linux + Metasploitable/Ubuntu) without risking your host PC.',
        starterTip: 'Always configure Host-Only or Internal Network adapters when dealing with vulnerable lab machines.',
      },
    ],
    milestones: [
      {
        id: 'm1_bandit',
        title: 'Beat Bandit Levels 0 to 20',
        description: 'Solve OverTheWire Bandit levels 0 through 20 exclusively using the Linux command line without pasting spoilers.',
        difficulty: 'Beginner',
      },
      {
        id: 'm1_wireshark',
        title: 'Capture & Dissect TCP Handshake',
        description: 'Use Wireshark to capture a live SYN, SYN-ACK, ACK handshake and a DNS query, identifying sequence numbers and flags.',
        difficulty: 'Beginner',
      },
      {
        id: 'm1_vmlab',
        title: 'Deploy an Isolated Dual-VM Lab',
        description: 'Install VirtualBox with a Kali Linux attacker VM and an Ubuntu Server VM communicating over a private host-only subnet.',
        difficulty: 'Beginner',
      },
      {
        id: 'm1_script',
        title: 'Write a Log Parser Script',
        description: 'Create a Python or Bash script that inspects a sample web server access log and prints the top 5 requesting IP addresses.',
        difficulty: 'Beginner',
      },
    ],
    quiz: [
      {
        id: 'q1_1',
        question: 'Which protocol layer in the OSI model is responsible for IP addressing and routing packets between networks?',
        options: ['Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)', 'Layer 7 (Application)'],
        correctAnswer: 1,
        explanation: 'Layer 3 (Network) handles logical addressing (IPv4/IPv6) and routing between disparate networks.',
      },
      {
        id: 'q1_2',
        question: 'What is the correct TCP handshake sequence when establishing a standard connection?',
        options: ['SYN -> ACK -> SYN-ACK', 'ACK -> SYN -> ACK-SYN', 'SYN -> SYN-ACK -> ACK', 'FIN -> ACK -> SYN'],
        correctAnswer: 2,
        explanation: 'A standard TCP three-way handshake initiates with SYN, receives SYN-ACK from the server, and concludes with ACK.',
      },
      {
        id: 'q1_3',
        question: 'In Linux permissions, what does the numeric value `755` indicate?',
        options: [
          'Owner: rwx, Group: r-x, Others: r-x',
          'Owner: r-x, Group: rwx, Others: rwx',
          'Owner: rwx, Group: rw-, Others: r--',
          'Read and write only for all users',
        ],
        correctAnswer: 0,
        explanation: '7 is 4+2+1 (rwx), and 5 is 4+1 (r-x). So 755 grants full rights to the owner, and read+execute to group and others.',
      },
    ],
    proTip: 'Do not rush through networking. 80% of cybersecurity confusion down the road is just shaky understanding of IP subnetting, DNS, or TCP flags.',
  },
  {
    id: 2,
    slug: 'core-skills',
    title: 'Core Skills',
    timeframe: '2–5 Months',
    durationMonths: '3 Months (approx. 12–15 hrs/week)',
    tagline: 'Security Principles, Threat Landscapes & Foundational Defense',
    accentColor: '#38bdf8', // sky-400
    description:
      'Transition from general IT into security engineering. Grasp the CIA triad, modern cryptography, authentication architectures, common vulnerability models (OWASP Top 10), and defensive perimeter controls.',
    trackFocus: {
      general: 'Understand how security breaches happen and the frameworks used to classify risks.',
      red: 'Learn reconnaissance techniques, service fingerprinting, and web request manipulation.',
      blue: 'Understand firewall policies, host hardening, authentication logs, and vulnerability mitigation.',
    },
    topics: [
      {
        id: 'p2_cia_triad',
        name: 'CIA Triad & Defense-in-Depth',
        category: 'core',
        description: 'Confidentiality, Integrity, Availability, threat modeling, attack surface reduction, and layered security controls.',
      },
      {
        id: 'p2_crypto',
        name: 'Applied Cryptography & PKI',
        category: 'core',
        description: 'Symmetric (AES) vs Asymmetric (RSA/ECC), hashing algorithms (SHA-256), digital signatures, and CA certificate trust chains.',
      },
      {
        id: 'p2_iam',
        name: 'Identity & Access Management (IAM)',
        category: 'core',
        description: 'Authentication vs Authorization, Multi-Factor Authentication (MFA), OAuth 2.0 flows, SAML, and Principle of Least Privilege.',
      },
      {
        id: 'p2_attack_vectors',
        name: 'Common Attack Vectors',
        category: 'red',
        description: 'Social engineering & phishing techniques, Man-in-the-Middle (MITM), Denial of Service (DoS/DDoS), and brute force mechanics.',
      },
      {
        id: 'p2_vuln_frameworks',
        name: 'Vulnerability Classifications (OWASP & CVE)',
        category: 'core',
        description: 'OWASP Top 10 (Injection, Broken Auth, SSRF, XSS), CVE databases, CWE weaknesses, and CVSS severity scoring.',
      },
      {
        id: 'p2_firewalls_edr',
        name: 'Defensive Controls & Perimeters',
        category: 'blue',
        description: 'Stateful vs stateless firewalls, IDS vs IPS (Snort/Suricata), basic EDR telemetry, and secure system baseline hardening.',
      },
    ],
    resources: [
      {
        id: 'r_tryhackme_presec',
        name: 'TryHackMe: Pre-Security Path',
        platform: 'TryHackMe',
        url: 'https://tryhackme.com/path/outline/pre-security',
        type: 'Interactive Lab',
        description: 'Beginner-friendly gamified browser rooms breaking down web fundamentals, network basics, and essential security concepts.',
        badge: 'Free / Freemium',
      },
      {
        id: 'r_portswigger_intro',
        name: 'PortSwigger Web Security Academy',
        platform: 'PortSwigger',
        url: 'https://portswigger.net/web-security',
        type: 'Interactive Lab',
        description: 'World-renowned interactive labs created by the developers of Burp Suite. Covers OWASP vulnerabilities with live targets.',
        badge: '100% Free High Quality',
      },
      {
        id: 'r_prof_messer_sec',
        name: 'Professor Messer Security+ (SY0-701)',
        platform: 'YouTube',
        url: 'https://www.youtube.com/@professormesser',
        type: 'Course',
        description: 'Free comprehensive video series covering threats, attacks, vulnerabilities, architecture, and governance.',
        badge: 'Free Curriculum',
      },
      {
        id: 'r_nist_csf',
        name: 'NIST Cybersecurity Framework (CSF 2.0)',
        platform: 'NIST.gov',
        url: 'https://www.nist.gov/cyberframework',
        type: 'Documentation',
        description: 'Understand the industry standard blueprint: Identify, Protect, Detect, Respond, and Recover.',
        badge: 'Industry Standard',
      },
    ],
    tools: [
      {
        id: 't_nmap',
        name: 'Nmap (Network Mapper)',
        category: 'Recon',
        description: 'The standard network discovery and vulnerability scanner utility.',
        practicalUse: 'Discover alive hosts, scan for open TCP/UDP ports, detect OS versions, and run NSE detection scripts.',
        starterTip: 'Run `nmap -sC -sV -oN scan.txt 10.10.10.x` for default scripts and version fingerprinting.',
      },
      {
        id: 't_burp_suite',
        name: 'Burp Suite Community',
        category: 'Web',
        description: 'Leading intercepting proxy for security testing of web applications.',
        practicalUse: 'Intercept HTTP/S requests between your browser and target, tamper with parameters, and replay requests via Repeater.',
        starterTip: 'Configure FoxyProxy in Firefox to route localhost traffic through port 8080.',
      },
      {
        id: 't_hashcat',
        name: 'Hashcat & John the Ripper',
        category: 'Exploit',
        description: 'High-speed password recovery and hash cracking utilities.',
        practicalUse: 'Audit password strength and crack salted/unsalted hashes using dictionary wordlists (e.g., rockyou.txt).',
        starterTip: 'Identify hash types first with `hashid` or `hash-identifier` before launching a wordlist attack.',
      },
      {
        id: 't_ufw_iptables',
        name: 'UFW / Iptables / Windows Firewall',
        category: 'Defense',
        description: 'Host-based packet filtering and stateful firewall configuration tools.',
        practicalUse: 'Block unauthorized inbound connection attempts and restrict management services to specific subnets.',
        starterTip: 'On Ubuntu: `sudo ufw default deny incoming`, `sudo ufw allow 22/tcp`, `sudo ufw enable`.',
      },
      {
        id: 't_nessus_openvas',
        name: 'Nessus Essentials / OpenVAS',
        category: 'Recon',
        description: 'Automated vulnerability scanners for identifying unpatched software, misconfigurations, and CVEs.',
        practicalUse: 'Run baseline scans across your lab subnet to generate vulnerability assessment reports.',
        starterTip: 'Nessus Essentials allows scanning up to 16 IP addresses for free in your home lab.',
      },
    ],
    milestones: [
      {
        id: 'm2_thm_presec',
        title: 'Complete THM Pre-Security Path',
        description: 'Finish all interactive rooms in the TryHackMe Pre-Security learning path and earn the completion badge.',
        difficulty: 'Beginner',
      },
      {
        id: 'm2_burp_tamper',
        title: 'Intercept & Tamper Web Requests',
        description: 'Configure Burp Suite proxy with your browser and successfully modify headers, POST data, and cookies on a lab app.',
        difficulty: 'Intermediate',
      },
      {
        id: 'm2_nmap_scan',
        title: 'Full Subnet Fingerprinting Scan',
        description: 'Execute structured Nmap scans on your local lab VM, identifying open ports, running services, and exact software versions.',
        difficulty: 'Intermediate',
      },
      {
        id: 'm2_portswigger_apprentice',
        title: 'Solve 10 PortSwigger Apprentice Labs',
        description: 'Complete 10 beginner/apprentice level labs on PortSwigger Academy covering SQL Injection, XSS, and Authentication.',
        difficulty: 'Intermediate',
      },
    ],
    quiz: [
      {
        id: 'q2_1',
        question: 'Which component of the CIA triad is violated if an unauthorized attacker tampers with database records to alter their account balance?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
        correctAnswer: 1,
        explanation: 'Integrity guarantees that data has not been altered or tampered with by unauthorized parties.',
      },
      {
        id: 'q2_2',
        question: 'What is the primary difference between symmetric and asymmetric cryptography?',
        options: [
          'Symmetric uses two keys; asymmetric uses one key',
          'Symmetric uses the same secret key for encryption and decryption; asymmetric uses a public/private key pair',
          'Symmetric cannot be used for file encryption; asymmetric is only used for hashing',
          'Asymmetric encryption is significantly faster than symmetric encryption',
        ],
        correctAnswer: 1,
        explanation: 'Symmetric ciphers (like AES) use one shared key for both encrypting and decrypting. Asymmetric (like RSA) uses a public key to encrypt and private key to decrypt.',
      },
      {
        id: 'q2_3',
        question: 'When scanning a target with Nmap, what does the `-sV` flag tell the scanner to do?',
        options: [
          'Perform a stealth SYN scan only',
          'Probe open ports to determine service and version info',
          'Run a full UDP vulnerability exploit',
          'Scan in verbose mode without pinging',
        ],
        correctAnswer: 1,
        explanation: 'The `-sV` flag enables Service Version detection, querying banners to identify the exact service version running.',
      },
    ],
    proTip: 'Learn to use Burp Suite early. Even if your ultimate target is cloud defense or SOC analysis, understanding how web traffic is intercepted is invaluable.',
  },
  {
    id: 3,
    slug: 'hands-on-practice',
    title: 'Hands-on Practice',
    timeframe: '5–8 Months',
    durationMonths: '3 Months (approx. 15 hrs/week)',
    tagline: 'Real Labs, CTF Challenges & Live System Interaction',
    accentColor: '#0ea5e9', // sky-500
    description:
      'Step out of theory and into live virtual battlegrounds. Build your own home lab environment, tackle beginner Capture-The-Flag (CTF) challenges, analyze live traffic, and simulate adversarial engagements.',
    trackFocus: {
      general: 'Build muscle memory by running actual tools against live vulnerable targets and analyzing the evidence left behind.',
      red: 'Exploit web vulnerabilities, perform Linux/Windows privilege escalation, and capture user/root flags.',
      blue: 'Ingest Windows/Linux event logs into a SIEM, build alert queries, and conduct digital forensic PCAP investigations.',
    },
    topics: [
      {
        id: 'p3_web_pentest',
        name: 'Web Application Vulnerabilities',
        category: 'red',
        description: 'Hands-on exploitation of SQL Injection (SQLi), Cross-Site Scripting (XSS), IDOR, Path Traversal, and Command Injection.',
      },
      {
        id: 'p3_privesc',
        name: 'Privilege Escalation (Linux & Windows)',
        category: 'red',
        description: 'Elevating low-privilege shells: exploiting SUID binaries, sudo misconfigurations, cron jobs, unquoted service paths, and token privileges.',
      },
      {
        id: 'p3_log_hunting',
        name: 'Log Analysis & Threat Detection',
        category: 'blue',
        description: 'Analyzing Windows Event IDs (4624 logon, 4625 failed, 7045 service installed), Sysmon telemetry, and Linux /var/log/auth.log.',
      },
      {
        id: 'p3_siem_intro',
        name: 'SIEM Deployment & Querying',
        category: 'blue',
        description: 'Ingesting host logs into Splunk Free or Wazuh, writing search processing queries (SPL), and detecting brute force attempts.',
      },
      {
        id: 'p3_packet_forensics',
        name: 'Packet & Network Forensics',
        category: 'blue',
        description: 'Carving files from PCAP dumps, identifying C2 beaconing behavior, and tracing data exfiltration channels.',
      },
      {
        id: 'p3_ad_basics',
        name: 'Active Directory Fundamentals',
        category: 'core',
        description: 'Understanding Domain Controllers, Kerberos authentication tickets (TGT/TGS), LDAP queries, and Group Policy Objects (GPOs).',
      },
    ],
    resources: [
      {
        id: 'r_tryhackme_beginner',
        name: 'TryHackMe: Jr Penetration Tester / Web Fundamentals',
        platform: 'TryHackMe',
        url: 'https://tryhackme.com/path/outline/jrpenetrationtester',
        type: 'Interactive Lab',
        description: 'High-quality guided hands-on paths teaching offensive methodologies, exploitation, and vulnerability reporting.',
        badge: 'Recommended Lab',
      },
      {
        id: 'r_hackthebox_starting',
        name: 'Hack The Box: Starting Point',
        platform: 'Hack The Box',
        url: 'https://www.hackthebox.com/hacker/starting-point',
        type: 'Interactive Lab',
        description: 'Tiered introductory machines (Tier 0 to Tier 2) designed to guide newcomers through their very first machine roots.',
        badge: 'Free HTB Tier',
      },
      {
        id: 'r_cyberdefenders',
        name: 'CyberDefenders: Blue Team Challenges',
        platform: 'CyberDefenders',
        url: 'https://cyberdefenders.org/',
        type: 'Interactive Lab',
        description: 'Real-world digital forensics and incident response (DFIR) scenarios analyzing PCAP captures, memory dumps, and disk images.',
        badge: 'Premier Blue Team Free',
      },
      {
        id: 'r_overthewire_natas',
        name: 'OverTheWire: Natas (Web Security)',
        platform: 'OverTheWire',
        url: 'https://overthewire.org/wargames/natas/',
        type: 'Interactive Lab',
        description: 'Teaches server-side web security step-by-step from source code review to complex injection techniques.',
        badge: 'Free Web Wargame',
      },
    ],
    tools: [
      {
        id: 't_metasploit',
        name: 'Metasploit Framework',
        category: 'Exploit',
        description: 'The world’s most widely used penetration testing platform and payload generator.',
        practicalUse: 'Manage exploit modules, setup multi/handler listeners, and generate reverse shells with msfvenom.',
        starterTip: 'Launch `msfconsole`, search for target vulnerabilities, set `LHOST`, `RHOSTS`, and run `exploit`.',
      },
      {
        id: 't_gobuster_ffuf',
        name: 'Gobuster & ffuf',
        category: 'Web',
        description: 'Blazing fast directory, DNS, and virtual host fuzzing utilities written in Go.',
        practicalUse: 'Discover hidden administration panels, backup files, and unlinked endpoints on target web servers.',
        starterTip: 'Run `ffuf -w /usr/share/wordlists/dirb/common.txt -u http://TARGET/FUZZ` to uncover hidden directories.',
      },
      {
        id: 't_splunk_wazuh',
        name: 'Splunk Free & Wazuh SIEM',
        category: 'Defense',
        description: 'Enterprise security information and event management (SIEM) and XDR platforms.',
        practicalUse: 'Collect endpoint logs, parse timestamps, and query for suspicious command executions or lateral movement.',
        starterTip: 'Install Wazuh agent on your lab VMs to monitor file integrity and rootkit executions in real time.',
      },
      {
        id: 't_volatility',
        name: 'Volatility Framework',
        category: 'Forensics',
        description: 'Advanced memory forensics framework for extracting digital artifacts from volatile RAM dumps.',
        practicalUse: 'Identify hidden processes, injected DLLs, network sockets, and command history from memory captures.',
        starterTip: 'Use `vol.py -f memory.dmp windows.pstree` to visualize parent-child process execution trees.',
      },
      {
        id: 't_ghidra',
        name: 'Ghidra',
        category: 'Forensics',
        description: 'NSA-developed open-source software reverse engineering suite.',
        practicalUse: 'Disassemble and decompile compiled binaries (C/C++) to uncover hardcoded keys and vulnerability logic.',
        starterTip: 'Check the Symbol Tree and Strings window first to locate function names and interesting text references.',
      },
    ],
    milestones: [
      {
        id: 'm3_htb_sp',
        title: 'Root 10 Hack The Box Starting Point Machines',
        description: 'Successfully compromise 10 Tier 0, 1, and 2 machines on Hack The Box Starting Point without using walkthrough guides.',
        difficulty: 'Intermediate',
      },
      {
        id: 'm3_siem_homelab',
        title: 'Deploy a Local SIEM Homelab',
        description: 'Set up Splunk Free or Wazuh on a virtual machine and forward real event logs from an active Windows or Linux host.',
        difficulty: 'Intermediate',
      },
      {
        id: 'm3_ctf_writeup',
        title: 'Publish Your First CTF Lab Writeup',
        description: 'Document an entire machine breakdown with screenshots, vulnerability explanation, remediation advice, and clean markdown.',
        difficulty: 'Intermediate',
      },
      {
        id: 'm3_dfir_case',
        title: 'Solve 3 CyberDefenders DFIR Investigations',
        description: 'Analyze real memory dumps or network packet captures to answer forensic case questions and recover threat artifacts.',
        difficulty: 'Advanced',
      },
    ],
    quiz: [
      {
        id: 'q3_1',
        question: 'Which Linux permission bit, when set on an executable binary, causes it to run with the permissions of the file owner rather than the user executing it?',
        options: ['Sticky Bit', 'SUID (Set User ID)', 'SGID (Set Group ID)', 'Immutable Bit (chattr +i)'],
        correctAnswer: 1,
        explanation: 'The SUID (Set User ID) bit allows users to run an executable with the filesystem permissions of the binary owner (often root).',
      },
      {
        id: 'q3_2',
        question: 'Which Windows Event ID specifically indicates an account failed to log on (vital for detecting brute-force attempts)?',
        options: ['Event ID 4624', 'Event ID 4625', 'Event ID 7045', 'Event ID 1102'],
        correctAnswer: 1,
        explanation: 'Event ID 4625 records failed logon attempts. Repeated 4625 events within a short timeframe signal potential password spraying or brute force.',
      },
      {
        id: 'q3_3',
        question: 'What is an Insecure Direct Object Reference (IDOR)?',
        options: [
          'A flaw where user-supplied input alters SQL query structure',
          'A vulnerability where application reveals sensitive internal database schemas in error messages',
          'A flaw where access control is missing, allowing users to access another user’s record simply by altering an ID parameter',
          'A buffer overflow in the web server memory manager',
        ],
        correctAnswer: 2,
        explanation: 'IDOR occurs when an application exposes a reference to an internal object (e.g., /api/user?id=102) without verifying if the user has authorization to access it.',
      },
    ],
    proTip: 'Always write down your methodology while solving machines. Your ability to clearly articulate how you found and remediated an issue is what hires you, not just the root flag.',
  },
  {
    id: 4,
    slug: 'intermediate-level',
    title: 'Intermediate Level',
    timeframe: '8–12 Months',
    durationMonths: '4 Months (approx. 15–20 hrs/week)',
    tagline: 'Enterprise Environments, Active Directory & Cloud Defense',
    accentColor: '#2563eb', // blue-600
    description:
      'Scale your perspective to enterprise corporate ecosystems. Master Active Directory domain attacks and defenses, cloud security (AWS & Azure), detection engineering with Sigma rules, and structured incident response.',
    trackFocus: {
      general: 'Enterprises do not run single Linux servers; they run hybrid Active Directory forests and multi-cloud infrastructure.',
      red: 'Internal network pivoting, Kerberoasting, BloodHound graph analysis, and Active Directory certificate abuse.',
      blue: 'Detection engineering, Sigma/YARA rules, MITRE ATT&CK mapping, and executing the Incident Response lifecycle.',
    },
    topics: [
      {
        id: 'p4_ad_attacks',
        name: 'Enterprise Active Directory Attacks',
        category: 'red',
        description: 'Kerberoasting, AS-REP Roasting, Pass-the-Hash, BloodHound path exploration, and DCSync attacks.',
      },
      {
        id: 'p4_ad_defense',
        name: 'Active Directory Hardening & Tiering',
        category: 'blue',
        description: 'Privileged Access Workstations (PAWs), ESAE administrative tiering, LAPS implementation, and Kerberos armoring.',
      },
      {
        id: 'p4_cloud_sec',
        name: 'Cloud Security Fundamentals (AWS / Azure)',
        category: 'core',
        description: 'IAM least privilege, S3 bucket exposure, CloudTrail audit logs, Azure Entra ID, and cloud misconfiguration enumeration.',
      },
      {
        id: 'p4_detection_eng',
        name: 'Detection Engineering (Sigma & YARA)',
        category: 'blue',
        description: 'Writing platform-agnostic detection rules with Sigma, pattern matching malware with YARA, and mapping to MITRE ATT&CK.',
      },
      {
        id: 'p4_incident_resp',
        name: 'Incident Response Lifecycle (PICERL)',
        category: 'blue',
        description: 'Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned in enterprise breaches.',
      },
      {
        id: 'p4_pivoting',
        name: 'Network Pivoting & Lateral Movement',
        category: 'red',
        description: 'SSH dynamic port forwarding, Chisel, Ligolo-ng, SOCKS proxies, and traversing segmented internal subnets.',
      },
    ],
    resources: [
      {
        id: 'r_antisyphon',
        name: 'Antisyphon Training (John Strand & Team)',
        platform: 'Antisyphon Training',
        url: 'https://www.antisyphontraining.com/',
        type: 'Course',
        description: 'Exceptional "Pay What You Can" courses covering SOC core skills, active defense, and enterprise threat hunting.',
        badge: 'Pay-What-You-Can / Free',
      },
      {
        id: 'r_portswigger_practitioner',
        name: 'PortSwigger Academy: Practitioner Tier',
        platform: 'PortSwigger',
        url: 'https://portswigger.net/web-security',
        type: 'Interactive Lab',
        description: 'Advanced web attacks: Server-Side Request Forgery (SSRF), JWT attacks, Insecure Deserialization, and OAuth vulnerabilities.',
        badge: '100% Free Advanced Labs',
      },
      {
        id: 'r_mitre_navigator',
        name: 'MITRE ATT&CK Navigator',
        platform: 'MITRE',
        url: 'https://mitre-attack.github.io/attack-navigator/',
        type: 'Platform',
        description: 'Interactive matrix for visualizing adversary tactics, techniques, and procedures (TTPs) across enterprise threat models.',
        badge: 'Industry Standard Matrix',
      },
      {
        id: 'r_ms_learn_security',
        name: 'Microsoft Learn: SC-900 & SC-200 Paths',
        platform: 'Microsoft Learn',
        url: 'https://learn.microsoft.com/',
        type: 'Course',
        description: 'Official free interactive modules covering Microsoft Entra ID, Microsoft Sentinel, and Defender XDR.',
        badge: 'Official Cloud Learning',
      },
    ],
    tools: [
      {
        id: 't_bloodhound',
        name: 'BloodHound & SharpHound',
        category: 'Active Directory',
        description: 'Graph theory analysis tool for uncovering hidden and unintended relationship attack paths in Active Directory.',
        practicalUse: 'Ingest Active Directory domain objects and query for shortest paths to Domain Admin or DCSync rights.',
        starterTip: 'Run SharpHound ingestor in your lab VM, then drag the generated zip file into the BloodHound GUI.',
      },
      {
        id: 't_mimikatz',
        name: 'Mimikatz / secretsdump.py',
        category: 'Exploit',
        description: 'Leading post-exploitation credential extraction tools for Windows systems.',
        practicalUse: 'Extract plaintext passwords, Kerberos tickets, and NTLM password hashes from LSASS process memory.',
        starterTip: 'Use Impacket\'s `secretsdump.py` against domain controller NTDS.dit backups in your test lab.',
      },
      {
        id: 't_sigma_yara',
        name: 'Sigma & YARA',
        category: 'Defense',
        description: 'Open standard rule formats for detection logic (Sigma) and binary artifact hunting (YARA).',
        practicalUse: 'Write a detection rule once in Sigma and compile it directly into Splunk SPL, Elastic, or Sentinel queries.',
        starterTip: 'Check the official Sigma repository on GitHub for hundreds of battle-tested detection rules.',
      },
      {
        id: 't_chisel_ligolo',
        name: 'Chisel / Ligolo-ng',
        category: 'Networking',
        description: 'High-performance TCP/UDP tunneling and SOCKS proxy tools for internal network pivoting.',
        practicalUse: 'Tunnel traffic from your attacking machine through a compromised dual-homed pivot host into an isolated intranet.',
        starterTip: 'Ligolo-ng creates a TUN interface on your Linux machine, routing entire internal subnets without slow proxychains.',
      },
      {
        id: 't_suricata_zeek',
        name: 'Zeek & Suricata',
        category: 'Defense',
        description: 'Open source network security monitoring and intrusion detection/prevention engines.',
        practicalUse: 'Inspect live traffic streams and generate protocol transaction logs, TLS certificates, and alert signatures.',
        starterTip: 'Zeek produces organized TSV logs (conn.log, http.log, dns.log, ssl.log) perfect for threat hunting.',
      },
    ],
    milestones: [
      {
        id: 'm4_ad_forest',
        title: 'Build a Multi-Node Active Directory Lab',
        description: 'Deploy a Windows Server Domain Controller with Active Directory Domain Services (AD DS) and two joined domain workstations.',
        difficulty: 'Advanced',
      },
      {
        id: 'm4_bloodhound_path',
        title: 'Execute a BloodHound Attack Path',
        description: 'Ingest domain data using SharpHound, identify an escalation path to Domain Admin, and execute the attack chain in your lab.',
        difficulty: 'Advanced',
      },
      {
        id: 'm4_sigma_rules',
        title: 'Author 3 Custom Sigma Detection Rules',
        description: 'Write 3 Sigma rules that detect specific adversary techniques (e.g. LSASS dumping, suspicious PowerShell encoded commands).',
        difficulty: 'Advanced',
      },
      {
        id: 'm4_first_cert',
        title: 'Earn a Reputable Foundational Certification',
        description: 'Prepare for and sit for a respected credential such as CompTIA Security+, Blue Team Level 1 (BTL1), or eJPT.',
        difficulty: 'Advanced',
      },
    ],
    quiz: [
      {
        id: 'q4_1',
        question: 'What is the fundamental mechanism behind a "Kerberoasting" attack in Active Directory?',
        options: [
          'Brute forcing the Domain Controller administrator password over SSH',
          'Requesting a Kerberos Service Ticket (TGS) for a service account with a SPN and cracking the ticket hash offline',
          'Flooding the Kerberos KDC server with bogus authentication requests to trigger a Denial of Service',
          'Poisoning LLMNR/NBT-NS network requests on the local subnet',
        ],
        correctAnswer: 1,
        explanation: 'Any authenticated domain user can request a Kerberos TGS ticket for an account with a Service Principal Name (SPN). The ticket is encrypted with the service account password hash, which can be extracted and cracked offline.',
      },
      {
        id: 'q4_2',
        question: 'In the Incident Response lifecycle (PICERL), what step immediately follows "Identification"?',
        options: ['Eradication', 'Recovery', 'Containment', 'Lessons Learned'],
        correctAnswer: 2,
        explanation: 'PICERL stands for Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned. Once a threat is identified, you immediately contain it to stop spread.',
      },
      {
        id: 'q4_3',
        question: 'What is the purpose of Sigma in detection engineering?',
        options: [
          'A proprietary antivirus software engine',
          'A generic, vendor-agnostic signature format for describing log events that can be compiled into SIEM search queries',
          'An offensive shellcode injector used by red teams',
          'A protocol for encrypting TLS traffic inside containers',
        ],
        correctAnswer: 1,
        explanation: 'Sigma is an open standard format that allows detection engineers to write detection rules once and compile them into Splunk, Elastic, Sentinel, or QRadar queries.',
      },
    ],
    proTip: 'Active Directory is present in over 90% of Fortune 500 companies. Prioritizing AD security will instantly set you apart from typical candidates.',
  },
  {
    id: 5,
    slug: 'junior-ready',
    title: 'Junior Ready / Portfolio Building',
    timeframe: '12+ Months',
    durationMonths: '12+ Months (Ongoing Refinement)',
    tagline: 'Professional Portfolio, Proof of Work & Industry Presence',
    accentColor: '#10b981', // emerald-500
    description:
      'Solidify your knowledge into public, verifiable proof of work. Create high-impact technical writeups, build an open-source security tool, showcase your homelab, and prepare for rigorous technical interviews.',
    trackFocus: {
      general: 'Hiring managers care about proof of work over self-proclaimed skills. Show, don’t just tell.',
      red: 'Demonstrate disciplined pentest methodologies, professional vulnerability reporting, and legal bug bounty triage.',
      blue: 'Showcase incident triage playbooks, SIEM detection rules, threat hunt case studies, and forensic reports.',
    },
    topics: [
      {
        id: 'p5_tech_reporting',
        name: 'Professional Technical Reporting',
        category: 'core',
        description: 'Structuring executive summaries, technical impact statements, CVSS calculations, and actionable remediation steps.',
      },
      {
        id: 'p5_soft_skills',
        name: 'Risk Communication & Stakeholder Alignment',
        category: 'core',
        description: 'Translating complex cyber risk into business terms: downtime, compliance liabilities, and financial loss.',
      },
      {
        id: 'p5_interview_prep',
        name: 'Technical Interview Mastery',
        category: 'core',
        description: 'Handling live whiteboard architecture scenarios, behavioral questions, troubleshooting exercises, and capture-the-flag drills.',
      },
      {
        id: 'p5_bug_bounty',
        name: 'Ethical Bug Bounty Methodologies',
        category: 'red',
        description: 'Working within rules of engagement on HackerOne and Bugcrowd, finding asset scopes, and filing triage-ready reports.',
      },
      {
        id: 'p5_osint_intel',
        name: 'OSINT & Cyber Threat Intelligence (CTI)',
        category: 'blue',
        description: 'Tracking threat actor campaigns, consuming STIX/TAXII feeds, pivoting on Shodan/Censys, and publishing threat bulletins.',
      },
      {
        id: 'p5_compliance_gov',
        name: 'Compliance & Governance Overview',
        category: 'core',
        description: 'Understanding ISO 27001, SOC 2, HIPAA, PCI-DSS, and GDPR frameworks that shape enterprise security decisions.',
      },
    ],
    resources: [
      {
        id: 'r_github_portfolio',
        name: 'GitHub Pages / Hugo / Markdown Blog',
        platform: 'GitHub Pages',
        url: 'https://pages.github.com/',
        type: 'Platform',
        description: 'Build and host your personal security portfolio, project demos, and CTF writeups completely for free.',
        badge: 'Portfolio Showcase',
      },
      {
        id: 'r_hackerone_uni',
        name: 'HackerOne Community & Bugcrowd University',
        platform: 'HackerOne',
        url: 'https://www.hackerone.com/hackers/hacker101',
        type: 'Course',
        description: 'Free instructional videos, curated CTF challenges, and professional disclosure methodologies for bug hunters.',
        badge: 'Official Bug Bounty',
      },
      {
        id: 'r_sans_isc',
        name: 'SANS Internet Storm Center Podcast',
        platform: 'SANS ISC',
        url: 'https://isc.sans.edu/',
        type: 'Platform',
        description: 'Daily 7-minute audio briefing and diary of the latest active cyber threats, vulnerabilities, and zero-day exploits.',
        badge: 'Daily Industry Threat Intel',
      },
      {
        id: 'r_cyber_mentors',
        name: 'The Cyber Mentor & John Hammond YouTube Channels',
        platform: 'YouTube',
        url: 'https://www.youtube.com/@TCMSecurityAcademy',
        type: 'YouTube',
        description: 'Practical guides on resume preparation, entry-level interview questions, realistic job hunting, and technical walkthroughs.',
        badge: 'Free Career Guidance',
      },
    ],
    tools: [
      {
        id: 't_obsidian_notion',
        name: 'Obsidian / Notion (Second Brain)',
        category: 'OS',
        description: 'Knowledge management software with markdown linking and graph views.',
        practicalUse: 'Maintain your personal cybersecurity wiki, command cheatsheets, payload lists, and certification revision notes.',
        starterTip: 'Link notes by topic (e.g. [[SQL Injection]] -> [[Bypassing WAFs]]) for rapid lookup during tests.',
      },
      {
        id: 't_git_github',
        name: 'Git & GitHub',
        category: 'OS',
        description: 'Distributed version control and public repository platform.',
        practicalUse: 'Publish automation scripts, homelab infrastructure-as-code files, and public writeups demonstrating your technical growth.',
        starterTip: 'Pin your top 3 cybersecurity projects on your public GitHub profile with clean README.md walkthroughs.',
      },
      {
        id: 't_shodan_censys',
        name: 'Shodan & Censys',
        category: 'Recon',
        description: 'Search engines for Internet-connected devices, banners, and open services.',
        practicalUse: 'Search for exposed industrial control systems, misconfigured databases, or vulnerable SSL certificates.',
        starterTip: 'Query filters: `org:"TargetName" port:443 "product:nginx"` to map corporate perimeter footprints.',
      },
      {
        id: 't_docker',
        name: 'Docker & Compose',
        category: 'OS',
        description: 'Containerization platform for quickly spinning up disposable testing environments.',
        practicalUse: 'Launch test target applications (e.g. DVWA, Juice Shop, vulnerable API containers) in seconds without messy VM overhead.',
        starterTip: 'Run `docker run -d -p 3000:3000 bkimminich/juice-shop` to instantly start practicing OWASP Top 10 vulnerabilities.',
      },
    ],
    milestones: [
      {
        id: 'm5_public_portfolio',
        title: 'Launch a Public Security Portfolio Website',
        description: 'Deploy a clean website showcasing your background, certifications, homelab setup, and at least 5 in-depth technical writeups.',
        difficulty: 'Intermediate',
      },
      {
        id: 'm5_mock_audit_report',
        title: 'Author a Full Mock Security Audit / Pentest Report',
        description: 'Produce an end-to-end professional penetration test or SOC incident triage report formatted with an executive summary.',
        difficulty: 'Advanced',
      },
      {
        id: 'm5_live_ctf_event',
        title: 'Compete in a 24-Hour Live Team CTF',
        description: 'Participate in an organized team CTF event (such as picoCTF, National Cyber League, or NahamCon CTF) and score on the board.',
        difficulty: 'Advanced',
      },
      {
        id: 'm5_job_applications',
        title: 'Apply to Entry-Level Cybersecurity Roles',
        description: 'Submit polished applications for Junior SOC Analyst, Information Security Associate, or Junior Pentester positions.',
        difficulty: 'Advanced',
      },
    ],
    quiz: [
      {
        id: 'q5_1',
        question: 'When presenting a critical vulnerability report to non-technical executive management, what is the most important section to highlight?',
        options: [
          'The exact raw hex dump and memory offset of the exploit payload',
          'The Executive Summary explaining business risk, operational impact, and strategic remediation in clear non-jargon language',
          'The Linux bash script used to automate the port scan',
          'A full list of all 65,535 ports scanned',
        ],
        correctAnswer: 1,
        explanation: 'Executives make budget and risk management decisions. The Executive Summary translates technical findings into financial, compliance, and operational impact.',
      },
      {
        id: 'q5_2',
        question: 'Under responsible disclosure policies in bug bounty programs, what must a researcher NEVER do?',
        options: [
          'Test within the explicitly stated target scope in the policy',
          'Report the discovered vulnerability through the official platform channel',
          'Exfiltrate sensitive customer data, intentionally cause service downtime, or publish the exploit before the vendor remediates',
          'Provide clear reproduction steps and a proof of concept',
        ],
        correctAnswer: 2,
        explanation: 'Responsible disclosure strictly prohibits accessing or exfiltrating private customer data, disrupting services (DoS), or publicly releasing details before remediation.',
      },
      {
        id: 'q5_3',
        question: 'Which of the following is typically considered the best "proof of work" for a candidate with no prior enterprise security experience?',
        options: [
          'Listing 50 cybersecurity books you have read',
          'Public GitHub repository with homelab documentation, tool automation scripts, CTF writeups, and verifiable hands-on lab badges',
          'Stating you are an expert in all cybersecurity domains',
          'Retweeting cybersecurity news articles on social media',
        ],
        correctAnswer: 1,
        explanation: 'Hiring managers look for verifiable evidence of hands-on curiosity: homelabs, thorough writeups, scripts, and persistent lab completion badges.',
      },
    ],
    proTip: 'Job requirements for entry-level roles often ask for 2–3 years of experience. Apply anyway. Your documented homelab and detailed writeups will outshine candidates with generic degrees and no hands-on proof.',
  },
];

export const CERTIFICATION_ROADMAP = [
  {
    tier: 'Beginner / Entry-Level',
    certs: [
      { name: 'CompTIA Security+', focus: 'General baseline concepts, compliance & foundational terminology', difficulty: 'Beginner' },
      { name: 'Cisco Certified Support Technician (CCST) Cybersecurity', focus: 'Fundamental networking & security protocols', difficulty: 'Beginner' },
      { name: 'ISC2 Certified in Cybersecurity (CC)', focus: 'Entry-level governance, access controls & security principles', difficulty: 'Beginner' },
    ],
  },
  {
    tier: 'Hands-on Defensive (Blue Team)',
    certs: [
      { name: 'Blue Team Level 1 (BTL1)', focus: 'Practical 24h incident response, SIEM, phishing analysis & digital forensics', difficulty: 'Intermediate' },
      { name: 'CompTIA CySA+ (Cybersecurity Analyst)', focus: 'Threat intelligence, behavioral monitoring & vulnerability management', difficulty: 'Intermediate' },
      { name: 'Microsoft Certified: SC-200', focus: 'Enterprise SOC analyst operations using Microsoft Sentinel & Defender', difficulty: 'Intermediate' },
    ],
  },
  {
    tier: 'Hands-on Offensive (Red Team)',
    certs: [
      { name: 'eLearnSecurity Junior Penetration Tester (eJPT)', focus: '100% practical 48h network & web application penetration test', difficulty: 'Intermediate' },
      { name: 'OffSec Certified Professional (OSCP)', focus: 'Gold-standard practical 24h penetration testing & report writing', difficulty: 'Advanced' },
      { name: 'Certified Red Team Operator (CRTO)', focus: 'Active Directory exploitation, Cobalt Strike & evasion tactics', difficulty: 'Advanced' },
    ],
  },
];
