
🎓 **Ghid instalare UniEvent**

Urmați pașii de instalare în această ordine. Dacă aveți erori, verificați secțiunea de "Probleme Comune" de la final.

-----

### 🛠️ 1. Ce trebuie să instalați (Dacă nu le aveți deja)

Verificați dacă sunt instalate într-un terminal cu următoarele comenzi:

``` bash
python --version
node --version
```

**A. Python (Backend)**
Descarcă: https://www.python.org/downloads/

> 🚨 **CRITIC:** La instalare, bifați căsuța de jos: **"Add Python to PATH"**. Fără asta nu merge nimic\!

**B. Node.js (Frontend)**
Descarcă (alegeți versiunea LTS): https://nodejs.org/en/

-----

### 🚀 2. Configurare Proiect (Se face o singură dată)

1.  **Descărcați proiectul** de pe GitHub și deschideți folderul `uni-event` în **VS Code**.
2.  Deschideți un **Terminal** (`Ctrl + ~`).

**Pasul A: Configurare Backend**

a. Dați copy-paste și rulați comenzile astea **pe rând** în terminal:

```bash
cd backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```
*(Dacă mediul virual functionează v-a aparea `(env)` la începutul liniei de comandă.)*

b. Pregătiți baza de date (deoarece proiectul este în dezvoltare o să creem o bază de date local - adică doar pe PC-ul vostru):
```bash
python manage.py migrate
```
c. Creați-vă un cont de Administrator:
```bash
python manage.py createsuperuser
```

*La `createsuperuser` puneți un email și o parolă ca să aveți acces de Admin. Nu se văd literele când scrieți parola, e normal).*

**Pasul B: Configurare Frontend**
Deschideți un al doilea terminal (sau navigați în folderul frontend) și rulați:

```bash
cd ../frontend
npm install
```
*(sau dacă sunteți în folderul pricipal `cd frontend` simplu)*

-----

### ▶️ 3. Cum porniți proiectul (Zilnic)

Aveți nevoie de **2 terminale** deschise simultan:

**A. Terminal 1 (Backend):**
1. Deschideți proiectul în VS Code, navigați în folderul backend și activați mediul virtual:
```bash
cd backend
env\Scripts\activate
```
*(Ar trebui să apară in fața liniei de comandă (env), iar dacă doriți să opriți mediul virtual scrieți în treminal `deactivate`)*

2. Cu această comandă porniți serverul:
```bash
python manage.py runserver
```
*(Va rula la: http://127.0.0.1:8000/)*

**B. Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```
*(Va rula la: http://localhost:5173/ (sau alt port afișat))*

-----

### ✅ 4. Verificare funcționalitate backend si frontend

**A. Backend**

1. Deschideți in borwser: http://127.0.0.1:8000/admin
*(Aici ar trebui să vedeți un panou de logare pentru adminul pe care l-ați creat, iar după logare baza de date.)*
2. Swagger API (Documentație): http://127.0.0.1:8000/swagger

**B. Frontend**

Deschideti in borwser: http://localhost:5173/

-----

### 🆘 Probleme Comune

1.  **Eroare: "Script is disabled on this system"** (când activați env)
    👉 Deschideți PowerShell ca Administrator și scrieți: `Set-ExecutionPolicy RemoteSigned`, apoi tastați `A` și Enter. Încercați din nou în VS Code.

2.  **Eroare: "Pip/Python is not recognized"**
    👉 Nu ați bifat "Add to PATH" la instalare. Dezinstalați Python și instalați-l iar corect.

3.  **Pagina e albă (White Screen)**
    👉 Apăsați `F12` -\> Tab-ul **Application** -\> **Local Storage** (stânga) -\> Click dreapta pe `authTokens` -\> **Delete**. Dați Refresh.
