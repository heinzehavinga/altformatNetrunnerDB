var example = {
"name":"1.1.1.1 (Onesies)",
"description":"Create a deck using:<br /> One big expasion, one datapack, one wildcard",    
"author":"Heinze Havinga",    
"version":"1.0",
"url":"https://netrunnerdb.com/en/deck/view/501311",
"created": "20-07-2016",
    
"rules":{
   "allowedCores": 1,
   "allowedPacks": ["*"],
   "allowedCylces": ["*"],
   "allowedIDFactions": ["*"],
   "allowedCardFactions": ["*"],
   "allowedUniqueDataPacks": 1,
   "allowedUniqueBigPacks": 1,
   "forbiddenCards": []
},
"exceptions":{
    "exemptedTypeCodes": ["identity"],
    "exemptedPackCodes": [],
    "exemptedFactionCodes": [],
    "exemptedWildCards": [{"uniqueCards":1,"amountofCards":3}],
    "exemptedCards": []   
}
    
};

var example2 = {
"name":"Legacy",
"description":"Create a deck using:<br /> Only cards from the first cycle",    
"author":"Heinze Havinga",    
"version":"1.0",
"url":"https://netrunnerdb.com/en/deck/view/501311",
"created": "20-07-2016",
    
"rules":{
   "allowedCores": 3,
   "allowedPacks": ["*"],
   "allowedCylces": ["core","genesis"],
   "allowedIDFactions": ["*"],
   "allowedCardFactions": ["*"],
   "allowedUniqueDataPacks": -1,
   "allowedUniqueBigPacks": -1,
   "forbiddenCards": []
},
"exceptions":{
    "exemptedTypeCodes": [],
    "exemptedPackCodes": [],
    "exemptedFactionCodes": [],
    "exemptedWildCards": [],
    "exemptedCards": []   
}
    
};