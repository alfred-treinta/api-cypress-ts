import { defineConfig } from "cypress";
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.FIREBASE_BASE_URL = process.env.FIREBASE_BASE_URL
      config.env.FIREBASE_TREINTA_APIKEY = process.env.FIREBASE_TREINTA_APIKEY
      config.env.FIREBASE_TESTER_USER = process.env.FIREBASE_TESTER_USER
      config.env.FIREBASE_TESTER_USER_PASSWORD = process.env.FIREBASE_TESTER_USER_PASSWORD
      config.env.X_API_KEY = process.env.X_API_KEY
      config.env.USER_ID = process.env.USER_ID
      config.env.STORE_ID = process.env.STORE_ID
      config.baseUrl = process.env.ORCH_URL  
      config.projectId = process.env.CYPRESS_PROJECT_ID
      return config
    }
  },
  videoUploadOnPasses: false
})
