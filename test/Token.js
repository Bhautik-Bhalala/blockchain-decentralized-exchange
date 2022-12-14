const { ethers } = require("hardhat")
const { expect } = require("chai");

const tokens = (n) => {
   return ethers.utils.parseUnits(n.toString(),'ether')
}


describe('Token' , () => {

    let token
    let accounts
    let deployer, receiver , exchange

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token")
        token = await Token.deploy("Liquidity" , "LIQ" , "1000000")

        accounts = await ethers.getSigners()
        deployer = accounts[0]
        receiver = accounts[1]
        exchange = accounts[2]

    })

    describe("Deployment" , () => {

        const name = "Liquidity"
        const symbol = "LIQ";
        const decimals = "18";
        const totalSupply = tokens("1000000");


        it('have the name Liquidity' , async () => {
            expect(await token.name()).to.equal(name)
        })
    
        it('have the Symbol LIQ' , async () => {
            expect(await token.symbol()).to.equal(symbol)
        })
    
        it('have the decimals 18' , async () => {
            expect(await token.decimals()).to.equal(decimals)
        })
    
        it('have the total supply 1 million' , async () => {
            expect(await token.totalSupply()).to.equal(totalSupply)
        })

        it('assign total supply to deployer' , async () => {
            expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
        })
    })

    describe("Sending Token" ,()=>{
        let amount , transaction , result

        describe("Success" , () => {

            beforeEach(async()=>{
                amount = tokens(100)
                transaction = await token.connect(deployer).transfer(receiver.address , amount)
                result = await transaction.wait()
            })
    
            it("Transfers Tokens" ,async ()=>{
    
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
                expect(await token.balanceOf(receiver.address)).to.equal(amount)
            })
    
            it("Emits a transfer function" , async() => {
                const event = result.events[0]
                expect(event.event).to.equal('Transfer')
    
                const args = event.args
                expect(args.from).to.equal(deployer.address)
                expect(args.to).to.equal(receiver.address)
                expect(args.value).to.equal(amount)
            })
        })

        describe("Failure" ,()=>{
            it("Rejects insufficient balances" , async() =>{
            const invalidAmount = tokens(100000000)
            await expect(token.connect(deployer).transfer(receiver.address , invalidAmount)).to.be.reverted
            })

            it("Rejects to invalid recipient" , async() =>{
                const invalidAmount = tokens(100)
                await expect(token.connect(deployer).transfer("0x0000000000000000000000000000000000000000" , invalidAmount)).to.be.reverted
    
            })

        })

    })

    describe ("Approving Tokens" , () =>{
        let amount , transaction , result


        beforeEach(async () =>{
            amount = tokens(100)
            transaction = await token.connect(deployer).approve(exchange.address , amount)
            result = await transaction.wait()
        })

        describe("Success" , () =>{
            it("Allocates an allowance for delegated token spending" , async () =>{
                expect(await token.allowance(deployer.address , exchange.address)).to.equal(amount)
            })

            it("Emits a approval function" , async() => {
                const event = result.events[0]
                expect(event.event).to.equal('Approval')
    
                const args = event.args
                expect(args.owner).to.equal(deployer.address)
                expect(args.spender).to.equal(exchange.address)
                expect(args.value).to.equal(amount)
            })
        })
        describe("Failure" , () =>{
            it("Rejects invalid Spenders" , async() =>{
                await expect(token.connect(deployer).approve("0x0000000000000000000000000000000000000000" , amount)).to.be.reverted

            })
        })

    })

    describe("Deligated Token Transfers" , () =>{
        let amount , transaction , result , am


        beforeEach(async () =>{
            amount = tokens(100)
            transaction = await token.connect(deployer).approve(exchange.address , amount)
            result = await transaction.wait()
        })
        describe("Success",() =>{
            beforeEach(async () =>{
                am =tokens(10)
                transaction = await token.connect(exchange).transferFrom(deployer.address , receiver.address , am)
                result = await transaction.wait()
            })

            it("Transfers token Balance" , async()=>{
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(999990))
                expect(await token.balanceOf(receiver.address)).to.equal(am)
            })

            it('Resets the allowance', async() => {
                expect(await token.allowance(deployer.address,exchange.address)).to.be.equal(tokens(90))
            })

            it("Emits a transfer function" , async() => {
                const event = result.events[0]
                expect(event.event).to.equal('Transfer')
    
                const args = event.args
                expect(args.from).to.equal(deployer.address)
                expect(args.to).to.equal(receiver.address)
                expect(args.value).to.equal(am)
            })

        })

        describe("Failure",() =>{
            it("Rejects insufficient balances" , async() =>{
                const invalidAmount = tokens(100000000)
                await expect(token.connect(exchange).transferFrom(deployer.address, receiver.address, invalidAmount)).to.be.reverted
            })
    
            it("Rejects to invalid recipient" , async() =>{
                const invalidAmount = tokens(100)
                await expect(token.connect(deployer).transfer("0x0000000000000000000000000000000000000000" , invalidAmount)).to.be.reverted
            })
            
        })

    })



})