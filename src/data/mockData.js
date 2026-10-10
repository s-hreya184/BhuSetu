// Mock Real-world Agricultural & Land Records Data (Maharashtra DILRMP 3.0 / AgriStack)

export const INITIAL_PARCELS = [
  {
    ulpin: "MH-PUNE-HAV-0042",
    surveyNumber: "142/3A",
    village: "Wagholi",
    taluka: "Haveli",
    district: "Pune",
    state: "Maharashtra",
    areaAcres: 3.5,
    soilType: "Black Medium Loam (Kali)",
    irrigationSource: "Well + Canal (Canal Command Area)",
    currentOwner: {
      id: "OWN-MH-8812",
      name: "Dattatray Vitthalrao Patil",
      phone: "+91 98230 44129",
      aadhaarMasked: "XXXX-XXXX-8921",
      upiId: "patil.datta@upi",
      address: "Gat No. 142, Wagholi, Taluka Haveli, Pune 412207"
    },
    // Seven Twelve (7/12) Extract Details
    sevenTwelve: {
      khataNumber: "KHT-9012",
      mutations: [
        { date: "2018-04-12", code: "MUT-3391", desc: "Inheritance partition sanctioned by Tahsildar" },
        { date: "2024-01-10", code: "MUT-4102", desc: "Well irrigation entry updated" }
      ],
      currentCropAssessment: "Kharif Soyabean / Rabi Jowar",
      landClassification: "Jirayat / Bagayat Mix"
    },
    // Default active lease proposal ready for testing
    lease: {
      id: "LEASE-2026-MH-001",
      tenant: {
        id: "TNT-MH-4401",
        name: "Santosh Baburao Shinde",
        phone: "+91 94220 18834",
        aadhaarMasked: "XXXX-XXXX-3419",
        agriStackFarmerId: "AGRI-MH-PUN-7721",
        upiId: "santosh.shinde@okhdfcbank",
        experienceYears: 12,
        village: "Wagholi",
        creditScore: 710
      },
      season: "Kharif 2026",
      crop: "Soyabean (JS-335)",
      expectedYieldQuintals: 28,
      estimatedCropValue: 135000,
      startDate: "2026-06-01",
      endDate: "2026-11-30",
      monthlyRent: 8000,
      totalRent: 48000,
      rentPaymentFreq: "Monthly AutoPay",
      termsAgreed: true,
      ownerSignedAt: "2026-05-28T10:30:00Z",
      tenantSignedAt: "2026-05-28T11:15:00Z",
      status: "ACTIVE", // PROPOSED, ACTIVE, FINANCED, DEFAULTED, EXPIRED, TERMINATED
      drunixTxId: "0x7a89f92b4512e987103cd58a12fae498c39d89",
      autoPayStatus: "ACTIVE", // PENDING, ACTIVE, FAILED, COMPLETED
      rentPaidMonths: 2,
      lastRentTxnId: "UPI/20260705/982310481",
      cultivationRightTokenId: "CR-MH-2026-0042",
      // Bank Crop Claim if financed
      seasonClaim: null
    }
  },
  {
    ulpin: "MH-NSK-NIP-0089",
    surveyNumber: "89/1B",
    village: "Pimpalgaon Baswant",
    taluka: "Niphad",
    district: "Nashik",
    state: "Maharashtra",
    areaAcres: 2.0,
    soilType: "Deep Alluvial Loam",
    irrigationSource: "Drip Irrigation (Borewell)",
    currentOwner: {
      id: "OWN-MH-3304",
      name: "Suresh Kashinath Kadam",
      phone: "+91 98501 12903",
      aadhaarMasked: "XXXX-XXXX-6102",
      upiId: "suresh.kadam@icici",
      address: "Pimpalgaon Baswant, Niphad, Nashik 422209"
    },
    sevenTwelve: {
      khataNumber: "KHT-4421",
      mutations: [
        { date: "2019-11-04", code: "MUT-1902", desc: "Drip subsidy hypothecation cleared" }
      ],
      currentCropAssessment: "Kharif Onion / Rabi Wheat",
      landClassification: "Bagayat (Perennial)"
    },
    lease: {
      id: "LEASE-2026-MH-002",
      tenant: {
        id: "TNT-MH-5592",
        name: "Rameshwar Tukaram Gaikwad",
        phone: "+91 97632 99011",
        aadhaarMasked: "XXXX-XXXX-9920",
        agriStackFarmerId: "AGRI-MH-NSK-1109",
        upiId: "ramesh.gaikwad@upi",
        experienceYears: 8,
        village: "Pimpalgaon Baswant",
        creditScore: 685
      },
      season: "Kharif 2026",
      crop: "Red Onion (Garva)",
      expectedYieldQuintals: 160,
      estimatedCropValue: 240000,
      startDate: "2026-06-01",
      endDate: "2026-11-30",
      monthlyRent: 12000,
      totalRent: 72000,
      rentPaymentFreq: "Monthly AutoPay",
      termsAgreed: true,
      ownerSignedAt: "2026-05-29T09:00:00Z",
      tenantSignedAt: "2026-05-29T09:45:00Z",
      status: "PROPOSED", // Awaiting Tahsildar endorsement on DRUNIX
      drunixTxId: null,
      autoPayStatus: "PENDING",
      rentPaidMonths: 0,
      lastRentTxnId: null,
      cultivationRightTokenId: null,
      seasonClaim: null
    }
  },
  {
    ulpin: "MH-AUR-PAI-0115",
    surveyNumber: "312/4",
    village: "Apegaon",
    taluka: "Paithan",
    district: "Chhatrapati Sambhajinagar",
    state: "Maharashtra",
    areaAcres: 4.2,
    soilType: "Heavy Black Clay",
    irrigationSource: "Jayakwadi Canal Command",
    currentOwner: {
      id: "OWN-MH-7719",
      name: "Balasaheb Ramrao Deshmukh",
      phone: "+91 94033 77122",
      aadhaarMasked: "XXXX-XXXX-4411",
      upiId: "deshmukh.br@sbi",
      address: "Near Temple, Apegaon, Paithan 431107"
    },
    sevenTwelve: {
      khataNumber: "KHT-8819",
      mutations: [
        { date: "2021-08-19", code: "MUT-5501", desc: "DILRMP 3.0 Geo-referenced survey mapped" }
      ],
      currentCropAssessment: "Kharif Bt Cotton / Rabi Gram",
      landClassification: "Bagayat"
    },
    lease: null // Free parcel with no active lease
  }
];

