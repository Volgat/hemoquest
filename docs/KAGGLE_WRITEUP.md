# Kaggle MedGemma Impact Challenge: Project Writeup

## Basic Details

**Title:** Hemo Quest: Empowering SCD Patients with Dr. Hemo
**Subtitle:** A gamified educational platform using MedGemma to provide personalized, localized support for Sickle Cell Disease management.
**Submission Tracks:** Patient Communication & Support, Healthcare Education.

---

## One-Sentence Explanation
Hemo Quest is an interactive, gamified educational app that leverages the MedGemma model to provide compassionate, SCD-specific medical guidance through a friendly virtual assistant, Dr. Hemo.

---

## Project Description

### The Problem: SCD Management Gap
Sickle Cell Disease (SCD) is a complex, chronic condition requiring constant vigilance to prevent life-threatening "pain crises." Many patients, especially in underserved regions, lack immediate access to specialized hematologists and often struggle to interpret early symptoms or lifestyle triggers (dehydration, stress, temperature) that lead to hospitalization.

### The Solution: Dr. Hemo & Body Quest
We built **Hemo Quest**, a platform that transforms medical education into an exploration of the human body. 
- **Dr. Hemo:** A specialized AI assistant powered by the **google/medgemma-1.5-4b-it** model. Unlike generic LLMs, Dr. Hemo is tuned for SCD-specific context, providing evidence-based advice on crisis prevention, nutrition, and treatment (like hydroxyurea).
- **Gamified Learning:** Users explore a "Body Map," unlocking missions and gaining XP as they learn about how SCD affects specific organs (spleen, lungs, heart).
- **Friendly & Privacy-First:** By utilizing open-weight models like MedGemma, we ensure that the application can eventually be deployed in localized, low-connectivity or high-privacy clinical environments.

---

## Effective Use of HAI-DEF Models
We utilized **MedGemma** as the core intelligence of our health guide. Its medical specialized knowledge allows it to provide nuanced answers that generic models often miss—specifically around the physiological triggers of red blood cell sickling. We implemented a specialized system prompt that constrains the model to its domain, ensuring safe, compassionate, and highly accurate patient interactions.

---

## Problem Domain & Impact Potential
SCD affects millions globally, particularly in Africa and the African Diaspora. 
- **User Journey:** A patient feeling mild fatigue can ask Dr. Hemo for immediate advice. By identifying early signs of a crisis or reminding the user about hydration and temperature management, Dr. Hemo helps the user take proactive steps, potentially avoiding an ER visit.
- **Estimated Impact:** Reduced hospital readmissions through improved patient self-efficacy and health literacy.

---

## Product Feasibility
The application is built on a modern, high-performance stack:
- **Frontend/Backend:** Next.js with React 19 and Tailwind CSS for a premium, responsive UI.
- **AI Integration:** Google Genkit and Hugging Face router for seamless model execution.
- **Deployment:** Designed for containerized deployment, making it feasible for hospital-local intranets where data privacy is paramount.

---

## Media Gallery & Attachments
- **GitHub Repository:** [Volgat/hemo-bodyquest-scd](https://github.com/Volgat/hemo-bodyquest-scd.git)
- **Primary Model (MedGemma):** [google/medgemma-1.5-4b-it](https://huggingface.co/google/medgemma-1.5-4b-it)
- **Project Model Portal:** [amewebstudio/medgemma-sickle-cell](https://huggingface.co/amewebstudio/medgemma-sickle-cell)
- **Demo Video:** [Hemo Quest - Demo](https://youtu.be/Mkotijh8V6M)

---

**Disclaimer:** *Dr. Hemo is an educational tool and does not provide medical diagnoses. Always consult a healthcare professional for personal medical decisions.*
