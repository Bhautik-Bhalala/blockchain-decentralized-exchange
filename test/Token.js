const { ethers } = require("hardhat")
const { expect } = require("chai");

const tokens = (n) => {
   return ethers.utils.parseUnits(n.toString(),'ether')
}


describe('Token' , () => {

    let token

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token")
        token = await Token.deploy("Liquidity" , "LIQ" , "1000000")
    })

    describe("Deployment" , () => {

        const name = "Liquidity"
        const symbol = "LIQ";
        const decimals = "18";
        const totalsupply = tokens("1000000");


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
            expect(await token.totalsupply()).to.equal(totalsupply)
        })
    })



})