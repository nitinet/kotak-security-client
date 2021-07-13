import fetch from 'node-fetch';
class KotakSecurityClient {
    constructor(opts) {
        this.baseUrl = 'https://tradeapi.kotaksecurities.com/apim';
        this.userId = null;
        this.appId = null;
        this.consumerKey = null;
        this.secretKey = null;
        this.accessCode = null;
        this.sessionToken = null;
        this.sessionheader = {
            consumerKey: this.consumerKey,
            sessionToken: null
        };
        if (!opts)
            throw new Error('Options Not Found');
        if (opts.userId != null && typeof opts.userId == 'string')
            this.userId = opts.userId;
        else
            throw new Error('userId not found');
        if (opts.password != null && typeof opts.password == 'string')
            this.password = opts.password;
        else
            throw new Error('password not found');
        if (opts.appId != null && typeof opts.appId == 'string')
            this.appId = opts.appId;
        else
            throw new Error('appId not found');
        if (opts.consumerKey != null && typeof opts.consumerKey == 'string')
            this.consumerKey = opts.consumerKey;
        else
            throw new Error('consumerKey not found');
        if (opts.secretKey != null && typeof opts.secretKey == 'string')
            this.secretKey = opts.secretKey;
        else
            throw new Error('secretKey not found');
        if (opts.accessCode != null && typeof opts.accessCode == 'string')
            this.accessCode = opts.accessCode;
        else
            throw new Error('accessCode not found');
    }
    async init() {
        let initHeaders = {
            'Content-Type': 'application/json',
            userid: this.userId,
            appId: this.appId,
            consumerKey: this.consumerKey,
            Authorization: `Bearer ${this.secretKey}`
        };
        let initUrl = this.baseUrl + '/session/1.0/session/init';
        let initData = await (await fetch(initUrl, {
            headers: initHeaders
        })).json();
        let loginUrl = this.baseUrl + '/session/1.0/session/login/userid';
        let loginBody = {
            userid: this.userId,
            password: this.password
        };
        let loginData = await (await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify(loginBody),
            headers: initHeaders
        })).json();
        let sessionTokenUrl = this.baseUrl + '/session/1.0/session/2FA/accesscode';
        let sessionTokenBody = {
            userid: this.userId,
            accessCode: this.accessCode
        };
        let sessionTokenHeaders = Object.assign({}, initHeaders, { oneTimeToken: loginData.oneTimeToken });
        let sessionTokenData = await (await fetch(sessionTokenUrl, {
            method: 'POST',
            body: JSON.stringify(sessionTokenBody),
            headers: sessionTokenHeaders
        })).json();
        this.sessionToken = sessionTokenData.sessionToken;
        this.sessionheader = {
            consumerKey: this.consumerKey,
            sessionToken: this.sessionToken
        };
    }
    async placeIntradayOrder(order) {
        let url = this.baseUrl + '/orders/1.0/order/mis';
        let body = JSON.stringify(order);
        let data = await (await fetch(url, {
            method: 'POST',
            body,
            headers: this.sessionheader
        })).json();
        return data;
    }
    async placeNormalOrder(order) {
        let url = this.baseUrl + '/orders/1.0/order/normal';
        let body = JSON.stringify(order);
        let data = await (await fetch(url, {
            method: 'POST',
            body,
            headers: this.sessionheader
        })).json();
        return data;
    }
    async modifyOrder(order) {
        let url = this.baseUrl + '/orders/1.0/order';
        if (!order.orderId)
            throw new Error('Order Id not found');
        let body = JSON.stringify(order);
        let data = await (await fetch(url, {
            method: 'PUT',
            body,
            headers: this.sessionheader
        })).json();
        return data;
    }
    async cancelOrder(orderId) {
        let url = `${this.baseUrl}/orders/1.0/order/${orderId}`;
        let data = await (await fetch(url, {
            method: 'DELETE',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getTodaysPosition() {
        let url = this.baseUrl + '/positions/1.0/positions/todays';
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getOpenPosition() {
        let url = this.baseUrl + '/positions/1.0/positions/open';
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getStocksPosition() {
        let url = this.baseUrl + '/positions/1.0/positions/stocks';
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getOrders() {
        let url = this.baseUrl + '/reports/1.0/orders';
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getOrderById(orderId) {
        let url = `${this.baseUrl}/reports/1.0/orders/${orderId}`;
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getTrades() {
        let url = this.baseUrl + '/reports/1.0/trades';
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getTradeById(orderId) {
        let url = `${this.baseUrl}/reports/1.0/trades/${orderId}`;
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getQuote(instrumentId) {
        let url = `${this.baseUrl}/quotes/v1.0/instruments/${instrumentId}`;
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getQuoteLTP(instrumentId) {
        let url = `${this.baseUrl}/quotes/v1.0/ltp/instruments/${instrumentId}`;
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getQuoteDepth(instrumentId) {
        let url = `${this.baseUrl}/quotes/v1.0/depth/instruments/${instrumentId}`;
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
    async getQuoteOhlc(instrumentId) {
        let url = `${this.baseUrl}/quotes/v1.0/ohlc/instruments/${instrumentId}`;
        let data = await (await fetch(url, {
            method: 'GET',
            headers: this.sessionheader
        })).json();
        return data;
    }
}
export default KotakSecurityClient;
//# sourceMappingURL=KotakSecurityClient.js.map