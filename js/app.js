App  = {
    dsa: null,
    vaultid: null,

    init: function(){
        dsa = new DSA(web3);
        dsa.address.read.core = "0x2Ec9378446e3873e3aFE9CAEe2056b318712B3db";
        App.getAccounts();
        return App.bindEvents();
    },

    bindEvents: function(){
        $(document).on('click', '#build', App.build);
        $(document).on('click', '#deposit', App.deposit);
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
                $('#address').text(data[0].address);
                return data;
            });
    },

    deposit:function(){
        if(a){
            App.compoundDeposit()
                .then(console.log)
        }else{
            App.makerDeposit()
                .then(console.log)
        }
    },

    compoundDeposit:function(){
        App.getAccounts()
            .then(async function(data){ 
                await dsa.setInstance(data[0].id);
                let spells = dsa.Spell();
                spells.add({
                    connector: "basic",
                    method: "deposit",
                    args: [dsa.tokens.info.dai.address, dsa.tokens.fromDecimal(1, "dai"), 0, 0]
                });
                spells.add({
                    connector: "compound",
                    method: "deposit",
                    args: [dsa.tokens.info.dai.address, dsa.tokens.fromDecimal(1, "dai"), 0, 0]
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
                    connector: "basic",
                    method: "deposit",
                    args: [dsa.tokens.info.dai.address, dsa.tokens.fromDecimal(1, "dai"), 0, 0]
                });
                spells.add({
                    connector: "maker",
                    method: "depositDai",
                    args: [dsa.tokens.fromDecimal(1, "dai"), 0, 0]
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





