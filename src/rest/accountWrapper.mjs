import { BaseWrapper } from './baseWrapper.mjs'

export class AccountWrapper extends BaseWrapper {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  getAccountSummaryInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v2/user-info',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/accounts',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetail(params) {
    return this.makeRequest({
      endpoint: '/api/v1/accounts/{accountId}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetailMargin(params) {
    return this.makeRequest({
      endpoint: '/api/v1/margin/account',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetailCrossMargin(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/accounts',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetailIsolatedMargin(params) {
    return this.makeRequest({
      endpoint: '/api/v3/isolated/accounts',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetailFutures(params) {
    return this.makeRequest({
      endpoint: '/api/v1/account-overview',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'futures',
      params,
    })
  }

  getAccountLedgers(params) {
    return this.makeRequest({
      endpoint: '/api/v1/accounts/ledgers',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountLedgersTradeHf(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/accounts/ledgers',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountLedgersMarginHf(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/account/ledgers',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountLedgersFutures(params) {
    return this.makeRequest({
      endpoint: '/api/v1/transaction-history',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub/user',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsInfoV2(params) {
    return this.makeRequest({
      endpoint: '/api/v2/sub/user',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  createSubAccount(params) {
    return this.makeRequest({
      endpoint: '/api/v2/sub/user/created',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSubAccountBalance(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub-accounts/{subUserId}',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsBalance(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub-accounts',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsBalanceV2(params) {
    return this.makeRequest({
      endpoint: '/api/v2/sub-accounts',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsFutures(params) {
    return this.makeRequest({
      endpoint: '/api/v1/account-overview-all',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSubAccountApiList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub/api-key',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getBaseUserFee(params) {
    return this.makeRequest({
      endpoint: '/api/v1/base-fee',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getTradingPairsFee(params) {
    return this.makeRequest({
      endpoint: '/api/v1/trade-fees',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }
}
