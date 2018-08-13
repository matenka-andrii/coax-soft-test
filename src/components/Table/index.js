// Core
import React, { Component } from 'react';
import { array, func, number } from 'prop-types';

// Components
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

// Instruments
import Styles from './styles.scss';

export default class Table extends Component {
    static propTypes = {
        data:         array.isRequired,
        id:           number.isRequired,
        sortProducts: func.isRequired
    };

    state = {
        sorting: {
            key:       '',
            direction: ''
        }
    };

    _handleTableHeadClick = ({ target }) => {
        const { sortProducts, id } = this.props;
        const { sorting } = this.state;
        let key = target.dataset.key;
        let direction = '';

        if (typeof key === 'undefined') {
            key = 'id';
        }
        if (sorting.key === key && sorting.direction === 'ASC') {
            direction = 'DESC';
            this.setState(() => ({
                sorting: {
                    direction
                }
            }));
        } else {
            direction = 'ASC';
            this.setState(() => ({
                sorting: {
                    key,
                    direction
                }
            }));
        }

        sortProducts(id, key, direction);
    };

    render () {
        const { data } = this.props;
        const head = data[0];
        const products = data.map((product, i) => {
            if (!(i === 0)) {
                return (
                    <tr
                        key = { i } >
                        <td><i /></td>
                        <td>{ product[1] }</td>
                        <td className = { Styles.rating }>
                            <Rater
                                interactive = { false }
                                rating = { product[3] }
                                total = { 5 }
                            />
                        </td>
                        <td>{ product[2] }</td>
                    </tr>
                );
            }

            return null;
        });

        return (
            <table className = { Styles.table }>
                <thead>
                    <tr onClick = { this._handleTableHeadClick }>
                        <th data-key = 'id' ><i className = { Styles.checkbox } /></th>
                        <th data-key = 'name' >{ head.name }</th>
                        <th data-key = 'rating' >{ head.rating }</th>
                        <th data-key = 'price' >{ head.price }</th>
                    </tr>
                </thead>
                <tbody>
                    { products }
                </tbody>
            </table>
        );
    }
}
