# Personal project Spanify
---
### env guide

PORT = 5000 

DATABASE = "mysql://u:pw@localhost:3306/b"

JWT_SECRET

EMAIL_USER

EMAIL_PASS

---
# ER DIAGRAM
![alt text](https://i.imgur.com/1F03VEA.png) 

# API ENDPOINT GUIDELINE

<br>

# /auth [x] http://localhost:5000/auth

| Name            | Endpoint         | Method | Request Body                                | Response Body                                              | Response Status Code | Remark                          |
| --------------- | ---------------- | ------ | ------------------------------------------- | ---------------------------------------------------------- | -------------------- | ------------------------------- |
| Register        | /register        | POST   | `{ username: "", email: "", password: "" }` | `{ username: "", email: "" }`                              | 201                  | สร้างบัญชีผู้ใช้งาน                   |
| Login           | /login           | POST   | `{ identifier: "", password: "" }`          | `{ id: "", username: "", email: "", role: "", token: "" }` | 200                  | เข้าสู่ระบบได้                      |
| Login           | /login /google          | POST   | `{ token }` | `{ id: "", username: "", email: "", role: "", token: "" }` | 200                  | เข้าสู่ระบบด้วย google ได้                   |
| Forget-password | /forget-password | POST   | `{ email: "" }`                             | `{ message: "Password reset email sent." }`                | 200                  | ส่ง Token ไปยังอีเมลเพื่อ รีเซ็ตรหัสผ่าน |
| Reset-password  | /reset-password  | POST   | `{ newPassword: "" }`                       | `{ message: "Password has been reset successfully"  }`     | 200                  | เปลี่ยนรหัสผ่านได้                   |
| Current-user    | /current-user    | POST   | `{ username: "",email: "",password: "" }`   | `{ member: {id: "", username: "", email:"", role:""}}`     | 200                  | เช็คว่าผู้ใช้งานคนไหนกำลังใช้งานอยู่      |

<hr>

<br>
<br>
<br>


# /user [X] http://localhost:5000/user

| Name                            | Endpoint                   | Method | Request Body                                                                             | Response Body                                                                                                                                                               | Response Status Code | Remark             |
| ------------------------------- | -------------------------- | ------ | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------ |
| User view profile               | /                          | GET    | -                                                                                        | `{ id: "", username: "", email: "", role: "", createdAt: "", updatedAt: "" }`                                                                                               | 200                  | Authenticate token |
| Users edit profile              | /                          | PATCH  | `{ username: "", email: "", currentPassword: "", newPassword: "", confirmPassword: "" }` | `user: {{ id: "", username: "", email: "", role: "", createdAt: "", updatedAt: "" }}`                                                                                       | 200                  | Authenticate token |  | 200 | Authenticate token |
| Delete account                  | /                          | DELETE | -                                                                                        | -                                                                                                                                                                           | 204                  | ลบข้อมูลทุกอย่างในบัญชี  |
| User get lesson                 | /lessons                   | GET    | -                                                                                        | `[{id: "", lessonName: "", image: "", createdAt: "", updatedAt: ""}]`                                                                                                       | 200                  | Authenticate token |
| User get lesson by id           | /lessons/:lessonsId        | GET    | -                                                                                        | `{id: "", lessonName: "", image: "", createdAt: "", updatedAt: "", questions: {id:"", question: "", image: "", option1: "", option2: "", correctOption: "", lessonId: ""}}` | 200                  | Authenticate token |
| User get vocab category         | /vocabulary                | GET    | -                                                                                        | `[{id:"", name:"", nameES:"", image:""}]`                                                                                                                                   | 200                  | Authenticate token |
| User get all vocabulary         | /allVocabulary             | GET    | -                                                                                        | `[{id:"", wordTh:"", wordEs:"", image:"",categoryId: "", createdAt: "", updatedAt: ""}]`                                                                                    | 200                  | -                  |
| User get vocab by category id   | /vocabulary/:vocabularyId  | GET    | -                                                                                        | `{id: "", name: "", nameES: "", image: "", vocabulary: [{id:"", wordTh: "", wordEs: "", image: "", categoryId: "", createdAt: "", updatedAt:""}]}`                          | 200                  | Authenticate token |
| User get search history         | /user-history              | GET    | -                                                                                        | `[{id:"", searchTerm: ""}]`                                                                                                                                                 | 200                  | Authenticate token |
| User create search              | /user-history              | POST   | `{searchTerm: ""}`                                                                       | `{id: "", searchTerm: "", createdAt: "", userId: ""}`                                                                                                                       | 204                  | Authenticate token |
| User delete search history      | /user-history/:historyId   | DELETE | -                                                                                        | -                                                                                                                                                                           | 204                  | ลบข้อมูลการค้นหา      |
| User get favorite vocabulary    | /user-favorite   | GET| -   | `[{di: "", createdAt: "", userId: "", vocabularyId: "", vocabulary:{ id: "", wordTh: "", wordEs: "", image: "",}}]`   | 200  | Authenticate token |
| User add favorite vocabulary   | /user-favorite/  | POST   | -      | `{ message: "Vocabulary added to favorites"}`   | 201    | Authenticate token |
| User delete favorite vocabulary | /user-favorite/:favoriteId | DELETE | -  | -       | 204   | ลบข้อมูลรายการโปรด  |

<hr>

<br>
<br>
<br>

# /user/user-progress/ [X] http://localhost:5000/user/user-progress


| Name      | Endpoint  | Method | Request Body    | Response Body          | Response Status Code | Remark             |
| ------------------------- | ------------------- | ------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------ |
| user get all progress   | /        | GET    | -      | `[{ id: "", score: "", attempts: "", completedAt: "", userId: "", lessonId: "", lesson: {id: "", lessonName: "",image: "", createdAt: "", updatedAt: "" }   }]` | 200                  | Authenticate token |
| All user score per lesson | /:lessonId          | GET    | -               | `[{id: "", score: "", attempts:"", completedAt: "", userId: "", lessonId:"", user: {username: ""}}]`  | 200   | Authenticate token |
| User score per lesson     | /personal/:lessonId | GET    | -    | `[{id: "", score: "", attempts: "", completedAt: "", userId: "", lessonId: ""}]`    | 200    | Authenticate token |
| User update score         | /:lessonId          | PATCH  | `{score:""}` | `{message: "message: "User progress updated successfully"  }`                                                                                                  | 200   | Authenticate token |
| User create   | /:lessonId     | POST   | `{score:""}` | `{message: "User progress created successfully"}`  | 201  | Authenticate token |

<hr>

# /admin [x] http://localhost:5000/admin


| Name   | Endpoint  | Method | Request Body    | Response Body   | Response Status Code | Remark    |
| ------------------------- | ------------------- | ------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------ |
| admin get user list  | /user-list| GET | -  | `{userList:[{ id: "", username: "", email: "", role: "", createdAt: ""}]}` | 200                  | Authenticate token Role: "ADMIN" |
| Admin update user role | /user-list/:userId | PATCH    | `{role: ""}`  | `{message: "update ${user.username} to role: ${user.role} success" }`   | 200  | Authenticate token Role: "ADMIN" |
| Admin get vocabulary by category | /vocabulary/:categoryId | GET    | - | `{vocabList: [{id: "", wordTh: "", wordEs: "", image: "",categoryId: "",createdAt: "", updatedAt: ""  }]}`   | 200   | Authenticate token Role: "ADMIN" |
| Admin create vocabulary | /vocabulary/:categoryId | POST  | `{wordTh: "",wordEs:"", image: "" }` | `{wordTh: "", wordEs: "", image: ""}` | 200  | Authenticate token Role: "ADMIN" |
| Admin update vocabulary | /vocabulary/:vocabularyId | PATCH  | `{wordTh: "",wordEs:"", image: "" }` | `{update:[{wordTh: "", wordEs: "", image: ""}]}` | 200  | Authenticate token Role: "ADMIN" |
| Admin delete vocabulary   | /vocabulary/:vocabularyId  | DELETE | - | - | 204   | Authenticate token Role: "ADMIN" |


<hr>

# /subscription [x] http://localhost:5000/subscription


| Name   | Endpoint  | Method | Request Body    | Response Body   | Response Status Code | Remark    |
| ------------------------- | ------------------- | ------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------ |
| check subscript  | /check| GET | -  | `{active:"", subscription: {id:"", startDate: "", endDate: "", status: "", plan: "", createdAt: "", updatedAt: "", userId: "", user:{id: "", username: "", email: "", role: "",}}, message: ""}` | 200 | Authenticate token |
| subscription by credit-card | /charge-credit | POST    | `{ plan: "", omiseToken: "" }`  | `{message: "",subscription: "", charge: "" }`   | 201  | Authenticate token |
| subscription by internet-banking | /charge-bank | POST  | `{ plan: "", omiseToken: "" }`  | `{message: "",subscription: "", charge: "" }`   | 201  | Authenticate token |