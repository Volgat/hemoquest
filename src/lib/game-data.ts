import { BrainIcon } from "@/components/icons/BrainIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { LungsIcon } from "@/components/icons/LungsIcon";
import { StomachIcon } from "@/components/icons/StomachIcon";
import { Droplets, Dna, Shield, Stethoscope, Bone, LifeBuoy } from "lucide-react";

export interface QuizQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  xp: number;
  quiz: QuizQuestion[];
}

export interface HealthTip {
  title: string;
  tip: string;
  icon: string;
  urgency: 'info' | 'important' | 'critical';
}

export interface System {
  slug: string;
  name: string;
  Icon: React.ElementType;
  levelRequirement: number;
  position: { top: string; left: string };
  animation?: string;
  description: string;
  missions: Mission[];
  healthTips?: HealthTip[];
}

export const systems: System[] = [
  {
    slug: "blood-basics",
    name: "Blood Basics",
    Icon: Droplets,
    levelRequirement: 1,
    position: { top: "35%", left: "45%" },
    animation: "animation-pulse-subtle",
    description: "Understand what red blood cells are and how sickle cell disease affects them.",
    healthTips: [
      {
        title: "Hydrate Every Hour",
        tip: "Drink at least 8–10 glasses of water per day. Dehydration causes red blood cells to sickle more easily.",
        icon: "💧",
        urgency: "critical",
      },
      {
        title: "Know Your Hemoglobin Type",
        tip: "Understanding your hemoglobin type (HbSS, HbSC, etc.) helps doctors personalise your treatment.",
        icon: "🧬",
        urgency: "important",
      },
      {
        title: "Regular Blood Check-ups",
        tip: "Get blood tests at least twice a year to monitor your hemoglobin levels and detect anaemia early.",
        icon: "🩸",
        urgency: "important",
      },
    ],
    missions: [
      {
        id: 1,
        title: "The Sickle-Shaped Cell",
        description: "Discover why red blood cells take on a sickle (or crescent) shape.",
        xp: 25,
        quiz: [
          {
            questionText: "What is the normal shape of a red blood cell?",
            options: ["Square", "Disc-shaped (biconcave)", "Sickle-shaped", "Oval"],
            correctAnswerIndex: 1,
            explanation: "Normal red blood cells are disc-shaped (biconcave), which gives them flexibility to pass through tiny blood vessels."
          },
          {
            questionText: "The sickle shape of red blood cells is due to an abnormality in which protein?",
            options: ["Albumin", "Collagen", "Hemoglobin", "Keratin"],
            correctAnswerIndex: 2,
            explanation: "Abnormal hemoglobin (HbS) forms rigid polymers when oxygen levels drop, causing cells to take on a sickle shape."
          },
          {
            questionText: "How long does a sickle cell live compared to a normal red blood cell?",
            options: ["The same, ~120 days", "Much longer, ~180 days", "Much shorter, 10–20 days", "Exactly 60 days"],
            correctAnswerIndex: 2,
            explanation: "Sickle cells are fragile and are destroyed quickly, living only 10–20 days vs 120 days for healthy red blood cells, leading to chronic anaemia."
          },
        ]
      },
      {
        id: 2,
        title: "Oxygen's Journey",
        description: "Learn how sickled cells affect oxygen transport throughout the body.",
        xp: 30,
        quiz: [
          {
            questionText: "What is the main job of red blood cells?",
            options: ["Fighting infection", "Carrying oxygen", "Digesting food", "Storing fat"],
            correctAnswerIndex: 1,
            explanation: "Red blood cells carry oxygen from the lungs to all organs and tissues via hemoglobin."
          },
          {
            questionText: "When oxygen levels drop, what happens to HbS (sickle hemoglobin)?",
            options: ["It dissolves in the blood", "It forms rigid chains called polymers", "It turns into white blood cells", "It produces more oxygen"],
            correctAnswerIndex: 1,
            explanation: "HbS polymerises (forms rigid chains) when deoxygenated, distorting the cell into its sickle shape."
          },
          {
            questionText: "What is anaemia?",
            options: ["Too many red blood cells", "A type of viral infection", "A shortage of healthy red blood cells", "High blood pressure"],
            correctAnswerIndex: 2,
            explanation: "In SCD, the rapid destruction of sickle cells leads to a persistent shortage of red blood cells, causing anaemia with symptoms like fatigue and paleness."
          },
        ]
      },
      {
        id: 3,
        title: "Hemoglobin Types Decoded",
        description: "Understand the different hemoglobin variants and their significance.",
        xp: 40,
        quiz: [
          {
            questionText: "What does 'HbSS' mean?",
            options: ["Having one normal gene and one sickle gene", "Having two sickle cell genes — classic sickle cell disease", "Having no sickle genes", "A special super-haemoglobin"],
            correctAnswerIndex: 1,
            explanation: "HbSS means a person inherited the sickle-cell mutation from both parents — this is the most common and often most severe form of sickle cell disease."
          },
          {
            questionText: "What is HbAS?",
            options: ["Sickle cell disease", "Sickle cell trait (carrier)", "A rare blood cancer", "Normal hemoglobin"],
            correctAnswerIndex: 1,
            explanation: "HbAS is sickle cell trait — the person has one sickle gene and one normal gene. They are usually healthy but can pass the gene to their children."
          },
          {
            questionText: "Which hemoglobin type is considered 'normal'?",
            options: ["HbSS", "HbAS", "HbAA", "HbSC"],
            correctAnswerIndex: 2,
            explanation: "HbAA means the person has two normal hemoglobin genes and does not have sickle cell disease or trait."
          },
        ]
      },
      {
        id: 4,
        title: "Red Cells Under the Microscope",
        description: "Explore how scientists study sickle cells and what they see.",
        xp: 35,
        quiz: [
          {
            questionText: "Which key test confirms a diagnosis of sickle cell disease?",
            options: ["An X-ray", "Hemoglobin electrophoresis", "A urine test", "A blood pressure check"],
            correctAnswerIndex: 1,
            explanation: "Hemoglobin electrophoresis separates different types of hemoglobin and identifies the presence of HbS."
          },
          {
            questionText: "Newborn screening for sickle cell disease is important because?",
            options: ["It can prevent the disease entirely", "Early treatment prevents serious complications in infancy", "It cures the disease immediately", "It changes the genes"],
            correctAnswerIndex: 1,
            explanation: "Early diagnosis allows preventive antibiotics and vaccinations to be started, greatly reducing the risk of dangerous infections in young children."
          },
        ]
      },
    ],
  },
  {
    slug: "pain-crisis",
    name: "Pain Crisis (VOC)",
    Icon: Shield,
    levelRequirement: 2,
    position: { top: "55%", left: "65%" },
    animation: "animation-jiggle",
    description: "Learn what causes Vaso-Occlusive Crises (VOCs) and how to manage them.",
    healthTips: [
      {
        title: "Avoid Cold & Wind",
        tip: "Cold temperatures cause blood vessels to narrow, increasing the risk of a painful crisis. Dress in warm layers outdoors.",
        icon: "🧥",
        urgency: "critical",
      },
      {
        title: "Warm Compresses for Pain",
        tip: "Apply a warm (not hot) compress or heating pad to painful areas. Avoid cold packs which can worsen sickling.",
        icon: "🌡️",
        urgency: "important",
      },
      {
        title: "Know Your Warning Signs",
        tip: "Learn your personal early symptoms of a crisis (e.g., mild pain, fatigue) so you can intervene early with hydration and rest.",
        icon: "⚠️",
        urgency: "critical",
      },
      {
        title: "Track Your Crises",
        tip: "Keep a diary of when crises occur, their triggers, and their severity. This helps your doctor adjust your treatment.",
        icon: "📓",
        urgency: "info",
      },
    ],
    missions: [
      {
        id: 1,
        title: "Traffic Jam in the Vessels",
        description: "Visualize how sickled cells block small blood vessels and cause pain.",
        xp: 35,
        quiz: [
          {
            questionText: "What does 'Vaso-Occlusive Crisis' (VOC) mean?",
            options: ["A problem with hearing", "Blockage of blood vessels by sickle cells", "A type of headache", "A lung infection"],
            correctAnswerIndex: 1,
            explanation: "VOC occurs when sickle-shaped cells clump together and block small blood vessels, cutting off oxygen to tissues and causing severe pain."
          },
          {
            questionText: "Which of the following is a common trigger for a vaso-occlusive crisis?",
            options: ["Drinking water", "Staying warm", "Dehydration", "Getting enough sleep"],
            correctAnswerIndex: 2,
            explanation: "Dehydration thickens the blood, making it easier for sickle cells to clump and block vessels."
          },
          {
            questionText: "Cold temperatures can trigger a pain crisis because they...",
            options: ["Speed up circulation", "Make blood vessels shrink (vasoconstriction)", "Increase hydration", "Produce more hemoglobin"],
            correctAnswerIndex: 1,
            explanation: "Cold causes blood vessels to contract, slowing blood flow and making it easier for sickle cells to block vessels."
          },
        ]
      },
      {
        id: 2,
        title: "Pain Management Toolkit",
        description: "Discover evidence-based strategies for managing pain during a crisis.",
        xp: 40,
        quiz: [
          {
            questionText: "Which of these is recommended during a pain crisis?",
            options: ["Drinking plenty of water", "Applying an ice/cold pack", "Strenuous exercise", "Staying in hot sunlight"],
            correctAnswerIndex: 0,
            explanation: "Hydration is crucial — water helps dilute the blood and prevents further sickling. Warm (not cold) compresses can help with pain locally."
          },
          {
            questionText: "If home pain management (hydration, warmth, pain relievers) isn't working after several hours, you should?",
            options: ["Wait another 2 days", "Go to the hospital emergency department", "Drink coffee", "Do intense stretching"],
            correctAnswerIndex: 1,
            explanation: "Severe or prolonged crises require IV fluids, stronger pain medication and monitoring in a hospital setting."
          },
          {
            questionText: "Which over-the-counter medicine should people with SCD AVOID for pain?",
            options: ["Paracetamol (acetaminophen)", "Ibuprofen (NSAIDs — used with caution)", "Aspirin in high doses", "All of the above for certain groups"],
            correctAnswerIndex: 3,
            explanation: "Always consult your doctor before taking pain medication. NSAIDs and aspirin can affect kidney function, which is already at risk in SCD."
          },
        ]
      },
      {
        id: 3,
        title: "Triggers & Prevention",
        description: "Identify what triggers crises and how to minimize them in daily life.",
        xp: 45,
        quiz: [
          {
            questionText: "Which of these is NOT a common trigger for a pain crisis?",
            options: ["Stress", "Physical overexertion", "Listening to music", "High altitude"],
            correctAnswerIndex: 2,
            explanation: "Stress, overexertion, infection, cold, and high altitude (low oxygen) are all common triggers. Listening to music is generally beneficial for relaxation."
          },
          {
            questionText: "Why can air travel trigger a pain crisis?",
            options: ["Cabin noise is stressful", "Cabin pressure reduces oxygen levels", "Seatbelts restrict blood flow", "Food on planes is unhealthy"],
            correctAnswerIndex: 1,
            explanation: "Airplane cabins are pressurised to lower oxygen levels than at sea level, which can cause red blood cells to sickle. Staying hydrated during flights is essential."
          },
          {
            questionText: "How does a fever relate to a pain crisis?",
            options: ["Fever is never related to SCD pain", "Fever often indicates an infection, which is a major crisis trigger", "Fever cures sickle cells", "Fever only happens in children with SCD"],
            correctAnswerIndex: 1,
            explanation: "People with SCD are prone to infections due to a weakened spleen. Any fever above 38°C (100.4°F) should be treated as a medical emergency."
          },
        ]
      },
      {
        id: 4,
        title: "Emergency Signs — When to Go to Hospital",
        description: "Recognise the warning signs that require immediate medical attention.",
        xp: 55,
        quiz: [
          {
            questionText: "A fever above 38°C (100.4°F) in a person with SCD is?",
            options: ["Normal and expected, no action needed", "A medical emergency requiring immediate hospital care", "A sign they need more food", "Treated with cold water only"],
            correctAnswerIndex: 1,
            explanation: "Due to impaired spleen function, people with SCD are at high risk of life-threatening bacterial infections. A fever is a red flag that must be evaluated urgently."
          },
          {
            questionText: "Sudden severe headache, difficulty speaking, or facial drooping in SCD could indicate?",
            options: ["A bad headache to sleep off", "A stroke — call emergency services immediately", "The effect of a new medication", "Eye strain"],
            correctAnswerIndex: 1,
            explanation: "SCD significantly increases stroke risk. These symptoms require IMMEDIATE emergency care (call 112 or 999). Every minute counts."
          },
          {
            questionText: "Shortness of breath, chest pain and fever together in SCD may indicate?",
            options: ["A common cold", "Acute Chest Syndrome — a life-threatening emergency", "Mild dehydration", "Hunger"],
            correctAnswerIndex: 1,
            explanation: "Acute Chest Syndrome is a dangerous lung complication of SCD. It is a medical emergency requiring hospitalisation and immediate treatment."
          },
        ]
      },
    ],
  },
  {
    slug: "genetics",
    name: "Genetics & Inheritance",
    Icon: Dna,
    levelRequirement: 3,
    position: { top: "15%", left: "55%" },
    animation: "animation-sparkle",
    description: "Understand how sickle cell disease is passed down through genes.",
    healthTips: [
      {
        title: "Get Genetic Counselling",
        tip: "If you or your partner has SCD or sickle cell trait, genetic counselling can explain the chances of passing it to your children.",
        icon: "🧬",
        urgency: "important",
      },
      {
        title: "Prenatal Testing is Available",
        tip: "Tests like amniocentesis or chorionic villus sampling can detect sickle cell disease in an unborn baby. Speak to your doctor.",
        icon: "👶",
        urgency: "info",
      },
      {
        title: "Know Your Family History",
        tip: "Find out if SCD or sickle cell trait runs in your family — this information is important for your health and family planning.",
        icon: "👨‍👩‍👧",
        urgency: "info",
      },
    ],
    missions: [
      {
        id: 1,
        title: "The Hemoglobin Gene (HBB)",
        description: "Explore the HBB gene and the specific mutation responsible for sickle cell disease.",
        xp: 50,
        quiz: [
          {
            questionText: "Sickle cell disease is a...",
            options: ["Contagious disease", "Genetic (hereditary) condition", "Viral infection", "Bacterial infection"],
            correctAnswerIndex: 1,
            explanation: "SCD is passed down through families in genes — you cannot 'catch' it from someone."
          },
          {
            questionText: "To have sickle cell disease (HbSS), a child must inherit the sickle cell gene from...",
            options: ["Only one parent", "Both parents", "The mother only", "The father only"],
            correctAnswerIndex: 1,
            explanation: "SCD follows autosomal recessive inheritance — the child must receive one sickle gene from each parent."
          },
          {
            questionText: "The mutation causing SCD changes which amino acid in the hemoglobin protein?",
            options: ["Glutamine becomes Valine", "Glutamic acid becomes Valine", "Lysine becomes Alanine", "Proline becomes Serine"],
            correctAnswerIndex: 1,
            explanation: "A single change in the DNA causes glutamic acid to be replaced by valine at position 6 of the beta-globin chain, producing HbS."
          },
        ]
      },
      {
        id: 2,
        title: "Sickle Cell Trait — Being a Carrier",
        description: "Learn the difference between having sickle cell disease and being a carrier (sickle cell trait).",
        xp: 55,
        quiz: [
          {
            questionText: "A person with sickle cell trait (HbAS) usually...",
            options: ["Has severe daily symptoms", "Is a 'carrier' and generally has no symptoms", "Cannot pass the gene to their children", "Has the same complications as SCD"],
            correctAnswerIndex: 1,
            explanation: "Carriers (HbAS) have one normal and one sickle gene. They are usually healthy but can pass the sickle gene to their children."
          },
          {
            questionText: "If both parents have sickle cell trait (HbAS), what is the chance their child will have SCD (HbSS)?",
            options: ["No chance", "25% (1 in 4)", "50% (1 in 2)", "100%"],
            correctAnswerIndex: 1,
            explanation: "When both parents are carriers, there is a 25% chance the child gets both sickle genes (HbSS/SCD), 50% chance of being a carrier (HbAS), and 25% chance of being unaffected (HbAA)."
          },
          {
            questionText: "Under which extreme condition might a person with sickle cell TRAIT experience symptoms?",
            options: ["Watching television", "Eating fruits and vegetables", "Very high altitude or extreme dehydration", "Mild weather"],
            correctAnswerIndex: 2,
            explanation: "Carriers can rarely experience symptoms such as muscle breakdown (rhabdomyolysis) under conditions of extreme exertion, very high altitude, or severe dehydration."
          },
        ]
      },
      {
        id: 3,
        title: "Punnett Squares & Probability",
        description: "Use genetics to predict the chance of inheriting sickle cell disease.",
        xp: 60,
        quiz: [
          {
            questionText: "One parent has SCD (HbSS) and the other has sickle cell trait (HbAS). What is the chance their child will have SCD?",
            options: ["0%", "25%", "50%", "100%"],
            correctAnswerIndex: 2,
            explanation: "One parent always passes 'S', the other can pass 'A' or 'S'. So 50% of children will inherit HbSS (SCD) and 50% will be HbAS (carriers)."
          },
          {
            questionText: "A parent with HbSC disease and a parent with no sickle genes (HbAA): can their child have SCD?",
            options: ["Yes, definitely HbSS", "Yes, possibly HbSC", "No, impossible", "Only girls can be affected"],
            correctAnswerIndex: 1,
            explanation: "The child could inherit 'S' or 'C' from the affected parent and 'A' from the other — so 50% could have HbAS (trait) and 50% could have HbAC, but not HbSS."
          },
        ]
      },
      {
        id: 4,
        title: "Why Sickle Cell Trait Persists in Populations",
        description: "Discover the evolutionary reason why the sickle cell gene is so common.",
        xp: 50,
        quiz: [
          {
            questionText: "People with sickle cell TRAIT (HbAS) have a natural advantage against which serious disease?",
            options: ["Tuberculosis", "Malaria", "Diabetes", "Influenza"],
            correctAnswerIndex: 1,
            explanation: "The sickle cell gene persists in malaria-endemic regions because carriers have some protection against severe malaria — an example of evolutionary 'balanced polymorphism'."
          },
          {
            questionText: "In which world regions is sickle cell disease most common?",
            options: ["Arctic regions", "Sub-Saharan Africa, the Mediterranean, Middle East and India", "Only in North America", "Antarctica"],
            correctAnswerIndex: 1,
            explanation: "SCD is most common in regions where malaria is (or was) widespread because the trait provides partial protection against the parasite."
          },
        ]
      },
    ],
  },
  {
    slug: "health-prevention",
    name: "Health & Prevention",
    Icon: Stethoscope,
    levelRequirement: 4,
    position: { top: "75%", left: "50%" },
    description: "Adopt good habits to prevent complications and live well with sickle cell disease.",
    healthTips: [
      {
        title: "Take Folic Acid Daily",
        tip: "Folic acid (vitamin B9) helps your body produce new red blood cells. Take it every day as prescribed.",
        icon: "💊",
        urgency: "important",
      },
      {
        title: "Stay Up-to-Date on Vaccines",
        tip: "Get vaccinated against pneumonia (pneumococcal), meningitis, flu and other infections every year. Your spleen may not work well enough to fight them alone.",
        icon: "💉",
        urgency: "critical",
      },
      {
        title: "Get Enough Sleep",
        tip: "Aim for 8–10 hours of sleep. Sleep deprivation increases stress hormones and raises the risk of a painful crisis.",
        icon: "😴",
        urgency: "important",
      },
      {
        title: "Avoid Smoking & Alcohol",
        tip: "Smoking reduces blood oxygen levels and triggers crises. Alcohol causes dehydration. Both are dangerous for people with SCD.",
        icon: "🚭",
        urgency: "critical",
      },
      {
        title: "Moderate Exercise is Beneficial",
        tip: "Low-impact activities like walking, swimming and yoga strengthen the body without overexertion. Always warm up and stay hydrated.",
        icon: "🏊",
        urgency: "info",
      },
    ],
    missions: [
      {
        id: 1,
        title: "The Power of Hydration",
        description: "Understand why drinking plenty of water is the most important daily habit.",
        xp: 60,
        quiz: [
          {
            questionText: "What is one of the most powerful daily triggers for a pain crisis?",
            options: ["Boredom", "Dehydration", "Reading a book", "Eating vegetables"],
            correctAnswerIndex: 1,
            explanation: "Dehydration concentrates the blood and promotes sickling. Drinking enough water every day is the single most important preventive habit."
          },
          {
            questionText: "How much water should an adult with SCD aim to drink per day?",
            options: ["1 cup (250ml)", "2–3 glasses (500ml)", "8–10 glasses (2–2.5 litres)", "As little as possible"],
            correctAnswerIndex: 2,
            explanation: "Adults with SCD should drink at least 8–10 glasses of water daily, and even more in hot weather or during physical activity."
          },
          {
            questionText: "Which drinks are the MOST hydrating for someone with SCD?",
            options: ["Coffee", "Alcohol", "Water and diluted fruit juices", "Energy drinks"],
            correctAnswerIndex: 2,
            explanation: "Water, herbal teas, and diluted fruit juices are best. Alcohol, coffee and sugary sodas actually promote dehydration."
          },
        ]
      },
      {
        id: 2,
        title: "Infection Protection & Your Spleen",
        description: "Understand why infections are particularly dangerous and how to protect yourself.",
        xp: 65,
        quiz: [
          {
            questionText: "People with sickle cell disease are especially vulnerable to infections because?",
            options: ["They have too many red blood cells", "The spleen is damaged by sickle cells and loses its infection-fighting ability", "They eat too much sugar", "They sleep too much"],
            correctAnswerIndex: 1,
            explanation: "Sickle cells damage the spleen over time through repeated blockages. The spleen normally filters bacteria from the blood, so its dysfunction leads to 'functional asplenia' — high infection risk."
          },
          {
            questionText: "Which bacteria is particularly dangerous for those with SCD due to functional asplenia?",
            options: ["Salmonella", "Streptococcus pneumoniae (pneumococcus)", "E. coli", "Staphylococcus epidermidis"],
            correctAnswerIndex: 1,
            explanation: "Pneumococcus can rapidly cause life-threatening sepsis in people with SCD. Vaccination and preventive penicillin in children dramatically reduce this risk."
          },
          {
            questionText: "Children with SCD are typically given which preventive medication to protect against infections?",
            options: ["Insulin", "Penicillin (daily antibiotic)", "Aspirin", "Iron supplements"],
            correctAnswerIndex: 1,
            explanation: "Daily prophylactic penicillin is given to children with SCD (usually until age 5) to prevent life-threatening bacterial infections while their immune system develops."
          },
        ]
      },
      {
        id: 3,
        title: "Nutrition for Sickle Cell Warriors",
        description: "Discover the dietary habits that support health with sickle cell disease.",
        xp: 70,
        quiz: [
          {
            questionText: "Folic acid is a B vitamin that helps the body make?",
            options: ["New red blood cells", "White blood cells only", "Stronger bones", "More muscle"],
            correctAnswerIndex: 0,
            explanation: "The rapid breakdown of red blood cells in SCD means the body needs extra folic acid to produce new ones. A daily supplement is usually recommended."
          },
          {
            questionText: "Which nutrient is important but should be used carefully in SCD (since excess can worsen some complications)?",
            options: ["Vitamin C", "Iron", "Folic acid", "Vitamin D"],
            correctAnswerIndex: 1,
            explanation: "Iron supplements should only be taken if prescribed, as repeated blood transfusions can already cause iron overload. Excess iron can damage the heart and liver."
          },
          {
            questionText: "Which of these foods is especially beneficial for someone with SCD?",
            options: ["Sugary sodas", "Dark leafy greens like spinach", "Processed fast food", "Salted crisps"],
            correctAnswerIndex: 1,
            explanation: "Dark leafy greens are rich in folate, antioxidants, and magnesium — all beneficial to red blood cell production and overall health in SCD."
          },
        ]
      },
      {
        id: 4,
        title: "Exercise, Rest & Mental Health",
        description: "Find the right balance between physical activity and rest for wellbeing.",
        xp: 75,
        quiz: [
          {
            questionText: "Which type of exercise is most recommended for people with SCD?",
            options: ["Marathon running", "Heavy weightlifting", "Low-impact activity like swimming or walking", "Competitive contact sports"],
            correctAnswerIndex: 2,
            explanation: "Low-impact, moderate exercise improves circulation and overall health without triggering crises. Overexertion is a known trigger — always listen to your body and stay hydrated."
          },
          {
            questionText: "Psychological stress can trigger a pain crisis because it?",
            options: ["Makes you sleep too much", "Activates the body's stress response, causing blood vessel changes", "Has no effect on SCD", "Increases blood sugar only"],
            correctAnswerIndex: 1,
            explanation: "Stress hormones like adrenaline can affect blood flow and sickling. Mental health care — including relaxation techniques, therapy, and peer support — is a crucial part of SCD management."
          },
          {
            questionText: "What should you do BEFORE exercising with SCD?",
            options: ["Skip hydration to avoid needing bathroom breaks", "Drink water, warm up properly and pace yourself", "Exercise only when already in pain", "Never exercise at all"],
            correctAnswerIndex: 1,
            explanation: "Warming up increases blood flow gradually, preventing sudden changes that could trigger sickling. Proper hydration before, during, and after exercise is essential."
          },
        ]
      },
      {
        id: 5,
        title: "My Healthcare Team",
        description: "Understand who is involved in your care and how to get the best from your appointments.",
        xp: 65,
        quiz: [
          {
            questionText: "How often should someone with SCD see their haematologist (blood specialist)?",
            options: ["Once in a lifetime", "Only when in crisis", "At least once or twice a year for routine check-ups", "Every week"],
            correctAnswerIndex: 2,
            explanation: "Regular scheduled check-ups allow the medical team to monitor organ function, adjust medication, and catch complications early — before they become emergencies."
          },
          {
            questionText: "Which organ should be regularly monitored with ultrasound in people with SCD?",
            options: ["Kneecaps", "The spleen and kidneys", "Fingernails", "Hair follicles"],
            correctAnswerIndex: 1,
            explanation: "Organs including the spleen, kidneys, liver, heart and eyes can all be affected by SCD. Regular specialist screenings (by haematologist, ophthalmologist, cardiologist) are important."
          },
        ]
      },
    ],
  },
  {
    slug: "complications",
    name: "Complications",
    Icon: LungsIcon,
    levelRequirement: 5,
    position: { top: "40%", left: "25%" },
    description: "Learn about potential long-term complications and how to monitor them.",
    healthTips: [
      {
        title: "Eye Check-ups Are Essential",
        tip: "SCD can damage retinal blood vessels, leading to vision loss. Get your eyes checked by a specialist at least once a year.",
        icon: "👁️",
        urgency: "important",
      },
      {
        title: "Protect Your Kidneys",
        tip: "SCD can affect kidney function over time. Stay well hydrated and have your kidneys tested at least annually.",
        icon: "💧",
        urgency: "important",
      },
      {
        title: "Leg Ulcers — Don't Ignore Them",
        tip: "Leg ulcers (slow-healing sores, usually near the ankle) can develop in SCD. Keep legs elevated and seek wound care advice from your doctor early.",
        icon: "🦵",
        urgency: "important",
      },
    ],
    missions: [
      {
        id: 1,
        title: "Acute Chest Syndrome",
        description: "Learn about this serious lung complication and how to recognize it.",
        xp: 70,
        quiz: [
          {
            questionText: "Acute Chest Syndrome (ACS) is a medical emergency affecting the...",
            options: ["Lungs", "Stomach", "Brain only", "Kneecaps"],
            correctAnswerIndex: 0,
            explanation: "ACS occurs when sickle cells block blood vessels in the lungs, causing poor oxygenation. It is one of the leading causes of death in SCD."
          },
          {
            questionText: "What are the main symptoms of Acute Chest Syndrome?",
            options: ["Itchy skin only", "Chest pain, fever, and breathing difficulty", "Stomach ache and diarrhoea", "Headache with no other symptoms"],
            correctAnswerIndex: 1,
            explanation: "ACS presents with a new lung infiltrate on chest X-ray, fever, and respiratory symptoms. It requires urgent treatment with oxygen, blood transfusion and IV fluids."
          },
          {
            questionText: "Which action can help PREVENT Acute Chest Syndrome while in hospital?",
            options: ["Lying completely flat and still", "Deep breathing exercises and using an incentive spirometer", "Drinking only cold drinks", "Avoiding all pain medication"],
            correctAnswerIndex: 1,
            explanation: "When hospitalised for pain, not breathing deeply enough can cause lung segments to collapse. Regular deep breathing and incentive spirometry help prevent ACS from developing."
          },
        ]
      },
      {
        id: 2,
        title: "Stroke & Brain Complications",
        description: "Understand why stroke risk is elevated in SCD and what can be done.",
        xp: 75,
        quiz: [
          {
            questionText: "Blockage of blood vessels in which organ can cause a stroke?",
            options: ["Heart", "Liver", "Spleen", "Brain"],
            correctAnswerIndex: 3,
            explanation: "When sickle cells block cerebral blood vessels, brain tissue is deprived of oxygen, causing a stroke. Children with HbSS have up to 11% lifetime stroke risk."
          },
          {
            questionText: "What is 'Transcranial Doppler (TCD) screening' used for in children with SCD?",
            options: ["Checking eyesight", "Measuring blood flow in the brain to identify stroke risk", "Testing kidney function", "Measuring height and weight"],
            correctAnswerIndex: 1,
            explanation: "TCD is a painless ultrasound test that measures blood flow speed in brain arteries. Children at high risk are identified early and given preventive blood transfusions."
          },
          {
            questionText: "Between which ages is stroke risk highest in SCD in children?",
            options: ["18–25 years", "2–16 years", "Only in adults over 60", "At birth"],
            correctAnswerIndex: 1,
            explanation: "Stroke risk peaks between ages 2–16 in children with HbSS. Regular TCD screening (from age 2) is recommended to identify and protect at-risk children."
          },
        ]
      },
      {
        id: 3,
        title: "The Spleen, Liver & Kidneys",
        description: "Explore how different organs are affected over time.",
        xp: 70,
        quiz: [
          {
            questionText: "In young children with SCD, a sudden enlargement of the spleen is called?",
            options: ["Acute Chest Syndrome", "Splenic sequestration crisis", "A VOC", "Stroke"],
            correctAnswerIndex: 1,
            explanation: "Splenic sequestration is a sudden pooling of blood in the spleen, causing it to enlarge rapidly. It can cause severe anaemia and shock — a life-threatening emergency in young children."
          },
          {
            questionText: "How does SCD affect the kidneys over time?",
            options: ["It makes them larger and more efficient", "It can damage kidney filtering function, leading to chronic kidney disease", "The kidneys are never affected by SCD", "It only affects kidney colour"],
            correctAnswerIndex: 1,
            explanation: "Repeated sickling in kidney blood vessels damages nephrons (filtering units) over time, leading to haematuria (blood in urine) and eventually chronic kidney disease."
          },
        ]
      },
      {
        id: 4,
        title: "Avascular Necrosis & Bone Health",
        description: "Learn how bones can be damaged by reduced blood supply.",
        xp: 65,
        quiz: [
          {
            questionText: "Avascular Necrosis (AVN) in SCD refers to?",
            options: ["Bone growth spurts", "Death of bone tissue due to loss of blood supply", "A type of fracture", "Extra-strong bones"],
            correctAnswerIndex: 1,
            explanation: "When sickle cells block blood vessels supplying bones (commonly the hip and shoulder joints), the bone can die. This causes severe joint pain and may require joint replacement."
          },
          {
            questionText: "Who is at highest risk for AVN of the hip in SCD?",
            options: ["Infants under 1 year", "Older teenagers and adults", "Only women", "People with sickle cell trait"],
            correctAnswerIndex: 1,
            explanation: "AVN most commonly affects adolescents and adults. Monitoring with MRI scans and physiotherapy can help, and severe cases may require surgical intervention."
          },
        ]
      },
    ],
  },
  {
    slug: "treatments",
    name: "Treatments",
    Icon: LifeBuoy,
    levelRequirement: 6,
    position: { top: "60%", left: "30%" },
    description: "Explore the different treatments available to manage sickle cell disease.",
    healthTips: [
      {
        title: "Take Hydroxyurea as Directed",
        tip: "Hydroxyurea must be taken consistently every day to be effective. Never stop without consulting your doctor — it significantly reduces crisis frequency.",
        icon: "💊",
        urgency: "critical",
      },
      {
        title: "Join a Patient Support Group",
        tip: "Connecting with others living with SCD provides emotional support, practical advice, and helps fight the isolation the disease can cause.",
        icon: "🤝",
        urgency: "info",
      },
      {
        title: "Research Clinical Trials",
        tip: "New treatments for SCD are being developed rapidly. Ask your haematologist if any relevant clinical trials are available to you.",
        icon: "🔬",
        urgency: "info",
      },
    ],
    missions: [
      {
        id: 1,
        title: "Hydroxyurea — A Game-Changer",
        description: "Learn about this common and effective medication that reduces pain crises.",
        xp: 80,
        quiz: [
          {
            questionText: "What is the main benefit of taking Hydroxyurea for sickle cell disease?",
            options: ["Curing the disease permanently", "Reducing the frequency and severity of pain crises", "Making bones stronger immediately", "Improving eyesight"],
            correctAnswerIndex: 1,
            explanation: "Hydroxyurea increases fetal hemoglobin (HbF) production, which dilutes HbS and significantly reduces sickling, crisis frequency, and hospitalizations."
          },
          {
            questionText: "How does Hydroxyurea work in SCD?",
            options: ["It replaces sickle genes with healthy ones", "It increases production of fetal hemoglobin (HbF), which prevents sickling", "It thins the blood like aspirin", "It kills sickle cells directly"],
            correctAnswerIndex: 1,
            explanation: "HbF (fetal hemoglobin) doesn't sickle. By stimulating its production, Hydroxyurea dilutes the HbS and reduces the number of sickle-shaped cells in circulation."
          },
          {
            questionText: "Hydroxyurea requires regular blood tests because?",
            options: ["It can turn blood blue", "It can lower white blood cell and platelet counts, requiring monitoring", "It increases iron levels dangerously", "It cures the spleen"],
            correctAnswerIndex: 1,
            explanation: "Hydroxyurea can suppress the bone marrow, so regular CBC (complete blood count) tests are needed to monitor for dangerous drops in white cells or platelets."
          },
        ]
      },
      {
        id: 2,
        title: "Blood Transfusions",
        description: "Understand when and why blood transfusions are used in SCD.",
        xp: 85,
        quiz: [
          {
            questionText: "A blood transfusion for SCD provides the patient with?",
            options: ["More sickled cells", "Healthy red blood cells from a compatible donor", "A dose of vitamins only", "Synthetic hemoglobin"],
            correctAnswerIndex: 1,
            explanation: "Transfusions temporarily increase healthy red blood cells, improve oxygen delivery, and dilute sickle cells — used to treat severe anaemia, stroke, ACS, or before major surgery."
          },
          {
            questionText: "A potential long-term complication of repeated blood transfusions is?",
            options: ["Cure of the disease", "Iron overload damage to organs", "Immunity to all infections", "Perfect blood count permanently"],
            correctAnswerIndex: 1,
            explanation: "Each transfusion adds iron, which the body cannot excrete naturally. Iron overload can damage the heart, liver, and endocrine glands — managed with iron chelation therapy."
          },
          {
            questionText: "Why is blood matching important for SCD patients receiving transfusions?",
            options: ["It doesn't matter for SCD", "To prevent transfusion reactions and alloimmunisation (making antibodies against donor blood)", "To pick the best colour of blood", "Only to match blood type ABO"],
            correctAnswerIndex: 1,
            explanation: "People with SCD need carefully matched blood (beyond just ABO/Rh) to reduce the risk of developing antibodies against donor red cell antigens, which would make future transfusions harder to match."
          },
        ]
      },
      {
        id: 3,
        title: "Bone Marrow Transplant — The Only Cure",
        description: "Explore the only potential cure for sickle cell disease currently available.",
        xp: 100,
        quiz: [
          {
            questionText: "A bone marrow (or stem cell) transplant is currently the only potential ___ for sickle cell disease.",
            options: ["Short-term painkiller", "Short-term treatment", "Permanent cure", "Diagnostic test"],
            correctAnswerIndex: 2,
            explanation: "A successful stem cell transplant replaces the patient's defective bone marrow with healthy donor marrow that produces normal hemoglobin — potentially curing the disease."
          },
          {
            questionText: "What is the biggest challenge with bone marrow transplant for SCD?",
            options: ["Too quick — done in one day", "Needing a matched donor, and the risk of Graft-versus-Host Disease (GvHD)", "It always fails", "It is completely painless with no risks"],
            correctAnswerIndex: 1,
            explanation: "Finding a genetically matched donor (ideally a sibling) is difficult. GvHD (where donor immune cells attack recipient tissues) is also a serious risk, making transplants suitable mainly for severe cases with a matched sibling donor."
          },
          {
            questionText: "What is gene therapy for SCD?",
            options: ["A new vitamin supplement", "A technique that corrects or replaces the faulty HBB gene in the patient's own stem cells", "A type of blood transfusion", "A vaccine that prevents SCD"],
            correctAnswerIndex: 1,
            explanation: "Gene therapy involves extracting the patient's own stem cells, correcting the sickle cell gene in the lab using tools like CRISPR, then returning the corrected cells. Recent therapies (e.g., Casgevy) have been approved and show extraordinary promise."
          },
        ]
      },
      {
        id: 4,
        title: "New & Emerging Treatments",
        description: "Discover the exciting new therapies transforming the future of SCD care.",
        xp: 90,
        quiz: [
          {
            questionText: "Crizanlizumab works by?",
            options: ["Replacing sickle genes", "Blocking P-selectin, a protein that helps sickle cells stick to vessel walls", "Increasing red blood cell production", "Curing the spleen"],
            correctAnswerIndex: 1,
            explanation: "Crizanlizumab (Adakveo) is a monoclonal antibody that reduces sickle cell adhesion to vessel walls, significantly decreasing VOC frequency."
          },
          {
            questionText: "Voxelotor (Oxbryta) treats SCD by?",
            options: ["Destroying sickle cells", "Increasing HbS polymerisation", "Preventing hemoglobin S from polymerising (which reduces sickling)", "Replacing the spleen"],
            correctAnswerIndex: 2,
            explanation: "Voxelotor binds to hemoglobin and keeps it in the oxygen-carrying state, reducing the amount of HbS polymerisation and thereby reducing sickling and anaemia."
          },
          {
            questionText: "Which revolutionary gene-editing technology is being used in new SCD gene therapies?",
            options: ["PCR (Polymerase Chain Reaction)", "CRISPR-Cas9", "The Polymerase Cascade", "Electron microscopy"],
            correctAnswerIndex: 1,
            explanation: "CRISPR-Cas9 allows scientists to precisely edit the HBB gene in stem cells. The first CRISPR-based therapy for SCD (Casgevy) was approved in 2023, representing a historic milestone."
          },
        ]
      },
    ],
  },
];
