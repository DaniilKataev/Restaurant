import React, {Component} from 'react';
import {connect} from 'react-redux';
import MenuListItem from '../menu-list-item';
import WithRestoService from '../hoc';
import Error from '../error';
import {menuLoaded, menuRequested, menuError, addedToCard} from '../../actions';
import Spinner from '../spinner';

import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        this.props.menuRequested();
        const {RestoService} = this.props;
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(err => this.props.menuError())
    }

    componentDidCatch() {
        this.props.menuError();
    }

    render() {
        const {menuItems, loading, error} = this.props;

        if (loading) {
            return <Spinner/>
        }    
        
        if (error) {
            return <Error/>
        }

        const menuItemsArr = menuItems.map(menuItem => {
            return <MenuListItem 
                        key={menuItem.id} 
                        onAddToCard={() => this.props.addedToCard(menuItem.id)} 
                        menuItem={menuItem}/>
        })

        return (
            <View menuItems={menuItemsArr}></View>
        )
    }
};

const View = ({menuItems}) => {
    return (
        <ul className="menu__list">
            {menuItems}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested, 
    menuError,
    addedToCard
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));