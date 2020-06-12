App  = {
    dsa: null,
    vaultid: null,
    a: 1,
    b: 0,
    isIncompound: false,
    principalVal: 0,


    init: async function(){
        dsa = new DSA(web3);

        //var kovanAdd = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"
        //this line is used when you use Kovan network
        dsa.address.read.core = "0x2Ec9378446e3873e3aFE9CAEe2056b318712B3db";
        await App.getAccounts();
        //await App.compoundSupply();
        //await App.makerSupply();
        //await App.upperDashboard();
        return App.bindEvents();
    },

    bindEvents: function(){
        $(document).on('click', '#build', App.build);
        $(document).on('click', '#trade', App.compoundtoMaker);
        //$(document).on('click', '#transfer', App.transfer);
        $(document).on('click', '#deposit', App.deposit);
        $(document).on('click', '#withdraw', App.withdraw);
        $(document).on('click', '#userAllowance', App.userAllowance);
    },

    //This will build a new DSA account
    build: function(event){
        dsa.build()
            .then(async function(data){
                console.log(data);
                return App.getAccounts();
            });
    },

    // upperDashboard: async function(event){
    //     $('#PAmount').text(App.principalVal);
    //     await dsa.getAccounts(window.ethereum.selectedAddress)
    //         .then(async function(data){
    //             if(App.isIncompound==true){
    //                 await dsa.compound.getPosition(data[0].address)
    //                     .then(function(data){
    //                         val = data['dai'].supply;
    //                         $('#intEarned').text(val - App.principalVal);
    //                         if(App.principalVal>0){
    //                             $('#AvgRate').text(100* ((val - App.principalVal)/App.principalVal));
    //                         }
    //                     });
    //             }else{
    //                 await dsa.maker.getDaiPosition(data[0].address)
    //                     .then(function(data){
    //                         val = data.balance;
    //                         $('#intEarned').text(val - App.principalVal);
    //                         if(App.principalVal>0){
    //                             $('#AvgRate').text(100* ((val - App.principalVal)/App.principalVal));
    //                         }
    //                     });
    //             }
    //         });
    // },

    //it will get the interest rate of lending in DAI in compound
    // compoundSupply: async function(){
    //     await dsa.getAccounts(window.ethereum.selectedAddress)
    //         .then(async function(data){
    //             await dsa.compound.getPosition(data[0].address)
    //             .then(function(data){
    //                 App.a = data['dai'].supplyRate;
    //                 return App.a;
    //             });
    //         }) 
    // },

    //it will get the interest rate of lending in DAI in maker DSR
    // makerSupply: async function(){
    //     await dsa.getAccounts(window.ethereum.selectedAddress)
    //      .then(async function(){
    //         await dsa.maker.getDaiPosition(window.ethereum.selectedAddress)
    //         .then(function(data){
    //             App.b = data.rate;
    //             if(data.balance>0){
    //                 App.isIncompound = false;
    //             }
    //             else{
    //                 App.isIncompound = true;
    //             }
    //             return App.b;
    //         });
    //     })    
    // },

    deposit: async function(){
        //await App.compoundSupply();
        //await App.makerSupply();
        //console.log(App.a);
        //console.log(App.b);
        if(App.a>App.b){
            await App.compoundDeposit()
            App.isIncompound = true;
        }
        else{
            await App.makerdaoDeposit()
            App.isIncompound = false;
        }
    },

    withdraw: async function(){
        if(App.isIncompound==true){
            await App.compoundWithdraw()
            App.isIncompound = false;
        }
        else{
            await App.makerdaoWithdraw()
            App.isIncompound = false;
        }
    },

    userAllowance: function(){
        dsa.getAccounts(window.ethereum.selectedAddress)
        .then(async function(data){
            await dsa.erc20.approve({
                token: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
                amount: -1,
                to: data[0].address
            }).then(function(){
                return App.getAccounts();
            });
        }) 
    },

    getAccounts: async function(){ 
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                await dsa.setInstance(data[0].id);
                $('#accountValue').text(data[0].address);
                $('#address').text(data[0].address); 
                return data;
            });
    },

    compoundDeposit:function(){
        App.getAccounts()
            .then(function(data){
                amount = parseInt($('#amount').val());
                App.principalVal = App.principalVal + amount;
                let spells = dsa.Spell();
                spells.add({
                    connector: "basic",
                    method: "deposit",
                    args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", dsa.tokens.fromDecimal(amount, "dai"), 0, 0]
                });
                spells.add({
                    connector: "compound",
                    method: "deposit",
                    args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", dsa.tokens.fromDecimal(amount, "dai"), 0, 0]
                });
                dsa.cast(spells)
                    .then(function(){
                        console.log()
                    }) 
            })  
    },

    compoundWithdraw:function(){
        App.getAccounts()
            .then(function(data){
                App.principalVal = 0;
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

    makerdaoDeposit: function(){
        App.getAccounts()
            .then(async function(){
                var amount = $('#amount').val();
                App.principalVal = App.principalVal + amount;
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
    },

    makerdaoWithdraw:function(){
        App.getAccounts()
            .then(function(data){
                App.principalVal = 0;
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

    //right now when you click Trade button, this function will work
    compoundtoMaker:function(){
        dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                await dsa.setInstance(data[0].id)
                
                //amount = dsa.tokens.fromDecimal(data['dai'].supply, "dai");
                let spells = dsa.Spell();
                spells.add({
                    connector: "compound",
                    method: "withdraw",
                    args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",dsa.tokens.fromDecimal("1", "dai"), 0, 0]
                });
                spells.add({
                    connector: "maker",
                    method: "depositDai",
                    args: [dsa.tokens.fromDecimal("1", "dai"), 0, 0]
                });
                dsa.cast(spells).then(console.log)  
            })    
    },

    makertoCompound:function(){
        dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){ 
                await dsa.setInstance(data[0].id)
                await dsa.maker.getDaiPosition(data[0].address)
                    .then(function(data){
                        let spells = dsa.Spell();
                        spells.add({
                            connector: "maker",
                            method: "withdrawDai",
                            args: ["-1", 0, 0]
                        });
                        spells.add({
                            connector: "compound",
                            method: "deposit",
                            args: [dsa.tokens.info.dai.address, dsa.tokens.fromDecimal(data.balance), 0, 0]
                        });
                        dsa.cast(spells).then(console.log) 
                    })
                
            })    
    },

    
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





