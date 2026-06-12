/**
 * Generate 48-team World Cup squads (23 players each)
 * Usage: node scripts/generate-squads.js
 */
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));

const NAME_POOLS = {
  za: { first: ["Lucas","Mbulelo","Sipho","Thabo","Bongani","Kagiso","Teboho","Percy","Lyle","Innocent","Kamohelo","Keagan","Lebogang","Andile","Themba","Mothobi","Thulani","Itumeleng","Bruce","Darren","Rivaldo","Lars","Reeve"], last: ["Mokoena","Zuma","Nkosi","Kekana","Zwane","Mabunda","Hlanti","Modiba","Foster","Maela","Xulu","Dolly","Mokoena","Masuku","Zungu","Morena","Ngcobo","Kubheka","Petrus","Smith","Fielies","Coetzee","Fortune"] },
  ci: { first: ["Serey","Franck","Nicolas","Eric","Wilfried","Jean","Maxwel","Seko","Ismael","Hamed","Roger","Jeremie","Habib","Christian","Ghislain","Mathis","Yann","Alex","Sylvain","Emmanuel","Brou","Arnaud","Badra"], last: ["Gohi","Kessie","Pepe","Bailly","Zaha","Cornet","Gradel","Fofana","Sangare","Traore","Assale","Boga","Maiga","Kouame","Konate","Boly","Aurier","Diomande","Bamba","Ndri","Kouassi","Seri","Ali"] },
  eg: { first: ["Mohamed","Ahmed","Mahmoud","Mostafa","Omar","Ali","Ramadan","Amr","Trezeguet","Abdallah","Hussein","Salah","Karim","Shikabala","Abdel","Hazem","Mohsen","Mohanad","Nabil","Emam","Ibrahim","Gamal","Zizo"], last: ["Salah","Hegazy","Elneny","El-Said","Ashraf","Koka","Warda","Sobhi","Ali","Abdel-Shafy","El-Wensh","Tawfik","Alaa","Hamed","Fathy","El-Shenawy","Eid","Hassan","Gaber","Samy","Soliman","Morsy","Mostafa"] },
  ma: { first: ["Yassine","Hakim","Achraf","Noussair","Sofyan","Youssef","Ayoub","Zakaria","Ryan","Munir","Selim","Walid","Ilias","Faycal","Sofiane","Anass","Oussama","Badr","Azzedine","Reda","Mohamed","Abdel","Tarik"], last: ["Bounou","Ziyech","Hakimi","Mazraoui","Amrabat","En-Nesyri","El Kaabi","Ounahi","Mmaee","El Hajam","Chair","Rahimi","Attiatallah","Aboukhlal","Sabar","El Yamiq","Benoun","Tagnaouti","Barkok","Jabrane","Chibi","Ezzalzouli","Tissoudali"] },
  sn: { first: ["Sadio","Kalidou","Idrissa","Ismaila","Boulaye","Pape","Nampalys","Cheikhou","Moussa","Abdou","Alfred","Mame","Lamine","Ablie","Samba","Pathe","Moustapha","Habib","Opa","Sada","Bamba","Moussa","Birane"], last: ["Mane","Koulibaly","Gana","Sarr","Dia","Gueye","Mendy","Kouyate","Niang","Diallo","Gomis","Dieng","NDiaye","Ciss","Sane","Diop","Gueye","Camara","Diao","Thioub","Dieng","Sow","Ndiaye"] },
  tn: { first: ["Wahbi","Youssef","Aissa","Ali","Seifeddine","Naim","Montassar","Dylan","Ellyes","Anis","Taha","Mohamed","Bechir","Firas","Bilel","Oussama","Nader","Mouez","Hamza","Ghailene","Houssem","Rami","Saad"], last: ["Khazri","Msakni","Laayouni","Maaloul","Jaziri","Sliti","Talbi","Bronn","Skhiri","Ben Slimane","Yassine","Drager","Kechrida","Ben Larbi","Ifa","Haddadi","Ghandri","Mathlouthi","Chaali","Khaoui","Bedoui","Lafi"] },
  gh: { first: ["Andre","Thomas","Jordan","Mohammed","Daniel","Joseph","Alexander","Samed","Issahaku","Gideon","Richmond","Baba","Jonathan","Osman","Benjamin","Fatawu","Kamal","Richard","Lawrence","Stephen","Emmanuel","Samuel","David"], last: ["Ayew","Partey","Ayew","Kudus","Amartey","Paintsil","Dijk","Salis","Mensah","Boakye","Rahman","Opoku","Bukari","Tetteh","Abdul","Deal","Ofori","Ati-Zigi","Agyeman","Boateng","Owusu","Amoah"] },
  dz: { first: ["Islam","Youcef","Riyad","Ramiz","Ismael","Adam","Sofiane","Ramy","Aissa","Fares","Houssem","Andy","Haris","Yacine","Zinedine","Said","Rachid","Mourad","Ishak","Hicham","Abdel","Yasser","Amir"], last: ["Slimani","Belailli","Mahrez","Bensebaini","Bennacer","Ounas","Feghouli","Boussoufa","Mandi","Ghoulam","Aouar","Delort","Belkebla","Mbolhi","Ferhat","Zedadka","Benrahma","Brahimi","Touzghar","Hannachi","Mokhtar","Tahir","Zerrouki"] },
  cv: { first: ["Jamiro","Ryan","Xande","Elber","Steven","Djaniny","Garry","Bebe","Helder","Lisandro","Nuno","Carlos","Rui","Valdo","Kenny","Kevin","Ole","Marco","Bruno","Jorge","David","Joao","Paulo"], last: ["Monteiro","Mendes","Silva","Fortes","Rodrigues","Tavares","Rodrigues","Pereira","Lopes","Semedo","Rocha","Santos","Gomes","Duarte","Cabral","Goncalves","Lima","Soares","Fernandes","Ferreira","Ribeiro","Varela","Costa"] },
  "gb-eng": { first: ["Harry","Raheem","Mason","Declan","Jordan","Bukayo","Jude","Phil","Kyle","John","Jack","Aaron","Trent","Marcus","Ben","Conor","James","Cole","Lewis","Kieran","Eberechi","Rico","Jarrod"], last: ["Kane","Sterling","Mount","Rice","Pickford","Saka","Bellingham","Foden","Walker","Stones","Grealish","Ramsdale","Alexander-Arnold","Rashford","White","Gallagher","Maddison","Palmer","Dunk","Trippier","Eze","Lewis","Bowen"] },
  eng: { first: ["Harry","Raheem","Mason","Declan","Jordan","Bukayo","Jude","Phil","Kyle","John","Jack","Aaron","Trent","Marcus","Ben","Conor","James","Cole","Lewis","Kieran","Eberechi","Rico","Jarrod"], last: ["Kane","Sterling","Mount","Rice","Pickford","Saka","Bellingham","Foden","Walker","Stones","Grealish","Ramsdale","Alexander-Arnold","Rashford","White","Gallagher","Maddison","Palmer","Dunk","Trippier","Eze","Lewis","Bowen"] },
  fr: { first: ["Kylian","Antoine","Olivier","Ngolo","Raphael","Theo","Jules","Mike","Eduardo","Aurelien","Ousmane","Randal","Ibrahima","Dayot","Lucas","Ferland","Youssouf","Christopher","Adrien","William","Kingsley","Benoit","Wesley"], last: ["Mbappe","Griezmann","Giroud","Kante","Varane","Hernandez","Kounde","Maignan","Camavinga","Tchouameni","Dembele","Kolo Muani","Konate","Upamecano","Mendy","Fofana","Nkunku","Rabiot","Saliba","Coman","Badiashile","Fofana"] },
  es: { first: ["Pedri","Gavi","Lamine","Ferran","Dani","Rodri","Unai","Aymeric","Jesus","Alejandro","Marco","Alvaro","Joselu","Nacho","Fabian","Alex","David","Nico","Robin","Pau","Mikel","Mikel","Sergio"], last: ["Gonzalez","Martin","Yamal","Torres","Olmo","Hernandez","Simon","Laporte","Navas","Grimaldo","Asensio","Morata","Ramos","Carvajal","Ruiz","Raya","Williams","Le Normand","Cubarsi","Merino","Oyarzabal","Gomez"] },
  de: { first: ["Jamal","Florian","Joshua","Ilkay","Kai","Antonio","Leroy","Manuel","David","Nico","Niklas","Julian","Lukas","Leroy","Marius","Dominik","Leon","Toni","Timo","Kevin","Lukas","Benedict","Jonas"], last: ["Musiala","Wirtz","Kimmich","Guendogan","Havertz","Ruediger","Sane","Neuer","Raum","Schlotterbeck","Suele","Brandt","Klostermann","Sane","Wolf","Hofmann","Goretzka","Kroos","Werner","Trapp","Nmecha","Hoewedes","Hoffmann"] },
  nl: { first: ["Virgil","Frenkie","Memphis","Cody","Denzel","Matthijs","Nathan","Steven","Teun","Joey","Xavi","Daley","Bart","Micky","Tijjani","Ryan","Wout","Jurrien","Marten","Jeremie","Georginio","Donyell","Quilindschy"], last: ["van Dijk","de Jong","Depay","Gakpo","Dumfries","de Ligt","Ake","Bergwijn","Koopmeiners","Veerman","Simons","Blind","Verbruggen","van de Ven","Reijnders","Gravenberch","Weghorst","Timber","de Roon","Frimpong","Wijnaldum","Malen","Hartman"] },
  pt: { first: ["Cristiano","Bernardo","Bruno","Rafael","Diogo","Joao","Ruben","Rui","Goncalo","Nuno","Pedro","Nelson","Danilo","Joao","Vitinha","Antonio","Ricardo","Francisco","Otavio","Jose","Joao","Joao","Matheus"], last: ["Ronaldo","Silva","Fernandes","Leao","Jota","Cancelo","Dias","Patricio","Ramos","Mendes","Goncalves","Semedo","Pereira","Palhinha","Ferreira","Silva","Horta","Trincao","Monteiro","Sa","Neves","Mario","Nunes"] },
  be: { first: ["Kevin","Romelu","Eden","Thibaut","Youri","Toby","Jan","Leandro","Jeremy","Hans","Charles","Yannick","Amadou","Alexis","Wout","Dion","Orel","Arthur","Zeno","Micky","Sebastien","Hannibal","Lois"], last: ["De Bruyne","Lukaku","Hazard","Courtois","Tielemans","Alderweireld","Vertonghen","Trossard","Doku","Vanaken","De Ketelaere","Carrasco","Onana","Saelemaekers","Faes","Doku","Mangala","Theate","Debast","Batshuayi","Bornauw","Mejbri","Openda"] },
  hr: { first: ["Luka","Ivan","Mateo","Josip","Marcel","Bruno","Andrej","Lovro","Martin","Mario","Ante","Borna","Kristijan","Dominik","Luka","Marco","Josko","Petar","Nikola","Mislav","Marko","Bartol","Roko"], last: ["Modric","Perisic","Kovacic","Juranovic","Brozovic","Petkovic","Kramaric","Majer","Erlic","Pasalic","Rukavina","Sosa","Jakirovic","Livakovic","Soldo","Pasalic","Gvardiol","Sliskovic","Vlasic","Orsic","Livaja","Barisic","Mamic"] },
  se: { first: ["Victor","Alexander","Emil","Dejan","Robin","Jesper","Kristoffer","Hugo","Ken","Edvin","Viktor","Albin","Jens","Pontus","Samuel","Marcus","Mikael","Anthony","Simon","Mattias","Isak","Ludvig","Joakim"], last: ["Lindelof","Isak","Forsberg","Kulusevski","Quaison","Karlstrom","Olsson","Larsson","Sema","Ek","Claesson","Johan","Cajuste","Dahbo","Gyokeres","Berg","Lustig","Andersson","Rohden","Johansson","Guidetti","Svensson","Hedlund"] },
  ch: { first: ["Yann","Granit","Manuel","Xherdan","Remo","Ricardo","Denis","Ruben","Silvan","Gregor","Noah","Steven","Kevin","Haris","Blerim","Dimitri","Jordan","Eray","Cedric","Loris","Fabian","Florent","Mohamed"], last: ["Sommer","Xhaka","Akanji","Shaqiri","Freuler","Rodriguez","Zakaria","Vargas","Widmer","Zuber","Okafor","Zuber","Mbabu","Seferovic","Dzemaili","Oberlin","Lotomba","Coemert","Zesiger","Benito","Rieder","Muslija","Elia"] },
  at: { first: ["David","Marko","Marcel","Xaver","Konrad","Florian","Christoph","Michael","Stefan","Karim","Nicolas","Christoph","Valentino","Aleksandar","Alexander","Gernot","Manfred","Roman","Florian","Philipp","Lukas","Julian","Kevin"], last: ["Alaba","Arnautovic","Sabitzer","Schlager","Laimer","Kainz","Baumgartner","Gregoritsch","Posch","Onisiwo","Seiwald","Wimmer","Grillitsch","Dragovic","Prass","Trauner","Woeber","Meschik","Grillitsch","Mwene","Stoeger","Daka","Danso"] },
  tr: { first: ["Hakan","Cengiz","Caglar","Merih","Orkun","Yusuf","Irfan","Burak","Ugurcan","Kaan","Ridvan","Okay","Mert","Ozan","Kerem","Halil","Okay","Salih","Enes","Miran","Eren","Serdar","Murat"], last: ["Calhanoglu","Uender","Soeyuencue","Demiral","Koekcue","Yazici","Yazici","Yilmaz","Cakir","Ayhan","Yilmaz","Yokuslu","Guenok","Kabak","Aktuerkoglu","Dervisoglu","Keles","Oezcan","Uenal","Kilic","Dursun","Aziz","Saglam"] },
  no: { first: ["Erling","Martin","Sander","Morten","Fredrik","Kristian","Stefan","Mohamed","Jorgen","Even","Andreas","Jesper","Emil","Marcus","Mathias","Oscar","Mats","Tobias","Julian","Henrik","Jonathan","Oliver","Sondre"], last: ["Haaland","Odegaard","Berge","Thorsby","Aursnes","Thorstvedt","Strandberg","Elyounoussi","Larsen","Hovland","Hanche-Olsen","Lindstrom","Bohinen","Holmgren","Pedersen","Bobber","Jenssen","Gulliksen","Boerven","Daehli","Hauge","Valaker","Langen"] },
  cz: { first: ["Tomas","Patrik","Vladimir","Jakub","Lukas","Jan","Pavel","Alexandr","Borek","Vaclav","Antonin","Jaroslav","David","Michal","Ondrej","Milan","Adam","Martin","Stanislav","Roman","Simon","Karel","Josef"], last: ["Soucek","Schick","Coufal","Jankto","Provod","Boril","Masopust","Zima","Dozkal","Cerny","Barak","Krmencik","Pavelka","Sadilek","Celustka","Hlozek","Zmrhal","Kalas","Pesek","Krejci","Castillo","Brabec","Zima"] },
  br: { first: ["Alisson","Neymar","Vinicius","Richarlison","Casemiro","Marquinhos","Raphinha","Lucas","Gabriel","Gabriel","Rodrygo","Eder","Fred","Alex","Danilo","Bruno","Gleison","Pedro","Weverton","Ayrton","Leo","Andre","Joelinton"], last: ["Becker","Junior","Paqueta","Silva","Santos","Militão","Jesus","Martinelli","Magalhaes","Barbosa","Sanches","Oliveira","Telles","Pereira","Lucas","Willian","Gomes","Bento","Sobis","Bremer","Alves","Joelinton","Gabriel"] },
  ar: { first: ["Lionel","Angel","Julian","Enzo","Lautaro","Alejandro","Nahuel","Rodrigo","Cristian","Nicolas","Paulo","Marcos","Leandro","Guido","German","Gonzalo","Juan","Emiliano","Geronimo","Thiago","Exequiel","Lucas","Alexis"], last: ["Messi","Di Maria","Alvarez","Fernandez","Martinez","Garnacho","Molina","De Paul","Romero","Otamendi","Dybala","Acuna","Paredes","Rodriguez","Pezzella","Lo Celso","Foyth","Martinez","Rulli","Almada","Palacios","Ocampos","Mc Allister"] },
  uy: { first: ["Federico","Darwin","Facundo","Rodrigo","Ronald","Manuel","Mathias","Felipe","Jose","Luis","Nicolas","Giorgian","Edinson","Sebastian","Fernando","Agustin","Franco","Maximiliano","Brian","Ignacio","Adrian","Cristian","Emiliano"], last: ["Valverde","Nunez","Pellistri","Bentancur","Araujo","Ugarte","Olivera","Carballo","Gimenez","Suarez","De la Cruz","Vecino","Cavani","Coates","Muslera","Canobbio","Pereiro","de los Santos","Ocampo","Alonso","Olivera","Rodriguez","Martinez"] },
  co: { first: ["James","Luis","Davinson","Yerry","Devis","Rafael","Carlos","Juan","Jhon","Mateus","Steven","Wilmar","Johan","Cristian","Davinson","Yairo","Yimmi","Miguel","Andres","Kevin","Frank","Harold","Santiago"], last: ["Rodriguez","Diaz","Sanchez","Mina","Ospina","Borre","Cuesta","Quintero","Arias","Uribe","Lerma","Barrios","Mojica","Zapata","Moreno","Chara","Bacca","Borja","Santos","Mier","Pabon","Preciado","Ariza"] },
  ec: { first: ["Enner","Moises","Pervis","Piero","Jhegson","Gonzalo","Jeremy","Alan","Joao","Willian","Roberto","Felix","Jackson","Jose","Carlos","Marlon","Bryan","Xavier","Jordi","Nilson","Danny","Ayrton","Anderson"], last: ["Valencia","Caicedo","Estupinan","Hincapie","Mendez","Plata","Delgado","Minda","Ortiz","Pacho","Arboleda","Arboleda","Porozo","Delgado","Guevara","Gonzales","Carabali","Preciado","Caicedo","Vera","Canga","Morales","Angulo"] },
  py: { first: ["Miguel","Antony","Carlos","Junior","Richard","Angel","Alejandro","Julio","Derlis","Braian","Gustavo","Ivan","Hector","Omar","Walter","Blas","Mathias","Luis","Fabian","Cristian","Hugo","Sergio","Italos"], last: ["Almiron","Sanabria","Gonzalez","Alonso","Ortiz","Romero","Gamarra","Enciso","Martinez","Samudio","Gimenez","Vargas","Morales","Alderete","Gonzalez","Caceres","Villalba","Zarate","Balbuena","Avalos","Velazquez","Dominguez","Rojas"] },
  jp: { first: ["Shinji","Ritsu","Takefusa","Takumi","Wataru","Ko","Ayase","Hiroki","Miki","Gaku","Hidemasa","Kento","Yuki","Daichi","Kaoru","Takehiro","Mao","Shuto","Ryota","Junya","Koki","Ryo","Kosuke"], last: ["Minamino","Doan","Kubo","Minamino","Endo","Itakura","Ueda","Ito","Yamane","Shibasaki","Morita","Nakamura","Soma","Kamada","Mitoma","Tomiyasu","Hosoya","Machino","Morishita","Osako","Ito","Machida","Nakamura"] },
  kr: { first: ["Son","Hee-chan","Heung-min","Woo-young","Min-jae","In-beom","Kang-in","Tae-hwan","Jae-sung","Dong-won","Sung-gyu","Seung-ho","Jung-hyun","Won-jae","Seok-hyun","Hyun-woo","Jung-sung","Ho-yeon","Gwang-yeon","Jin-ho","Young-chan","Seong-hun","Dong-kyeong"], last: ["Heung-min","Hwang","Son","Hwang","Kim","Lee","Lee","Kim","Lee","Ji","Jo","Paik","Kim","Eom","Hyun","Cho","Lee","Jeong","Kim","Song","Park","Moon","Kang"] },
  sa: { first: ["Salem","Fahad","Abdulrahman","Yasser","Mohammed","Sultan","Saud","Ali","Hassan","Nasser","Abdullah","Ahmed","Khalid","Faisal","Nawaf","Housain","Majed","Nasser","Abdulfattah","Ziyad","Mohammed","Rayan","Turki"], last: ["Al-Dosari","Al-Muwallad","S. Al-Dosari","Al-Shahrani","Al-Muwallad","Al-Harbi","Abdulhamid","Al-Bulayhi","Tambakti","Al-Dawsari","Kanno","Kadesh","Ghaleb","Al-Malki","Al-Aqidi","Al-Montashari","Al-Najjar","Al-Shahrani","Al-Jaber","Al-Johani","Marega","Bakshween","Al-Hassan"] },
  qa: { first: ["Akram","Almoez","Hassan","Boualem","Ahmed","Ali","Bassam","Abdulaziz","Abdelkarim","Abdullah","Karim","Tarek","Shahin","Tameem","Naif","Musaab","Ró-Ró","Khadim","Meshaal","Yousef","Hamam","Ismaeel","Omar"], last: ["Afif","Ali","Al-Haydos","Khoukhi","Al-Zereik","Assadalla","Al-Rawi","Hatem","Darwish","Al-Ahrak","Boudiaf","Abdullah","Hassan","Al-Abdullah","Al-Hadhrami","Khidir","Abdullah","Yahya","Barsham","Abdullah","Al-Amin","Mohamad","Hakim"] },
  ir: { first: ["Mehdi","Sardar","Alireza","Shoja","Ali","Saman","Vahid","Alireza","Ramin","Hossein","Sadegh","Majid","Omid","Ahmad","Mohammad","Behran","Ali","Saeed","Arman","Amir","Soroush","Peyman","Mohammad"], last: ["Taremi","Azmoun","Jahanbakhsh","Khalilzadeh","Gholizadeh","Ghoddos","Ghafouri","Beiranvand","Rezaeian","Kanani","Ebrahimi","Hosseini","Ebrahimi","Noorollahi","Moharrami","Wahid","Karimi","Aghaei","Ansari","Abedzadeh","Rafiee","Esmaeili","Hosseini"] },
  uz: { first: ["Eldor","Oston","Jaloliddin","Khojiakbar","Doston","Odil","Farrukh","Akhrol","Rustam","Abbos","Sherzod","Husniddin","Ulugbek","Ibrokhim","Diyor","Aziz","Djamshid","Davron","Khurshid","Shukhrat","Sanjar","Bekhzod","Vokhid"], last: ["Shomurodov","Urunov","Masharipov","Alijonov","Khamdamov","Khamrobekov","Sayfiev","Risqullaev","Ashurmatov","Abdullaev","Mukhiddinov","Aliqulov","Yusupov","Khalilov","Kholmatov","Ganiev","Iskanderov","Khojaev","Anorov","Muladjanov","Tursunov","Bekmurodov","Shodiev"] },
  iq: { first: ["Mohannad","Jalal","Ahmed","Amir","Ali","Hussein","Osama","Safaa","Zaid","Mohammed","Ibraheem","Karrar","Fahad","Hussein","Ali","Atheer","Samer","Mustafa","Mahdi","Mahmoud","Yassir","Hussein","Ibrahim"], last: ["Abdul-Raheem","Hassan","Ibrahim","Ali","Adnan","Mhawi","Rashid","Hadi","Tahseen","Qasim","Attwan","Mohan","Al-Azzawi","Ali","Jasim","Madan","Saeed","Nadhim","Kamel","Fawzi","Rasan","Rahim","Muna"] },
  jo: { first: ["Ali","Hamza","Ihsan","Musa","Mahmoud","Mohammad","Anas","Ahmed","Yazan","Nooh","Hasan","Hassan","Yousef","Moath","Amin","Suleiman","Ibrahim","Saleh","Rashid","Khalil","Ahmad","Abdallah","Saeed"], last: ["Al-Tamari","Al-Dardour","Al-Mbaideen","Suleiman","Al-Mardi","Sharah","Bani Yassin","Samir","Al-Naimat","Al-Farhan","Abu Hashish","Jaber","Rawashdeh","Shatnawi","Qandil","Abu Zrait","Marie","Faisal","Abu-Taha","Ersan","Shibly","Hamarweh","Nazzal"] },
  mx: { first: ["Guillermo","Raul","Hirving","Edson","Jesus","Luis","Hector","Johan","Kevin","Carlos","Uriel","Andres","Julio","Jorge","Fernando","Alexis","Henry","Gerardo","Sergio","Cesar","Nestor","Jose","Sebastian"], last: ["Ochoa","Jimenez","Lozano","Alvarez","Gallardo","Romero","Moreno","Vasquez","Alvarez","Rodriguez","Antuna","Montes","Gonzalez","Sanchez","Beltran","Vega","Martin","Arteaga","Romo","Reyes","Araujo","Antuna","Cordova"] },
  us: { first: ["Christian","Weston","Tyler","Tim","Antonee","Giovanni","Ricardo","Brenden","Yunus","Malik","Luca","Folarin","Chris","Walker","Auston","Cade","Mark","Jalen","Miles","Shaq","Cole","Ethan","Gabriel"], last: ["Pulisic","McKennie","Adams","Ream","Robinson","Reyna","Pepi","Aaronson","Musah","Tillman","de la Torre","Balogun","Richards","Zimmerman","Trusty","Cowell","McKenzie","Neal","Robinson","Moore","Bassett","Horvath","Slonina"] },
  ca: { first: ["Alphonso","Jonathan","Lucas","Stephen","Tajon","Cyle","Maxime","Ismael","Sam","Kamal","Richie","Liam","Dayne","Creighton","Derek","Mathieu","David","Jacen","James","Ike","Joel","Kwesi","Marco"], last: ["Davies","David","Cavallini","Eustaquio","Buchanan","Larin","Grosso","Kone","Adekugbe","Miller","Zator","Millar","Rutledge","Okello","Cornelius","Choinier","Hoilett","Le","Pantemis","Smith","Waterman","Adjei","Carducci"] },
  ht: { first: ["Duckens","Franeck","Kevin","Carlens","Alex","Derrick","Johny","Charaf","Stephane","Andre","Leverton","Bryan","Wilde","Mechack","Jeff","Woodensky","Ricardo","Jems","Bleriot","Jean","Gary","Roberto","Pierre"], last: ["Nazon","Polinus","Pierre","Arcus","Junior","Degand","Alexis","Lombardo","Lambese","Lafrance","Pierre","Alcenat","Donald","Jerome","Jean","Francois","Ade","Chery","Borgelin","Kensley","Lemaître","Bastien","Dumas"] },
  pa: { first: ["Jose","Rolando","Anibal","Ismael","Edgar","Cristian","Yeltsin","Adalberto","Alberto","Eric","Cesar","Yahziel","Fidel","Cecilio","Freddy","Jorman","Cesar","Eddie","Jairo","Luis","Roderick","Ricardo","Omar"], last: ["Calderon","Blackburn","Godoy","Diaz","Barcenas","Martinez","Rojas","Carrasquilla","Cedeño","Quintero","Yanis","Cubillas","Escobar","Waterman","Gondola","Aguilar","Samudio","Roberts","Jimenez","Tejada","Miller","Phillips","Ortega"] },
  nz: { first: ["Chris","Winston","Eli","Joe","Ryan","Sarpreet","Clayton","Tim","Che","Andre","Michael","Matthew","Marko","Nando","James","Alex","Kosta","Cameron","Tommy","Themistoklis","Sam","Luis","Logan"], last: ["Wood","Reid","Waetford","Bell","Thomas","Singh","Lewis","Payne","Penn","de Jong","McGlinchey","Ridenton","Stamenic","Pijnaker","Moss","Rufer","Barbarouses","Howieson","Smith","Tzimas","Sutton","Toomey","Rogerson"] },
  ba: { first: ["Edin","Miralem","Sead","Asmir","Rade","Izet","Haris","Mario","Armin","Miroslav","Muhamed","Adnan","Ognjen","Danijel","Elvedin","Damir","Gojko","Gradimir","Ibrahim","Adis","Branimir","Jusuf","Zoran"], last: ["Dzeko","Pjanic","Kolasinac","Krunić","Begovic","Sareevic","Hodzic","Vrancic","Golubovic","Stevanovic","Besimovic","Kovacevic","Stanic","Milanovic","Muminovic","Neimarlija","Cimirot","Bosnic","Majer","Sisic","Duricic","Hajradinovic","Todorovic"] },
  sco: { first: ["Andy","John","Scott","Kieran","Aaron","David","Stuart","Lyndon","Ryan","Greg","Anthony","Ryan","Liam","Kenny","Nathan","Craig","Stephen","Allan","Billy","Kevin","James","Ross","Charlie"], last: ["Robertson","McGinn","McTominay","Tierney","Hickey","Marshall","Armstrong","Dykes","Patterson","Taylor","Ralston","Christie","Cooper","McLean","Patterson","Gordon","Donnell","Montgomery","Gilmour","Nisbet","Forrest","McGregor","Mulgrew"] },
  cw: { first: ["Charlison","Jarchinio","Brandley","Ruensley","Richairo","Quinton","Sean","Godfried","Johnven","Oswin","Hillary","Jurino","Pablo","Kyrian","Rudy","Dwayne","Kemy","Vidar","Kevin","Gregor","Tyron","Pedro","Shermaine"], last: ["Benschop","Antonia","Kuwas","Leuteria","Zivkovic","Boel","Kast","De Linda","Griffin","Apau","Echteld","Loran","Jonathan","Alphonse","Martina","Samb","Dos Santos","Mella","Sint-Jago","Francis","Hato","Francis","Valpoort"] },
  cd: { first: ["Cedric","Beni","Gedeon","Gael","Arthur","Samuel","Chancel","Aaron","Jonathan","Elias","John","Fabrice","Meschak","Nehuen","Omenuke","Pitchou","Britt","Joris","Riva","David","Franck","Lionel","Yves"], last: ["Mbakambu","Malango","Kalulu","Kakuta","Masuaku","Moutoussamy","Mbemba","Tshibola","Bolingi","Mpanzu","Bakata","Lusala","Elia","Paz","Mfulu","Bola","Assombalonga","Kayembe","Ndombasi","Kanda","Muleka","Bolaingwa","Mulumbu"] }
};

