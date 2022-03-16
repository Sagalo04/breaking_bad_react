import FavoriteList from 'components/FavoriteList/FavoriteList';
import React from 'react';
import Styles from './Favs.module.scss'
function Favs(props) {
    return (
        <div className={Styles.favs}>
            <h1>My favorite phrases</h1>
            <FavoriteList />
        </div>
    );
}

export default Favs;