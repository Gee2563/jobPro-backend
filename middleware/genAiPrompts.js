const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function tailorCV(CVContent, companyWebsite, jobDescriptionUrl) {
  console.log('I received :', CVContent, companyWebsite, jobDescriptionUrl)
  const completion = await openai.chat.completions.create({
    
    messages: [
      {
        role: "system",
        content: "You are a career coach. Your client has asked you to tailor their CV. They will provide you with the company's website, the URL with the job description, and their CV. You will need to tailor their CV to the company and job application. If you are unable to directly access the URLs provided, please do web searches to find the job application, the company and then tailor their CV accordingly. The overall objective is to make the CV pass the company's application tracking software. Only return the updated Cv, no extra words."
      },
      {
        role: "user",
        content: `Here is my CV: ${CVContent}, the company's website is: ${companyWebsite}, the URL with the job description is: ${jobDescriptionUrl}`
      },
    ],
    model: "gpt-4o-mini",
  });
  console.log(completion.choices[0])

  return completion.choices[0].message.content;
}

async function updateCV(CVContent, companyWebsite, jobDescriptionUrl, tailoredCVContent, additionalComments) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a career coach. You have previously tailored this client's CV. They have asked you to update it based on their additional comments. Only return the updated Cv, no extra words."
      },
      {
        role: "user",
        content: `The previous version: ${tailoredCVContent}. Here is my CV: ${CVContent}. Here are the company's website: ${companyWebsite}. Here is the URL with the job description: ${jobDescriptionUrl}. These are my additional comments: ${additionalComments}`
      },
    ],
    model: "gpt-4o-mini",
  });
  console.log(completion.choices[0])
  return completion.choices[0].message.content;
}


async function generateLetter(CVContent, companyWebsite, jobDescriptionUrl) {
  console.log('I received :', CVContent, companyWebsite, jobDescriptionUrl)
  const completion = await openai.chat.completions.create({
    
    messages: [
      {
        role: "system",
        content: "You are a career coach. Your client has asked you to write them a cover leter for a job they really want. They will provide you with the company's website, the URL with the job description, and their CV. If you are unable to directly access the URLs provided, please do web searches to find the job application, the company and then generate their cover letter accordingly. Only return the letter, no extra words."
      },
      {
        role: "user",
        content: `Here is my CV: ${CVContent}, the company's website is: ${companyWebsite}, the URL with the job description is: ${jobDescriptionUrl}`
      },
    ],
    model: "gpt-4o-mini",
  });
  console.log(completion.choices[0])

  return completion.choices[0].message.content;
}

async function updateLetter(CVContent, companyWebsite, jobDescriptionUrl, genLetterContent, additionalComments) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a career coach. You have previously written a cover letter for this client. They have asked you to update it based on their additional comments. Only return the updated cover letter, no extra words."
      },
      {
        role: "user",
        content: `The previous version: ${genLetterContent}. Here is my CV: ${CVContent}. Here are the company's website: ${companyWebsite}. Here is the URL with the job description: ${jobDescriptionUrl}. These are my additional comments: ${additionalComments}`
      },
    ],
    model: "gpt-4o-mini",
  });
  console.log(completion.choices[0])
  return completion.choices[0].message.content;
}

module.exports = { tailorCV, updateCV, generateLetter, updateLetter };
