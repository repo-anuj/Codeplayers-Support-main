const countries = {
    "Asia": [
        {
            "country": "Afghanistan",
            "states": [
                "Badakhshan",
                "Balkh",
                "Baghlan",
                "Herat",
                "Kabul",
                "Kandahar",
                "Khost",
                "Logar",
                "Nangarhar",
                "Nimroz",
                "Paktia",
                "Panjshir",
                "Samangan",
                "Takhar"
            ]
        },
        {
            "country": "Armenia",
            "states": [
                "Ararat",
                "Armavir",
                "Gegharkunik",
                "Kotayk",
                "Lori",
                "Shirak",
                "Syunik",
                "Tavush",
                "Vayots Dzor"
            ]
        },
        {
            "country": "Azerbaijan",
            "states": [
                "Baku",
                "Ganja",
                "Sumqayit",
                "Mingachevir",
                "Lankaran",
                "Shaki",
                "Guba",
                "Yardimli"
            ]
        },
        {
            "country": "Bahrain",
            "states": [
                "Capital Governorate",
                "Northern Governorate",
                "Southern Governorate",
                "Muharraq Governorate"
            ]
        },
        {
            "country": "Bangladesh",
            "states": [
                "Dhaka",
                "Chittagong",
                "Khulna",
                "Rajshahi",
                "Barisal",
                "Sylhet",
                "Rangpur",
                "Mymensingh"
            ]
        },
        {
            "country": "Bhutan",
            "states": [
                "Bumthang",
                "Chukha",
                "Dagana",
                "Gasa",
                "Haa",
                "Paro",
                "Punakha",
                "Samdrup Jongkhar",
                "Sarpang",
                "Thimphu",
                "Trashigang",
                "Trashiyangtse",
                "Wangdue Phodrang"
            ]
        },
        {
            "country": "Brunei",
            "states": [
                "Brunei-Muara",
                "Belait",
                "Tutong",
                "Temburong"
            ]
        },
        {
            "country": "Cambodia",
            "states": [
                "Phnom Penh",
                "Battambang",
                "Siem Reap",
                "Kandal",
                "Kampong Cham",
                "Kampong Thom",
                "Kep",
                "Koh Kong",
                "Pailin",
                "Takeo"
            ]
        },
        {
            "country": "China",
            "states": [
                "Beijing",
                "Shanghai",
                "Guangdong",
                "Shandong",
                "Sichuan",
                "Zhejiang",
                "Hunan",
                "Hebei",
                "Jiangsu",
                "Liaoning",
                "Anhui",
                "Jilin",
                "Hubei",
                "Fujian",
                "Xinjiang",
                "Tibet",
                "Inner Mongolia",
                "Ningxia",
                "Guizhou",
                "Yunnan"
            ]
        },
        {
            "country": "Cyprus",
            "states": [
                "Nicosia",
                "Limassol",
                "Larnaca",
                "Paphos",
                "Famagusta"
            ]
        },
        {
            "country": "Georgia",
            "states": [
                "Abkhazia",
                "Ajaria",
                "Guria",
                "Imereti",
                "Kakheti",
                "Samegrelo-Zemo Svaneti",
                "Samtskhe-Javakheti",
                "Shida Kartli",
                "Mtskheta-Mtianeti",
                "Kvemo Kartli",
                "Tbilisi"
            ]
        },
        {
            "country": "India",
            "states": [
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttar Pradesh",
                "Uttarakhand",
                "West Bengal",
                "Delhi"
            ]
        },
        {
            "country": "Indonesia",
            "states": [
                "Aceh",
                "Bali",
                "Banten",
                "Bengkulu",
                "Gorontalo",
                "Jakarta",
                "Jambi",
                "Java",
                "Kalimantan",
                "Lampung",
                "Maluku",
                "Nusa Tenggara",
                "Papua",
                "Riau",
                "South Sulawesi",
                "Sumatra",
                "West Java",
                "West Papua",
                "Yogyakarta"
            ]
        },
        {
            "country": "Iran",
            "states": [
                "Alborz",
                "Ardabil",
                "Azarbaijan-e Sharqi",
                "Azarbaijan-e Gharbi",
                "Bushehr",
                "Chaharmahal and Bakhtiari",
                "Fars",
                "Gilan",
                "Golestan",
                "Hamedan",
                "Hormozgan",
                "Ilam",
                "Kerman",
                "Khorasan-e Janubi",
                "Khorasan-e Shomali",
                "Khorasan-e Razavi",
                "Kohgiluyeh and Boyer-Ahmad",
                "Kurdistan",
                "Lorestan",
                "Markazi",
                "Mazandaran",
                "Ostan-e Qom",
                "Qazvin",
                "Qom",
                "Semnan",
                "Sistan and Baluchestan",
                "Tehran",
                "Yazd",
                "Zanjan"
            ]
        },
        {
            "country": "Iraq",
            "states": [
                "Baghdad",
                "Basra",
                "Dhi Qar",
                "Diyala",
                "Kirkuk",
                "Muthanna",
                "Nineveh",
                "Wasit",
                "Al Anbar",
                "Babylon",
                "Erbil",
                "Sulaymaniyah",
                "Najaf",
                "Qadisiyyah"
            ]
        },
        {
            "country": "Israel",
            "states": [
                "Central District",
                "Haifa District",
                "Jerusalem District",
                "Northern District",
                "Southern District",
                "Tel Aviv District"
            ]
        },
        {
            "country": "Japan",
            "states": [
                "Hokkaido",
                "Tokyo",
                "Osaka",
                "Kyoto",
                "Fukuoka",
                "Aichi",
                "Hiroshima",
                "Shizuoka",
                "Chiba",
                "Saitama",
                "Kanagawa",
                "Okinawa"
            ]
        },
        {
            "country": "Jordan",
            "states": [
                "Amman",
                "Irbid",
                "Zarqa",
                "Mafraq",
                "Balqa",
                "Karak",
                "Ma'an",
                "Tafileh",
                "Aqaba"
            ]
        },
        {
            "country": "Kazakhstan",
            "states": [
                "Almaty",
                "Astana",
                "Atyrau",
                "East Kazakhstan",
                "Karaganda",
                "Kostanay",
                "Kyzylorda",
                "Mangystau",
                "North Kazakhstan",
                "Pavlodar",
                "South Kazakhstan",
                "West Kazakhstan",
                "Zhambyl"
            ]
        },
        {
            "country": "Kuwait",
            "states": [
                "Capital",
                "Hawalli",
                "Ahmadi",
                "Farwaniya",
                "Mubarak Al-Kabeer",
                "Al Jahra",
                "Al Asimah"
            ]
        },
        {
            "country": "Kyrgyzstan",
            "states": [
                "Bishkek",
                "Batken",
                "Chuy",
                "Jalal-Abad",
                "Naryn",
                "Osh",
                "Talas",
                "Issyk-Kul"
            ]
        },
        {
            "country": "Laos",
            "states": [
                "Vientiane",
                "Champasak",
                "Khammouane",
                "Luang Prabang",
                "Oudomxay",
                "Saravan",
                "Savannakhet",
                "Xayaburi",
                "Xieng Khouang"
            ]
        },
        {
            "country": "Lebanon",
            "states": [
                "Beirut",
                "Mount Lebanon",
                "North Governorate",
                "Beqaa",
                "South Governorate",
                "Nabatieh"
            ]
        },
        {
            "country": "Malaysia",
            "states": [
                "Kuala Lumpur",
                "Penang",
                "Selangor",
                "Johor",
                "Perak",
                "Sabah",
                "Sarawak",
                "Melaka",
                "Kedah",
                "Pahang",
                "Terengganu",
                "Kelantan",
                "Negeri Sembilan",
                "Perlis"
            ]
        },
        {
            "country": "Maldives",
            "states": [
                "Alifu Alifu",
                "Alifu Dhaalu",
                "Baa",
                "Dhaalu",
                "Gnaviyani",
                "Haa Alifu",
                "Haa Dhaalu",
                "Kaafu",
                "Laamu",
                "Lhaviyani",
                "Mahl",
                "Meemu",
                "Noonu",
                "Raa",
                "Shaviyani",
                "Thaa",
                "Vaavu"
            ]
        }
    ]
}
export default countries;