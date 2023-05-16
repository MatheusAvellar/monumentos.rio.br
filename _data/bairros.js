const bairros = [
	{ id: "000", imrj: 90, name: "Parque Nacional da Tijuca", ra: "viii" },
	{ id: "001", imrj: 2, name: "Saúde", ra: "i" },
	{ id: "002", imrj: 18, name: "Gamboa", ra: "i" },
	{ id: "003", imrj: 59, name: "Santo Cristo", ra: "i" },
	{ id: "004", imrj: 0, name: "Caju", ra: "i" },
	{ id: "005", imrj: 256, name: "Centro", ra: "ii" },
	{ id: "006", imrj: 6, name: "Catumbi", ra: "iii" },
	{ id: "007", imrj: 4, name: "Rio Comprido", ra: "iii" },
	{ id: "008", imrj: 7, name: "Cidade Nova", ra: "iii" },
	{ id: "009", imrj: 0, name: "Estácio", ra: "iii" },
	{ id: "010", imrj: 59, name: "São Cristóvão", ra: "vii" },
	{ id: "011", imrj: 0, name: "Mangueira", ra: "vii" },
	{ id: "012", imrj: 8, name: "Benfica", ra: "vii" },
	{ id: "013", imrj: 58, name: "Paquetá", ra: "xxi" },
	{ id: "014", imrj: 13, name: "Santa Teresa", ra: "xxiii" },
	{ id: "015", imrj: 18, name: "Flamengo", ra: "iv" },
	{ id: "016", imrj: 81, name: "Glória", ra: "iv" },
	{ id: "017", imrj: 15, name: "Laranjeiras", ra: "iv" },
	{ id: "018", imrj: 0, name: "Catete", ra: "iv" },
	{ id: "019", imrj: 8, name: "Cosme Velho", ra: "iv" },
	{ id: "020", imrj: 39, name: "Botafogo", ra: "iv" },
	{ id: "021", imrj: 4, name: "Humaitá", ra: "iv" },
	{ id: "022", imrj: 21, name: "Urca", ra: "iv" },
	{ id: "023", imrj: 8, name: "Leme", ra: "v" },
	{ id: "024", imrj: 46, name: "Copacabana", ra: "v" },
	{ id: "025", imrj: 19, name: "Ipanema", ra: "vi" },
	{ id: "026", imrj: 36, name: "Leblon", ra: "vi" },
	{ id: "027", imrj: 50, name: "Lagoa", ra: "vi" },
	{ id: "028", imrj: 4, name: "Jardim Botânico", ra: "vi" },
	{ id: "029", imrj: 31, name: "Gávea", ra: "vi" },
	{ id: "030", imrj: 0, name: "Vidigal", ra: "vi" },
	{ id: "031", imrj: 4, name: "São Conrado", ra: "vi" },
	{ id: "032", imrj: 0, name: "Praça da Bandeira", ra: "viii" },
	{ id: "033", imrj: 82, name: "Tijuca", ra: "viii" },
	{ id: "034", imrj: 21, name: "Alto da Boa Vista", ra: "viii" },
	{ id: "035", imrj: 4, name: "Maracanã", ra: "ix" },
	{ id: "036", imrj: 13, name: "Vila Isabel", ra: "ix" },
	{ id: "037", imrj: 0, name: "Andaraí", ra: "ix" },
	{ id: "038", imrj: 4, name: "Grajaú", ra: "ix" },
	{ id: "039", imrj: 0, name: "Manguinhos", ra: "x" },
	{ id: "040", imrj: 8, name: "Bonsucesso", ra: "x" },
	{ id: "041", imrj: 3, name: "Ramos", ra: "x" },
	{ id: "042", imrj: 1, name: "Olaria", ra: "x" },
	{ id: "043", imrj: 12, name: "Penha", ra: "xi" },
	{ id: "044", imrj: 0, name: "Penha Circular", ra: "xi" },
	{ id: "045", imrj: 0, name: "Brás de Pina", ra: "xi" },
	{ id: "046", imrj: 2, name: "Cordovil", ra: "xxxi" },
	{ id: "047", imrj: 0, name: "Parada de Lucas", ra: "xxxi" },
	{ id: "048", imrj: 1, name: "Vigário Geral", ra: "xxxi" },
	{ id: "049", imrj: 0, name: "Jardim América", ra: "xxxi" },
	{ id: "050", imrj: 0, name: "Higienópolis", ra: "xii" },
	{ id: "051", imrj: 0, name: "Jacaré", ra: "xiii" },
	{ id: "052", imrj: 0, name: "Maria da Graça", ra: "xii" },
	{ id: "053", imrj: 0, name: "Del Castilho", ra: "xii" },
	{ id: "054", imrj: 2, name: "Inhaúma", ra: "xii" },
	{ id: "055", imrj: 0, name: "Engenho da Rainha", ra: "xii" },
	{ id: "056", imrj: 0, name: "Tomás Coelho", ra: "xii" },
	{ id: "057", imrj: 0, name: "São Francisco Xavier", ra: "xiii" },
	{ id: "058", imrj: 0, name: "Rocha", ra: "xiii" },
	{ id: "059", imrj: 1, name: "Riachuelo", ra: "xiii" },
	{ id: "060", imrj: 0, name: "Sampaio", ra: "xiii" },
	{ id: "061", imrj: 0, name: "Engenho Novo", ra: "xiii" },
	{ id: "062", imrj: 0, name: "Lins de Vasconcelos", ra: "xiii" },
	{ id: "063", imrj: 12, name: "Méier", ra: "xiii" },
	{ id: "064", imrj: 0, name: "Todos os Santos", ra: "xiii" },
	{ id: "065", imrj: 4, name: "Cachambi", ra: "xiii" },
	{ id: "066", imrj: 5, name: "Engenho de Dentro", ra: "xiii" },
	{ id: "067", imrj: 0, name: "Água Santa", ra: "xiii" },
	{ id: "068", imrj: 0, name: "Encantado", ra: "xiii" },
	{ id: "069", imrj: 0, name: "Piedade", ra: "xiii" },
	{ id: "070", imrj: 0, name: "Abolição", ra: "xiii" },
	{ id: "071", imrj: 2, name: "Pilares", ra: "xiii" },
	{ id: "072", imrj: 1, name: "Vila Kosmos", ra: "xiv" },
	{ id: "073", imrj: 1, name: "Vicente de Carvalho", ra: "xiv" },
	{ id: "074", imrj: 0, name: "Vila da Penha", ra: "xiv" },
	{ id: "075", imrj: 1, name: "Vista Alegre", ra: "xiv" },
	{ id: "076", imrj: 6, name: "Irajá", ra: "xiv" },
	{ id: "077", imrj: 0, name: "Colégio", ra: "xiv" },
	{ id: "078", imrj: 0, name: "Campinho", ra: "xv" },
	{ id: "079", imrj: 3, name: "Quintino Bocaiuva", ra: "xv" },
	{ id: "080", imrj: 0, name: "Cavalcanti", ra: "xv" },
	{ id: "081", imrj: 0, name: "Engenheiro Leal", ra: "xv" },
	{ id: "082", imrj: 2, name: "Cascadura", ra: "xv" },
	{ id: "083", imrj: 12, name: "Madureira", ra: "xv" },
	{ id: "084", imrj: 0, name: "Vaz Lobo", ra: "xv" },
	{ id: "085", imrj: 1, name: "Turiaçu", ra: "xv" },
	{ id: "086", imrj: 4, name: "Rocha Miranda", ra: "xv" },
	{ id: "087", imrj: 1, name: "Honório Gurgel", ra: "xv" },
	{ id: "088", imrj: 1, name: "Oswaldo Cruz", ra: "xv" },
	{ id: "089", imrj: 1, name: "Bento Ribeiro", ra: "xv" },
	{ id: "090", imrj: 2, name: "Marechal Hermes", ra: "xv" },
	{ id: "091", imrj: 1, name: "Ribeira", ra: "xx" },
	{ id: "092", imrj: 1, name: "Zumbi", ra: "xx" },
	{ id: "093", imrj: 2, name: "Cacuia", ra: "xx" },
	{ id: "094", imrj: 1, name: "Pitangueiras", ra: "xx" },
	{ id: "095", imrj: 0, name: "Praia da Bandeira", ra: "xx" },
	{ id: "096", imrj: 3, name: "Cocotá", ra: "xx" },
	{ id: "097", imrj: 0, name: "Bancários", ra: "xx" },
	{ id: "098", imrj: 3, name: "Freguesia (Ilha do Governador)", ra: "xx" },
	{ id: "099", imrj: 6, name: "Jardim Guanabara", ra: "xx" },
	{ id: "100", imrj: 2, name: "Jardim Carioca", ra: "xx" },
	{ id: "101", imrj: 2, name: "Tauá", ra: "xx" },
	{ id: "102", imrj: 0, name: "Moneró", ra: "xx" },
	{ id: "103", imrj: 2, name: "Portuguesa", ra: "xx" },
	{ id: "104", imrj: 4, name: "Galeão", ra: "xx" },
	{ id: "105", imrj: 1, name: "Cidade Universitária", ra: "xx" },
	{ id: "106", imrj: 0, name: "Guadalupe", ra: "xxii" },
	{ id: "107", imrj: 0, name: "Anchieta", ra: "xxii" },
	{ id: "108", imrj: 0, name: "Parque Anchieta", ra: "xxii" },
	{ id: "109", imrj: 1, name: "Ricardo de Albuquerque", ra: "xxii" },
	{ id: "110", imrj: 1, name: "Coelho Neto", ra: "xxv" },
	{ id: "111", imrj: 0, name: "Acari", ra: "xxv" },
	{ id: "112", imrj: 0, name: "Barros Filho", ra: "xxv" },
	{ id: "113", imrj: 0, name: "Costa Barros", ra: "xxv" },
	{ id: "114", imrj: 3, name: "Pavuna", ra: "xxv" },
	{ id: "115", imrj: 12, name: "Jacarepaguá", ra: "xvi" },
	{ id: "116", imrj: 0, name: "Anil", ra: "xvi" },
	{ id: "117", imrj: 0, name: "Gardênia Azul", ra: "xvi" },
	{ id: "118", imrj: 0, name: "Cidade de Deus", ra: "xxxiv" },
	{ id: "119", imrj: 0, name: "Curicica", ra: "xvi" },
	{ id: "120", imrj: 1, name: "Freguesia (Jacarepaguá)", ra: "xvi" },
	{ id: "121", imrj: 0, name: "Pechincha", ra: "xvi" },
	{ id: "122", imrj: 0, name: "Taquara", ra: "xvi" },
	{ id: "123", imrj: 0, name: "Tanque", ra: "xvi" },
	{ id: "124", imrj: 0, name: "Praça Seca", ra: "xvi" },
	{ id: "125", imrj: 0, name: "Vila Valqueire", ra: "xvi" },
	{ id: "126", imrj: 0, name: "Joá", ra: "xxiv" },
	{ id: "127", imrj: 0, name: "Itanhangá", ra: "xxiv" },
	{ id: "128", imrj: 0, name: "Barra da Tijuca", ra: "xxiv" },
	{ id: "129", imrj: 0, name: "Camorim", ra: "xxiv" },
	{ id: "130", imrj: 0, name: "Vargem Pequena", ra: "xxiv" },
	{ id: "131", imrj: 0, name: "Vargem Grande", ra: "xxiv" },
	{ id: "132", imrj: 11, name: "Recreio dos Bandeirantes", ra: "xxiv" },
	{ id: "133", imrj: 1, name: "Grumari", ra: "xxiv" },
	{ id: "134", imrj: 0, name: "Deodoro", ra: "xxxiii" },
	{ id: "135", imrj: 9, name: "Vila Militar", ra: "xxxiii" },
	{ id: "136", imrj: 0, name: "Campo dos Afonsos", ra: "xxxiii" },
	{ id: "137", imrj: 3, name: "Jardim Sulacap", ra: "xxxiii" },
	{ id: "138", imrj: 0, name: "Magalhães Bastos", ra: "xxxiii" },
	{ id: "139", imrj: 6, name: "Realengo", ra: "xxxiii" },
	{ id: "140", imrj: 3, name: "Padre Miguel", ra: "xvii" },
	{ id: "141", imrj: 11, name: "Bangu", ra: "xvii" },
	{ id: "142", imrj: 2, name: "Senador Camará", ra: "xvii" },
	{ id: "143", imrj: 0, name: "Santíssimo", ra: "xviii" },
	{ id: "144", imrj: 45, name: "Campo Grande", ra: "xviii" },
	{ id: "145", imrj: 1, name: "Senador Vasconcelos", ra: "xviii" },
	{ id: "146", imrj: 3, name: "Inhoaíba", ra: "xviii" },
	{ id: "147", imrj: 3, name: "Cosmos", ra: "xviii" },
	{ id: "148", imrj: 1, name: "Paciência", ra: "xix" },
	{ id: "149", imrj: 19, name: "Santa Cruz", ra: "xix" },
	{ id: "150", imrj: 7, name: "Sepetiba", ra: "xix" },
	{ id: "151", imrj: 0, name: "Guaratiba", ra: "xxvi" },
	{ id: "152", imrj: 5, name: "Barra de Guaratiba", ra: "xxvi" },
	{ id: "153", imrj: 6, name: "Pedra de Guaratiba", ra: "xxvi" },
	{ id: "154", imrj: 0, name: "Rocinha", ra: "xxvii" },
	{ id: "155", imrj: 0, name: "Jacarezinho", ra: "xxviii" },
	{ id: "156", imrj: 0, name: "Complexo do Alemão", ra: "xxix" },
	{ id: "157", imrj: 0, name: "Maré", ra: "xxx" },
	{ id: "158", imrj: 0, name: "Vasco da Gama", ra: "vii" },
	{ id: "159", imrj: 0, name: "Parque Colúmbia", ra: "xxv" },
	{ id: "160", imrj: 0, name: "Gericinó", ra: "xvii" },
	{ id: "161", imrj: 0, name: "Lapa", ra: "ii" },
	{ id: "162", imrj: 0, name: "Vila Kennedy", ra: "xvii" },
	{ id: "163", imrj: 0, name: "Jabour", ra: "xvii" },
	{ id: "164", imrj: 0, name: "Ilha de Guaratiba", ra: "xxvi" }
];
module.exports = bairros;