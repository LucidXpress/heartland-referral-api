import { google } from "googleapis"

const SHEET_ID = "12ZEj65_WUxf6Tk2D_5nEAZ-aGHu01oepeukLHnQbKJk"
const SHEET_TAB = "Sheet1"

export default async function handler(req, res) {
    // CORS headers — allow requests from the Framer site
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    try {
        const body = req.body

        // Auth with Google using env vars
        const auth = new google.auth.GoogleAuth({
            credentials: {
                type: "service_account",
                project_id: process.env.GOOGLE_PROJECT_ID,
                private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                client_id: process.env.GOOGLE_CLIENT_ID,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        })

        const sheets = google.sheets({ version: "v4", auth })

        // Map form fields to columns in order
        const row = [
            body.submittedAt || new Date().toISOString(),
            body.providerFirst || "",
            body.providerLast || "",
            body.providerTitle || "",
            body.providerOrg || "",
            body.providerEmail || "",
            body.providerPhone || "",
            body.childFirst || "",
            body.childLast || "",
            body.childDOB || "",
            body.childGender || "",
            body.asdDiagnosis || "",
            body.requestedService || "",
            body.guardianName || "",
            body.guardianRelationship || "",
            body.guardianPhone || "",
            body.guardianEmail || "",
            body.childAddress || "",
            body.childCity || "",
            body.childState || "",
            body.childZip || "",
            body.hearAboutUs || "",
            body.primaryInsurance || "",
            body.primaryMemberID || "",
            body.primaryHolderName || "",
            body.secondaryInsurance || "",
            body.secondaryMemberID || "",
            body.secondaryHolderName || "",
            body.additionalNotes || "",
        ]

        await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: `${SHEET_TAB}!A:AC`,
            valueInputOption: "RAW",
            requestBody: {
                values: [row],
            },
        })

        return res.status(200).json({ success: true })
    } catch (error) {
        console.error("Sheets error:", error)
        return res.status(500).json({ error: "Failed to submit referral" })
    }
}
