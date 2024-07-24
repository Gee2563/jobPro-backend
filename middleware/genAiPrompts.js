const OpenAI = require("openai");
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function tailorCV({CVContent, companyWebsite, jobDescriptionUrl}) {
  const completion = await openai.chat.completions.create({
    messages: [
        {"role": "system", "content": "You are a career coach. Your client has asked you to tailor their CV. They will provide you with the company's website, the url with the job description and their CV. You will need to tailor their CV to the company and job application."},
        {"role": "user", "content": $`Here is my CV:  + ${CVContent}, the company's website is: ${companyWebsite}, the url with the job description is: ${jobDescriptionUrl}`},
      ],
    model: "gpt-4o-mini",
  });
  console.log(completion.choices);
   return completion.choices[0];
}

async function updateCV({CVContent, companyWebsite, jobDescriptionUrl, tailoredCVContent, additionalComments}) {
    const completion = await openai.chat.completions.create({
      messages: [
          {"role": "system", "content": "You are a career coach. You have previously tailored this client's CV. They have asked you to update it based on their additional comments."},
          {"role": "user", "content": `The previous version: ${tailoredCVContent}. Here is my CV: ${CVContent}. Here are the company's website: ${companyWebsite}. Here is the url with the job description: ${jobDescriptionUrl}. These are my additional comments: ${additionalComments}`},
        ],
      model: "gpt-4o-mini",
    });
    console.log(completion.choices);
  
    return completion.choices[0];
  }


module.exports = { tailorCV, updateCV };