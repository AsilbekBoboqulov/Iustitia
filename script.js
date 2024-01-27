// import { OpenAI } from 'openai';

// const input = document.getElementById("input-text");
// const button_send = document.getElementById("send-button");
// const output_text = document.getElementById('output1');
// const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

// const out = async () => {
//   const res = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo-1106",
//     messages: [{ role: "user", content: input.value }],
//   });

//   res.choices.forEach((output) => output_text.innerHTML = output.message.content);
//   console.log(output.message.content);
// }


// button_send.addEventListener('click', out);
// console.log('Script loaded')


const sendChatBtn = document.querySelector("#send-button")
const chatInput = document.querySelector("#input-text")
const chatBox = document.querySelector(".chatbox")

const API_KEY = "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"

let userMessage;


const createChatLi = (message, className) => {
  const chatli = document.createElement("li");
  chatli.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p>${message}</p>` :  `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`
  chatli.innerHTML = chatContent;
  return chatli;
}

const generateResponse = (incomingChatLi) =>{
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {role: "user", content: "You are my personal lawyer, below I am giving the Constitution of the Republic of Uzbekistan. Later in my responses use this information to find the appropriate solution to my problems. However, do not refer to the constitution if I'm not giving you my problem.THE CONSTITUTION OF THE REPUBLIC OF UZBEKISTAN PREAMBLE We, united people of Uzbekistan: solemnly declaring our adherence to human rights and freedoms, national and universal values, principles of state sovereignty, affirming our commitment to the ideals of democracy, freedom and equality, social justice and solidarity, aware of our ultimate responsibility to the present and the future generations for building a humane democratic state, an open and just society in which the person, human life, freedom, honor and dignity are the highest value, relying on more than three millennia-long historical experience in the development of our statehood, as well as the scientific, cultural and spiritual heritage of the great ancestors who made an invaluable contribution to world civilization, being determined to multiply and protect for present and future generations the invaluable natural wealth of the country and to preserve a healthy environment, based on the generally accepted norms of the international law, striving to strengthen and develop friendly relations of Uzbekistan with the world community, primarily, with neighboring states on the basis of cooperation, mutual support, peace and harmony, aiming to ensure a decent life for citizens, interethnic and interfaith harmony, well-being and prosperity of the multinational native Uzbekistan, hereby adopt and proclaim the present Constitution of the Republic of Uzbekistan. PART ONE. FUNDAMENTAL PRINCIPLES Chapter 1. State Sovereignty Article 1. Uzbekistan is a sovereign democratic, legal, social and secular state with a republican form of government. Both names of the state — the Republic of Uzbekistan and Uzbekistan — shall be equivalent. "},
      {role: "user", content: "You are my personal lawyer, below I am giving the Constitution of the Republic of Uzbekistan. Later in my responses use this information to find the appropriate solution to my problems. However, do not refer to the constitution if I'm not giving you my problem.THE CONSTITUTION OF THE REPUBLIC OF UZBEKISTAN PREAMBLE We, united people of Uzbekistan: solemnly declaring our adherence to human rights and freedoms, national and universal values, principles of state sovereignty, affirming our commitment to the ideals of democracy, freedom and equality, social justice and solidarity, aware of our ultimate responsibility to the present and the future generations for building a humane democratic state, an open and just society in which the person, human life, freedom, honor and dignity are the highest value, relying on more than three millennia-long historical experience in the development of our statehood, as well as the scientific, cultural and spiritual heritage of the great ancestors who made an invaluable contribution to world civilization, being determined to multiply and protect for present and future generations the invaluable natural wealth of the country and to preserve a healthy environment, based on the generally accepted norms of the international law, striving to strengthen and develop friendly relations of Uzbekistan with the world community, primarily, with neighboring states on the basis of cooperation, mutual support, peace and harmony, aiming to ensure a decent life for citizens, interethnic and interfaith harmony, well-being and prosperity of the multinational native Uzbekistan, hereby adopt and proclaim the present Constitution of the Republic of Uzbekistan. PART ONE. FUNDAMENTAL PRINCIPLES Chapter 1. State Sovereignty Article 1. Uzbekistan is a sovereign democratic, legal, social and secular state with a republican form of government. Both names of the state — the Republic of Uzbekistan and Uzbekistan — shall be equivalent. "},
      {role: "user", content: userMessage}
    ]
    })
    }

    fetch(API_URL, requestOptions).then(res => res.json()) .then(data => {
      messageElement.textContent = data.choices[0].message.content;
      }).catch((error) => {
        messageElement.textContent = "Uzr, nimadir xato ketdi, qayta urinib ko'ring...";
      })
      
}



const handleChat = () =>{
  userMessage = chatInput.value.trim()
  if(!userMessage) return;

  chatBox.appendChild(createChatLi(userMessage, 'outgoing')) 

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming")
    chatBox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
  }, 600);
}

sendChatBtn.addEventListener("click", handleChat)