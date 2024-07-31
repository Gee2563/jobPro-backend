const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function tailorCV(CVContent, companyWebsite, jobDescriptionUrl) {
  console.log('I received :', CVContent, companyWebsite, jobDescriptionUrl)
  const completion = await openai.chat.completions.create({
    
    messages: [
      {
        role: "system",
        content: "You are a career coach. Your client has asked you to tailor their CV. They will provide you with the company's website, the URL with the job description, and their CV. You will need to tailor their CV to the company and job application. Only return the updated Cv, no extra words."
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


async function generateResume(CVContent, companyWebsite, jobDescriptionUrl) {
  console.log('I received :', CVContent, companyWebsite, jobDescriptionUrl)
  const completion = await openai.chat.completions.create({
    
    messages: [
      {
        role: "system",
        content: "You are a career coach. Your client has asked you to generate a resume. They will provide you with the company's website, the URL with the job description, and their CV. You will need to generate a cover letter to the company and job application. Only return the resume, no extra words."
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

async function updateResume(CVContent, companyWebsite, jobDescriptionUrl, generatedResumeContent, additionalComments) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a career coach. You have previously tailored this client's resume. They have asked you to update it based on their additional comments. Only return the updated resume, no extra words."
      },
      {
        role: "user",
        content: `The previous version: ${generatedResumeContent}. Here is my CV: ${CVContent}. Here are the company's website: ${companyWebsite}. Here is the URL with the job description: ${jobDescriptionUrl}. These are my additional comments: ${additionalComments}`
      },
    ],
    model: "gpt-4o-mini",
  });
  console.log(completion.choices[0])
  return completion.choices[0].message.content;
}



module.exports = { tailorCV, updateCV, generateResume, updateResume };
