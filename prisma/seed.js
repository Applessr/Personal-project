const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma')


const categoryData = [
    { name: 'วันในสัปดาห์', nameES: 'Días de la semana', image: 'https://i.imgur.com/Ez22XSu.png' },
    { name: 'เดือน', nameES: 'Los Meses', image: 'https://i.imgur.com/H28h8Wl.png' },
    { name: 'สัตว์น้ำ', nameES: 'Animales acuáticos', image: 'https://i.imgur.com/ZMo9URB.png' },
    { name: 'แมลง และแมง', nameES: 'Insectos y arácnidos', image: 'https://i.imgur.com/wddUIgn.png' },
    { name: 'สัตว์', nameES: 'Animales', image: 'https://i.imgur.com/Ez22XSu.png' },
    { name: 'สี', nameES: 'Colores', image: 'https://i.imgur.com/S4zowPk.png' },
    { name: 'รูปทรง', nameES: 'Formas', image: 'https://i.imgur.com/Kt2CV4M.png' },
    { name: 'ตัวเลข', nameES: 'Números', image: 'https://i.imgur.com/iVyAAX5.png' },
    { name: 'การบอกเวลา', nameES: 'Cómo decir la hora', image: 'https://i.imgur.com/LhlWwOq.png' },
    { name: 'ผลไม้', nameES: 'Frutas', image: 'https://i.imgur.com/PkldsGu.png' },
    { name: 'อาหาร', nameES: 'Comidas', image: 'https://i.imgur.com/0CjxKaf.png' },
    { name: 'เครื่องดื่ม', nameES: 'Bebidas', image: 'https://i.imgur.com/OIMTaex.png' },
    { name: 'ประโยคในชีวิตประจำวัน', nameES: 'Frases diarias', image: 'https://i.imgur.com/P1SwSfx.png' },
    { name: 'อารมณ์', nameES: 'Emociones', image: 'https://i.imgur.com/jXP4qGo.png' },
    { name: 'ประโยคคำถาม', nameES: 'Frases con preguntas.', image: 'https://i.imgur.com/m9Z8ezd.png' },
    { name: 'ครอบครัว', nameES: 'Familia', image: 'https://i.imgur.com/SZkSbmO.png' },
];

const lessonData = [
    { lessonName: 'การทักทาย', image: 'https://i.imgur.com/tZO7rvD.png' },
    { lessonName: 'การเดินทาง', image: 'https://i.imgur.com/3XpDz2r.png' },
    { lessonName: 'การสั่งอาหาร', image: 'https://i.imgur.com/6L2VrWa.png' },
    { lessonName: 'งานอดิเรก', image: 'https://i.imgur.com/TtBrXKy.png' },
    { lessonName: 'การบอกอารมณ์', image: 'https://i.imgur.com/ErphyVY.png' },

];

