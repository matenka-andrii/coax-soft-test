// Core
import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Components
import Category from '../Category';
import Table from '../Table';

// Instruments
import Styles from './styles.scss';
import { defaultCategories, defaultProducts } from './defaults';
import { sort } from '../../helpers';

export default class Page extends Component {
    state = {
        categories: [],
        products:   []
    };

    componentDidMount () {
        this._fetchCategories();
    }

    _fetchCategories = () => {
        this.setState({ categories: defaultCategories });
    };

    _selectCategory = ({ id, selected }) => {
        const products = [];
        const { categories:categoriesData } = this.state;
        const categories = categoriesData.map((category) => {
            if (category.id === id) {
                category.selected = selected;
            }

            return category;
        });

        categories.forEach((category) => {
            if (category.selected) {
                products.push({
                    categoryId: category.id,
                    data:       defaultProducts[category.id]
                });
            }
        });
        this.setState(() => ({
            categories,
            products
        }));
    };

    _sortProducts = (id, key, direction) => {
        const { products:productsData } = this.state;
        let i = 0;

        switch (key) {
            case 'name':
                i = 1;
                break;
            case 'rating':
                i = 3;
                break;
            case 'price':
                i = 2;
                break;
            default:
                i = 0;
        }

        const products = productsData.map((category) => {
            if (category.categoryId === id) {
                const head = category.data.filter((e, index) => index === 0);
                const data = category.data.filter((e, index) => index !== 0);
                const sortedData = sort(data, direction, i);

                return {
                    categoryId: id,
                    data:       [head[0], ...sortedData]
                };
            }

            return category;
        });

        this.setState(() => ({
            products
        }));
    };

    render () {
        const { categories:categoriesData, products:productsData } = this.state;
        const categories = categoriesData
            .map((category) => (
                <Category
                    key = { category.id }
                    selectCategory = { this._selectCategory }
                    { ...category }
                />
            ));
        const products = productsData
            .map((table) => (
                <CSSTransition
                    classNames = { {
                        enter:       Styles.tableInStart,
                        enterActive: Styles.tableInEnd,
                        exit:        Styles.tableExitStart,
                        exitActive:  Styles.tableExitEnd
                    } }
                    key = { table.categoryId }
                    timeout = { { enter: 300, exit: 300 } } >
                    <Table
                        data = { table.data }
                        id = { table.categoryId }
                        sortProducts = { this._sortProducts }
                    />
                </CSSTransition>
            ));

        return (
            <div className = { Styles.page }>
                <ul>
                    { categories }
                </ul>
                <div className = { Styles.products }>
                    <TransitionGroup>
                        { products }
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}
