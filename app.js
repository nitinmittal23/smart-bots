App  = {
    bindEvents: function(){
        $(document).on('click', '#build', App.build);
        $(document).on('click', '#getAccounts', App.getAccounts);
        $(document).on('click', '#transfer', App.transfer);
        $(document).on('click', '#compoundDeposit', App.compoundDeposit);
    },

    build: function(event){
        const dsa = new DSA(web3);
        dsa.build()
            .then(function(data){
                console.log(data);
                return App.getAccounts;
            });
    },

    transfer: function(){
        
        const dsa = new DSA(web3);
        dsa.address.read.core = "0x2Ec9378446e3873e3aFE9CAEe2056b318712B3db";
        dsa.getAccounts(window.ethereum.selectedAddress)
            .then(function(data){
                dsa.transfer({
                    "token": "eth",
                    "amount": dsa.tokens.fromDecimal(1, "eth"), 
                    "to" : data[0].address, 
                    "from": window.ethereum.selectedAddress,   
                }).then(data  => {
                    return  data
                }).catch(error  => {
                    return  error
                });
            })
    },

    getAccounts: async function(){
        const dsa = new DSA(web3);
        dsa.address.read.core = "0x2Ec9378446e3873e3aFE9CAEe2056b318712B3db";
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(function(data){
                console.log(data);
                dsa.setInstance(data[0].id);
            });
  
    },
    compoundDeposit: function(){
        const dsa = new DSA(web3);
        App.getAccounts()
            .then(function(data){
                let spells = dsa.Spell();
                spells.add({
                    connector: "compound",
                    method: "deposit",
                    args: [dsa.tokens.info.eth.address, dsa.tokens.fromDecimal(1, "eth"), 0, 0]
                });
                dsa.cast(spells).then(console.log) 
            })    
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