const questionData = [
    { question: 'Hola แปลว่า', image: 'https://www.svgrepo.com/show/423920/hello-hi-greeting.svg', option1: 'สวัสดี', option2: 'ลาก่อน', correctOption: 'option1', lessonId: 1 },
    { question: 'Adios แปลว่า', image: 'https://www.svgrepo.com/show/387056/bye.svg', option1: 'สวัสดี', option2: 'ลาก่อน', correctOption: 'option2', lessonId: 1 },
    { question: 'mucho gusto แปลว่า', image: 'https://www.svgrepo.com/show/426403/shake-hand.svg', option1: 'คุณชื่ออะไร', option2: 'ยินดีที่รู้จัก', correctOption: 'option2', lessonId: 1 },
    { question: 'como te llamas แปลว่า', image: 'https://www.svgrepo.com/show/523106/user-speak.svg', option1: 'คุณชื่ออะไร', option2: 'ชื่อของฉันคือ', correctOption: 'option1', lessonId: 1 },
    { question: 'me llamo John แปลว่า', image: 'https://www.svgrepo.com/show/446525/avatar.svg', option1: 'คุณชื่อจอร์น', option2: 'ชื่อของฉันคือจอร์น', correctOption: 'option1', lessonId: 1 },
    { question: 'Buenos día แปลว่า', image: 'https://www.svgrepo.com/show/487854/sunrise.svg', option1: 'สวัสดีตอนเช้า', option2: 'สวัสดีตอนบ่าย', correctOption: 'option1', lessonId: 1 },
    { question: 'como estás แปลว่า', image: 'https://www.svgrepo.com/show/333110/hello.svg', option1: 'คุณเป็นยังไงบ้าง', option2: 'คุณทำอะไรอยู่', correctOption: 'option1', lessonId: 1 },
    { question: 'buenas tardes แปลว่า', image: 'https://www.svgrepo.com/show/428986/noon-daytime-line.svg', option1: 'สวัสดีตอนเช้า', option2: 'สวัสดีตอนบ่าย', correctOption: 'option2', lessonId: 1 },
    { question: 'ไว้เจอกันใหม่', image: 'https://www.svgrepo.com/show/529003/hand-shake.svg', option1: 'Hasta luego', option2: 'Hola', correctOption: 'option1', lessonId: 1 },
    { question: 'ฝันดี', image: 'https://www.svgrepo.com/show/424758/sleep-emoji-smiley.svg', option1: 'Buenas noches', option2: 'Buenos día', correctOption: 'option1', lessonId: 1 },
    { question: 'Que tengas un buen día แปลว่า', image: 'https://www.svgrepo.com/show/422002/day-forecast-hot.svg', option1: 'ขอให้โชคดี', option2: 'ขอให้มีวันที่ดี', correctOption: 'option2', lessonId: 1 },
    { question: 'ดูแลตัวเองด้วยนะ', image: 'https://www.svgrepo.com/show/227042/care-heart.svg', option1: 'Cuídate', option2: 'Buena suerte', correctOption: 'option1', lessonId: 1 },
    { question: 'Buenos días me llamo Mali แปลว่าสวัสดีตอนเช้า ฉันชื่อ มาลี', image: 'https://www.svgrepo.com/show/446520/avatar.svg', option1: 'ใช่', option2: 'ไม่', correctOption: 'option1', lessonId: 1 },

    { question: '¿Cuál es la capital de Tailandia?', image: 'https://www.svgrepo.com/show/159393/thailand.svg', option1: 'Chiang Mai', option2: 'Bangkok', correctOption: 'option2', lessonId: 2 },
    { question: 'el hotel แปลว่า', image: 'https://www.svgrepo.com/show/530618/hotel.svg', option1: 'โรงแรม', option2: 'โรงพยาบาล', correctOption: 'option1', lessonId: 2 },
    { question: 'El aeropuerto แปลว่า', image: 'https://www.svgrepo.com/show/500079/airport.svg', option1: 'สนามบิน', option2: 'สถานีรถไฟ', correctOption: 'option1', lessonId: 2 },
    { question: 'El pasaporte แปลว่า', image: 'https://www.svgrepo.com/show/394332/passport-alt.svg', option1: 'บัตรประจำตัวประชาชน', option2: 'หนังสือเดินทาง', correctOption: 'option2', lessonId: 2 },
    { question: 'เที่ยวให้สนุก ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/490731/flight-ticket.svg', option1: '¡Que te diviertas!', option2: '¡Buenas noches!', correctOption: 'option1', lessonId: 2 },
    { question: 'เดินทางปลอดภัย ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/401832/four-leaf-clover.svg', option1: '¡Buen viaje!', option2: '¡Buenos días!', correctOption: 'option1', lessonId: 2 },
    { question: 'ชายหาด ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/477001/beach.svg', option1: 'Montaña', option2: 'Playa', correctOption: 'option2', lessonId: 2 },
    { question: 'Montaña แปลว่า', image: 'https://www.svgrepo.com/show/476984/fall.svg', option1: 'แม่น้ำ', option2: 'ภูเขา', correctOption: 'option2', lessonId: 2 },
    { question: 'ฉันอยากไปทะเล ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/287573/sea-wave.svg', option1: 'Quiero ir a la playa', option2: 'Quiero ir a la montaña', correctOption: 'option1', lessonId: 2 },
    { question: 'El guía turístico แปลว่าอะไร?', image: 'https://www.svgrepo.com/show/429803/guide-human.svg', option1: 'คนขับรถ', option2: 'ไกด์นำเที่ยว', correctOption: 'option2', lessonId: 2 },
    { question: 'สถานีรถไฟอยู่ที่ไหน ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/500082/train.svg', option1: '¿Dónde está el aeropuerto?', option2: '¿Dónde está la estación de tren?', correctOption: 'option2', lessonId: 2 },
    { question: 'El restaurante แปลว่าอะไร?', image: 'https://www.svgrepo.com/show/244453/restaurant-store.svg', option1: 'ร้านอาหาร', option2: 'ร้านขายของชำ', correctOption: 'option1', lessonId: 2 },
    { question: 'คุณมีแผนที่ไหม ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/476890/map-marker.svg', option1: '¿Tienes una maleta?', option2: '¿Tienes un mapa?', correctOption: 'option2', lessonId: 2 },
    { question: 'ฉันต้องการความช่วยเหลือ ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/521364/face-with-spiral-eyes.svg', option1: 'Necesito ayuda', option2: 'Necesito dinero', correctOption: 'option1', lessonId: 2 },
    { question: 'Estoy perdido/a แปลว่า', image: 'https://www.svgrepo.com/show/521346/disappointed-face.svg', option1: 'ฉันหลงทาง', option2: 'ฉันหิวข้าว', correctOption: 'option1', lessonId: 2 },

    { question: 'ฉันต้องการเมนู ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/461943/menu-food-2.svg', option1: 'Quiero la cuenta', option2: 'Quiero el menú', correctOption: 'option2', lessonId: 3 },
    { question: 'agua แปลว่า', image: 'https://www.svgrepo.com/show/479388/water-drop-4.svg', option1: 'น้ำเปล่า', option2: 'น้ำส้ม', correctOption: 'option1', lessonId: 3 },
    { question: '"ฉันไม่กินเนื้อสัตว์" ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/397426/meat-on-bone.svg', option1: 'No como carne', option2: 'No como pescado', correctOption: 'option1', lessonId: 3 },
    { question: '"อร่อยมาก" ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/453029/yummy.svg', option1: 'Muy barato', option2: 'Muy delicioso', correctOption: 'option2', lessonId: 3 },
    { question: 'Verdura แปลว่า', image: 'https://www.svgrepo.com/show/265678/vegetables-salad.svg', option1: 'ผลไม้', option2: 'ผัก', correctOption: 'option2', lessonId: 3 },
    { question: 'ฉันแพ้ถั่ว ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/510088/nut.svg', option1: 'Soy alérgico/a a los frutos secos', option2: 'Me gustan los frutos secos', correctOption: 'option1', lessonId: 3 },
    { question: 'อาหารทะเล ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/244421/lobster.svg', option1: 'Carne', option2: 'Mariscos', correctOption: 'option2', lessonId: 3 },
    { question: 'Sopa แปลว่า', image: 'https://www.svgrepo.com/show/244414/pot-dinner.svg', option1: 'ซุป', option2: 'ซอส', correctOption: 'option1', lessonId: 3 },
    { question: 'ขอไม่มีผัก ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/295450/vegetables-diet.svg', option1: 'Sin verduras, por favor', option2: 'Con verduras, por favor', correctOption: 'option1', lessonId: 3 },
    { question: 'Pescado แปลว่า', image: 'https://www.svgrepo.com/show/482174/meat-cut.svg', option1: 'เนื้อไก่', option2: 'เนื้อปลา', correctOption: 'option2', lessonId: 3 },
    { question: 'ไม่ต้องใส่น้ำตาล แปลว่าอะไรในภาษาสเปน?', image: 'https://www.svgrepo.com/show/219958/sugar.svg', option1: 'Con azúcar, por favor', option2: 'Sin azúcar, por favor', correctOption: 'option2', lessonId: 3 },
    { question: '¡Buen provecho!', image: 'https://www.svgrepo.com/show/382349/emoticon-expression-face-smiley-yummy.svg', option1: 'ทานให้อร่อย', option2: 'ขอให้สนุก', correctOption: 'option1', lessonId: 3 },

    { question: 'hobby แปลว่า', image: 'https://www.svgrepo.com/show/487902/time-sand.svg', option1: 'งานอดิเรก', option2: 'งานประจำ', correctOption: 'option1', lessonId: 4 },
    { question: 'me gusta leer แปลว่า', image: 'https://www.svgrepo.com/show/333308/read.svg', option1: 'ฉันชอบนอน', option2: 'ฉันชอบอ่านหนังสือ', correctOption: 'option2', lessonId: 4 },
    { question: 'ฉันชอบทำอาหาร ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/413500/cook.svg', option1: 'me gusta cocinar', option2: 'no me gusta cocinar', correctOption: 'option1', lessonId: 4 },
    { question: 'pintar แปลว่า', image: 'https://www.svgrepo.com/show/308542/drawing-app-phone-smartphone.svg', option1: 'วาดรูป', option2: 'ถ่ายภาพ', correctOption: 'option1', lessonId: 4 },
    { question: 'การถ่ายภาพ ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/530373/camera-take-pictures.svg', option1: 'fotografía', option2: 'escribía', correctOption: 'option1', lessonId: 4 },
    { question: 'jardinería แปลว่า', image: 'https://www.svgrepo.com/show/280395/park.svg', option1: 'การซ่อมแซมบ้าน', option2: 'การทำสวน', correctOption: 'option2', lessonId: 4 },
    { question: 'escuchar música แปลว่า', image: 'https://www.svgrepo.com/show/527267/music-notes.svg', option1: 'ฟังเพลง', option2: 'ดูหนัง', correctOption: 'option1', lessonId: 4 },
    { question: 'ฉันชอบดูหนัง ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/485038/movie-film.svg', option1: 'me gusta escuchar música', option2: 'me gusta leer libros', correctOption: 'option2', lessonId: 4 },
    { question: 'me gusta bailar แปลว่า', image: 'https://www.svgrepo.com/show/412844/twirl.svg', option1: 'ฉันไม่ชอบเต้น', option2: 'ฉันชอบเต้น', correctOption: 'option2', lessonId: 4 },
    { question: 'ฝึกเต้น ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/312520/man-dancing.svg', option1: 'practicar yoga', option2: 'practicar bailar', correctOption: 'option2', lessonId: 4 },
    { question: 'cantar แปลว่า', image: 'https://www.svgrepo.com/show/490341/sing.svg', option1: 'ร้องเพลง', option2: 'ฟังเพลง', correctOption: 'option1', lessonId: 4 },
    { question: '¿Cuál es tu hobby? แปลว่า', image: 'https://www.svgrepo.com/show/290064/question.svg', option1: 'คุณชอบกินอะไร', option2: 'งานอดิเรกของคุณคืออะไร', correctOption: 'option2', lessonId: 4 },
    { question: '¿Te gusta escuchar música? แปลว่า', image: 'https://www.svgrepo.com/show/420073/iphone-listen-music.svg', option1: 'คุณชอบฟังเพลงไหม', option2: 'ฉันไม่ชอบฟังเพลง', correctOption: 'option1', lessonId: 4 },
    { question: 'เล่นวิดีโอเกม ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/398565/video-game.svg', option1: 'jugar videojuegos', option2: 'cocinar repostería', correctOption: 'option1', lessonId: 4 },

    { question: 'estoy feliz แปลว่า', image: 'https://www.svgrepo.com/show/521372/face-without-mouth.svg', option1: 'ฉันเศร้า', option2: 'ฉันมีความสุข', correctOption: 'option2', lessonId: 5 },
    { question: 'ฉันเศร้า ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/179087/sad-sad.svg', option1: 'estoy triste', option2: 'estoy feliz', correctOption: 'option1', lessonId: 5 },
    { question: 'estoy enojado/a แปลว่า', image: 'https://www.svgrepo.com/show/179086/angry-angry.svg', option1: 'ฉันโกรธ', option2: 'ฉันสงบ', correctOption: 'option1', lessonId: 5 },
    { question: 'คุณรู้สึกอย่างไร ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/317970/emoji-feel-crazy.svg', option1: '¿Cómo te llamas?', option2: '¿Cómo te sientes?', correctOption: 'option2', lessonId: 5 },
    { question: 'estoy tranquilo/a แปลว่า', image: 'https://www.svgrepo.com/show/523380/face-scan-circle.svg', option1: 'ฉันสงบ', option2: 'ฉันตื่นเต้น', correctOption: 'option1', lessonId: 5 },
    { question: 'ฉันเบื่อ ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/401477/face-with-rolling-eyes.svg', option1: 'estoy aburrido/a', option2: 'estoy feliz', correctOption: 'option1', lessonId: 5 },
    { question: '¿Estás feliz o triste? แปลว่า', image: 'https://www.svgrepo.com/show/382363/emoticon-emotion-expression-sad-face-smiley-2.svg', option1: 'คุณสบายดีไหม?', option2: 'คุณมีความสุขหรือเศร้า?', correctOption: 'option2', lessonId: 5 },
    { question: 'ฉันรู้สึกเหนื่อยมาก ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/433965/weary-face.svg', option1: 'estoy muy cansado', option2: 'estoy muy feliz', correctOption: 'option1', lessonId: 5 },
    { question: 'Me haces enojar แปลว่า', image: 'https://www.svgrepo.com/show/343412/angry-emoji-dislike-expression-emoticons.svg', option1: 'คุณทําให้ฉันรำคาญ', option2: 'คุณทําให้ฉันโกรธ', correctOption: 'option2', lessonId: 5 },
    { question: '¿Te sientes feliz hoy? แปลว่า', image: 'https://www.svgrepo.com/show/343407/awkward-emoji-emoticon-happy-simle.svg', option1: 'คุณรู้สึกมีความสุขวันนี้ไหม?', option2: 'คุณรู้สึกเบื่อวันนี้ไหม?', correctOption: 'option1', lessonId: 5 },
    { question: 'ฉันตื่นเต้น ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/343411/emoji-emoticon-happy-laugh-smile.svg', option1: 'estoy emocionado/a', option2: 'estoy triste', correctOption: 'option1', lessonId: 5 },
    { question: '¿Por qué te sientes preocupado/a? แปลว่า', image: 'https://www.svgrepo.com/show/343410/cool-emoticon-emotion-expression-face-smiley-sunglasses.svg', option1: 'ทำไมคุณถึงรู้สึกสนุก?', option2: 'ทำไมคุณถึงรู้สึกกังวล?', correctOption: 'option2', lessonId: 5 },
    { question: '¿Te sientes bien hoy? แปลว่า', image: 'https://www.svgrepo.com/show/454668/emoji-emoticon-happy-3.svg', option1: 'คุณรู้สึกดีวันนี้ไหม?', option2: 'คุณรู้สึกไม่ดีวันนี้ไหม?', correctOption: 'option1', lessonId: 5 },
    { question: 'ฉันรู้สึกหิว ในภาษาสเปนพูดว่าอย่างไร?', image: 'https://www.svgrepo.com/show/116721/hungry-man.svg', option1: 'estoy cansado/a', option2: 'tengo hambre', correctOption: 'option2', lessonId: 5 },
    { question: 'Estoy nervioso/a แปลว่า', image: 'https://www.svgrepo.com/show/365737/smiley-nervous-thin.svg', option1: 'ฉันกังวล', option2: 'ฉันเหนื่อย', correctOption: 'option1', lessonId: 5 },

];

