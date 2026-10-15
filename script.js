const menu = document.getElementById("configuracoes");
const blurBG = document.getElementById("blur");
const xBlurBG = document.getElementById("blurXtra");

let idiomaAtual = "pt";
let jogadores = [];
let jogadorAtual = 0;
let tirouDupla = 0;

// Declaração dos textos nos dois idiomas

const textosG = {

    // Textos gerais em Português

    pt: {
        idioma: "🌐 Português",
        msg_configurar_jogadores: "Selecione a Quantidade de Jogadores:",
        dois_jogadores: "2 Jogadores",
        tres_jogadores: "3 Jogadores",
        quatro_jogadores: "4 Jogadores",
        jogador_1: "Jogador 1: ",
        jogador_2: "Jogador 2: ",
        jogador_3: "Jogador 3: ",
        jogador_4: "Jogador 4: ",
        simular_dados: "Simular o Lançamento dos Dados?",
        btn_usar_dados: "✅ Sim",
        btn_nao_usar_dados: "❌ Não",
        btn_iniciar_jogo: "Iniciar Jogo",
        titulo_jogadores: "Jogadores:",
        rolar_dados: "Rolar os Dados",
        passar_vez: "Passar Vez",
        titulo_propriedade_avenda: "Propriedade à Venda!",
        btn_passar_compra: "Passar",
        btn_comprar_propriedade: "Comprar"
    },

    // Textos gerais em Inglês

    en: {
        idioma: "🌐 English",
        msg_configurar_jogadores: "Select the Number of Players:",
        dois_jogadores: "2 Players",
        tres_jogadores: "3 Players",
        quatro_jogadores: "4 Players",
        jogador_1: "Player 1: ",
        jogador_2: "Player 2: ",
        jogador_3: "Player 3: ",
        jogador_4: "Player 4: ",
        simular_dados: "Simulate the Dice Roll?",
        btn_usar_dados: "✅ Yes",
        btn_nao_usar_dados: "❌ No",
        btn_iniciar_jogo: "Start Game",
        titulo_jogadores: "Players:",
        rolar_dados: "Roll the Dice",
        passar_vez: "End Turn",
        titulo_propriedade_avenda: "Property for Sale!",
        btn_passar_compra: "Pass",
        btn_comprar_propriedade: "Buy"
    }
}

const textosP = {

    // Nomes das propriedades em Português

    pt: {
        casa_0: "Passagem do Rei",
        casa_1: "Dirtmouth",
        casa_2: "Encruzilhada Esquecida",
        casa_3: "Lago Azul",
        casa_4: "Cânion da Névoa",
        casa_5: "Estação de Besouro",
        casa_6: "Caminho Verde",
        casa_7: "Exploração",
        casa_8: "Ermos Fúngicos",
        casa_9: "Jardins da Rainha",
        casa_10: "Templo do Ovo Negro",
        casa_11: "Cidade das Lágrimas",
        casa_12: "Casa dos Prazeres",
        casa_13: "Hidrovia Real",
        casa_14: "Santuário das Almas",
        casa_15: "Estação de Besouro",
        casa_16: "Pico de Cristal",
        casa_17: "Penhascos Uivantes",
        casa_18: "Exploração",
        casa_19: "Coroa de Hallownest",
        casa_20: "Fontes Termais",
        casa_21: "Ninho Profundo",
        casa_22: "Exploração",
        casa_23: "Bacia Antiga",
        casa_24: "O Abismo",
        casa_25: "Estação de Besouro",
        casa_26: "Palácio Branco",
        casa_27: "Lar dos Deuses",
        casa_28: "Lago de Unn",
        casa_29: "Santuário dos Fiéis",
        casa_30: "Seja Selado",
        casa_31: "Pináculo do Observador",
        casa_32: "Covil da Besta",
        casa_33: "Exploração",
        casa_34: "Arquivos da Professora",
        casa_35: "Estação de Besouro",
        casa_36: "Terra do Descanso",
        casa_37: "Coliseu dos Tolos",
        casa_38: "Borda do Reino",
        casa_39: "A Colmeia",
    },

    // Nome das propriedades em Inglês

    en: {
        casa_0: "King's Pass",
        casa_1: "Dirtmouth",
        casa_2: "Forgotten Crossroads",
        casa_3: "Blue Lake",
        casa_4: "Fog Canyon",
        casa_5: "Stag Station",
        casa_6: "Greenpath",
        casa_7: "Exploration",
        casa_8: "Fungal Wastes",
        casa_9: "Queen's Garden",
        casa_10: "Black Egg Temple",
        casa_11: "City of Tears",
        casa_12: "Pleasure House",
        casa_13: "Royal Waterways",
        casa_14: "Soul Sanctum",
        casa_15: "Stag Station",
        casa_16: "Crystal Peak",
        casa_17: "Howling Cliffs",
        casa_18: "Exploration",
        casa_19: "Hallownest's Crown",
        casa_20: "Hot Springs",
        casa_21: "Deepnest",
        casa_22: "Exploration",
        casa_23: "Ancient Basin",
        casa_24: "The Abyss",
        casa_25: "Stag Station",
        casa_26: "White Palace",
        casa_27: "Godhome",
        casa_28: "Lake of Unn",
        casa_29: "Shrine of Believers",
        casa_30: "Get Sealed",
        casa_31: "Watcher's Spire",
        casa_32: "Beast's Den",
        casa_33: "Exploration",
        casa_34: "Teachers Archives",
        casa_35: "Stag Station",
        casa_36: "Resting Grounds",
        casa_37: "Colosseum of Fools",
        casa_38: "Kingdom's Edge",
        casa_39: "The Hive",
    }
}