export const REGISTERED_BANKS = [
  {
    id: "BANK-MGB-01",
    name: "Maharashtra Gramin Bank",
    code: "MGB",
    branch: "Wagholi Branch (IFSC: MAHG000412)",
    orgId: "Org2.MGBank",
    kccProduct: "Kisan Tatkal KCC (Tenant Cultivator Scheme)",
    maxLimitPerAcre: 35000,
    interestRateAnnual: 7.0, // Subvented rate under Agri Credit policy
    upiVpa: "kcc.disbursal@mahagramin"
  },
  {
    id: "BANK-PDCC-02",
    name: "Pune District Central Co-op Bank (PDCC)",
    code: "PDCC",
    branch: "Haveli Taluka Main (IFSC: HDFC0CPDCCB)",
    orgId: "Org3.PDCCBank",
    kccProduct: "Sahakar Krishi KCC Crop Loan",
    maxLimitPerAcre: 32000,
    interestRateAnnual: 6.5,
    upiVpa: "loans@pdccbank.coop"
  },
  {
    id: "BANK-BOI-03",
    name: "Bank of India - Lead Agri Bank",
    code: "BOI",
    branch: "Pune Agri Hub (IFSC: BKID0000501)",
    orgId: "Org4.BOIBank",
    kccProduct: "Star Kisan Samriddhi Credit Line",
    maxLimitPerAcre: 38000,
    interestRateAnnual: 7.0,
    upiVpa: "agri.boi@bankofindia"
  }
];

export const TAHSILDAR_OFFICER = {
  id: "OFFICER-MH-REV-412",
  name: "Dr. Arvind S. Kulkarni (IAS)",
  designation: "Tahsildar & Executive Magistrate",
  office: "Tahsil Office Haveli, District Pune",
  jurisdiction: "Haveli Sub-Division (52 Villages)",
  digitalCertFingerprint: "SHA256:4F:9A:88:E1:CC:90:3A:D4:11:09:82:FC:9B:EE:71",
  orgId: "Org1.MHRevenue"
};
