import React from 'react';
import './Loader.css';
import loaderImg from './loading3.gif';

function Loader(props) {

    const c = props.comment ? props.comment : "We are searching for the best shipping options for you..";

    return (
        <div className="YspLoader animated fadeIn">
            <div className="YspLoaderImgContainer">
                <img src={loaderImg} className="rounded" />
            </div>

            <h6 className="YspLoaderComment">{c}</h6>
        </div>
    );
}

export default Loader;