// Todas as propriedades

const propriedades = [
    {
        id: 0,
        tipo: "inicio"
    },
    {
        id: 1,
        tipo: "propriedade",
        grupo: "cinza",
        preco: 800,
        alugueis: [50, 150, 350, 700, 1050, 1400],
        precoConstrucao: 600,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 2,
        tipo: "propriedade",
        grupo: "cinza",
        preco: 700,
        alugueis: [30, 100, 250, 500, 750, 1000],
        precoConstrucao: 600,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 3,
        tipo: "companhia",
        preco: 1800,
        aluguelBase: 200,
        dono: null
    },
    {
        id: 4,
        tipo: "propriedade",
        grupo: "cinza",
        preco: 750,
        alugueis: [40, 120, 300, 600, 900, 1200],
        precoConstrucao: 600,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 5,
        tipo: "estacao",
        preco: 2500,
        alugueis: [200, 400, 600, 800],
        custoUso: [50, 100, 200, 400],
        dono: null
    },
    {
        id: 6,
        tipo: "propriedade",
        grupo: "verde",
        preco: 1200,
        alugueis: [80, 220, 500, 950, 1400, 1800],
        precoConstrucao: 900,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 7,
        tipo: "exploracao"
    },
    {
        id: 8,
        tipo: "propriedade",
        grupo: "verde",
        preco: 1000,
        alugueis: [60, 180, 400, 800, 1200, 1600],
        precoConstrucao: 900,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 9,
        tipo: "propriedade",
        grupo: "verde",
        preco: 1400,
        alugueis: [100, 280, 600, 1100, 1650, 2200],
        precoConstrucao: 900,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 10,
        tipo: "prisao"
    },
    {
        id: 11,
        tipo: "propriedade",
        grupo: "azul",
        preco: 2600,
        alugueis: [200, 480, 1000, 1750, 2550, 3400],
        precoConstrucao: 1600,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 12,
        tipo: "companhia",
        preco: 3600,
        aluguelBase: 400,
        dono: null
    },
    {
        id: 13,
        tipo: "propriedade",
        grupo: "azul",
        preco: 2200,
        alugueis: [160, 420, 880, 1500, 2150, 2900],
        precoConstrucao: 1600,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 14,
        tipo: "propriedade",
        grupo: "azul",
        preco: 2300,
        alugueis: [170, 440, 920, 1550, 2250, 3000],
        precoConstrucao: 1600,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 15,
        tipo: "estacao",
        preco: 2500,
        alugueis: [200, 400, 600, 800],
        custoUso: [50, 100, 200, 400],
        dono: null
    },
    {
        id: 16,
        tipo: "propriedade",
        grupo: "rosa",
        preco: 1500,
        alugueis: [110, 300, 650, 1200, 1800, 2400],
        precoConstrucao: 1200,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 17,
        tipo: "propriedade",
        grupo: "rosa",
        preco: 1300,
        alugueis: [90, 250, 550, 1000, 1500, 2000],
        precoConstrucao: 1200,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 18,
        tipo: "exploracao"
    },
    {
        id: 19,
        tipo: "propriedade",
        grupo: "rosa",
        preco: 1800,
        alugueis: [130, 350, 750, 1350, 1950, 2600],
        precoConstrucao: 1200,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 20,
        tipo: "fontes"
    },
    {
        id: 21,
        tipo: "propriedade",
        grupo: "preto",
        preco: 2000,
        alugueis: [140, 360, 780, 1400, 2050, 2700],
        precoConstrucao: 1450,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 22,
        tipo: "exploracao"
    },
    {
        id: 23,
        tipo: "propriedade",
        grupo: "preto",
        preco: 2100,
        alugueis: [150, 380, 820, 1450, 2100, 2800],
        precoConstrucao: 1450,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 24,
        tipo: "propriedade",
        grupo: "preto",
        preco: 2100,
        alugueis: [150, 380, 820, 1450, 2100, 2800],
        precoConstrucao: 1450,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 25,
        tipo: "estacao",
        preco: 2500,
        alugueis: [200, 400, 600, 800],
        custoUso: [50, 100, 200, 400],
        dono: null
    },
    {
        id: 26,
        tipo: "propriedade",
        grupo: "branco",
        preco: 4600,
        alugueis: [380, 950, 2100, 3800, 5800, 8000],
        precoConstrucao: 4000,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 27,
        tipo: "propriedade",
        grupo: "branco",
        preco: 5000,
        alugueis: [420, 1050, 2300, 4100, 6200, 8400],
        precoConstrucao: 4000,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 28,
        tipo: "companhia",
        preco: 1800,
        aluguelBase: 200,
        dono: null
    },
    {
        id: 29,
        tipo: "propriedade",
        grupo: "branco",
        preco: 4200,
        alugueis: [350, 880, 1950, 3500, 5300, 7500],
        precoConstrucao: 4000,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 30,
        tipo: "sejaSelado"
    },
    {
        id: 31,
        tipo: "propriedade",
        grupo: "roxo",
        preco: 3600,
        alugueis: [290, 720, 1550, 2750, 4050, 5400],
        precoConstrucao: 2600,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 32,
        tipo: "propriedade",
        grupo: "roxo",
        preco: 3200,
        alugueis: [250, 630, 1350, 2450, 3650, 4900],
        precoConstrucao: 2600,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 33,
        tipo: "exploracao"
    },
    {
        id: 34,
        tipo: "propriedade",
        grupo: "roxo",
        preco: 3400,
        alugueis: [270, 680, 1450, 2600, 3850, 5200],
        precoConstrucao: 2600,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 35,
        tipo: "estacao",
        preco: 2500,
        alugueis: [200, 400, 600, 800],
        custoUso: [50, 100, 200, 400],
        dono: null
    },
    {
        id: 36,
        tipo: "propriedade",
        grupo: "amarelo",
        preco: 2800,
        alugueis: [220, 550, 1200, 2100, 3150, 4200],
        precoConstrucao: 2000,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 37,
        tipo: "companhia",
        preco: 3600,
        aluguelBase: 400,
        dono: null
    },
    {
        id: 38,
        tipo: "propriedade",
        grupo: "amarelo",
        preco: 2600,
        alugueis: [200, 490, 1050, 1850, 2750, 3700],
        precoConstrucao: 2000,
        dono: null,
        casasConstruidas: 0
    },
    {
        id: 39,
        tipo: "propriedade",
        grupo: "amarelo",
        preco: 2800,
        alugueis: [220, 550, 1200, 2100, 3150, 4200],
        precoConstrucao: 2000,
        dono: null,
        casasConstruidas: 0
    }
]

