App  = {
    dsa: null,
    vaultid: null,

    init: function(){
        dsa = new DSA(web3);
        dsa.address.read.core = "0x2Ec9378446e3873e3aFE9CAEe2056b318712B3db";
        return App.bindEvents();
    },
    
    bindEvents: function(){
        $(document).on('click', '#build', App.build);
        $(document).on('click', '#getAccounts', App.getAccounts);
        $(document).on('click', '#transfer', App.transfer);
        $(document).on('click', '#compoundDeposit', App.compoundDeposit);
    },

    build: function(event){
        dsa.build()
            .then(function(data){
                console.log(data);
                return App.getAccounts();
            });
    },

    transfer: function(){        
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
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(function(data){
                console.log(data);
                dsa.setInstance(data[0].id);
                return data
            });
    },

    compoundDeposit:function(){
        App.getAccounts()
            .then(async function(data){
                await dsa.setInstance(97);
                let spells = dsa.Spell();
                spells.add({
                    connector: "compound",
                    method: "deposit",
                    args: [dsa.tokens.info.eth.address, dsa.tokens.fromDecimal(1, "eth"), 0, 0]
                });
                dsa.cast(spells).then(console.log) 
            })    
    },


    makerdaoDeposit: function(){
        App.getAccounts()
            .then(async function(data){
                await dsa.setInstance(data[0].id);
                let spells = dsa.Spell();
                spells.add({
                    connector: "maker",
                    method: "deposit",
                    args: [vaultid, dsa.tokens.fromDecimal(1, "eth"), getId, setId]
                });
                dsa.cast(spells).then(console.log) 
            })    
    },

    makeVault: function(){
        App.getAccounts()
            .then(async function(data){
                await dsa.setInstance(data[0].id);
                let spells = dsa.Spell();
                spells.add({
                    connector: "maker",
                    method: "open",
                    args: [coll_name]
                });
                dsa.cast(spells)
                .then(function(){
                    dsa.maker.getVaults(address)
                    .then(function(data){
                        
                    })
                }) 
            })    
    },
    
    deposit: function(){

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
    return App.init();
    
};





