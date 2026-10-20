const menu = document.getElementById("configuracoes");
const blurBG = document.getElementById("blur");
const xBlurBG = document.getElementById("blurXtra");

let idiomaAtual = "pt";
let jogadores = [];
let jogadorAtual = 0;
let tirouDupla = 0;
let totalP1 = 0;
let totalP2 = 0;
let valorGenerico = 0;
let numCarta;
let carta;

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
        btn_comprar_propriedade: "Comprar",
        btn_batalhar: "Batalhar",
        btn_pagar_aluguel: "Pagar",
        lancar_dados: "Rolar os Dados",
        titulo_companhia_avenda: "Companhia à Venda!",
        txt_companhia: "Companhia",
        btn_passar_companhia: "Passar",
        btn_comprar_companhia: "Comprar",
        btn_multiplicar_companhia: "Rolar os Dados",
        titulo_estacao_avenda: "Estação à Venda!",
        txt_estacao: "Estação de Besouro",
        pergunta_comprar_estacao: "Deseja comprar a Estação de Besouro por 2500 Geo?",
        btn_passar_estacao: "Passar",
        btn_comprar_estacao: "Comprar",
        btn_nao_usar_estacao: "Não Usar",
        btn_usar_estacao: "Usar Estação",
        titulo_carta: "Carta de Exploração"
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
        btn_comprar_propriedade: "Buy",
        btn_batalhar: "Battle",
        btn_pagar_aluguel: "Pay",
        lancar_dados: "Roll the Dice",
        titulo_companhia_avenda: "Company for Sale!",
        txt_companhia: "Company",
        btn_passar_companhia: "Pass",
        btn_comprar_companhia: "Buy",
        btn_multiplicar_companhia: "Roll the Dice",
        titulo_estacao_avenda: "Station for Sale!",
        txt_estacao: "Stag Station",
        pergunta_comprar_estacao: "Do you want to buy the Stag Station for 2500 Geo?",
        btn_passar_estacao: "Pass",
        btn_comprar_estacao: "Buy",
        btn_nao_usar_estacao: "Do Not",
        btn_usar_estacao: "Use Station",
        titulo_carta: "Exploration Card"
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
        textoPt: "Você foi infectado pela Radiância! Seja selado até que você se cure da infecção.",
        textoEn: "You got infected by The Radiance! Get sealed until you get cured from the infection.",
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
        passos: -3
    },
    {
        id: 6,
        textoPt: "Você ouviu uma voz chamando seu nome atrás de você. Você volta o caminho para descobrir o que era, mas não encontra nada. Volte 6 casas.",
        textoEn: "You heard a voice calling your name behind you. You go back to find out what was that, but found nothing. Move back 6 spaces.",
        tipo: "movimento",
        passos: -6
    },
    {
        id: 7,
        textoPt: "Um inseto enorme começou a perseguir você! Depois de fugir por um tempo, você conseguiu despistá-lo. Avance 3 casas.",
        textoEn: "A huge bug started running after you! After running away for some time, you managed to get rid of it. Move forward 3 spaces.",
        tipo: "movimento",
        passos: 3
    },
    {
        id: 8,
        textoPt: "Você avistou um bando de insetos infectados carregando uma enorme quantidade de Geo. Você correu atrás deles, mas os perdeu de vista. Avance 6 casas.",
        textoEn: "You saw a pack of infected bugs carrying a huge amount of Geo. You ran after them, but lost them of your sight. Move forward 6 spaces.",
        tipo: "movimento",
        passos: 6
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
        textoPt: "Durante toda sua exploração, você encontrou vários pedaços de máscara, e agora, conseguiu uma nova máscara!",
        textoEn: "During all of your exploration, you found various mask shards, and now, you got yourself a new mask!",
        tipo: "mascara"
    },
    {
        id: 42,
        textoPt: "Você encontrou o Guerreiro das Almas!",
        textoEn: "You encountered the Soul Warrior!",
        tipo: "batalha",
        vida: 5,
        dano: 1,
        valor: 600
    },
    {
        id: 43,
        textoPt: "Você encontrou o Guardião Cristalizado!",
        textoEn: "You encountered the Crystal Guardian!",
        tipo: "batalha",
        vida: 6,
        dano: 1,
        valor: 800
    },
    {
        id: 44,
        textoPt: "Você encontrou o Falso Cavaleiro!",
        textoEn: "You encountered the False Knight!",
        tipo: "batalha",
        vida: 7,
        dano: 1,
        valor: 1200
    },
    {
        id: 45,
        textoPt: "Você encontrou o Receptáculo Quebrado!",
        textoEn: "You encountered the Broken Vessel!",
        tipo: "batalha",
        vida: 8,
        dano: 1,
        valor: 1500
    },
    {
        id: 46,
        textoPt: "Você encontrou o Defensor do Esterco!",
        textoEn: "Your encountered the Dung Defeder!",
        tipo: "batalha",
        vida: 9,
        dano: 1,
        valor: 1800
    },
    {
        id: 47,
        textoPt: "Você encontrou o Cavaleiro da Colmeia!",
        textoEn: "You encountered the Hive Knight!",
        tipo: "batalha",
        vida: 10,
        dano: 1,
        valor: 2000
    },
    {
        id: 48,
        textoPt: "Você encontrou o Nosk!",
        textoEn: "You encountered Nosk!",
        tipo: "batalha",
        vida: 11,
        dano: 1,
        valor: 2200
    },
    {
        id: 49,
        textoPt: "Você encontrou o Lorde Traidor!",
        textoEn: "You encountered the Traitor Lord!",
        tipo: "batalha",
        vida: 12,
        dano: 1,
        valor: 2600
    },
    {
        id: 50,
        textoPt: "Você encontrou o Mestre das Almas!",
        textoEn: "You encountered the Soul Master!",
        tipo: "batalha",
        vida: 13,
        dano: 1,
        valor: 3000
    },
    {
        id: 51,
        textoPt: "Você encontrou o Cavaleiro Vazio!",
        textoEn: "You encountered the Hollow Knight!",
        tipo: "batalha",
        vida: 14,
        dano: 1,
        valor: 3500
    },
    {
        id: 52,
        textoPt: "Você encontrou a Domadora de Deuses!",
        textoEn: "You encountered the God Tamer!",
        tipo: "batalha",
        vida: 15,
        dano: 1,
        valor: 4000
    },
    {
        id: 53,
        textoPt: "Você encontrou o Grande Sábio do Ferrão Sly!",
        textoEn: "You encountered the Great Nailsage Sly!",
        tipo: "batalha",
        vida: 16,
        dano: 1,
        valor: 5000
    },
    {
        id: 54,
        textoPt: "Você encontrou as Lordes Louva-a-Deus!",
        textoEn: "You encountered the Mantis Lords!",
        tipo: "batalha",
        vida: 17,
        dano: 1,
        valor: 6000
    },
    {
        id: 55,
        textoPt: "Você encontrou o Rei do Pesadelo!",
        textoEn: "You encountered the Nightmare King!",
        tipo: "batalha",
        vida: 18,
        dano: 2,
        valor: 8000
    },
    {
        id: 56,
        textoPt: "Você encontrou a Radiância!",
        textoEn: "You encountered the Radiance!",
        tipo: "batalha",
        vida: 19,
        dano: 2,
        valor: 9000
    },
    {
        id: 57,
        textoPt: "Você encontrou o Receptáculo Puro!",
        textoEn: "You encountered the Pure Vessel!",
        tipo: "batalha",
        vida: 20,
        dano: 2,
        valor: 10000
    },
    {
        id: 58,
        textoPt: "Você encontrou um amuleto! Ele pode ser útil em batalhas...",
        textoEn: "You found a charm! It can be useful in battles...",
        tipo: "amuleto"
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
    document.getElementById("btn_batalhar").textContent = tg.btn_batalhar;
    document.getElementById("btn_pagar_aluguel").textContent = tg.btn_pagar_aluguel;
    document.getElementById("lancar_dados").textContent = tg.lancar_dados;
    document.getElementById("titulo_companhia_avenda").textContent = tg.titulo_companhia_avenda;
    document.getElementById("txt_companhia").textContent = tg.txt_companhia;
    document.getElementById("btn_passar_companhia").textContent = tg.btn_passar_companhia;
    document.getElementById("btn_comprar_companhia").textContent = tg.btn_comprar_companhia;
    document.getElementById("btn_multiplicar_companhia").textContent = tg.btn_multiplicar_companhia;
    document.getElementById("titulo_estacao_avenda").textContent = tg.titulo_estacao_avenda;
    document.getElementById("txt_estacao").textContent = tg.txt_estacao;
    document.getElementById("pergunta_comprar_estacao").textContent = tg.pergunta_comprar_estacao;
    document.getElementById("btn_passar_estacao").textContent = tg.btn_passar_estacao;
    document.getElementById("btn_comprar_estacao").textContent = tg.btn_comprar_estacao;
    document.getElementById("btn_nao_usar_estacao").textContent = tg.btn_nao_usar_estacao;
    document.getElementById("btn_usar_estacao").textContent = tg.btn_usar_estacao;
    document.getElementById("titulo_carta").textContent = tg.titulo_carta;

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
    atualizarPropriedades();
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
        jogadores.push({ id: 0, nome: `${listaJogadores[0]}`, posicao: 0, geo: 15000, selado: false, falido: false, cor: "#0c2367", elementoPeao: null, icone: "imagens/icones_jogadores/knight_icon.png" });
    } else {
        document.getElementById("status_p1").style.display = "none";   
    }
    if (document.getElementById("p2").style.display == "block") {
        document.getElementById("status_p2").style.display = "flex";
        jogadores.push({ id: 1, nome: `${listaJogadores[1]}`, posicao: 0, geo: 15000, selado: false, falido: false, cor: "#de2533", elementoPeao: null, icone: "imagens/icones_jogadores/hornet_icon.png" });
    } else {
        document.getElementById("status_p2").style.display = "none";   
    }
    if (document.getElementById("p3").style.display == "block") {
        document.getElementById("status_p3").style.display = "flex";
        jogadores.push({ id: 2, nome: `${listaJogadores[2]}`, posicao: 0, geo: 15000, selado: false, falido: false, cor: "#257d68", elementoPeao: null, icone: "imagens/icones_jogadores/quirrel_icon.png" });
    } else {
        document.getElementById("status_p3").style.display = "none";   
    }
    if (document.getElementById("p4").style.display == "block") {
        document.getElementById("status_p4").style.display = "flex";
        jogadores.push({ id: 3, nome: `${listaJogadores[3]}`, posicao: 0, geo: 15000, selado: false, falido: false, cor: "#17171b", elementoPeao: null, icone: "imagens/icones_jogadores/zote_icon.png" });
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
    atualizarPropriedades();
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
                atualizarGeo();
            }
            passosRestantes--;
        } else if (passosRestantes < 0) {
            jogador.posicao = (jogador.posicao - 1 + 40) % 40;
            moverPeao(jogador.elementoPeao, jogador.posicao);
            if (jogador.posicao === 0) {
                jogador.geo += 2000;
                atualizarGeo();
            }
            passosRestantes++;
        }
        else {
            clearInterval(intervalo);
            executarAcao(jogador);
            if (!jogador.selado) {
                if (tirouDupla > 0) {
                    rolarDados.style.cursor = "pointer";
                } else {
                    passarVez.className = "btn-passar-vez-ativo";
                }
            }
        }
    }, 100);
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
                selarJogador(jogadores[jogadorAtual]);
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
    verificarSelado();
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

