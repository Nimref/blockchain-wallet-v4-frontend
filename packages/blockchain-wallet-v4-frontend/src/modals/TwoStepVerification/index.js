import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { actions } from 'data'
import modalEnhancer from 'providers/ModalEnhancer'
import TwoStepVerification from './template.js'

class TwoStepVerificationContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (value) {
    
  }

  render () {
    return (
      <TwoStepVerification {...this.props} handleClick={this.handleClick} />
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  modalActions: bindActionCreators(actions.modals, dispatch)
})

const enhance = compose(
  modalEnhancer('TwoStepVerification'),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(TwoStepVerificationContainer)