// Todas as cartas de exploração

const cartasExploracao = [
    {
        id: 0,
        textoPt: "Um vento forte soprou você de volta à Passagem do Rei! Quanta sorte!",
        textoEn: "A strong wind blew you back to King's Pass! How lucky!",
        tipo: "movimentoEspecial",
        destino: 0
    },
    {
        id: 1,
        textoPt: "Você foi pego pelos guardas do Palácio Branco! Seja diretamente selado no Templo do Ovo Negro!",
        textoEn: "You were caught by the White Palace guards! Get directly sealed in the Black Egg Temple!",
        tipo: "movimentoEspecial",
        destino: 10
    },
    {
        id: 2,
        textoPt: "Depois de uma longa aventura, você encontrou um lugar calmo para descansar. Vá para as Fontes Termais.",
        textoEn: "After a long adventure, you found yourself a calm place to rest. Go to the Hot Springs.",
        tipo: "movimentoEspecial",
        destino: 20
    },
    {
        id: 3,
        textoPt: "Você estava com muita pressa, então decidiu ir para a Estação de Besouro mais próxima para economizar tempo.",
        textoEn: "You were in too much of a hurry, so you decided to go to the nearest Stag Station to save time.",
        tipo: "movimentoEspecifico",
        tipoCasa: "estacao"
    },
    {
        id: 4,
        textoPt: "Você decidiu fazer uma parada e aproveitar o momento no Ponto Turístico mais próximo.",
        textoEn: "You decided to make a stop and enjoy the moment at the nearest Tourist Attraction.",
        tipo: "movimentoEspecifico",
        tipoCasa: "companhia"
    },
    {
        id: 5,
        textoPt: "Um grupo de insetos te cercou, e você não teve escolha a não ser recuar! Volte 3 casas.",
        textoEn: "A group of bugs surrounded you, you had no choice but to retreat! Move back 3 spaces.",
        tipo: "movimento",
        tipoMov: "voltar"
    },
    {
        id: 6,
        textoPt: "Você ouviu uma voz chamando seu nome atrás de você. Você volta o caminho para descobrir o que era, mas não encontra nada. Volte 6 casas.",
        textoEn: "You heard a voice calling your name behind you. You go back to find out what was that, but found nothing. Move back 6 spaces.",
        tipo: "movimento",
        tipoMov: "voltar"
    },
    {
        id: 7,
        textoPt: "Um inseto enorme começou a perseguir você! Depois de fugir por um tempo, você conseguiu despistá-lo. Avance 3 casas.",
        textoEn: "A huge bug started running after you! After running away for some time, you managed to get rid of it. Move forward 3 spaces.",
        tipo: "movimento",
        tipoMov: "avancar"
    },
    {
        id: 8,
        textoPt: "Você avistou um bando de insetos infectados carregando uma enorme quantidade de Geo. Você correu atrás deles, mas os perdeu de vista. Avance 6 casas.",
        textoEn: "You saw a pack of infected bugs carrying a huge amount of Geo. You ran after them, but lost them of your sight. Move forward 6 spaces.",
        tipo: "movimento",
        tipoMov: "voltar"
    },
    {
        id: 9,
        textoPt: "Você explorou a área por um tempo, mas não encontrou nada de interessante. Jogue os dados novamente.",
        textoEn: "You explored the area for some time, but found nothing interesting. Roll the dice again.",
        tipo: "movimento",
        tipoMov: "dados"
    },
    {
        id: 10,
        textoPt: "Você decidiu dar uma passada no ferreiro para melhorar o seu ferrão.",
        textoEn: "You decided to visit the nailsmith to upgrade your nail.",
        tipo: "upgrade",
        nomesPt: ["Ferrão Afiado", "Ferrão Canalizado", "Ferrão Serpenteado", "Ferrão Puro"],
        nomesEn: ["Sharpened Nail", "Channelled Nail", "Coiled Nail", "Pure Nail"],
        precos: [250, 800, 2000, 4000]
    },
    {
        id: 11,
        textoPt: "Você encontrou alguns Geo caídos no chão. Receba 100 Geo.",
        textoEn: "You found some Geo on the ground. Receive 100 Geo.",
        tipo: "geo",
        valor: 100
    },
    {
        id: 12,
        textoPt: "Você encontrou uma grande pedra contendo Geo em seu interior. Receba 250 Geo.",
        textoEn: "You found a big rock with some Geo on the inside. Receive 250 Geo.",
        tipo: "geo",
        valor: 250
    },
    {
        id: 13,
        textoPt: "Você derrotou um inseto que tentou te atacar. Receba 500 Geo.",
        textoEn: "You defeated a bug that tried attacking you. Receive 500 Geo.",
        tipo: "geo",
        valor: 500
    },
    {
        id: 14,
        textoPt: "Você derrotou um pequeno grupo de insetos que tentou te atacar. Receba 800 Geo.",
        textoEn: "You defeated a small group of bugs that tried attacking you. Receive 800 Geo.",
        tipo: "geo",
        valor: 800
    },
    {
        id: 15,
        textoPt: "Depois de uma longa batalha, você derrotou um grande oponente. Receba 1000 Geo.",
        textoEn: "After a long battle, you defeated a big opponent. Receive 1000 Geo.",
        tipo: "geo",
        valor: 1000
    },
    {
        id: 16,
        textoPt: "Você encontrou e libertou uma larva, sendo recompensado pelo Pai Larva. Receba 1300 Geo.",
        textoEn: "You found and freed a grub, getting rewarded by the Grub father. Receive 1300 Geo.",
        tipo: "geo",
        valor: 1300
    },
    {
        id: 17,
        textoPt: "Um grande grupo de insetos tentou te atacar, mas você conseguiu derrotar todos eles. Receba 1600 Geo.",
        textoEn: "A big group of bugs tried attacking you, but you managed to defeat them all. Receive 1600 Geo.",
        tipo: "geo",
        valor: 1600
    },
    {
        id: 18,
        textoPt: "Você encontrou uma pequena caverna contendo um depósito de pedras de Geo. Receba 2000 Geo.",
        textoEn: "You found a small cave containing a deposit of Geo rocks. Receive 2000 Geo.",
        tipo: "geo",
        valor: 2000
    },
    {
        id: 19,
        textoPt: "Você conseguiu vencer um desafio no Coliseu dos Tolos. Receba 2500 Geo.",
        textoEn: "You managed to beat a trial at the Colosseum of Fools. Receive 2500 Geo.",
        tipo: "geo",
        valor: 2500
    },
    {
        id: 20,
        textoPt: "Você encontrou um tesouro antigo pertencendo ao Rei Pálido. Receba 3000 Geo.",
        textoEn: "You found an ancient treasure from the Pale King. Receive 3000 Geo.",
        tipo: "geo",
        valor: 3000
    },
    {
        id: 21,
        textoPt: "Você deixou alguns Geo caírem sem você perceber. Perca 100 Geo.",
        textoEn: "You let some Geo fall without noticing. Lose 100 Geo.",
        tipo: "geo",
        valor: -100
    },
    {
        id: 22,
        textoPt: "Você comprou alguns ovos por um preço baixo, mas só depois percebeu que eram ovos rançosos. Perca 250 Geo.",
        textoEn: "You bought some eggs at a low price, but only later noticed that those were rancid eggs. Lose 250 Geo.",
        tipo: "geo",
        valor: -250
    },
    {
        id: 23,
        textoPt: "Você quase foi derrotado por um inseto mais forte, mas durante a fuga, deixou cair alguns Geo. Perca 500 Geo.",
        textoEn: "You almost got defeated by a stronger bug, but while running away, you let some Geo fall. lose 500 Geo.",
        tipo: "geo",
        valor: -500
    },
    {
        id: 24,
        textoPt: "Você decidiu emprestar alguns Geo para um novo amigo seu. Tomara que ele pague de volta. Perca 800 Geo.",
        textoEn: "You decided to lend some Geo to a new friend of yours. Hopefully they'll pay it back. Lose 800 Geo.",
        tipo: "geo",
        valor: -800
    },
    {
        id: 25,
        textoPt: "Você perdeu uma aposta que fez com um amigo. Perca 1000 Geo.",
        textoEn: "You lost a bet you made with a friend. Lose 1000 Geo.",
        tipo: "geo",
        valor: -1000
    },
    {
        id: 26,
        textoPt: "Você decidiu jogar alguns Geo na fonte do rei. Tomara que isso lhe dê sorte. Perca 1200 Geo.",
        textoEn: "You decided to throw some Geo at the king's fountain. Hopefully this will bring you luck. Lose 1200 Geo.",
        tipo: "geo",
        valor: -1200
    },
    {
        id: 27,
        textoPt: "Você fez algumas compras desnecessárias. Perca 1500 Geo.",
        textoEn: "You made some unnecessary purchases. lose 1500 Geo.",
        tipo: "geo",
        valor: -1500
    },
    {
        id: 28,
        textoPt: "Você foi derrotado por um inimigo mais forte, agora, você deve pagá-lo para você não morrer. Perca 1800 Geo.",
        textoEn: "You were defeated by a stronger enemy, now, you must pay him so you won't die. Lose 1800 Geo.",
        tipo: "geo",
        valor: -1800
    },
    {
        id: 29,
        textoPt: "Você depositou alguns Geo no banco. Espera, aonde ela foi? Perca 2000 Geo.",
        textoEn: "You deposited some Geo at the bank. Wait, where did she go? Lose 2000 Geo.",
        tipo: "geo",
        valor: -2000
    },
    {
        id: 30,
        textoPt: "Você decidiu apostar no Coliseu dos Tolos, mas infelizmente perdeu a aposta. Perca 2500 Geo.",
        textoEn: "You decided to make a bet at the Colosseum of Fools, but unfortunatelly, you lost the bet. Lose 2500 Geo.",
        tipo: "geo",
        valor: -2500
    },
    {
        id: 31,
        textoPt: "Seus companheiros se juntaram contra você! Pague 500 Geo para cada jogador.",
        textoEn: "Your companions banded together against you! Pay 500 Geo to each player.",
        tipo: "geoJogadores",
        acao: "pagar",
        valor: 500
    },
    {
        id: 32,
        textoPt: "Você salvou seus companheiros de um ataque fatal! Receba 800 Geo de cada jogador.",
        textoEn: "You saved your companions from a fatal attack! Receive 800 Geo from each player.",
        tipo: "geoJogadores",
        acao: "receber",
        valor: 800
    },
    {
        id: 33,
        textoPt: "Você encontrou um item! Manto de Asa de Mariposa foi adicionado aos seus itens.",
        textoEn: "You found an item! Mothwing Cloak got added to your items.",
        tipo: "item",
        item: "manto"
    },
    {
        id: 34,
        textoPt: "Você encontrou um item! Coração de Cristal foi adicionado aos seus itens.",
        textoEn: "You found an item! Crystal Heart got added to your items.",
        tipo: "item",
        item: "coracao"
    },
    {
        id: 35,
        textoPt: "Você encontrou um item! Marca do Rei foi adicionada aos seus itens.",
        textoEn: "You found an item! King's Brand got added to your items.",
        tipo: "item",
        item: "marca"
    },
    {
        id: 36,
        textoPt: "Você encontrou um item! Lanterna de Lumélula foi adicionada aos seus itens.",
        textoEn: "You found an item! Lumafly Lantern got added to your items.",
        tipo: "item",
        item: "lanterna"
    },
    {
        id: 37,
        textoPt: "Você encontrou um item! Passe do Bonde foi adicionado aos seus itens.",
        textoEn: "You found an item! Tram Pass got added to your items.",
        tipo: "item",
        item: "passe"
    },
    {
        id: 38,
        textoPt: "Você encontrou um item! Ferrão dos Sonhos foi adicionado aos seus itens.",
        textoEn: "You found an item! Dream Nail got added to your items.",
        tipo: "item",
        item: "sonhos"
    },
    {
        id: 39,
        textoPt: "Você encontrou um item! Sino de Besouro foi adicionado aos seus itens.",
        textoEn: "You found an item! Stag Bell got added to your items.",
        tipo: "item",
        item: "sino"
    },
    {
        id: 40,
        textoPt: "Você encontrou um item! Totem da Radiância foi adicionado aos seus itens.",
        textoEn: "You found an item! Radiance's Totem got added to your items.",
        tipo: "item",
        item: "totem"
    },
    {
        id: 41,
        textoPt: "Você encontrou o Falso Cavaleiro!",
        textoEn: "You encountered the False Knight!",
        tipo: "batalha",
        dados: 2,
        valor: 600
    },
    {
        id: 42,
        textoPt: "Você encontrou o Receptáculo Quebrado!",
        textoEn: "You encountered the Broken Vessel!",
        tipo: "batalha",
        dados: 3,
        valor: 800
    },
    {
        id: 43,
        textoPt: "Você encontrou o Cavaleiro da Colmeia!",
        textoEn: "You encountered the Hive Knight!",
        tipo: "batalha",
        dados: 4,
        valor: 1000
    },
    {
        id: 44,
        textoPt: "Você encontrou o Nosk!",
        textoEn: "You encountered Nosk!",
        tipo: "batalha",
        dados: 5,
        valor: 1200
    },
    {
        id: 45,
        textoPt: "Você encontrou o Cavaleiro Vazio!",
        textoEn: "You encountered the Hollow Knight!",
        tipo: "batalha",
        dados: 6,
        valor: 1500
    },
    {
        id: 46,
        textoPt: "Você encontrou as Lordes Louva-A-Deus!",
        textoEn: "Your encountered the Mantis Lords!",
        tipo: "batalha",
        dados: 7,
        valor: 1800
    },
    {
        id: 47,
        textoPt: "Você encontrou o Grande Sábio do Ferrão Sly!",
        textoEn: "You encountered the Great Nailsage Sly!",
        tipo: "batalha",
        dados: 8,
        valor: 2400
    },
    {
        id: 48,
        textoPt: "Você encontrou o Rei do Pesadelo!",
        textoEn: "You encountered the Nightmare King!",
        tipo: "batalha",
        dados: 9,
        valor: 3000
    },
    {
        id: 49,
        textoPt: "Você encontrou a Radiância!",
        textoEn: "You encountered the Radiance!",
        tipo: "batalha",
        dados: 10,
        valor: 5000
    },
    {
        id: 50,
        textoPt: "Você encontrou o Receptáculo Puro!",
        textoEn: "You encountered the Pure Vessel!",
        tipo: "batalha",
        dados: 11,
        valor: 8000
    }
]

