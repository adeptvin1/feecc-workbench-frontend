import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import React from 'react'
import styles from './Login.module.css'
import robonomicsLogo from '../../static/imageCenter.png'
import MVASLogo from '../../static/imageLeft.png'
import endoStarsLogo from '../../static/imageRight.png'
import { push, replace } from "connected-react-router";
import { setIn } from "immutable";
import { doFetchComposition } from "@reducers/stagesActions";
import PropTypes from "prop-types";

export default withTranslation()(connect(
  (store) => ({
    authorized: store.stages.getIn(['composition', 'employee_logged_in']),
  }),
  (dispatch) => ({
    goToMenu          : () => dispatch(replace({ pathname: '/menu' })),
    doFetchComposition: (successChecker, errorChecker) => doFetchComposition(dispatch, successChecker, errorChecker)
  })
)(class Login extends React.Component {
  
  static propTypes = {
    authorized: PropTypes.bool,
    
    goToMenu          : PropTypes.func.isRequired,
    doFetchComposition: PropTypes.func.isRequired
  }
  
  state = {
    timerID: null
  }
  
  componentDidMount() {
    this.setState({
      timerID: setInterval(() => {
        this.props.doFetchComposition((r) => { return true }, null)
      }, 1000)
    })
    if (this.props.authorized === true)
      this.props.goToMenu()
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.authorized === true)
      this.props.goToMenu()
  }
  
  render() {
    const { t } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>{t('QualityMonitoringSystem')}</div>
        <div className={styles.icons}>
          <div className={styles.icon}><img className={styles.leftLogo} src={MVASLogo} alt="MVAS-logo(img1)"/></div>
          <div className={styles.icon}><img className={styles.centerLogo} src={robonomicsLogo}
                                            alt="robonomics-logo(img2)"/></div>
          <div className={styles.icon}><img className={styles.rightLogo} src={endoStarsLogo} alt="geoscan-logo(img3)"/>
          </div>
        </div>
        <div className={styles.message}>{t('AuthorizeToProceed')}</div>
      </div>
    )
  }
}))
