import { formValueSelector } from 'redux-form'
import { lift, path, prop, filter } from 'ramda'
import { selectors } from 'data'

export const getProfileData = state => {
  const profile = selectors.core.data.coinify.getProfile(state)
  const kyc = selectors.core.data.coinify.getKyc(state)
  return lift((profile, kyc) => ({ profile, kyc }))(profile, kyc)
}

export const getTrades = state =>
  selectors.core.data.coinify.getTrades(state).getOrElse(null)

export const getSubscriptions = state =>
  selectors.core.data.coinify.getSubscriptions(state).getOrElse([])

export const getTrade = state =>
  selectors.core.data.coinify.getTrade(state).getOrElse(null)

export const getQuote = state => selectors.core.data.coinify.getQuote(state)

export const getCurrency = state => selectors.core.data.coinify.getLevel(state)

export const getBase = state =>
  path(['form', 'exchangeCheckout', 'active'], state)

export const getErrors = state =>
  path(['form', 'exchangeCheckout', 'syncErrors'], state)

export const showRecurringBuy = state => {
  const countryCode = selectors.core.settings.getCountryCode(state).getOrElse('GB')

  const isCardTrade = t =>
    prop('medium', t) === 'card' && prop('state', t) === 'completed'

  const level = selectors.core.data.coinify.getLevel(state).getOrElse()
  const trades = selectors.core.data.coinify.getTrades(state).getOrElse([])
  const ccTrades = filter(isCardTrade, trades)

  const needsTrades = ccTrades < 3
  const needsKyc = parseInt(prop('name', level)) < 2
  const tradeSubscriptionsAllowed = selectors.core.data.coinify.getTradeSubscriptionsAllowed(state).getOrElse(false)

  if (!needsKyc && !needsTrades && !tradeSubscriptionsAllowed) return false
  if (countryCode === 'GB') return false
  return true
}

export const getData = state => ({
  base: getBase(state),
  data: getProfileData(state),
  buyQuoteR: getQuote(state),
  trades: getTrades(state),
  subscriptions: getSubscriptions(state),
  trade: getTrade(state),
  errors: getErrors(state),
  currency: formValueSelector('coinifyCheckoutBuy')(state, 'currency'),
  defaultCurrency: getCurrency(state),
  checkoutBusy: path(['coinify', 'checkoutBusy'], state),
  paymentMedium: path(['coinify', 'medium'], state),
  step: path(['coinify', 'checkoutStep'], state),
  coinifyBusy: path(['coinify', 'coinifyBusy'], state),
  canTrade: selectors.core.data.coinify.canTrade(state).getOrElse(false),
  showRecurringModal: path(['coinify', 'showRecurringModal'], state),
  showRecurringBuy: showRecurringBuy(state),
  subscription: path(['coinify', 'subscription'], state),
  subscriptionData: path(['coinify', 'subscriptionData'], state)
})
