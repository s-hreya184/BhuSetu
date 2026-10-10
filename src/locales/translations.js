// Multilingual support for English, Hindi, and Marathi (as specified in Slide 3)

export const translations = {
  en: {
    appTitle: "BhuSetu",
    tagline: "Verifiable Cultivation Rights on NPCI DRUNIX",
    subtagline: "Turning tenant farmers' leases into bankable credit, settled over UPI",
    roles: {
      tahsildar: "Tahsildar Revenue Console",
      bank: "Bank Verification & Lending Portal",
      farmer: "Farmer & Landowner Portal",
      explorer: "DRUNIX Ledger & Chaincode",
      walkthrough: "Full Lifecycle Simulation",
      architecture: "Platform Architecture"
    },
    demoBar: {
      step1: "1. Record Lease (Tahsildar)",
      step2: "2. Rent AutoPay (UPI)",
      step3: "3. Disburse Loan (Bank)",
      step4_conflict1: "4a. Double Financing Test",
      step4_conflict2: "4b. Loan Outlives Lease Test",
      step5: "5. Repay Loan (UPI)",
      step6: "6. Advance Time & Revert Land",
      reset: "Reset Simulation"
    },
    stats: {
      leasedArea: "21.3M Rural Households",
      registeredArea: "Only 13% Registered Leases",
      rightsTokenized: "3 Tokenized Rights (Owner, Tenant, Bank)",
      conflictsPrevented: "100% Conflict Rejection On-Chain"
    },
    lawBadge: "Enforcing Maharashtra Act XXVIII of 2023 (Law-as-Code)",
    drunixNetwork: "DRUNIX Testnet (Channel: bhusetu | YugabyteDB)"
  },
  mr: {
    appTitle: "भू-सेतू (BhuSetu)",
    tagline: "NPCI DRUNIX वरील पडताळणीयोग्य शेती हक्क",
    subtagline: "कुळ/भाडेकरू शेतकऱ्यांच्या कराराचे बँक कर्जात रूपांतर, UPI द्वारे त्वरित व्यवहार",
    roles: {
      tahsildar: "तहसीलदार महसूल प्रणाली",
      bank: "बँक तपासणी व कर्ज वाटप",
      farmer: "शेतकरी व जमीन मालक पोर्टल",
      explorer: "DRUNIX ब्लॉकचेन लेजर",
      walkthrough: "थेट प्रात्यक्षिक (Demo)"
    },
    demoBar: {
      step1: "१. करार नोंदवा (तहसीलदार)",
      step2: "२. भाडे UPI AutoPay",
      step3: "३. पीक कर्ज वाटप (बँक)",
      step4_conflict1: "४अ. दुहेरी कर्ज चाचणी (अस्वीकार)",
      step4_conflict2: "४ब. मुदतबाह्य कर्ज चाचणी",
      step5: "५. पीक कर्ज परतफेड (UPI)",
      step6: "६. मुदत समाप्ती व जमीन परतावा",
      reset: "पुन्हा सुरू करा"
    },
    stats: {
      leasedArea: "२.१३ कोटी भाडेकरू कुटुंबे",
      registeredArea: "केवळ १३% नोंदणीकृत भाडेपट्टे",
      rightsTokenized: "३ स्वतंत्र हक्क (मालकी, वहिवाट, बँक)",
      conflictsPrevented: "१००% वाद प्रतिबंधक प्रणाली"
    },
    lawBadge: "महाराष्ट्र शेतजमीन भाडेपट्टा कायदा २०२३ लागू (Law-as-Code)",
    drunixNetwork: "DRUNIX टेस्टनेट (चॅनल: bhusetu | युगाबाईट डीबी)"
  },
  hi: {
    appTitle: "भू-सेतु (BhuSetu)",
    tagline: "NPCI DRUNIX पर सत्यापन योग्य कृषि अधिकार",
    subtagline: "बटाईदार किसानों के पट्टे को बनाएं बैंक ऋण योग्य, UPI द्वारा सुरक्षित भुगतान",
    roles: {
      tahsildar: "तहसीलदार राजस्व कंसोल",
      bank: "बैंक सत्यापन व ऋण पोर्टल",
      farmer: "किसान व भूस्वामी पोर्टल",
      explorer: "DRUNIX लेजर व स्मार्ट कॉन्ट्रैक्ट",
      walkthrough: "मार्गदर्शित डेमो"
    },
    demoBar: {
      step1: "1. पट्टा दर्ज करें (तहसीलदार)",
      step2: "2. किराया UPI AutoPay",
      step3: "3. फसल ऋण संवितरण (बैंक)",
      step4_conflict1: "4a. दोहरा ऋण परीक्षण (अस्वीकृत)",
      step4_conflict2: "4b. पट्टा अवधि से लंबा ऋण परीक्षण",
      step5: "5. ऋण पुनर्भुगतान (UPI)",
      step6: "6. समय आगे बढ़ाएं व भूमि वापसी",
      reset: "रीसेट करें"
    },
    stats: {
      leasedArea: "2.13 करोड़ ग्रामीण परिवार",
      registeredArea: "केवल 13% पंजीकृत पट्टे",
      rightsTokenized: "3 टोकनीकृत अधिकार (स्वामित्व, जोत, बैंक)",
      conflictsPrevented: "100% ऑन-चेन विवाद रोकथाम"
    },
    lawBadge: "महाराष्ट्र भूमि पट्टा अधिनियम 2023 कोड के रूप में लागू",
    drunixNetwork: "DRUNIX टेस्टनेट (चैनल: bhusetu | युगाबाइट डीबी)"
  }
};