function atualizarGeo() {
    const quantidade = document.getElementById("qtd_jogadores").value;
    for (let i = 0; i < quantidade; i++) {
        document.getElementById("qnt_geo_" + i).textContent = jogadores[i].geo;
    }
}

// Função para atualizar a quantidade de propriedades

function atualizarPropriedades() {
    const quantidade = document.getElementById("qtd_jogadores").value;
    let qntProp = 0;
    for (let i = 0; i < quantidade; i++) {
        qntProp = 0;
        for (let p = 0; p <= 39; p++) {
            if (propriedades[p].dono === i) qntProp++;
        }
        if (idiomaAtual === "pt") {
            document.getElementById("qnt_propriedades_" + i).textContent = `${qntProp} propriedades`;
        } else {
            document.getElementById("qnt_propriedades_" + i).textContent = `${qntProp} properties`;    
        }
    }       
}

// Função para executar a ação da casa

function executarAcao(jogador) {
    const casaAtual = propriedades[jogador.posicao];

    // Casas do tipo "Propriedade"

    if (casaAtual.tipo === "propriedade") {
        if (casaAtual.dono === null) {
            if (idiomaAtual === "pt") {
                document.getElementById("pergunta_comprar").textContent = `Deseja comprar ${textosP["pt"]["casa_" + casaAtual.id]} por ${casaAtual.preco} Geo?`;
            } else {
                document.getElementById("pergunta_comprar").textContent = `Do you want to buy ${textosP["en"]["casa_" + casaAtual.id]} for ${casaAtual.preco} Geo?`;   
            }
            document.getElementById("faixa_cor_modal").className = `propriedade-${casaAtual.grupo}`;
            document.getElementById("modal_compra_propriedades").style.display = "block";
            blurBG.style.display = "block";
        } else if (casaAtual.dono != jogador.id) {
            if (idiomaAtual === "pt") {
                document.getElementById("titulo_pagar_aluguel").innerHTML = `Propriedade de <span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}</span>`;
                document.getElementById("nome_local_pagar").textContent = `Aluguel de ${textosP["pt"]["casa_" + casaAtual.id]}: `;
            } else {
                document.getElementById("titulo_pagar_aluguel").innerHTML = `<span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}'s</span> Property`;
                document.getElementById("nome_local_pagar").textContent = `${textosP["en"]["casa_" + casaAtual.id]}'s Rent: `;
            }
            document.getElementById("qnt_pagar_aluguel").textContent = casaAtual.alugueis[casaAtual.casasConstruidas];
            document.getElementById("modal_pagar_aluguel").style.display = "block";
            blurBG.style.display = "block";
        }
    }

    // Casas do tipo "Companhia"

    else if (casaAtual.tipo === "companhia") {
        if (casaAtual.dono === null) {
            if (idiomaAtual === "pt") {
                document.getElementById("pergunta_comprar_companhia").textContent = `Deseja comprar ${textosP["pt"]["casa_" + casaAtual.id]} por ${casaAtual.preco} Geo?`;
            } else {
                document.getElementById("pergunta_comprar_companhia").textContent = `Do you want to buy ${textosP["en"]["casa_" + casaAtual.id]} for ${casaAtual.preco} Geo?`;
            }
            document.getElementById("modal_compra_companhias").style.display = "block";
            blurBG.style.display = "block";
        } else if (casaAtual.dono != jogador.id) {
            if (idiomaAtual === "pt") {
                document.getElementById("titulo_pagar_companhia").innerHTML = `Companhia de <span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}</span>`;
                document.getElementById("nome_companhia").textContent = `Multiplicador de ${textosP["pt"]["casa_" + casaAtual.id]}: `;
            } else {
                document.getElementById("titulo_pagar_companhia").innerHTML = `<span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}'s</span> Company`;
                document.getElementById("nome_companhia").textContent = `${textosP["en"]["casa_" + casaAtual.id]}'s Multiplier: `;
            }
            document.getElementById("multiplicador_companhia").textContent = casaAtual.aluguelBase;
            document.getElementById("modal_pagar_companhia").style.display = "block";
            blurBG.style.display = "block";
        }
    }

    // Casas do tipo "Estação"

    else if (casaAtual.tipo === "estacao") {
        if (casaAtual.dono === null) {
            document.getElementById("modal_compra_estacoes").style.display = "block";
            blurBG.style.display = "block";
        } else {
            let aluguel = 0;
            let custoUso = 0;
            if (idiomaAtual === "pt") {
                document.getElementById("titulo_proprietario_estacao").innerHTML = `Estação de <span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}</span>`;
                document.getElementById("txt_aluguel_estacao").textContent = "Você é o dono da Estação";
                document.getElementById("txt_custo_uso_estacao").textContent = "Como você é o dono, pode usá-la de graça!";
            } else {
                document.getElementById("titulo_proprietario_estacao").innerHTML = `<span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}'s</span> Station`;
                document.getElementById("txt_aluguel_estacao").textContent = "You are the Station owner";
                document.getElementById("txt_custo_uso_estacao").textContent = "Since you're the owner, you can use it for free!";   
            }
            document.getElementById("simbolo_geo1").style.display = "none";
            document.getElementById("valor_aluguel_estacao").style.display = "none";
            document.getElementById("simbolo_geo2").style.display = "none";
            document.getElementById("valor_uso_estacao").style.display = "none";
            if (casaAtual.dono != jogador.id) {
                let qntEstacoes = -1;
                for (let i = 5; i <= 35; i+= 10) {
                    if (propriedades[i].dono === casaAtual.dono) {
                        qntEstacoes++;
                    }
                }
                aluguel = casaAtual.alugueis[qntEstacoes];
                custoUso = casaAtual.custoUso[qntEstacoes];
                valorGenerico = custoUso;
                jogador.geo -= aluguel;
                jogadores[casaAtual.dono].geo += aluguel;
                if (idiomaAtual === "pt") {
                    document.getElementById("txt_aluguel_estacao").textContent = "Valor do aluguel: ";
                    document.getElementById("txt_custo_uso_estacao").textContent = "Custo de Uso da Estação: ";
                } else {
                    document.getElementById("txt_aluguel_estacao").textContent = "Rent Value: ";
                    document.getElementById("txt_custo_uso_estacao").textContent = "Station's Use Cost: ";   
                }
                document.getElementById("valor_aluguel_estacao").textContent = aluguel;
                document.getElementById("valor_uso_estacao").textContent = custoUso;
                document.getElementById("simbolo_geo1").style.display = "block";
                document.getElementById("valor_aluguel_estacao").style.display = "block";
                document.getElementById("simbolo_geo2").style.display = "block";
                document.getElementById("valor_uso_estacao").style.display = "block";
            }
            document.getElementById("modal_utilizar_estacao").style.display = "block";
            blurBG.style.display = "block";
        }
    }

    // Casas do tipo "Exploração"

    else if(casaAtual.tipo === "exploracao") {
        numCarta = Math.floor(Math.random() * 10);
        carta = cartasExploracao[numCarta];
        const elementoTexto = document.getElementById("txt_carta");
        const simbolo = document.getElementById("simbolo_carta");
        const modalG = document.getElementById("modal_cartas");
        let texto;
        if (idiomaAtual === "pt") {
            texto = carta.textoPt;
        } else {
            texto = carta.textoEn;
        }

        // Cartas do tipo "Movimento Especial"

        if (carta.tipo === "movimentoEspecial") {
            if (carta.id === 0) {
                simbolo.src = "imagens/icones_cartas/icone_vento.png";
                jogador.geo += 2000;
            } else if (carta.id === 1) {
                simbolo.src = "imagens/icones_cartas/icone_infeccao.png";
            } else {
                simbolo.src = "imagens/icones_cartas/icone_fontes.png";
            }
        }

        // Cartas do tipo "Movimento Específico"

        else if (carta.tipo === "movimentoEspecifico") {
            if (carta.id === 3) {
                simbolo.src = "imagens/icones_cartas/icone_stag.png";
            } else {
                simbolo.src = "imagens/icones_cartas/icone_companhia.png";
            }
        }

        // Cartas do tipo "Movimento"

        else if (carta.tipo === "movimento") {
            simbolo.src = "imagens/icones_cartas/icone_movimento.png";
        }

        elementoTexto.textContent = texto;
        modalG.style.display = "block";
        blurBG.style.display = "block";
    }

    // Casa de ser selado

    else if (casaAtual.tipo === "sejaSelado") {
        selarJogador(jogador);
    }
}

