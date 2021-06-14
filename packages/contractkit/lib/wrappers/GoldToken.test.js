"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ganache_test_1 = require("@celo/dev-utils/lib/ganache-test");
var kit_1 = require("../kit");
ganache_test_1.testWithGanache('GoldToken Wrapper', function (web3) {
    var ONE_GOLD = web3.utils.toWei('1', 'ether');
    var kit = kit_1.newKitFromWeb3(web3);
    var accounts = [];
    var goldToken;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3.eth.getAccounts()];
                case 1:
                    accounts = _a.sent();
                    kit.defaultAccount = accounts[0];
                    return [4 /*yield*/, kit.contracts.getGoldToken()];
                case 2:
                    goldToken = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('SBAT check balance', function () {
        return expect(goldToken.balanceOf(accounts[0])).resolves.toBeBigNumber();
    });
    test('SBAT check decimals', function () { return expect(goldToken.decimals()).resolves.toBe(18); });
    test('SBAT check name', function () { return expect(goldToken.name()).resolves.toBe('Celo Gold'); });
    test('SBAT check symbol', function () { return expect(goldToken.symbol()).resolves.toBe('cGLD'); });
    test('SBAT check totalSupply', function () { return expect(goldToken.totalSupply()).resolves.toBeBigNumber(); });
    test('SBAT transfer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var before, tx, after;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, goldToken.balanceOf(accounts[1])];
                case 1:
                    before = _a.sent();
                    return [4 /*yield*/, goldToken.transfer(accounts[1], ONE_GOLD).send()];
                case 2:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.waitReceipt()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, goldToken.balanceOf(accounts[1])];
                case 4:
                    after = _a.sent();
                    expect(after.minus(before)).toEqBigNumber(ONE_GOLD);
                    return [2 /*return*/];
            }
        });
    }); });
    test('SBAT approve spender', function () { return __awaiter(void 0, void 0, void 0, function () {
        var before, after;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, goldToken.allowance(accounts[0], accounts[1])];
                case 1:
                    before = _a.sent();
                    expect(before).toEqBigNumber(0);
                    return [4 /*yield*/, goldToken.approve(accounts[1], ONE_GOLD).send()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, goldToken.allowance(accounts[0], accounts[1])];
                case 3:
                    after = _a.sent();
                    expect(after).toEqBigNumber(ONE_GOLD);
                    return [2 /*return*/];
            }
        });
    }); });
    test('SBAT tranfer from', function () { return __awaiter(void 0, void 0, void 0, function () {
        var before, tx, after;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, goldToken.balanceOf(accounts[3])
                    // account1 approves account0
                ];
                case 1:
                    before = _a.sent();
                    // account1 approves account0
                    return [4 /*yield*/, goldToken.approve(accounts[0], ONE_GOLD).send({ from: accounts[1] })];
                case 2:
                    // account1 approves account0
                    _a.sent();
                    return [4 /*yield*/, goldToken.transferFrom(accounts[1], accounts[3], ONE_GOLD).send()];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.waitReceipt()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, goldToken.balanceOf(accounts[3])];
                case 5:
                    after = _a.sent();
                    expect(after.minus(before)).toEqBigNumber(ONE_GOLD);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=GoldToken.test.js.map