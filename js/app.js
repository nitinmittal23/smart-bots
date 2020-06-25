App  = {
    dsa: null,
    a: null,
    b: null,
    biconomy: undefined,
    db: null,
    id: null,
    isIncompound: false,
    pamount: 0,

    init: async function(){
        dsa = new DSA(web3);
        //var kovanAdd = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"
        App.db = openDatabase('smartbot', '1.0', 'my first database', 4 * 1024 * 1024);
        await App.setupKovan();
        await App.setupAaveTokenAddress();
        // await App.compoundSupply();
        // await App.aaveSupply();
        App.interest();
        App.bindEvents();
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                if(data.length!=0){
                    await App.getAccounts();
                    await App.upperDashboard();
                }
            })
    },

    setupKovan: function() {
        dsa.address.read.core="0x2Ec9378446e3873e3aFE9CAEe2056b318712B3db";
        dsa.address.read.compound="0x01D17A809A1D5D60d117b048DAeE6d8a1d26E326";
        dsa.address.read.maker="0x04c99f93A753fe37A72690625e1cf89BA84cA7a9";
        dsa.tokens.info.ceth.address = "0xf92FbE0D3C0dcDAE407923b2Ac17eC223b1084E4"
        dsa.tokens.info.cdai.address = "0xe7bc397dbd069fc7d0109c0636d06888bb50668c"
        dsa.tokens.info.cusdc.address = "0xcfc9bb230f00bffdb560fce2428b4e05f3442e35"
        dsa.tokens.info.cusdt.address = "0x3f0a0ea2f86bae6362cf9799b523ba06647da018"
        dsa.tokens.info.cwbtc.address = "0x3659728876efb2780f498ce829c5b076e496e0e3"
        dsa.tokens.info.czrx.address = "0xc014dc10a57ac78350c5fddb26bb66f1cb0960a0"
        dsa.tokens.info.crep.address = "0xfd874be7e6733bdc6dca9c7cdd97c225ec235d39"
        dsa.tokens.info.cbat.address = "0xd5ff020f970462816fdd31a603cb7d120e48376e"
    },

    setupAaveTokenAddress: function() {
        // Setting aave kovan token addresses
        dsa.tokens.info.eth.address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        dsa.tokens.info.dai.address = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD"
        dsa.tokens.info.usdc.address = "0xe22da380ee6B445bb8273C81944ADEB6E8450422"
        dsa.tokens.info.usdt.address = "0x13512979ADE267AB5100878E2e0f485B568328a4"
        dsa.tokens.info.wbtc.address = "0x3b92f58feD223E2cB1bCe4c286BD97e42f2A12EA"
        dsa.tokens.info.zrx.address = "0xD0d76886cF8D952ca26177EB7CfDf83bad08C00C"
        dsa.tokens.info.rep.address = "0x260071C8D61DAf730758f8BD0d6370353956AE0E"
        dsa.tokens.info.bat.address = "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738"
        dsa.tokens.info.susd.address = "0xD868790F57B39C9B2B51b12de046975f986675f9"
        dsa.tokens.info.tusd.address = "0x1c4a937d171752e1313D70fb16Ae2ea02f86303e"
        dsa.tokens.info.busd.address = "0x4c6E1EFC12FDfD568186b7BAEc0A43fFfb4bCcCf"
        dsa.tokens.info.knc.address = "0x3F80c39c0b96A0945f9F0E9f55d8A8891c5671A8"
        dsa.tokens.info.lend.address = "0x1BCe8A0757B7315b74bA1C7A731197295ca4747a"
        dsa.tokens.info.link.address = "0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789"
        dsa.tokens.info.mana.address = "0x738Dc6380157429e957d223e6333Dc385c85Fec7"
        dsa.tokens.info.mkr.address = "0x61e4CAE3DA7FD189e52a4879C7B8067D7C2Cc0FA"
        dsa.tokens.info.snx.address = "0x7FDb81B0b8a010dd4FFc57C3fecbf145BA8Bd947"
    
        // setting atokens addresses on kovan
        dsa.tokens.info.aeth.address = "0xD483B49F2d55D2c53D32bE6efF735cB001880F79"
        dsa.tokens.info.adai.address = "0x58AD4cB396411B691A9AAb6F74545b2C5217FE6a"
        dsa.tokens.info.ausdc.address = "0x02F626c6ccb6D2ebC071c068DC1f02Bf5693416a"
        dsa.tokens.info.ausdt.address = "0xA01bA9fB493b851F4Ac5093A324CB081A909C34B"
        dsa.tokens.info.awbtc.address = "0xCD5C52C7B30468D16771193C47eAFF43EFc47f5C"
        
        dsa.tokens.info.azrx.address = "0x0F456900c6bdFddfA27E1E4E4c84EB823a2eE13c"
        dsa.tokens.info.arep.address = "0x0578469469Db1129271f4eb3EB9D97426506c44c"
        dsa.tokens.info.abat.address = "0x5ad67de6Fb697e92a7dE99d991F7CdB77EdF5F74"
    
        // deleting few atokens
        delete dsa.tokens.info.asusd
        delete dsa.tokens.info.atusd
        delete dsa.tokens.info.abusd
        delete dsa.tokens.info.aknc     
        delete dsa.tokens.info.alend
        delete dsa.tokens.info.alink
        delete dsa.tokens.info.amana
        delete dsa.tokens.info.amkr     
        delete dsa.tokens.info.asnx 
    },

    getAccounts: async function(){
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                if(data.length != 0){
                    await dsa.setInstance(data[0].id);
                    App.id = data[0].id;
                    console.log(data[0].id);
                    if(App.biconomy) {
                        console.log(`DSA Address set in biconomy`)
                        App.biconomy.addDSAAddress(data[0].address);
                    }
                    $('#accountValue').text(data[0].address);
                    App.db.transaction(function (tx) {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS allAccounts (id unique, pAmt, ETH, DAI)');
                        tx.executeSql('INSERT INTO allAccounts (id , pAmt, ETH, DAI) VALUES (' +App.id+ ', 0, 0, 0)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS `' + App.id + '` (text, time, hash)');
                    });
                    await dsa.compound.getPosition(data[0].address)
                        .then(function(data){
                            balance = data['dai'].supply;
                            if(balance>0){
                                App.isIncompound = true;
                            }else{
                                App.isIncompound = false;
                            }
                        })
                }
            });
    },

    bindEvents: function(){
        $(document).on('click', '#build', App.build);
        $(document).on('click', '#deposit', App.deposit);
        $(document).on('click', '#withdraw', App.withdraw);
        //$(document).on('click', '#trade', App.toggle);
        //$(document).on('click', '#allowance', App.userAllowance);
        //$(document).on('click', '#Authority', App.authority);
    },

    //This will build a new DSA account
    build: function(event){
        dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                if(data.length==0){
                    await dsa.build()
                    .then(async function(data){
                        console.log(data);
                        alert("give allowance to DSA");
                        await App.userAllowance()
                            .then(async function(){
                                alert("give Authority to DSA");
                                await App.authority()
                                    .then(console.log("Your account has been created"))
                            })
                    });
                }
                else{
                    alert("Account already created")
                } 
            })   
    },

    upperDashboard: async function(event){
        App.db.transaction(function (tx) {
            tx.executeSql('SELECT pAmt FROM allAccounts WHERE id = ' + App.id + ';', [], function (tx, results) {
                $('#PAmount').text(results.rows.item(0).pAmt);
                App.pamount = results.rows.item(0).pAmt;
            });
        });
        $("#all-logs").empty();
        App.db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM `'+App.id+'`;', [], function (tx, results) {
                var logrow = $('#all-logs');
                var len = results.rows.length, i;
                console.log(results);
                for (i = 0; i < len; i++) {
                    var logTemplate = $('#template');
                    console.log(results.rows.item(i).text)
                    logTemplate.find('#text').text(results.rows.item(i).text);
                    logTemplate.find('#hash').text(results.rows.item(i).hash);
                    logTemplate.find('#time').text(results.rows.item(i).time);
                    logrow.append(logTemplate.html());
                }
                
            });
        });
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                if(App.isIncompound==true){
                    $('#mpercent').text("0%");
                    if(App.pamount>0){
                        $('#cpercent').text("100%");
                    }else{
                        $('#cpercent').text("0%");
                    }
                    
                    await dsa.compound.getPosition(data[0].address)
                        .then(function(data){
                            console.log(data);
                            $('#totalSupply').text(data['dai'].supply.toFixed(5));
                            $('#daiAmount').text(data['dai'].supply.toFixed(5));
                            val = data['dai'].supply;
                            console.log(val);
                            $('#intEarned').text((val - App.pamount).toFixed(5));
                            if(App.pamount>0){
                                $('#AvgRate').text((100* ((val - App.pamount)/App.pamount)).toFixed(5));
                            }
                        });
                }else{
                    $('#cpercent').text("0%");
                    if(App.pamount>0){
                        $('#mpercent').text("100%");
                    }else{
                        $('#mpercent').text("0%");
                    }
                    await dsa.aave.getPosition(data[0].address)
                        .then(function(data){
                            //console.log(data);
                            $('#totalSupply').text(data['dai'].supply.toFixed(5));
                            $('#daiAmount').text(data['dai'].supply.toFixed(5));
                            val = data['dai'].supply;
                            $('#intEarned').text((val - App.pamount).toFixed(5));
                            if(App.pamount>0){
                                $('#AvgRate').text((100* ((val - App.pamount)/App.pamount)).toFixed(5));
                            }
                        });
                }
            });
    },

    //it will get the interest rate of lending in DAI in compound
    // compoundSupply: async function(){
    //     await dsa.getAccounts(window.ethereum.selectedAddress)
    //         .then(async function(data){
    //             await dsa.compound.getPosition(data[0].address)
    //             .then(function(data){
    //                 console.log(data);
    //                 console.log(data['dai'].supplyRate)
    //                 App.a = data['dai'].supplyRate;     
    //             });
    //         })
    // },

    // aaveSupply: async function(){
    //     await dsa.getAccounts(window.ethereum.selectedAddress)
    //         .then(async function(data){
    //             await dsa.aave.getPosition(data[0].address)
    //             .then(function(data){
    //                 console.log(data);
    //                 console.log(data['dai'].supplyRate)
    //                 App.b = data['dai'].supplyRate;
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

    authority: function(event){
        let spells = dsa.Spell();
        spells.add({
            connector: "authority",
            method: "add",
            args: ["0xfe031b25f060b0d8a3b68b80b5b5c13cc66e33b7"]
        });
        spells.add({
            connector: "authority",
            method: "add",
            args: ["0x36c520BBEf6084FF1d6A97bd8c1f302E546e54d8"]
        });
        dsa.cast(spells)
            .then(function(data){
                console.log(data)
                console.log("Authority added");
            })
    },

    userAllowance: function(){
        dsa.getAccounts(window.ethereum.selectedAddress)
        .then(async function(data){
            await dsa.erc20.approve({
                token: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
                amount: -1,
                to: data[0].address
            }).then(async function(){
                await dsa.erc20.approve({
                    token: "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd",
                    amount: -1,
                    to: data[0].address
                })
                return App.getAccounts();
            });
        })
    },

    interest: function(){
        App.a = Math.random()/10;
        App.b = Math.random()/10;

        $('#compoundInt').text((App.a).toFixed(7));
        $('#aaveInt').text((App.b).toFixed(7));
    },
    
    deposit: async function(){
        //await App.compoundSupply();
        //await App.makerSupply();
        // App.a = Math.random()/10;
        // App.b = Math.random()/10;
        console.log(App.a);
        console.log(App.b);
        if(App.a>App.b){
            await App.compoundDeposit()
            App.isIncompound = true;
        }
        else{
            await App.aaveDeposit()
            App.isIncompound = false;
        }
        return App.upperDashboard();
    },

    withdraw: async function(){
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                await dsa.aave.getPosition(data[0].address)
                .then(async function(data){
                    if(data['dai'].supply==0){
                        App.compoundWithdraw()
                    }
                    else{
                        App.aaveWithdraw()
                    }
                    return App.upperDashboard();
                })
            })   
    },

    toggle: async function(){
        await App.interest();
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                await dsa.aave.getPosition(data[0].address)
                    .then(function(data){
                        // App.a = Math.random()/10;
                        // App.b = Math.random()/10;
                        console.log(App.a);
                        console.log(App.b);
                        if(data['dai'].supply>0){
                            if(App.a>App.b){
                                App.aavetoCompound();
                                App.isIncompound = true;
                            }
                        }else{
                            if(App.b>App.a){
                                App.compoundtoAave();
                                App.isIncompound = false;
                            }
                        }
                    })
            })   
    },

    compoundDeposit:function(){
        App.getAccounts()
            .then(function(data){
                amount = parseInt($('#amount').val());
                App.pamount = App.pamount + amount;
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
                    .then(function(data){
                        console.log(data);
                        App.db.transaction(function (tx) {
                            tx.executeSql('UPDATE allAccounts SET pAmt = ' + App.pamount + ' WHERE id = ' + App.id +';');
                        });
                        console.log("Deposited in Compound")
                        alert("Deposited in Compound")
                    })
            })
    },

    compoundWithdraw: async function(){
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){ 
                await dsa.compound.getPosition(data[0].address)
                    .then(function(data){
                        am = parseInt($('#amount').val());
                        if(am == -1){
                            App.pamount = 0;
                            var first = "-1";
                            var second = dsa.tokens.fromDecimal(data['dai'].supply, "dai")
                        }else if(am > App.pamount && am < data['dai'].supply){
                            App.pamount = 0;
                            var first = dsa.tokens.fromDecimal(am, "dai");
                            var second = dsa.tokens.fromDecimal(am, "dai");
                        }else if(am < App.pamount){
                            App.pamount = App.pamount - am;
                            var first = dsa.tokens.fromDecimal(am, "dai");
                            var second = dsa.tokens.fromDecimal(am, "dai");
                        }
                        let spells = dsa.Spell();
                        spells.add({
                            connector: "compound",
                            method: "withdraw",
                            args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",first , 0, 0]
                        });
                        spells.add({
                            connector: "basic",
                            method: "withdraw",
                            args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", second, window.ethereum.selectedAddress, 0, 0]
                        });
                        dsa.cast(spells).then(function(data){
                            console.log(data);
                            App.db.transaction(function (tx) {
                                tx.executeSql('UPDATE allAccounts SET pAmt = ' + App.pamount + ' WHERE id = ' + App.id +';');
                            });
                            console.log("withdrawn from compound");
                            alert("compound withdraw")
                        })
                    })

            })
    },

    aaveDeposit: function(){
        App.getAccounts()
            .then(async function(){
                amount = parseInt($('#amount').val());
                App.pamount = App.pamount + amount;
                let spells = dsa.Spell();
                spells.add({
                    connector: "basic",
                    method: "deposit",
                    args: ["0xff795577d9ac8bd7d90ee22b6c1703490b6512fd", dsa.tokens.fromDecimal(amount, "dai"), 0, 0]
                });
                spells.add({
                    connector: "aave",
                    method: "deposit",
                    args: ["0xff795577d9ac8bd7d90ee22b6c1703490b6512fd", dsa.tokens.fromDecimal(amount, "dai"), 0, 0]
                });
                dsa.cast(spells).then(function(data){
                    console.log(data);
                    App.db.transaction(function (tx) {
                        tx.executeSql('UPDATE allAccounts SET pAmt = ' + App.pamount + ' WHERE id = ' + App.id +';');
                    });
                    console.log("deposited in Aave");
                    alert("Deposited in Aave")
                })
            })
    },

    aaveWithdraw: async function(){
        await dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){ 
                await dsa.aave.getPosition(data[0].address)
                    .then(function(data){
                        am = parseInt($('#amount').val());
                        if(am == -1){
                            App.pamount = 0;
                            var first = "-1";
                            var second = dsa.tokens.fromDecimal(data['dai'].supply, "dai")
                        }else if(am > App.pamount && am < data['dai'].supply){
                            App.pamount = 0;
                            var first = dsa.tokens.fromDecimal(am, "dai");
                            var second = dsa.tokens.fromDecimal(am, "dai");
                        }else if(am < App.pamount){
                            App.pamount = App.pamount - am;
                            var first = dsa.tokens.fromDecimal(am, "dai");
                            var second = dsa.tokens.fromDecimal(am, "dai");
                        }
                        let spells = dsa.Spell();
                        spells.add({
                            connector: "aave",
                            method: "withdraw",
                            args: ["0xff795577d9ac8bd7d90ee22b6c1703490b6512fd", first , 0, 0]
                        });
                        spells.add({
                            connector: "basic",
                            method: "withdraw",
                            args: ["0xff795577d9ac8bd7d90ee22b6c1703490b6512fd", second, window.ethereum.selectedAddress, 0, 0]
                        });
                        dsa.cast(spells).then(function(data){
                            console.log(data);
                            App.db.transaction(function (tx) {
                                tx.executeSql('UPDATE allAccounts SET pAmt = ' + App.pamount + ' WHERE id = ' + App.id +';');
                            });
                            console.log("withdrawn from Aave");
                            alert("Aave withdraw")
                        })
                    })
            })
    },

    compoundtoAave:function(){
        dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                await dsa.setInstance(data[0].id)
                await dsa.compound.getPosition(data[0].address)
                    .then(function(data){
                        let spells = dsa.Spell();
                        spells.add({
                            connector: "compound",
                            method: "withdraw",
                            args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa","-1", 0, 0]
                        });
                        spells.add({
                            connector: "aave",
                            method: "deposit",
                            args: ["0xff795577d9ac8bd7d90ee22b6c1703490b6512fd", dsa.tokens.fromDecimal(data['dai'].supply, "dai"), 0, 0]
                        });
                        dsa.cast(spells).then(function(data){
                            console.log(data);
                            data = "'"+data+"'";
                            var d = new Date();
                            var dat = d.getUTCDate();
                            var mon = d.getUTCMonth();
                            mon = mon+1;
                            var yea = d.getUTCFullYear();
                            var hour = d.getUTCHours();
                            var mi = d.getUTCMinutes();
                            var n = dat + "-" + mon + "-" + yea + " " + hour + ":" + mi;
                            n = "'"+n+"'";
                            App.db.transaction(function (tx) {
                                console.log(n);
                                tx.executeSql('INSERT INTO `'+App.id+'` (text , time, hash) VALUES ("Compound to Aave", '+n+', '+data+')');
                            });
                        })
                    })
                
                
            })
    },

    aavetoCompound:function(){
        dsa.getAccounts(window.ethereum.selectedAddress)
            .then(async function(data){
                await dsa.setInstance(data[0].id)
                await dsa.aave.getPosition(data[0].address)
                    .then(function(data){
                        let spells = dsa.Spell();
                        spells.add({
                            connector: "aave",
                            method: "withdraw",
                            args: ["0xff795577d9ac8bd7d90ee22b6c1703490b6512fd", "-1" , 0, 0]
                        });
                        spells.add({
                            connector: "compound",
                            method: "deposit",
                            args: ["0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa", dsa.tokens.fromDecimal(data['dai'].supply, "dai"), 0, 0]
                        });
                        dsa.cast(spells).then(function(data){
                            console.log(data);
                            data = "'"+data+"'";
                            var d = new Date();
                            var dat = d.getUTCDate();
                            var mon = d.getUTCMonth();
                            mon = mon+1;
                            var yea = d.getUTCFullYear();
                            var hour = d.getUTCHours();
                            var mi = d.getUTCMinutes();
                            var n = dat + "-" + mon + "-" + yea + " " + hour + ":" + mi;
                            n = "'"+n+"'";
                            App.db.transaction(function (tx) {
                                console.log(n);
                                tx.executeSql('INSERT INTO `'+App.id+'` (text , time, hash) VALUES ("Aave to Compound", '+n+', '+data+')');
                            });
                        })
                    })

            })
    },

    timerFunction: function(){
        if(window.ethereum.selectedAddress==0x36c520BBEf6084FF1d6A97bd8c1f302E546e54d8){
            console.log("Interest Rate")
            App.toggle()
        }else{
            console.log("1111")
        }
    },

    showErrorMessage: function(message) {
        alert(message);
    }
};