// Função para atualizar a interface com o idioma escolhido

function atualizarInterface() {

    // Textos gerais

    const tg = textosG[idiomaAtual];

    document.getElementById("idioma").textContent = tg.idioma;
    document.getElementById("msg_configurar_jogadores").textContent = tg.msg_configurar_jogadores;
    document.getElementById("dois_jogadores").textContent = tg.dois_jogadores;
    document.getElementById("tres_jogadores").textContent = tg.tres_jogadores;
    document.getElementById("quatro_jogadores").textContent = tg.quatro_jogadores;
    document.getElementById("jogador_1").textContent = tg.jogador_1;
    document.getElementById("jogador_2").textContent = tg.jogador_2;
    document.getElementById("jogador_3").textContent = tg.jogador_3;
    document.getElementById("jogador_4").textContent = tg.jogador_4;
    document.getElementById("simular_dados").textContent = tg.simular_dados;
    document.getElementById("btn_usar_dados").textContent = tg.btn_usar_dados;
    document.getElementById("btn_nao_usar_dados").textContent = tg.btn_nao_usar_dados;
    document.getElementById("btn_iniciar_jogo").textContent = tg.btn_iniciar_jogo;
    document.getElementById("titulo_jogadores").textContent = tg.titulo_jogadores;
    document.getElementById("rolar_dados").textContent = tg.rolar_dados;
    document.getElementById("passar_vez").textContent = tg.passar_vez;
    document.getElementById("titulo_propriedade_avenda").textContent = tg.titulo_propriedade_avenda;
    document.getElementById("btn_passar_compra").textContent = tg.btn_passar_compra;
    document.getElementById("btn_comprar_propriedade").textContent = tg.btn_comprar_propriedade;

    // Nomes das propriedades

    const tp = textosP[idiomaAtual];

    for (let idCasa in tp) {
        const elementoCasa = document.getElementById(idCasa);
        const elementoNome = elementoCasa.querySelector(".nome_propriedade");
        const elementoExploracao = elementoCasa.querySelector(".casa_exploracao");
        const elementoStag = elementoCasa.querySelector(".casa_stag");
        if (elementoNome) {
            elementoNome.textContent = tp[idCasa];
        } else if (elementoExploracao) {
            elementoExploracao.textContent = tp[idCasa];
        } else if (elementoStag) {
            elementoStag.textContent = tp[idCasa];
        } else {
            elementoCasa.textContent = tp[idCasa];
        }
    }
}

