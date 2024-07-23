import OpenAI from "openai";

const openai = new OpenAI();

async function tailorCV(CVContent) {
  const completion = await openai.chat.completions.create({
    messages: [
        {"role": "system", "content": "You are a career coach. Your client has asked you to tailor their CV."},
        {"role": "user", "content": "Here is my CV: " + CVContent},
      ],
    model: "gpt-4o-mini",
  });

  console.log(completion.choices[0]);
}

async function updateCV(CVContent) {
    const completion = await openai.chat.completions.create({
      messages: [
          {"role": "system", "content": "You are a career coach. You have previously tailored this client's CV. They have asked you to update it."},
          {"role": "user", "content": "Here is my CV: " + CVContent},
        ],
      model: "gpt-4o-mini",
    });
  
    console.log(completion.choices[0]);
  }


module.exports = { tailorCV, updateCV };