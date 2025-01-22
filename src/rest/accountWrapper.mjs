import { BaseWrapper } from './baseWrapper.mjs'

export class AccountWrapper extends BaseWrapper {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  account = {
    getAccountInfo: (params) => {
      return this.makeRequest({
        endpoint: '/api/v2/user-info',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getApikeyInfo: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/user/api-key',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSpotAccountType : (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/accounts/opened',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSpotAccountList: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/accounts',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSpotAccountDetail: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/accounts/{accountId}',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getCrossMarginAccount: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/margin/accounts',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getIsolatedMarginAccount: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/isolated/accounts',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getFuturesAccount: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/account-overview',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'futures',
        params,
      })
    },

    getSpotLedger: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/accounts/ledgers',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSpotHFLedger: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/accounts/ledgers',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getMarginHFLedger: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/account/ledgers',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getFuturesLedger: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/transaction-history',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'futures',
        params,
      })
    },
  }

  subAccount = {
    addSubAccount: (params) => {
      return this.makeRequest({
        endpoint: '/api/v2/sub/user/created',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    addSubAccountMarginPermission: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/sub/user/margin/enable',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    addSubAccountFuturesPermission: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/sub/user/futures/enable',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'futures',
        params,
      })
    },


    getSpotSubAccountsSummaryV2: (params) => {
      return this.makeRequest({
        endpoint: '/api/v2/sub/user',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSpotSubAccountDetail: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/sub-accounts/{subUserId}',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSpotSubAccountListV2: (params) => {
      return this.makeRequest({
        endpoint: '/api/v2/sub-accounts',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getFuturesSubAccountListV2: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/account-overview-all',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'futures',
        params,
      })
    },

    addSubAccountApi: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/sub/api-key',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    modifySubAccountApi: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/sub/api-key/update',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSubAccountApiList: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/sub/api-key',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    deleteSubAccountApi: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/sub/api-keye',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }

  deposit = {
    addDepositAddressV3: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/deposit-address/create',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getDepositAddressV3: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/deposit-address',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getDepositHistory: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/deposits',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }

  withdrawal = {
    getWithdrawalQuotas: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/withdrawals/quotas',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    withdrawalV3: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/withdrawals',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelWithdraw: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/withdrawals/{withdrawalId}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getWithdrawalHistory: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/withdrawals',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }

  transfer = {
    getTransferQuotas: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/accounts/transferable',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    flexTransfer: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/accounts/universal-transfer',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }

  fee = {
    getBasicFee: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/base-fee',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSpotActualFee: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/trade-fees',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getFuturesActualFee: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/trade-fees',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'futures',
        params,
      })
    },
  }
}
