# Practical 12 – Middleware Pipeline Architecture
**Name:** Ritu Singh  
**Roll No:** GF202346594  
**Course:** BCA Full Stack – Final Year  

---

##  Aim
To build a **middleware stack** in Node.js using Express that performs:
- Request ID correlation  
- Response time measurement  
- Safe JSON parsing and body size control  
- Whitelisted CORS setup  
- Route-level data validation  
- Centralized error handling (RFC 7807 format)  
- Endpoint for order verification  

---

## Steps to Perform
1. Open **VS Code** and go to the folder **Practical 12**.  
2. Initialize your project:
   ```bash
   npm init -y
   ```
3. Install dependencies:
   ```bash
   npm install express cors uuid joi
   ```
4. Create a file named **server.js** in the same folder.  
5. Paste the middleware pipeline code shared for this practical.  
6. Run the server:
   ```bash
   node server.js
   ```
7. Test using PowerShell:
   ```bash
   curl -Uri http://localhost:3000/echo -Method POST -Body '{"name":"Ritu"}' -ContentType "application/json"
   ```

---

##  Output
- Response will contain:
  - A unique **X-Request-Id**
  - **X-Response-Time-ms** header  
  - Success message in JSON format  
- Errors (like missing fields) return standardized **problem+json** objects.

---

##  Conclusion
- Learned how middleware sequence affects Express app behavior.  
- Achieved secure and reliable request handling using validation and CORS.  
- Implemented professional-grade error handling as per **RFC 7807**.