// Função para mudar o idioma

function mudarIdioma() {
    if (idiomaAtual === "pt") {
        idiomaAtual = "en";
    } else {
        idiomaAtual = "pt";
    }
    atualizarInterface();
    atualizarModalCompra(jogadores[jogadorAtual]);
    atualizarVez();
}

atualizarInterface();

// Função para atualizar a quantidade de jogadores exibidos no menu

function atualizarCampos() {
    const quantidade = document.getElementById("qtd_jogadores").value;
    document.getElementById("p1").style.display = quantidade >= 1 ? "block" : "none";
    document.getElementById("p2").style.display = quantidade >= 2 ? "block" : "none";
    document.getElementById("p3").style.display = quantidade >= 3 ? "block" : "none";
    document.getElementById("p4").style.display = quantidade >= 4 ? "block" : "none";
}

// Função para iniciar o jogo

function iniciarJogo() {
    const quantidade = document.getElementById("qtd_jogadores").value;
    let listaJogadores = [];
    let nomeReserva;
    for (let i = 1; i <= quantidade; i++) {
        if (i == 1) {
            nomeReserva = "Knight";    
        } else if (i == 2) {
            nomeReserva = "Hornet";    
        } else if (i == 3) {
            nomeReserva = "Quirrel";    
        } else {
            nomeReserva = "Zote";
        }
        const nome = document.getElementById(`nome_p${i}`).value || nomeReserva;
        listaJogadores.push(nome);
    }
    if (document.getElementById("p1").style.display == "block") {
        document.getElementById("status_p1").style.display = "flex";
        jogadores.push({ id: 0, nome: `${listaJogadores[0]}`, posicao: 0, geo: 15000, selado: false, cor: "#0c2367", elementoPeao: null, icone: "imagens/knight_icon.png" });
    } else {
        document.getElementById("status_p1").style.display = "none";   
    }
    if (document.getElementById("p2").style.display == "block") {
        document.getElementById("status_p2").style.display = "flex";
        jogadores.push({ id: 1, nome: `${listaJogadores[1]}`, posicao: 0, geo: 15000, selado: false, cor: "#de2533", elementoPeao: null, icone: "imagens/hornet_icon.png" });
    } else {
        document.getElementById("status_p2").style.display = "none";   
    }
    if (document.getElementById("p3").style.display == "block") {
        document.getElementById("status_p3").style.display = "flex";
        jogadores.push({ id: 2, nome: `${listaJogadores[2]}`, posicao: 0, geo: 15000, selado: false, cor: "#257d68", elementoPeao: null, icone: "imagens/quirrel_icon.png" });
    } else {
        document.getElementById("status_p3").style.display = "none";   
    }
    if (document.getElementById("p4").style.display == "block") {
        document.getElementById("status_p4").style.display = "flex";
        jogadores.push({ id: 3, nome: `${listaJogadores[3]}`, posicao: 0, geo: 15000, selado: false, cor: "#17171b", elementoPeao: null, icone: "imagens/zote_icon.png" });
    } else {
        document.getElementById("status_p4").style.display = "none";   
    }
    for (let i = 0; i < jogadores.length; i++) {
        document.getElementById(`nome_jogador_${i}`).textContent = jogadores[i].nome;
        document.getElementById(`qnt_geo_${i}`).textContent = jogadores[i].geo;
    }
    menu.style.display = "none";
    blurBG.style.display = "none";
    inicializarPeoes();
    atualizarVez();
}

