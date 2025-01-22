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

  getApikeyInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/user/api-key',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountType (params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/accounts/opened',
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
      baseUrl: 'futures',
      params,
    })
  }

  addSubAccount(params) {
    return this.makeRequest({
      endpoint: '/api/v2/sub/user/created',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addSubAccountMarginPermission(params) {
    return this.makeRequest({
      endpoint: '/api/v3/sub/user/margin/enable',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addSubAccountFuturesPermission(params) {
    return this.makeRequest({
      endpoint: '/api/v3/sub/user/futures/enable',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'futures',
      params,
    })
  }


  getSubAccountListSummaryInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v2/sub/user',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSubAccountDetailBalance(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub-accounts/{subUserId}',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSubAccountListSpotBalance(params) {
    return this.makeRequest({
      endpoint: '/api/v2/sub-accounts',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSubAccountListFuturesBalance(params) {
    return this.makeRequest({
      endpoint: '/api/v1/account-overview-all',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'futures',
      params,
    })
  }

  addSubAccountApi(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub/api-key',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  modifySubAccountApi(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub/api-key/update',
      method: 'POST',
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

  deleteSubAccountApi(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub/api-keye',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addDepositAddress(params) {
    return this.makeRequest({
      endpoint: '/api/v3/deposit-address/create',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getDepositAddress(params) {
    return this.makeRequest({
      endpoint: '/api/v3/deposit-address',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getDepositHistory(params) {
    return this.makeRequest({
      endpoint: '/api/v3/deposits',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getWithdrawalQuotas(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals/quotas',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addWithdraw(params) {
    return this.makeRequest({
      endpoint: '/api/v3/withdrawals',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelWithdraw(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals/{withdrawalId}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getWithdrawalHistory(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getTransferQuotas(params) {
    return this.makeRequest({
      endpoint: '/api/v1/accounts/transferable',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addFlexTransfer(params) {
    return this.makeRequest({
      endpoint: '/api/v3/accounts/universal-transfer',
      method: 'POST',
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

  getActualFee(params) {
    return this.makeRequest({
      endpoint: '/api/v1/trade-fees',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getActualFeeFutures(params) {
    return this.makeRequest({
      endpoint: '/api/v1/trade-fees',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'futures',
      params,
    })
  }
}