// Função para executar a ação de uma carta

function executarCarta() {
    const jogador = jogadores[jogadorAtual];
    const casaAtual = propriedades[jogador.posicao];
    const modalG = document.getElementById("modal_cartas");

    // Movimento Especial

    if (carta.tipo === "movimentoEspecial") {
        if (carta.id === 1) {
            selarJogador(jogador);
        } else {
            moverPeao(jogador.elementoPeao, carta.destino);
            jogador.posicao = carta.destino;
        }
    }

    // Movimento Específico

    else if (carta.tipo === "movimentoEspecifico") {
        let destino = jogador.posicao;
        do {
            destino = (destino + 1) % 40;
        } while (propriedades[destino].tipo != carta.tipoCasa);
        let passos = (destino - jogador.posicao + 40) % 40;
        movimentoPeao(jogadorAtual, passos);  
    }

    // Movimento

    else if (carta.tipo === "movimento") {
        if (!carta.tipoMov) {
            movimentoPeao(jogadorAtual, carta.passos);
        } else {
            document.getElementById("rolar_dados").style.cursor = "pointer";
            document.getElementById("passar_vez").className = "btn-passar-vez-inativo";  
        }
    }

    modalG.style.display = "none";
    blurBG.style.display = "none";
    atualizarGeo();
}

