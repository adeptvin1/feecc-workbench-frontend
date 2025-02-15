import React from 'react'
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {doFetchRevisions} from "@reducers/RevisionsActions";
import styles from './RevisionTracker.module.css'
import arrowLeft from '../../icons/arrow_left.svg'
import arrowRight from '../../icons/arrow_right.svg'
import clsx from 'clsx'

export default withTranslation()(connect(
    (state) => ({
        units: state.revisions.get('units')?.toJS()
    }),
    (dispatch) => ({
        fetchRevisions: (successChecker, errorChecker) => doFetchRevisions(dispatch, successChecker, errorChecker)
    })
)(class RevisionsTracker extends React.Component {
    state = {
        toggle: false
    }

    render() {
        const {t, units} = this.props
        return (
            <div className={clsx(styles.wrapper, {[styles.toggled]: !!this.state.toggle})}>
                <div>
                    <div onClick={() => this.setState({toggle: !this.state.toggle})} className={styles.arrowWrapper}>
                        {!this.state.toggle ? (<img src={arrowLeft}/>) : (<img src={arrowRight}/>)}
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    {units?.length > 0 ?
                        <div className={styles.unitsFoundWrapper}>
                            <h2>{t('PassportsForRevision')}</h2>
                            <div className={styles.unitsWrapper}>
                            {units.map((item, index) => (
                                <div className={styles.unitsRow}>
                                    <div>{index + 1}. {item.unit_name}</div>
                                    <div>ID {item.unit_internal_id}</div>
                                </div>
                            ))}
                            </div>
                        </div>
                        :
                        <div className={styles.noUnitsFound}>{t('NoUnitsFound')}</div>
                    }
                </div>
            </div>
        )
    }
}))