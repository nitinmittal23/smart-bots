App  = {
    dsa: null,
    vaultid: null,
    a: null,
    b: null,

    init: function(){
        dsa = new DSA(web3);
        //dsa.address.read.core = "0x2Ec9378446e3873e3aFE9CAEe2056b318712B3db";
        App.getAccounts();
        return App.bindEvents();
    },

    bindEvents: function(){
        $(document).on('click', '#build', App.build);
        //$(document).on('click', '#trade', App.deposit);
        //$(document).on('click', '#transfer', App.transfer);
        $(document).on('click', '#deposit', App.deposit);
        $(document).on('click', '#withdraw', App.makerdaoWithdraw);
        $(document).on('click', '#userAllowance', App.userAllowance);
    },

    build: function(event){
        dsa.build()
            .then(function(data){
                console.log(data);
                return App.getAccounts();
            });
    },

    compoundSupply: async function(){
        await dsa.compound.getPosition(window.ethereum.selectedAddress)
            .then(function(data){
                App.a = data['dai'].supplyRate;
                return App.a;
            });
    },

    makerSupply: async function(){
        await dsa.maker.getDaiPosition(window.ethereum.selectedAddress)
            .then(function(data){
                App.b = data.rate;
                return App.b;
            });
    },

    deposit: async function(){
        await App.compoundSupply();
        await App.makerSupply();
        if(App.a>App.b){
            App.compoundDeposit()
        }
        else{
            App.makerdaoDeposit()
        }
    },

    userAllowance: function(event){
        dsa.getAccounts(window.ethereum.selectedAddress)
        .then(async function(data){
            await dsa.erc20.approve({
                token: dsa.tokens.info.dai.address,
                amount: -1,
                to: data[0].address
            }).then(function(){
                return App.getAccounts();
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

    compoundDeposit:function(){
        App.getAccounts()
            .then(function(data){
                amount = parseInt($('#amount').val());
                let spells = dsa.Spell();
                spells.add({
                    connector: "basic",
                    method: "deposit",
                    args: [dsa.tokens.info.dai.address, dsa.tokens.fromDecimal(amount, "dai"), 0, 0]
                });
                spells.add({
                    connector: "compound",
                    method: "deposit",
                    args: [dsa.tokens.info.dai.address, dsa.tokens.fromDecimal(amount, "dai"), 0, 0]
                });
                dsa.cast(spells).then(console.log) 
            })    
    },

    compoundWithdraw:function(){
        App.getAccounts()
            .then(function(data){
                let spells = dsa.Spell();
                spells.add({
                    connector: "compound",
                    method: "withdraw",
                    args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", "-1", 0, 0]
                });
                spells.add({
                    connector: "basic",
                    method: "withdraw",
                    args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", "-1", window.ethereum.selectedAddress, 0, 0]
                });
                dsa.cast(spells).then(console.log) 
            })    
    },

    makerdaoWithdraw:function(){
        App.getAccounts()
            .then(function(data){
                let spells = dsa.Spell();
                spells.add({
                    connector: "maker",
                    method: "withdrawDai",
                    args: ["-1", 0, 0]
                });
                spells.add({
                    connector: "basic",
                    method: "withdraw",
                    args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", "-1", window.ethereum.selectedAddress, 0, 0]
                });
                dsa.cast(spells).then(console.log) 
            })    
    },

    makerdaoDeposit: function(){
        App.getAccounts()
            .then(async function(){
                var amount = $('#amount').val();
                let spells = dsa.Spell();
                spells.add({
                    connector: "basic",
                    method: "deposit",
                    args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", dsa.tokens.fromDecimal(amount, "dai"), 0, 0]
                });
                spells.add({
                    connector: "maker",
                    method: "depositDai",
                    args: [dsa.tokens.fromDecimal(amount, "dai"), 0, 0]
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
    return App.init();
    
};





