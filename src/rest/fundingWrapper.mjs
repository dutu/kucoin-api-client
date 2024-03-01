import { BaseWrapper } from './baseWrapper.mjs'

export class FundingWrapper extends BaseWrapper {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  createDepositAddress(params) {
    return this.makeRequest({
      endpoint: '/api/v1/deposit-addresses',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  createDepositAddressesV2(params) {
    return this.makeRequest({
      endpoint: '/api/v2/deposit-addresses',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getDepositAddress(params) {
    return this.makeRequest({
      endpoint: '/api/v1/deposit-addresses',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getDepositList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/deposits',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getHistoricalDepositsList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hist-deposits',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getWithdrawalsList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getHistoricalWithdrawalsList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hist-withdrawals',
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

  applyWithdraw(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelWithdrawal(params) {
    return this.makeRequest({
      endpoint: '/api/v1/withdrawals/{withdrawalId}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getTransferable(params) {
    return this.makeRequest({
      endpoint: '/api/v1/accounts/transferable',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  flexTransfer(params) {
    return this.makeRequest({
      endpoint: '/api/v3/accounts/universal-transfer',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  subTransfer(params) {
    return this.makeRequest({
      endpoint: '/api/v2/accounts/sub-transfer',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  innerTransfer(params) {
    return this.makeRequest({
      endpoint: '/api/v2/accounts/inner-transfer',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  transferOut(params) {
    return this.makeRequest({
      endpoint: '/api/v3/transfer-out',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'futures',
      params,
    })
  }

  transferIn(params) {
    return this.makeRequest({
      endpoint: '/api/v1/transfer-in',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'futures',
      params,
    })
  }

  getTransferList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/transfer-list',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'futures',
      params,
    })
  }
}
