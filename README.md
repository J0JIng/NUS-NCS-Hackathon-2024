# NUS-NCS-Hackathon-2024

![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2.svg?style=for-the-badge&logo=Google-Gemini&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

![image](https://github.com/J0JIng/NUS-NCS-Hackathon-2024/assets/111691710/449e8481-bd38-4b15-ae99-64860d910935)

**Team Name:** InnovateX. 
**Project Description:** Using LLMs to interpret, predict, and manage crowd control.

## Usage:

### Recommendation:
- Windows or Linux operating systems.

### Requirements:
- Docker installed on your local machine.

### Installation:

1. **Clone Repository:**
   - Clone the repository to your local machine:
     ```
     git clone https://github.com/J0JIng/NUS-NCS-Hackathon-2024
     ```

2. **Navigate to Project Directory:**
   - Open your terminal and navigate to the project directory:
     ```
     cd /mypath/NUS-NCS-Hackathon-2024
     ```

3. **Build Containers individually:**
   - Build the container for the backend:
     ```
     cd backend
     docker build .
     ```
   - Build the container for the front-end:
     ```
     cd ../frontend
     docker build .
     cd ..
     ```
     (note: npm install might take a while)

4. **Optional, Use Script for Building:**
   - If you prefer, you can use the provided script to start the containers. For Linux, you can use the script `start_script.sh`.

     ```
     ./start_script.sh
     ```

5. **Build Docker Containers collectively:**
   - Use the following command in the terminal to build the Docker containers:
     ```
     docker compose build
     ```

6. **Run Containers:**
   - After building the containers, run them using the following command:
     ```
     docker compose up
     ```

7. **Access Web App:**
   - Once the containers are running, open your favorite web browser.
   - Navigate to:
     ```
     localhost:19006/
     ```

### Note:
   - It might take a little a while to load the response from Gemini.
   