// Função para atualizar o texto de quem é a vez

function atualizarVez() {
    if (jogadores.length === 0) return;
    const jogadorDaVez = jogadores[jogadorAtual];
    const vez_de_jogador = document.getElementById("vez_de_jogador");
    if (idiomaAtual === "pt") {
        vez_de_jogador.innerHTML = `Turno de <span style="color: ${jogadorDaVez.cor};">${jogadorDaVez.nome}</span>`;
    } else {
        vez_de_jogador.innerHTML = `<span style="color: ${jogadorDaVez.cor};">${jogadorDaVez.nome}'s</span> Turn`;
    }
}

// Função para carregar os peões na tela

function inicializarPeoes() {
  jogadores.forEach((jogador) => {
    const imgPeao = document.createElement("img");
    imgPeao.src = jogador.icone;
    imgPeao.className = "peao-imagem";
    jogador.elementoPeao = imgPeao;
    moverPeao(imgPeao, 0);
  });
}

// Função para mover os peões

function moverPeao(elementoPeao, idCasa) {
    const casaDestino = document.getElementById(`casa_${idCasa}`);
    if (!casaDestino) return;
    let container = casaDestino.querySelector(".container-peoes");
    if (!container) {
        container = document.createElement("div");
        container.className = "container-peoes";
        casaDestino.appendChild(container);
    }
    container.appendChild(elementoPeao);
}

