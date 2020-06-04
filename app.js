App  = {
    bindEvents: function(){
        $(document).on('click', '#build', App.build);
        $(document).on('click', '#getAccounts', App.getAccounts);
        $(document).on('click', '#transfer', App.transfer);
        $(document).on('click', '#compoundDeposit', App.compoundDeposit);
    },

    build: function(event){
        const dsa = new DSA(web3);
        dsa.build().then(console.log);
    },

    getAccounts: async function(){
        const dsa = new DSA(web3);
        dsa.address.read.core = "0x2Ec9378446e3873e3aFE9CAEe2056b318712B3db";
        await dsa.getAccounts(window.ethereum.selectedAddress).then(console.log);
  
    },

    transfer: function(){
        
        const dsa = new DSA(web3);
        dsa.transfer({
            "token": "eth", 
            "amount": dsa.tokens.fromDecimal(1, "eth"), 
            "to" : "0xeD59dE5901B7dc96A265fF2893cF037de32978A9", 
            "from": window.ethereum.selectedAddress
          }).then(data  => {
              console.log(data);
              return  data 
          }).catch(error  => {
              return  error
          });
    },

    compoundDeposit: function(){
        const dsa = new DSA(web3);
        dsa.setInstance("96");
        let spells = dsa.Spell();
        spells.add({
            connector: "compound",
            method: "deposit",
            args: [dsa.tokens.info.eth.address, dsa.tokens.fromDecimal(1, "eth"), 0, 0]
          });
        dsa.cast(spells).then(console.log) 
    }

};

window.onload = async function() {


    if (window.ethereum) {
        await window.ethereum.enable()
        window.web3 = new Web3(window.ethereum)
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        //window.web3 = new Web3(customProvider)
    }
    

    return App.bindEvents();
    
};





