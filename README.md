Back End server for jobPro project.

## Required environment variables

- `MONGO_URI`: MongoDB Atlas connection string. Use the exact URI from Atlas (`mongodb+srv://...`).
- `JWT_SECRET`: Secret used to sign auth tokens.
- `FRONTEND_ORIGINS`: Comma-separated allowed origins for CORS.
  - Example: `https://job-pro-khaki.vercel.app,http://localhost:5173`

Implementation stages.

1) CRUD user credentials - done
2) Create routes for Users - done
3) Create auth middleware to validate user on front end - done
4) CRUD job application object - done 
5) CRD either PDF/word.docx or a snapshot (like text content) for CV - todo
6) If it's more efficient, once 'logo API' finds an image of employer, store URL -todo
7) (once API with GPT has been implemented, store text content in application object) -todo