// Função para a animação de mover os peões

function movimentoPeao(idJogador, passos) {
    const jogador = jogadores[idJogador];
    let passosRestantes = passos;
    const passarVez = document.getElementById("passar_vez");
    const rolarDados = document.getElementById("rolar_dados");
    const intervalo = setInterval(() => {
        if (passosRestantes > 0) {
            jogador.posicao = (jogador.posicao + 1) % 40;
            moverPeao(jogador.elementoPeao, jogador.posicao);
            if (jogador.posicao === 0) {
                jogador.geo += 2000;
            }
            passosRestantes--;
        } else {
            clearInterval(intervalo);
            executarAcao(jogador);
            if (tirouDupla > 0) {
                rolarDados.style.cursor = "pointer";
            } else {
                passarVez.className = "btn-passar-vez-ativo";
            }
        }
    }, 450);
}

// Função para rolar os dados

function rolarDados() {
    const rolarDados = document.getElementById("rolar_dados");
    if (rolarDados.style.cursor === "not-allowed") return;
    rolarDados.style.cursor = "not-allowed";
    const d1 = document.getElementById("dado_1");
    const d2 = document.getElementById("dado_2")
    d1.classList.add("rolando");
    d2.classList.add("rolando");
    setTimeout(() => {
        d1.classList.remove("rolando");
        d2.classList.remove("rolando");
        const dado1 = Math.floor(Math.random() * 6) + 1;
        const dado2 = Math.floor(Math.random() * 6) + 1;
        if (dado1 === dado2) {
            tirouDupla++;
            if (tirouDupla >= 3) {
                selarJogador(jogadorAtual);
                tirouDupla = 0;
                jogadorAtual = (jogadorAtual + 1) % jogadores.length;
                atualizarVez();
                return;
            }
        } else {
            tirouDupla = 0;
        }
        const totalPassos = dado1 + dado2;
        d1.textContent = dado1;
        d2.textContent = dado2;
        movimentoPeao(jogadorAtual, totalPassos);
    }, 500);
}