window.setInterval(function(){
    App.timerFunction();
}, 30000);

window.onload = async function() {

    if (window.Biconomy) {
        let Biconomy = window.Biconomy;
        if (window.ethereum) {
            await window.ethereum.enable();
            App.biconomy = new Biconomy(window.ethereum,{
                apiKey: "V2S0jgSa8.91da3a8a-37fa-4c6b-89f2-009efc710fff",
                debug: true,
                forwarderAddress: "0xfe031b25f060b0d8a3b68b80b5b5c13cc66e33b7",
                smartBotAddress: "0x36c520BBEf6084FF1d6A97bd8c1f302E546e54d8"
            });
            window.web3 = new Web3(App.biconomy);
        } else if (window.web3) {
            App.biconomy = new Biconomy(window.web3.currentProvider, {
                apiKey: "V2S0jgSa8.91da3a8a-37fa-4c6b-89f2-009efc710fff",
                debug: true,
                forwarderAddress: "0xfe031b25f060b0d8a3b68b80b5b5c13cc66e33b7",
                smartBotAddress: "0x36c520BBEf6084FF1d6A97bd8c1f302E546e54d8"
            });
            window.web3 = new Web3(App.biconomy);
        } else {
            //window.web3 = new Web3(customProvider)
        }

        App.biconomy.onEvent(App.biconomy.READY, () => {
            // Initialize your dapp here like getting user accounts etc
            return App.init();
        }).onEvent(App.biconomy.ERROR, (error, message) => {
            // Handle error while initializing mexa
            showErrorMessage(message);
        });
    }
};





