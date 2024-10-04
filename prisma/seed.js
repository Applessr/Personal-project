const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma')


const categoryData = [
    {name: 'วันในสัปดาห์', image: 'https://i.imgur.com/Ez22XSu.png'},
    {name: 'เดือน', image: 'https://i.imgur.com/H28h8Wl.png'},
    {name: 'สัตว์น้ำ', image: 'https://i.imgur.com/ZMo9URB.png'},
    {name: 'แมลง และแมง', image: 'https://i.imgur.com/wddUIgn.png'},
    {name: 'สัตว์', image: 'https://i.imgur.com/Ez22XSu.png'},
    {name: 'สี', image: 'https://i.imgur.com/S4zowPk.png'},
    {name: 'รูปทรง', image: 'https://i.imgur.com/Kt2CV4M.png'},
    {name: 'ตัวเลข', image: 'https://i.imgur.com/iVyAAX5.png'},
    {name: 'การบอกเวลา', image: 'https://i.imgur.com/LhlWwOq.png'},
    {name: 'ผลไม้', image: 'https://i.imgur.com/PkldsGu.png'},
    {name: 'อาหาร', image: 'https://i.imgur.com/0CjxKaf.png'},
    {name: 'เครื่องดื่ม', image: 'https://i.imgur.com/OIMTaex.png'},
    {name: 'ประโยคในชีวิตประจำวัน', image: 'https://i.imgur.com/P1SwSfx.png'},
    {name: 'อารมณ์', image: 'https://i.imgur.com/jXP4qGo.png'},
    {name: 'ประโยคคำถาม', image: 'https://i.imgur.com/m9Z8ezd.png'},
    {name: 'ครอบครัว', image: 'https://i.imgur.com/SZkSbmO.png'},
    
];

const lessonData = [
    {lessonName: 'การทักทาย', image: 'https://i.imgur.com/tZO7rvD.png'},
    {lessonName: 'การเดินทาง', image: 'https://i.imgur.com/3XpDz2r.png'},
    {lessonName: 'การสั่งอาหาร', image: 'https://i.imgur.com/6L2VrWa.png'},
    {lessonName: 'งานอดิเรก', image: 'https://i.imgur.com/TtBrXKy.png'},
    {lessonName: 'การบอกอารมณ์', image: 'https://i.imgur.com/ErphyVY.png'},
    
];

console.log('DB seed...')

async function run() {
    await prisma.category.createMany({data: categoryData})
    await prisma.lesson.createMany({data: lessonData})
}

run();