// Função para recusar a compra da propriedade

function passarCompra() {
    document.getElementById("modal_compra_propriedades").style.display = "none";
    blurBG.style.display = "none";    
}

// Função para comprar a propriedade

function comprarPropriedade() {
    const jogador = jogadores[jogadorAtual];
    const casaAtual = propriedades[jogador.posicao];
    if (jogador.geo >= casaAtual.preco) {
        casaAtual.dono = jogadorAtual;
        jogador.geo -= casaAtual.preco;
        atualizarGeo();
        atualizarPropriedades();
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

// Função para batalhar pelo aluguel

function batalhar() {
    const jogador = jogadores[jogadorAtual];
    if (idiomaAtual === "pt") {
        document.getElementById("jogador_lanca_dados").innerHTML = `Vez de <span style="color: ${jogador.cor};">${jogador.nome}</span> lançar os dados`;
    } else {
        document.getElementById("jogador_lanca_dados").innerHTML = `<span style="color: ${jogador.cor};">${jogador.nome}'s</span> turn to roll the dice`;    
    }
    document.getElementById("modal_batalha_aluguel").style.display = "block";
    document.getElementById("modal_pagar_aluguel").style.display = "none";
}

// Função para lançar os dados na batalha pelo aluguel

function lancarDadosBatalha() {
    const jogador = jogadores[jogadorAtual];
    const casaAtual = propriedades[jogador.posicao];
    const txtVencedor = document.getElementById("titulo_vencedor");
    const txtPerdedor = document.getElementById("anuncio_perdedor");
    const txtP2 = document.getElementById("jogador_lanca_dados");
    const rolarDados = document.getElementById("lancar_dados");
    if (totalP1 === 0) {
        if (rolarDados.style.cursor === "not-allowed") return;
        rolarDados.style.cursor = "not-allowed";
        const d1 = document.getElementById("dado_1ba");
        const d2 = document.getElementById("dado_2ba")
        d1.classList.add("rolando");
        d2.classList.add("rolando");
        setTimeout(() => {
            d1.classList.remove("rolando");
            d2.classList.remove("rolando");
            const dado1 = Math.floor(Math.random() * 6) + 1;
            const dado2 = Math.floor(Math.random() * 6) + 1;
            totalP1 = dado1 + dado2;
            d1.textContent = dado1;
            d2.textContent = dado2;
            if (idiomaAtual === "pt") {
                document.getElementById("valor_dados_p1").textContent = `Valor de ${jogador.nome}: ${totalP1}`;
            } else {
                document.getElementById("valor_dados_p1").textContent = `${jogador.nome}'s Value: ${totalP1}`; 
            }
            document.getElementById("valor_dados_p1").style.display = "block";
            if (idiomaAtual === "pt") {
                txtP2.innerHTML = `Vez de <span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}</span> lançar os dados`;
            } else {
                txtP2.innerHTML = `<span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}'s</span> turn to roll the dice`; 
            }
            rolarDados.style.cursor = "pointer";
        }, 500);
    } else {
        if (rolarDados.style.cursor === "not-allowed") return;
        rolarDados.style.cursor = "not-allowed";
        const d1 = document.getElementById("dado_1ba");
        const d2 = document.getElementById("dado_2ba")
        d1.classList.add("rolando");
        d2.classList.add("rolando");
        setTimeout(() => {
            d1.classList.remove("rolando");
            d2.classList.remove("rolando");
            const dado1 = Math.floor(Math.random() * 6) + 1;
            const dado2 = Math.floor(Math.random() * 6) + 1;
            totalP2 = dado1 + dado2;
            d1.textContent = dado1;
            d2.textContent = dado2;
            if (totalP1 > totalP2) {
                valorAPagar = casaAtual.alugueis[casaAtual.casasConstruidas] * 0.5;
                if (idiomaAtual === "pt") {
                    txtVencedor.innerHTML = `<span style="color: ${jogador.cor};">${jogador.nome}</span> Venceu!`;
                    txtPerdedor.textContent = `${jogadores[casaAtual.dono].nome} deve pagar ${valorAPagar} Geo`;
                } else {
                    txtVencedor.innerHTML = `<span style="color: ${jogador.cor};">${jogador.nome}</span> Won!`;
                    txtPerdedor.textContent = `${jogadores[casaAtual.dono].nome} must pay ${valorAPagar} Geo`;
                }
                jogadores[casaAtual.dono].geo -= valorAPagar;
                jogador.geo += valorAPagar;
            } else {
                valorAPagar = casaAtual.alugueis[casaAtual.casasConstruidas] * 2;
                if (idiomaAtual === "pt") {
                    txtVencedor.innerHTML = `<span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}</span> Venceu!`;
                    txtPerdedor.textContent = `${jogador.nome} deve pagar ${valorAPagar} Geo`;
                } else {
                    txtVencedor.innerHTML = `<span style="color: ${jogadores[casaAtual.dono].cor};">${jogadores[casaAtual.dono].nome}</span> Won!`;
                    txtPerdedor.textContent = `${jogador.nome} must pay ${valorAPagar} Geo`;
                }
                jogador.geo -= valorAPagar;
                jogadores[casaAtual.dono].geo += valorAPagar;
            }
            setTimeout(() => {
                document.getElementById("modal_batalha_aluguel_result").style.display = "block";
                xBlurBG.style.display = "block";
            }, 1500)
        }, 500);  
    }
}

// Função para fechar o anúncio do vencedor da batalha

function fecharAnuncio() {
    totalP1 = 0;
    totalP2 = 0;
    atualizarGeo();
    document.getElementById("modal_batalha_aluguel_result").style.display = "none";
    xBlurBG.style.display = "none";
    document.getElementById("modal_batalha_aluguel").style.display = "none";
    blurBG.style.display = "none";
    document.getElementById("valor_dados_p1").style.display = "none";
    document.getElementById("lancar_dados").style.cursor = "pointer";
}

// Função para pagar o aluguel

function pagarAluguel() {
    const jogador = jogadores[jogadorAtual];
    const casaAtual = propriedades[jogador.posicao];
    const dono = casaAtual.dono;
    const valorAluguel = casaAtual.alugueis[casaAtual.casasConstruidas];
    jogador.geo -= valorAluguel;
    jogadores[dono].geo += valorAluguel;
    atualizarGeo();
    document.getElementById("modal_pagar_aluguel").style.display = "none";
    blurBG.style.display = "none";
}

// Função para passar a compra da companhia

function passarCompanhia() {
    document.getElementById("modal_compra_companhias").style.display = "none";
    blurBG.style.display = "none";   
}

// Função para comprar a companhia

function comprarCompanhia() {
    const jogador = jogadores[jogadorAtual];
    const casaAtual = propriedades[jogador.posicao];
    if (jogador.geo >= casaAtual.preco) {
        casaAtual.dono = jogadorAtual;
        jogador.geo -= casaAtual.preco;
        atualizarGeo();
        atualizarPropriedades();
        document.getElementById("casa_" + casaAtual.id).style.border = `2px solid ${jogador.cor}`;
        document.getElementById("modal_compra_companhias").style.display = "none";
        blurBG.style.display = "none";
    } else {
        if (idiomaAtual === "pt") {
            exibirMensagem("Você não possui Geo o suficiente!");
        } else {
            exibirMensagem("You don't have enough Geo!");
        }
    }
}

// Função para pagar o valor de uma companhia

function pagarCompanhia() {
    const jogador = jogadores[jogadorAtual];
    const casaAtual = propriedades[jogador.posicao];
    const dono = casaAtual.dono;
    const multiplicador = casaAtual.aluguelBase;
    const rolarDados = document.getElementById("btn_multiplicar_companhia");
    if (rolarDados.style.cursor === "not-allowed") return;
    rolarDados.style.cursor = "not-allowed";
    const d1 = document.getElementById("dado_1co");
    const d2 = document.getElementById("dado_2co")
    d1.classList.add("rolando");
    d2.classList.add("rolando");
    setTimeout(() => {
        d1.classList.remove("rolando");
        d2.classList.remove("rolando");
        const dado1 = Math.floor(Math.random() * 6) + 1;
        const dado2 = Math.floor(Math.random() * 6) + 1;
        const valorAPagar = (dado1 + dado2) * multiplicador;  
        d1.textContent = dado1;
        d2.textContent = dado2;
        setTimeout(() => {
            jogador.geo -= valorAPagar;
            jogadores[dono].geo += valorAPagar;
            if (idiomaAtual === "pt") {
                document.getElementById("resultado_pagar_companhia").textContent = `${jogador.nome} deve pagar ${valorAPagar} Geo para ${jogadores[dono].nome}`;
            } else {
                document.getElementById("resultado_pagar_companhia").textContent = `${jogador.nome} must pay ${valorAPagar} Geo to ${jogadores[dono].nome}`;
            }
            document.getElementById("modal_pagar_companhia_result").style.display = "block";
            xBlurBG.style.display = "block";
        }, 1500);
    }, 500); 
}

// Função para fechar o modal do resultado do valor a pagar na companhia

function fecharValorCompanhia() {
    atualizarGeo();
    document.getElementById("modal_pagar_companhia_result").style.display = "none";
    xBlurBG.style.display = "none";
    document.getElementById("modal_pagar_companhia").style.display = "none";
    blurBG.style.display = "none";
    document.getElementById("btn_multiplicar_companhia").style.cursor = "pointer";
}

// Função para recusar a compra de uma estação

function passarEstacao() {
    document.getElementById("modal_compra_estacoes").style.display = "none";
    blurBG.style.display = "none";
}

// Função para comprar uma estação

function comprarEstacao() {
    const jogador = jogadores[jogadorAtual];
    const casaAtual = propriedades[jogador.posicao];
    if (jogador.geo >= casaAtual.preco) {
        casaAtual.dono = jogadorAtual;
        jogador.geo -= casaAtual.preco;
        atualizarGeo();
        atualizarPropriedades();
        document.getElementById("casa_" + casaAtual.id).style.border = `2px solid ${jogador.cor}`;
        document.getElementById("modal_compra_estacoes").style.display = "none";
        blurBG.style.display = "none";
    } else {
        if (idiomaAtual === "pt") {
            exibirMensagem("Você não possui Geo o suficiente!");
        } else {
            exibirMensagem("You don't have enough Geo!");
        }
    }
}

// Função para não usar a estação

function naoUsarEstacao() {
    valorGenerico = 0;
    atualizarGeo();
    document.getElementById("modal_utilizar_estacao").style.display = "none";
    blurBG.style.display = "none";
}

// Função para usar a estação

function usarEstacao() {
    const jogador = jogadores[jogadorAtual];
    const casaAtual = propriedades[jogador.posicao];
    if (jogador.geo >= valorGenerico) {
        jogador.geo -= valorGenerico;
        jogadores[casaAtual.dono].geo += valorGenerico;
        valorGenerico = 0;
        atualizarGeo();
        const passarVez = document.getElementById("passar_vez");
        passarVez.className = "btn-passar-vez-inativo";
        document.getElementById("modal_utilizar_estacao").style.display = "none";
        blurBG.style.display = "none";
        for (let i = 0; i <= 39 ; i++) {
            const elementoCasa = document.getElementById("casa_" + i);
            let distancia = (i - casaAtual.id + 40) % 40;
            if (distancia >= 1 && distancia <= 9 && propriedades[i].id % 10 !== 0) {
                elementoCasa.style.cursor = "pointer";
                elementoCasa.onclick = function() {
                    for (let x = 0; x <= 39; x++) {
                        const casa = document.getElementById("casa_" + x);
                        casa.style.cursor = "default";
                        casa.onclick = null;
                    }
                    movimentoPeao(jogador.id, distancia);
                };
            } else {
                elementoCasa.style.cursor = "not-allowed";
                elementoCasa.onclick = null; 
            }
        }
    } else {
        if (idiomaAtual === "pt") {
            exibirMensagem("Você não possui Geo o suficiente!");
        } else {
            exibirMensagem("You don't have enough Geo!");
        }    
    }
}

// Função para selar um jogador

function selarJogador(jogador) {
    jogador.selado = true;
    jogador.posicao = 10;
    moverPeao(jogador.elementoPeao, 10);
    tirouDupla = 0;
    jogadorAtual = (jogadorAtual + 1) % jogadores.length;
    atualizarVez();
    document.getElementById("passar_vez").className = "btn-passar-vez-inativo";
    document.getElementById("rolar_dados").style.cursor = "pointer";
    verificarSelado();
}

// Função para verificar se um jogador está selado

function verificarSelado() {
    const jogador = jogadores[jogadorAtual];
    if (jogador.selado === true) {
        if (idiomaAtual === "pt") {
            exibirMensagem(`${jogador.nome} está selado e perdeu o turno! (Modo temporário)`);
        } else {
            exibirMensagem(`${jogador.nome} is sealed and lost the turn! (Temporary mode)`);
        }
        
        // Libera o jogador para o próximo turno (remova isso quando implementar a prisão oficial)
        jogador.selado = false;
        
        // Ajusta os botões para o próximo passar a vez corretamente
        document.getElementById("passar_vez").className = "btn-passar-vez-ativo";
        document.getElementById("rolar_dados").style.cursor = "not-allowed";
        
        return true; // Indica que o jogador estava selado
    }
    return false;
}

atualizarCampos();