// Função para passar a vez

function passarVez() {
    const passarVez = document.getElementById("passar_vez");
    const rolarDados = document.getElementById("rolar_dados");
    if (passarVez.className === "btn-passar-vez-inativo") return;
    tirouDupla = 0;
    passarVez.className = "btn-passar-vez-inativo";
    rolarDados.style.cursor = "pointer";
    jogadorAtual = (jogadorAtual + 1) % jogadores.length;
    atualizarVez();
}

// Função para exibir mensagens

function exibirMensagem(msg) {
    document.getElementById("mensagem").textContent = msg;
    document.getElementById("modal_mensagens").style.display = "block";
    xBlurBG.style.display = "block";
}

// Função para fechar as mensagens

function fecharMensagem() {
    document.getElementById("modal_mensagens").style.display = "none";
    xBlurBG.style.display = "none";    
}

// Função para atualizar a quantidade de Geo

function atualizarGeo(jogador) {
    document.getElementById("qnt_geo_" + jogador.id).textContent = jogador.geo;
}

// Função para executar a ação da casa

function executarAcao(jogador) {
    const casaAtual = propriedades[`${jogador.posicao}`];
    if (casaAtual.tipo === "propriedade") {
        if (casaAtual.dono === null) {
            atualizarModalCompra(jogador);
            document.getElementById("faixa_cor_modal").className = `propriedade-${casaAtual.grupo}`;
            document.getElementById("modal_compra_propriedades").style.display = "block";
            blurBG.style.display = "block";
        } else if (casaAtual.dono != jogador) {

        }
    }
}

// Função para recusar a compra

function passarCompra() {
    document.getElementById("modal_compra_propriedades").style.display = "none";
    blurBG.style.display = "none";    
}

// Função para comprar a propriedade

function comprarPropriedade(jogador) {
    const casaAtual = propriedades[`${jogador.posicao}`];
    if (jogador.geo >= casaAtual.preco) {
        casaAtual.dono = jogadorAtual;
        jogador.geo -= casaAtual.preco;
        atualizarGeo(jogador);
        document.getElementById("casa_" + casaAtual.id).style.border = `2px solid ${jogador.cor}`;
        document.getElementById("modal_compra_propriedades").style.display = "none";
        blurBG.style.display = "none";
    } else {
        if (idiomaAtual === "pt") {
            exibirMensagem("Você não possui Geo o suficiente!");
        } else {
            exibirMensagem("You don't have enough Geo!");
        }
    }
}

// Função para atualizar os textos do modal de compras

function atualizarModalCompra(jogador) {
    const casaAtual = propriedades[`${jogador.posicao}`];
    if (idiomaAtual === "pt") {
        document.getElementById("pergunta_comprar").textContent = `Deseja comprar ${textosP["pt"]["casa_" + casaAtual.id]} por ${casaAtual.preco} Geo?`;
    } else {
        document.getElementById("pergunta_comprar").textContent = `Do you want to buy ${textosP["en"]["casa_" + casaAtual.id]} for ${casaAtual.preco} Geo?`;   
    }
}

// Função para selar um jogador

function selarJogador(jogador) {
    jogadores[jogador].selado = true;
    moverPeao(jogadores[jogador].elementoPeao, 10);
}

// Função para verificar se um jogador está selado

function verificarSelado() {
    if (jogadores[jogadorAtual].selado === true) {

    }
}

atualizarCampos();