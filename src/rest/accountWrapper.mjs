import { BaseWrapper } from './baseWrapper.mjs'

export class AccountWrapper extends BaseWrapper {
  constructor(credentials) {
    super(credentials)
  }

  getAccountSummaryInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v2/user-info',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/accounts',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetail(params) {
    return this.makeRequest({
      endpoint: '/api/v1/accounts/{accountId}',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetailMargin(params) {
    return this.makeRequest({
      endpoint: '/api/v1/margin/account',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetailCrossMargin(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/accounts',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetailIsolatedMargin(params) {
    return this.makeRequest({
      endpoint: '/api/v3/isolated/accounts',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountDetailFutures(params) {
    return this.makeRequest({
      endpoint: '/api/v1/account-overview',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'futures',
      params,
    })
  }

  getAccountLedgers(params) {
    return this.makeRequest({
      endpoint: '/api/v1/accounts/ledgers',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountLedgersTradeHf(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/accounts/ledgers',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountLedgersMarginHf(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/account/ledgers',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAccountLedgersFutures(params) {
    return this.makeRequest({
      endpoint: '/api/v1/transaction-history',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub/user',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsInfoV2(params) {
    return this.makeRequest({
      endpoint: '/api/v2/sub/user',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  createSubAccount(params) {
    return this.makeRequest({
      endpoint: '/api/v2/sub/user/created',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSubAccountBalance(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub-accounts/{subUserId}',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsBalance(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub-accounts',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsBalanceV2(params) {
    return this.makeRequest({
      endpoint: '/api/v2/sub-accounts',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getAllSubAccountsFutures(params) {
    return this.makeRequest({
      endpoint: '/api/v1/account-overview-all',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSubAccountApiList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/sub/api-key',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  createDepositAddress(params) {
    return this.makeRequest({
      endpoint: '/api/v1/deposit-addresses',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  createDepositAddressesV2(params) {
    return this.makeRequest({
      endpoint: '/api/v2/deposit-addresses',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getDepositAddress(params) {
    return this.makeRequest({
      endpoint: '/api/v1/deposit-addresses',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getDepositList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/deposits',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getHistoricalDepositsList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hist-deposits',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getWithdrawalsList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getHistoricalWithdrawalsList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hist-withdrawals',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getWithdrawalQuotas(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals/quotas',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  applyWithdraw(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelWithdrawal(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals/{withdrawalId}',
      method: 'DELETE',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getTransferable(params) {
    return this.makeRequest({
      endpoint: '/api/v1/accounts/transferable',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  flexTransfer(params) {
    return this.makeRequest({
      endpoint: '/api/v3/accounts/universal-transfer',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  subTransfer(params) {
    return this.makeRequest({
      endpoint: '/api/v2/accounts/sub-transfer',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  innerTransfer(params) {
    return this.makeRequest({
      endpoint: '/api/v2/accounts/inner-transfer',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  transferOut(params) {
    return this.makeRequest({
      endpoint: '/api/v3/transfer-out',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'futures',
      params,
    })
  }

  transferIn(params) {
    return this.makeRequest({
      endpoint: '/api/v1/transfer-in',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'futures',
      params,
    })
  }

  getTransferList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/transfer-list',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'futures',
      params,
    })
  }

  getBaseFee(params) {
    return this.makeRequest({
      endpoint: '/api/v1/base-fee',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getTradeFees(params) {
    return this.makeRequest({
      endpoint: '/api/v1/trade-fees',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }
}
