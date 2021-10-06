import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deletedFromCard, addedToCard, reduceItemCount} from '../../actions';

const CartTable = ({items, deletedFromCard, addedToCard, reduceItemCount}) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, id, url, count} = item;
                        return (
                            <div className="cart__item" key={id}>
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart__item-counter">
                                    <div onClick={() => addedToCard(id)} className="cart__item-sign">+</div>
                                    <div className="cart__item-count">{count}</div>
                                    <div onClick={() => reduceItemCount(id)} className="cart__item-sign">-</div>
                                </div>
                                <div onClick={() => deletedFromCard(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

const mapToStateToProps = ({items}) => {
    return {
        items
    };
}

const mapDispatchToProps = {
    deletedFromCard,
    addedToCard,
    reduceItemCount
}


export default connect(mapToStateToProps, mapDispatchToProps)(CartTable);