// Core
import React, { Component } from 'react';
import { bool, func, number, string } from 'prop-types';
import cx from 'classnames';

// Instruments
import Styles from './styles.scss';

export default class Category extends Component {
    static propTypes = {
        id:             number.isRequired,
        name:           string.isRequired,
        selectCategory: func.isRequired,
        selected:       bool.isRequired
    };

    _selectCategory = () => {
        const { selectCategory, id, selected } = this.props;

        selectCategory({
            id,
            selected: !selected
        });
    };

    render () {
        const { selected, name } = this.props;
        const styles = cx(Styles.category, {
            [Styles.selected]: selected
        });

        return (
            <li
                className = { styles }
                onClick = { this._selectCategory } >
                <i />
                <span>
                    { name }
                </span>
            </li>
        );
    }
}
