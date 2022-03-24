import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, getTokenAccountsByOwner, PublicKey } from "@solana/web3.js";
//import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
//create a connection of devnet
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import ReactDOM from 'react-dom';


import logo from './logo.svg';
import './App.css';
import { constant } from "@solana/buffer-layout";

let nftsInWallet = []
let tokensInWallet = []
const connection = new Connection("https://api.mainnet-beta.solana.com");

const createConnection = () => {
  return new Connection(clusterApiUrl("mainnet-beta"));
};
//getTokenAccountsByOwner(publicKey,)
async function getTheTokensOfOwner(){


(async () => {
  const MY_WALLET_ADDRESS = "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9";
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: MY_WALLET_ADDRESS, // base58 encoded string
          },
        },
      ],
    }
  );

  console.log(
    `Found ${accounts.length} token account(s) for wallet ${MY_WALLET_ADDRESS}: `
  );
   await accounts.forEach((account, i) => {
     let amountI = account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"];
     let mint_s = account.account.data["parsed"]["info"]["mint"]

    if (amountI==1){
      try{
        console.log(
          `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
        );
        console.log(`Mint: ${mint_s}`);
        let objT ={}
        objT.mint = mint_s
        objT.amount =amountI
        tokensInWallet.push(objT)
        
       // let token_amount_i = account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]
        console.log(
          `Amount: ${amountI}`
          
        ); 
      }catch{
        //tokensInWallet.push({mint:mint_s,amount: amountI })
      }

    }
  
  }
  
  );
  console.log("tokens: "+tokensInWallet)
  let currentI = 0
  await tokensInWallet.forEach(element => {
    console.log("element[currentI].mint"+element.mint)
    getAccountMetaData(element.mint, element.amount, currentI)  
    currentI+=1
  });
  //console.log("nfts: "+nftsInWallet)
 
  /*
    // Output

    Found 1 token account(s) for wallet FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T: 
    -- Token Account Address 1: Et3bNDxe2wP1yE5ao6mMvUByQUHg8nZTndpJNvfKLdCb --
    Mint: BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf
    Amount: 3
  */
})();
}
let elements = []
let element;

async function UpdateTheUI(tokenInWallet, number){

  return fetch(tokenInWallet.uri)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson.image)
     let element = <img src={responseJson.image} width="100%"/>;
     let elementname = <h1>{tokenInWallet.name}</h1>

    ReactDOM.render(element, document.getElementById("img"+number.toString()))
    ReactDOM.render(elementname, document.getElementById("tit"+number.toString()))

    console.log("theJson.image"+ responseJson.image)
    elements.push(element)




    return responseJson.image;
  })
  .catch((error) => {
    console.error(error);
  });


     
}


async function getAccountMetaData(mintAddress, amountI, numberI){
   (async () => {
    let mintPubkey = new PublicKey(mintAddress);
    let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
  
    const tokenmeta = await Metadata.load(connection, tokenmetaPubkey);
    //console.log(tokenmeta);
   // console.log(tokenmeta.data.data["name"])
   // nftsInWallet.push({name: tokenmeta.data.data["name"], uri: tokenmeta.data.data["uri"]})
    //console.log("nfts: "+nftsInWallet)
   tokensInWallet[numberI].name = tokenmeta.data.data["name"]
   tokensInWallet[numberI].uri = tokenmeta.data.data["uri"]
   console.log("uri"+tokenmeta.data.data["uri"])
   console.log()
   // console.log(tokenmeta.data.data["uri"])
   //tokensInWallet.push({mint:mintAddress })
   await UpdateTheUI(tokensInWallet[numberI], numberI)

   // UpdateTheUI(mintAddress, tokenmeta.data.data["uri"], tokenmeta.data.data["name"], numberI)
  })();
}

getTheTokensOfOwner()
function App() {
  return (
    <div className="App">
 NFTs in wallet
 <div id="root">
  <div id="tit0"></div>
   <div id="img0"></div>
   <div id="tit1"></div>
   <div id="img1"></div>
   <div id="tit2"></div>
   <div id="img2"></div>
   <div id="tit3"></div>
   <div id="img3"></div>
   <div id="tit4"></div>
   <div id="img4"></div>
   <div id="tit5"></div>
   <div id="img5"></div>
   <div id="tit6"></div>
   <div id="img6"></div>
   <div id="tit7"></div>
   <div id="img7"></div>
   <div id="tit8"></div>
   <div id="img8"></div>
   <div id="tit9"></div>
   <div id="img9"></div>
   <div id="tit10"></div>
   <div id="img10"></div>


 </div>
    </div>
  );
}

export default App;
