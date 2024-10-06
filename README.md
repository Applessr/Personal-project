# Personal project Spanify
---
### env guide

PORT = 5000 

DATABASE = "mysql://u:pw@localhost:3306/cc18_fakebook"

JWT_SECRET

---
### Service

# API 

<br>

# /auth [x]

| Name | Endpoint | Method | Request Body | Response Body | Response Status Code | Remark |
|------|----------|--------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|------------------|
| Register | /register  | POST   | `{ username: "", email: "", password: "" }`                                                                           | `{ username: "", email: "" }`                                                                                  | 201                  | สร้างบัญชีผู้ใช้งาน  |
| Login    | /login     | POST   | `{ identifier: "", password: "" }`                                                                                                                                       | `{ id: "", username: "", email: "", role: "", token: "" }`| 200                  | เข้าสู่ระบบได้       |

<hr>

<br>
<br>
<br>


# /user []

| Name            | Endpoint        | Method | Request Body                                                                 | Response Body                                                                                                      | Response Status Code | Remark               |
|-----------------|-----------------|--------|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|----------------------|----------------------|
| User view profile | /               | GET   | -  | `{ id: "", username: "", email: "", role: "", createdAt: "", updatedAt: "" }`                            | 200                  | Authenticate token   |
| Users edit profile| /               | PATCH   | `{ username: "", email: "", currentPassword: "", newPassword: "", confirmPassword: "" }`| `user: {{ id: "", username: "", email: "", role: "", createdAt: "", updatedAt: "" }}`                        | 200                  | Authenticate token   |               | 200                  | Authenticate token   |
| Delete account | / | DELETE | -  | -  | 204  | ลบข้อมูลทุกอย่างในบัญชี |
| User get lesson  | /lessons | GET | -  | -  | 200  | Authenticate token |
| User get lesson by id | /lessons/:lessonsId | GET | -  | -  | 200  | Authenticate token |
| User get vocab category  | /vocabulary | GET | -  | -  | 200  | Authenticate token |
| User get vocab by category id  | /vocabulary/:vocabularyId | GET | -  | -  | 200  | Authenticate token |
| User get search history  | /user-history | GET | -  | -  | 200  | Authenticate token |
| User create search  | /user-history | POST | `{searchTerm: ""}`  | `createSearch: {id: "", searchTerm: "", createdAt: "", userId: ""}`  | 204  | Authenticate token |
| User delete search history  | /user-history/:historyId | DELETE | -  | -  | 204  | ลบข้อมูลการค้นหา |
| User get favorite vocabulary | /user-favorite | GET | -  | -  | 200  | Authenticate token |
| User add favorite vocabulary  | /user-favorite/ | POST | -  | -  | 201  | Authenticate token |
| User delete favorite vocabulary | /user-favorite/:favoriteId | DELETE | -  | -  | 204  | ลบข้อมูลการค้นหา |


<hr>

<br>
<br>
<br>

# /user/user-progress/

| Name                          | Endpoint        | Method | Request Body                                                                                                 | Response Body                                                                                                          | Response Status Code | Remark                          |
|-------------------------------|-----------------|--------|--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|----------------------|---------------------------------|
| Create transaction             | /               | POST   | `{ senderId?, receiverId?, transactionType, amount, payeeName?, transactionDate?, description? }`             | `{ id, senderId?, receiverId?, transactionType, amount, payeeName?, transactionDate?, description? }`                  | 201                  | Authenticate token              |
| Get all transactions by account id | /               | GET    | -                                                                                                            | `[ {id, senderId?, receiverId?, transactionType, amount, payeeName?, transactionDate?, description? } ]`               | 200                  | ให้ดึงข้อมูล transaction ทั้งหมดตามแต่ละ account |
| Edit transaction               | /:transactionId | PUT    | `{ senderId, receiverId, amount, description, payerName, transactionType, transactionDate }`                 | `{ id, senderId?, receiverId?, transactionType, amount, payeeName? }`                                                  | 200                  | ให้อัปเดตตัวใดตัวหนึ่งหรือทั้งหมดก็ได้          |
| Delete transaction             | /:transactionId | DELETE | -                                                                                                            | -                                                                                                                     | 204                  |                                 |
<hr>

# /admin [x]

| Name | Endpoint | Method | Request Body | Response Body | Response Status Code | Remark  |
|------|----------|--------|--------------|---------------|----------------------|---------|
| admin get user list | /    | GET   | - | `userList: [{id: "",}]`                  | 201                  | Authenticate token              |
| Get all transactions by account id | /               | GET    | -                                                                                                            | `[ {id, senderId?, receiverId?, transactionType, amount, payeeName?, transactionDate?, description? } ]`               | 200                  | ให้ดึงข้อมูล transaction ทั้งหมดตามแต่ละ account |
| Edit transaction               | /:transactionId | PUT    | `{ senderId, receiverId, amount, description, payerName, transactionType, transactionDate }`                 | `{ id, senderId?, receiverId?, transactionType, amount, payeeName? }`                                                  | 200                  | ให้อัปเดตตัวใดตัวหนึ่งหรือทั้งหมดก็ได้          |
| Delete transaction             | /:transactionId | DELETE | -                                                                                                            | -                                                                                                                     | 204                  |                                 |
<hr>