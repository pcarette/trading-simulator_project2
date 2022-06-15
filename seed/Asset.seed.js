const Asset = require("../models/Asset.model");
const stocks = require('./Stocks.json');

let assets = [
  {
    category: "Crypto",
    name: "Bitcoin",
    symbol: "BTC",
  },
  {
    category: "Crypto",
    name: "Ethereum",
    symbol: "ETH",
  },
  {
    category: "Crypto",
    name: "USD Tether",
    symbol: "USDT",
  },
  {
    category: "Crypto",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    category: "Crypto",
    name: "Binance Coin",
    symbol: "BNB",
  },
  {
    category: "Crypto",
    name: "Binance USD",
    symbol: "BUSD",
  },
  {
    category: "Crypto",
    name: "Cardano",
    symbol: "ADA",
  },
  {
    category: "Crypto",
    name: "Ripple",
    symbol: "XRP",
  },
  {
    category: "Crypto",
    name: "Solana",
    symbol: "SOL",
  },
  {
    category: "Crypto",
    name: "Polkadot",
    symbol: "DOT",
  },
  {
    category: "Crypto",
    name: "Dogecoin",
    symbol: "DOGE",
  },
  {
    category: "Crypto",
    name: "DAI",
    symbol: "DAI",
  },
  {
    category: "Crypto",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
  },
  {
    category: "Crypto",
    name: "Tron",
    symbol: "TRX",
  },
  {
    category: "Crypto",
    name: "UNUS SED LEO",
    symbol: "LEO",
  },
  {
    category: "Crypto",
    name: "Avalanche",
    symbol: "AVAX",
  },
  {
    category: "Crypto",
    name : "Shiba Inu",
    symbol : "SHIB"
  },
  {
    category: "Crypto",
    name : "Litecoin",
    symbol : "LTC"
  },
  {
    category: "Crypto",
    name : "FTX Token",
    symbol : "FTT"
  },
  {
    category: "Crypto",
    name : "Polygon",
    symbol : "MATIC"
  },
  {
    category: "Crypto",
    name : "Chainlink",
    symbol : "LINK"
  },
  {
    category: "Crypto",
    name : "Stellar",
    symbol : "XLM"
  },
  {
    category: "Crypto",
    name : "Uniswap",
    symbol : "UNI"
  },
  {
    category: "Crypto",
    name : "Near Protocol",
    symbol : "NEAR"
  },
  {
    category: "Crypto",
    name : "Bitcoin Cash",
    symbol : "BCH"
  },
  {
    category: "Crypto",
    name : "Algorand",
    symbol : "ALGO"
  },
  {
    category: "Crypto",
    name : "Monero",
    symbol : "XMR"
  },
  {
    category: "Crypto",
    name : "Cosmos",
    symbol : "ATOM"
  },
  {
    category: "Crypto",
    name : "Ethereum Classic",
    symbol : "ETC"
  },
  {
    category: "Crypto",
    name : "Vechain",
    symbol : "VET"
  },
  {
    category: "Crypto",
    name : "Flow",
    symbol : "FLOW"
  },
  {
    category: "Crypto",
    name : "Decentraland",
    symbol : "MANA"
  },
  {
    category: "Crypto",
    name : "Hedera",
    symbol : "HBAR"
  },
  {
    category: "Crypto",
    name : "Internet Computer",
    symbol : "ICP"
  },
  {
    category: "Crypto",
    name : "Tezos",
    symbol : "XTZ"
  },
  {
    category: "Crypto",
    name : "TrueUSD",
    symbol : "TUSD"
  },
  {
    category: "Crypto",
    name : "Filecoin",
    symbol : "FIL"
  },
  {
    category: "Crypto",
    name : "Helium",
    symbol : "HNT"
  },
  {
    category: "Crypto",
    name : "Theta Network",
    symbol : "THETA"
  },
  {
    category: "Crypto",
    name : "The Sandbox",
    symbol : "SAND"
  },
  {
    category: "Crypto",
    name : "Elrond",
    symbol : "EGLD"
  },
  {
    category: "Crypto",
    name : "ApeCoin",
    symbol : "APE"
  },
  {
    category: "Crypto",
    name : "EOS",
    symbol : "EOS"
  },
  {
    category: "Crypto",
    name : "Axie Infinity",
    symbol : "AXS"
  },
  {
    category: "Crypto",
    name : "Aave Protocol",
    symbol : "AAVE"
  },
  {
    category: "Crypto",
    name : "IOTA",
    symbol : "MIOTA"
  },
  {
    category: "Crypto",
    name : "eCash",
    symbol : "XEC"
  },
  {
    category: "Crypto",
    name : "Klaytn",
    symbol : "KLAY"
  },
  {
    category: "Crypto",
    name : "The Graph",
    symbol : "GRT"
  },
  {
    category: "Crypto",
    name : "OKB",
    symbol : "OKB"
  },
  {
    category: "Crypto",
    name : "Neo",
    symbol : "NEO"
  },
  {
    category: "Crypto",
    name : "ThorChain",
    symbol : "RUNE"
  },
  {
    category: "Crypto",
    name : "Quant",
    symbol : "QNT"
  },
  {
    category: "Crypto",
    name : "Fantom",
    symbol : "FTM"
  },
  {
    category: "Crypto",
    name : "Chiliz",
    symbol : "CHZ"
  },
  {
    category: "Crypto",
    name : "Loopring",
    symbol : "LRC"
  },
  {
    category: "Crypto",
    name : "Waves",
    symbol : "WAVES"
  },
  {
    category: "Crypto",
    name : "Basic Attention Token",
    symbol : "BAT"
  },
  {
    category: "Crypto",
    name : "Dash",
    symbol : "DASH"
  },
  {
    category: "Crypto",
    name : "PancakeSwap",
    symbol : "CAKE"
  },
  {
    category: "Crypto",
    name : "Kusama",
    symbol : "KSM"
  },
  {
    category: "Crypto",
    name : "Ziliqa",
    symbol : "ZIL"
  },
  {
    category: "Crypto",
    name : "Gala",
    symbol : "GALA"
  },
  {
    category: "Crypto",
    name : "Nexo",
    symbol : "NEXO"
  },
  {
    category: "Crypto",
    name : "Amp",
    symbol : "AMP"
  },
  {
    category: "Crypto",
    name : "Enjin Coin",
    symbol : "ENJ"
  },
  {
    category: "Crypto",
    name : "Celo",
    symbol : "CELO"
  },
  {
    category: "Crypto",
    name : "STEPN",
    symbol : "GMT"
  },
  {
    category: "Crypto",
    name : "PancakeSwap",
    symbol : "CAKE"
  },
  {
    category: "Crypto",
    name : "XDC Network",
    symbol : "XDC"
  },
  {
    category: "Crypto",
    name : "Holo",
    symbol : "HOT"
  },
  {
    category: "Crypto",
    name : "NEM",
    symbol : "XEM"
  },
  {
    category: "Crypto",
    name : "Decred",
    symbol : "DCR"
  },
  {
    category: "Crypto",
    name : "Mina",
    symbol : "MINA"
  },
  {
    category: "Crypto",
    name : "Kava",
    symbol : "KAVA"
  },
  {
    category: "Crypto",
    name : "Curve DAO Token",
    symbol : "CRV"
  },
  {
    category: "Crypto",
    name : "GateToken",
    symbol : "GT"
  },
  {
    category: "Crypto",
    name : "Harmony",
    symbol : "ONE"
  },
  {
    category: "Crypto",
    name : "1inch Network",
    symbol : "1INCH"
  },
  {
    category: "Crypto",
    name : "Gnosis",
    symbol : "GNO"
  },
  {
    category: "Crypto",
    name : "Kadena",
    symbol : "KDA"
  },
  {
    category: "Crypto",
    name : "Qtum",
    symbol : "QTUM"
  },
  {
    category: "Crypto",
    name : "Areweave",
    symbol : "AR"
  },
  {
    category: "Crypto",
    name : "OMG Network",
    symbol : "OMG"
  },
  {
    category: "Crypto",
    name : "Oasis Network",
    symbol : "ROSE"
  },
  {
    category: "Crypto",
    name : "IoTeX",
    symbol : "IOTX"
  },
  {
    category: "Crypto",
    name : "Serum",
    symbol : "SRM"
  },
  
];

Array.prototype.push.apply(assets, stocks);

async function seed() { 
    try{
        await Asset.deleteMany()
        const assetsCreated = await Asset.create(assets);
        console.log(`Created ${assetsCreated.length} assets on database`);
    } catch (err) {
        console.log(err);
    }
}
seed()