const FORMATIONS = ["4-3-3", "4-4-2", "4-2-3-1", "3-4-3", "5-3-2", "4-1-4-1", "3-5-2", "4-3-1-2"];
const TEAM_FORMATIONS = {
  br: "4-3-3", ar: "4-3-3", fr: "4-2-3-1", es: "4-3-3", de: "4-2-3-1",
  nl: "4-3-3", pt: "4-3-3", eng: "4-3-3", be: "3-4-3",
  hr: "4-3-3", uy: "4-4-2", jp: "4-2-3-1", kr: "4-4-2", us: "4-3-3",
  mx: "4-3-3"
};

const POSITIONS = ["GK","GK","GK","DF","DF","DF","DF","DF","DF","DF","DF","MF","MF","MF","MF","MF","MF","MF","MF","FW","FW","FW","FW"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateSquad(teamId) {
  const pool = NAME_POOLS[teamId] || NAME_POOLS["gb-eng"];
  const firstNames = shuffle(pool.first);
  const lastNames = shuffle(pool.last);
  const posList = shuffle(POSITIONS);
  const formation = TEAM_FORMATIONS[teamId] || FORMATIONS[Math.floor(Math.random() * FORMATIONS.length)];

  const players = [];
  const used = new Set();
  for (let i = 0; i < 23; i++) {
    let fn = firstNames[i % firstNames.length];
    let ln = lastNames[i % lastNames.length];
    let name = fn + " " + ln;
    let attempts = 0;
    while (used.has(name) && attempts < 20) {
      fn = firstNames[Math.floor(Math.random() * firstNames.length)];
      ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      name = fn + " " + ln;
      attempts++;
    }
    used.add(name);
    players.push({
      name, number: i + 1, position: posList[i],
      age: 19 + Math.floor(Math.random() * 16),
      photo: "https://ui-avatars.com/api/?name=" + encodeURIComponent(fn + "+" + ln) + "&background=1a5f2a&color=fff&size=60&bold=true&font-size=0.4"
    });
  }

  // Renumber by position
  let num = 1;
  ["GK","DF","MF","FW"].forEach(pos => {
    players.filter(p => p.position === pos).forEach(p => { p.number = num++; });
  });

  const cpLast = pool.last.filter(n => n.length > 3);
  const coach = cpLast.length > 0
    ? (pool.first[Math.floor(Math.random() * pool.first.length)] + " " + cpLast[Math.floor(Math.random() * cpLast.length)])
    : "TBD";

  return { players: players.sort((a, b) => a.number - b.number), formation, coach };
}

// === Update ===
console.log("Generating squads for 48 teams...\n");
data.teamsData.forEach(team => {
  const squad = generateSquad(team.id);
  team.players = squad.players;
  team.formation = squad.formation;
  team.coach = squad.coach;
  console.log("  " + team.id.padEnd(5) + " " + (team.name || "").padEnd(20) + " " + squad.formation + "  " + squad.coach);
});

data._last_updated = new Date().toISOString();
fs.writeFileSync("./data/data.json", JSON.stringify(data, null, 2), "utf8");
console.log("\nDone! " + data.teamsData.length + " teams, " + (data.teamsData.length * 23) + " players total.");