const vocabularyData = [
    { wordTh: "วันอาทิตย์", wordEs: "El domingo", image: "https://images.unsplash.com/photo-1691097097167-8e5a976aae79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", categoryId: 1 },
    { wordTh: "วันจันทร์", wordEs: "El Lunes", image: "https://media.istockphoto.com/id/157315707/photo/monday.webp?a=1&b=1&s=612x612&w=0&k=20&c=6bQAPl9ZKr_gGPtaTykkgTgLp5nuc11c2AprB5CqsCs=", categoryId: 1 },
    { wordTh: "วันอังคาร", wordEs: "El Martes", image: "https://media.istockphoto.com/id/157315709/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%B2%E0%B8%A3.jpg?s=2048x2048&w=is&k=20&c=OnH_8fQK4J1HsMuLupot1uW0qA7URcVFBPyaGM8-ADA=", categoryId: 1 },
    { wordTh: "วันพุธ", wordEs: "El Miércoles", image: "https://media.istockphoto.com/id/157315491/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%9E%E0%B8%B8%E0%B8%98.jpg?s=2048x2048&w=is&k=20&c=nXV-LqmV23dLBm0Gzqic54JZE5l3aAX_t2SmxzoK6EE=", categoryId: 1 },
    { wordTh: "วันพฤหัสบดี", wordEs: "El Jueves", image: "https://media.istockphoto.com/id/157315717/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%9E%E0%B8%A4%E0%B8%AB%E0%B8%B1%E0%B8%AA%E0%B8%9A%E0%B8%94%E0%B8%B5.jpg?s=2048x2048&w=is&k=20&c=VNp-OhECjPJl0bpQ8SWj83rG3lO3fkG4LKoJyLp-5q8=", categoryId: 1 },
    { wordTh: "วันศุกร์", wordEs: "El Viernes", image: "https://media.istockphoto.com/id/157315715/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%A8%E0%B8%B8%E0%B8%81%E0%B8%A3%E0%B9%8C.jpg?s=612x612&w=0&k=20&c=CF6vcU8UdmLLBZywxCVIWT0qn8qPCfspN9kzDRNq5ZY=", categoryId: 1 },
    { wordTh: "วันเสาร์", wordEs: "El Sábado", image: "https://media.istockphoto.com/id/157315728/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%9B%E0%B8%B0%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%9B%E0%B8%B0%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%8A%E0%B8%B4%E0%B9%89%E0%B8%99%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B2%E0%B8%A9%E0%B8%84%E0%B8%B1%E0%B8%97%E0%B9%80%E0%B8%AD%E0%B8%B2%E0%B8%97%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A1%E0%B8%B5%E0%B8%84%E0%B9%8D%E0%B8%B2%E0%B8%A7%E0%B9%88%E0%B8%B2-saturday.jpg?s=612x612&w=0&k=20&c=yJeJpyFTVMEIctZi_vSEx77_f2yc05Xjt6pOhlGHL3w=", categoryId: 1 },

    { wordTh: "เดือน", wordEs: "El mes", image: "https://media.istockphoto.com/id/157335060/photo/the-months-and-days-of-the-year-on-calendar-paper.webp?a=1&b=1&s=612x612&w=0&k=20&c=SroP3MvR1G3iR6HLnfbNg86kVJeFWKcVoNh5znejDR8=", categoryId: 2 },
    { wordTh: "มกราคม", wordEs: "enero", image: "https://media.istockphoto.com/id/1757255528/photo/2024-january-calendar-on-blue-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=gbPuzxLrXVEdSB3xf9NVTnUpqI4Ws3Ve9WgNaFcpXo4=", categoryId: 2 },
    { wordTh: "กุมภาพันธ์", "wordEs": "febrero", "image": "https://media.istockphoto.com/id/1833421150/photo/desktop-calendar-year-2024-month-of-february.webp?a=1&b=1&s=612x612&w=0&k=20&c=uHWdnLr9RwiqMXoayPhBWgYZCztKCE9s6FDeBeZ9lzM=", categoryId: 2 },
    { wordTh: "มีนาคม", wordEs: "marzo", image: "https://images.unsplash.com/photo-1582647790126-0fd37ff34f98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFyY2glMjBtb250aHxlbnwwfHwwfHx8MA%3D%3D", categoryId: 2 },
    { wordTh: "เมษายน", wordEs: "abril", image: "https://media.istockphoto.com/id/1672349008/photo/white-sticky-note-with-2024-april-calendar-and-red-push-pin-on-yellow-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=72XDJlW_wZuln5CBgiRK2eHMh5CH8lcNdwiTeouQjKk=", categoryId: 2 },
    { wordTh: "พฤษภาคม", wordEs: "mayo", image: "https://images.unsplash.com/photo-1588006175084-89a8451561bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1heSUyMG1vbnRofGVufDB8fDB8fHww", categoryId: 2 },
    { wordTh: "มิถุนายน", wordEs: "junio", image: "https://images.unsplash.com/photo-1589726310756-0198bd0d0fb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8anVuZSUyMG1vbnRofGVufDB8fDB8fHww", categoryId: 2 },
    { wordTh: "กรกฎาคม", wordEs: "julio", image: "https://images.unsplash.com/photo-1593448844447-f5c63fe0d806?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8anVseSUyMG1vbnRofGVufDB8fDB8fHww", categoryId: 2 },
    { wordTh: "สิงหาคม", wordEs: "agosto", image: "https://media.istockphoto.com/id/171221587/photo/august-handwritten-in-the-sandy-shoreline.webp?a=1&b=1&s=612x612&w=0&k=20&c=6KLjq4Dz6tU5ncnBe_XyCVtiD-znQ9213qriK9TchgM=", categoryId: 2 },
    { wordTh: "กันยายน", wordEs: "septiembre", image: "https://media.istockphoto.com/id/1728573889/photo/white-sticky-note-with-2024-september-calendar-and-red-push-pin-on-blue-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=6Fc9Zz-taJHKwIwhNX-V5tnmzCkmKoJtY0X6Uk000CE=", categoryId: 2 },
    { wordTh: "ตุลาคม", wordEs: "octubre", image: "https://media.istockphoto.com/id/1672350648/photo/white-sticky-note-with-2024-october-calendar-and-red-push-pin-on-yellow-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=8wcdyvI9DuxlypAB3Rrtj864TBnhi8GjOhk1OUa4JYI=", categoryId: 2 },
    { wordTh: "พฤศจิกายน", wordEs: "noviembre", image: "https://images.unsplash.com/photo-1604440976974-c8e2c6ee69c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm92ZW1iZXJ8ZW58MHx8MHx8fDA%3D", categoryId: 2 },
    { wordTh: "ธันวาคม", wordEs: "diciembre", image: "https://images.unsplash.com/photo-1604440976150-c12352c982ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1heSUyMG1vbnRofGVufDB8fDB8fHww", categoryId: 2 },

    { wordTh: "ปลา", wordEs: "el pez", image: "https://images.unsplash.com/photo-1474835409173-5dc81aae3faa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGZpc2h8ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "ปลาหมึกยักษ์", wordEs: "el pulpo", image: "https://images.unsplash.com/photo-1628944681206-2ee8d63b0a6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9jdG9wdXN8ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "โลมา", wordEs: "el delfín, la delfín", image: "https://images.unsplash.com/photo-1599511772106-0792d441859a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGRvbHBoaW58ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "กระเบนราหู", wordEs: "la mantarraya", image: "https://images.unsplash.com/photo-1567784055803-b9d0a50d88e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D", categoryId: 3 },
    { wordTh: "ฉลาม", wordEs: "el tiburón", image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hhcmt8ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "ปลาหมึก", wordEs: "el calamar", image: "https://images.unsplash.com/photo-1656436584152-b03b2c5847ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHNxdWlkfGVufDB8fDB8fHww", categoryId: 3 },
    { wordTh: "แมงกะพรุน", wordEs: "la medusa", image: "https://images.unsplash.com/photo-1488202179256-36652066c482?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGplbGx5ZmlzaHxlbnwwfHwwfHx8MA%3D%3D", categoryId: 3 },
    { wordTh: "หอยนางรม", wordEs: "el ostión", image: "https://images.unsplash.com/photo-1717251752308-2ef72f07484e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG95c3RlcnxlbnwwfHwwfHx8MA%3D%3D", categoryId: 3 },
    { wordTh: "ปลาดาว", wordEs: "la estrella de mar", image: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RhcmZpc2h8ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "แมวน้ำ", wordEs: "la foca", image: "https://images.unsplash.com/photo-1682094246172-a7cf75b567b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHNlYWx8ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "สิงโตทะเล", wordEs: "el lobo marino", image: "https://images.unsplash.com/photo-1708541113183-1a65fddc3b2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHNlYSUyMGxpb258ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "หอยแมลงภู่", wordEs: "el mejillón", image: "https://images.unsplash.com/photo-1608135227059-95aacee01035?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fG11c3NlbHxlbnwwfHwwfHx8MA%3D%3D", categoryId: 3 },
    { wordTh: "ปะการัง", wordEs: "el coral", image: "https://images.unsplash.com/photo-1514907283155-ea5f4094c70c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxjb3JhbHxlbnwwfHwwfHx8MA%3D%3D", categoryId: 3 },
    { wordTh: "ปู", wordEs: "el cangrejo", image: "https://images.unsplash.com/photo-1467639833805-76aed7addc01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhYnxlbnwwfHwwfHx8MA%3D%3D", categoryId: 3 },
    { wordTh: "หอย", wordEs: "la almeja", image: "https://images.unsplash.com/photo-1633960413118-d22d9be39641?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsYW1zfGVufDB8fDB8fHww", categoryId: 3 },
    { wordTh: "ม้าน้ำ", wordEs: "el caballito de mar", image: "https://images.unsplash.com/photo-1501562146-c66d8ef18068?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VhaG9yc2V8ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "พะยูน", wordEs: "el manatí", image: "https://images.unsplash.com/photo-1561486462-89834a03cb72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbmF0ZWV8ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "กุ้ง", wordEs: "el camarón", image: "https://images.unsplash.com/photo-1582041643133-bdedd90fc639?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtYXJvb258ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "ปลาที่มีเกล็ด", wordEs: "el pez escamoso", image: "https://images.unsplash.com/photo-1527567469736-7b48bbd9c307?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVnJTIwZXNjYW1vc28lMjBpdGVyYXRpb258ZW58MHx8MHx8fDA%3D", categoryId: 3 },
    { wordTh: "ปลาไหล", wordEs: "la anguila", image: "https://images.unsplash.com/photo-1601574566318-86aa29356c3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVnJTIwYW5ndWlsYXxlbnwwfHwwfHx8MA%3D%3D", categoryId: 3 },
];

console.log('DB seed...')

async function run() {
    await prisma.category.createMany({ data: categoryData })
    await prisma.lesson.createMany({ data: lessonData })
    await prisma.questions.createMany({ data: questionData })
    await prisma.vocabulary.createMany({ data: vocabularyData })
}

run();